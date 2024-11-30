import { defineStore, storeToRefs } from "pinia";
import { Datasource, useDashboardStore, Widget } from "./dashboard";
import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

export const MIN_COLUMNS = 3;
const PANE_MARGIN = 10;
const PANE_WIDTH = 300;
const COLUMN_WIDTH = PANE_MARGIN + PANE_WIDTH + PANE_MARGIN;

export const SPARKLINE_HISTORY_LENGTH = 100;
export const SPARKLINE_COLORS = [
  "#FF9900",
  "#FFFFFF",
  "#B3B4B4",
  "#6B6B6B",
  "#28DE28",
  "#13F7F9",
  "#E6EE18",
  "#C41204",
  "#CA3CB8",
  "#0B1CFB",
];

const loadingIndicator = $(
  '<div class="wrapperloading"><div class="loading up" ></div><div class="loading down"></div></div>',
);

let EXPECTED_TYPE = {
  ANY: "any",
  ARRAY: "array",
  OBJECT: "object",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
};

export const useAppStore = defineStore("app", {
  state: () => ({
    allowEdit: true,
    isEditing: false,
    datasourceData: {},
    showLoadingIndicator: true,
    currentStyle: {},
    widgetPlugins: {},
    grid: null,
    dropdown: null,
    autocompleteOptions: [],
    selectedOptionIndex: undefined,
    currentValue: undefined,
  }),
  actions: {
    _isPotentialTypeMatch(value, expectsType) {
      if (
        value.constructor === Array ||
        (typeof value === "object" && !Array.isArray(value) && value !== null)
      ) {
        return true;
      }
      return this._isTypeMatch(value, expectsType);
    },

    _isTypeMatch(value, expectsType) {
      switch (expectsType) {
        case EXPECTED_TYPE.ANY:
          return true;
        case EXPECTED_TYPE.ARRAY:
          return value.constructor === Array;
        case EXPECTED_TYPE.OBJECT:
          return (
            typeof value === "object" && !Array.isArray(value) && value !== null
          );
        case EXPECTED_TYPE.STRING:
          return typeof value === "string";
        case EXPECTED_TYPE.NUMBER:
          return typeof value === "number";
        case EXPECTED_TYPE.BOOLEAN:
          return typeof value === "boolean";
      }
    },

    _checkCurrentValueType(element, expectsType) {
      $(element).parent().find(".validation-error").remove();
      if (!this._isTypeMatch($(element).val(), expectsType)) {
        $(element)
          .parent()
          .append(
            "<div class='validation-error'>" +
              "This field expects an expression that evaluates to type " +
              expectsType +
              ".</div>",
          );
      }
    },

    _resizeValueEditor(element) {
      let lineBreakCount = ($(element).val().match(/\n/g) || []).length;

      let newHeight = Math.min(200, 20 * (lineBreakCount + 1));

      $(element).css({ height: newHeight + "px" });
    },

    _autocompleteFromDatasource(inputString, datasources, expectsType) {
      let match = new RegExp('.*datasources\\["([^"]*)("\\])?(.*)$').exec(
        inputString,
      );

      let options = [];

      if (match) {
        // Editor value is: datasources["; List all datasources
        if (match[1] == "") {
          datasources.forEach(function (datasource) {
            options.push({
              value: datasource.name(),
              entity: undefined,
              precede_char: "",
              follow_char: '"]',
            });
          });
        }
        // Editor value is a partial match for a datasource; list matching datasources
        else if (match[1] != "" && match[2] === undefined) {
          let replacementString = match[1];

          datasources.forEach(function (datasource) {
            let dsName = datasource.name();

            if (
              dsName != replacementString &&
              dsName.indexOf(replacementString) == 0
            ) {
              options.push({
                value: dsName,
                entity: undefined,
                precede_char: "",
                follow_char: '"]',
              });
            }
          });
        }
        // Editor value matches a datasources; parse JSON in order to populate list
        else {
          // We already have a datasource selected; find it
          let datasource = datasources.find((datasource) => {
            return datasource.name() === match[1];
          });

          if (datasource !== undefined) {
            let dataPath = "data";
            let remainder = "";

            // Parse the partial JSON selectors
            if (match[2] !== undefined) {
              // Strip any incomplete field values, and store the remainder
              let remainderIndex = match[3].lastIndexOf("]") + 1;
              dataPath = dataPath + match[3].substring(0, remainderIndex);
              remainder = match[3].substring(remainderIndex, match[3].length);
              remainder = remainder.replace(/^[\[\"]*/, "");
              remainder = remainder.replace(/[\"\]]*$/, "");
            }

            // Get the data for the last complete JSON field
            let dataValue = datasource.getDataRepresentation(dataPath);
            this.currentValue = dataValue;

            // For arrays, list out the indices
            if (dataValue.constructor === Array) {
              for (let index = 0; index < dataValue.length; index++) {
                if (index.toString().indexOf(remainder) == 0) {
                  let value = dataValue[index];
                  if (this._isPotentialTypeMatch(value, expectsType)) {
                    options.push({
                      value: index,
                      entity: value,
                      precede_char: "[",
                      follow_char: "]",
                      preview: value.toString(),
                    });
                  }
                }
              }
            }
            // For objects, list out the keys
            else if (
              typeof dataValue === "object" &&
              !Array.isArray(dataValue) &&
              dataValue !== null
            ) {
              dataValue.forEach(function (value, name) {
                if (name.indexOf(remainder) == 0) {
                  if (this._isPotentialTypeMatch(value, expectsType)) {
                    options.push({
                      value: name,
                      entity: value,
                      precede_char: '["',
                      follow_char: '"]',
                    });
                  }
                }
              });
            }
            // For everything else, do nothing (no further selection possible)
            else {
              // no-op
            }
          }
        }
      }
      this.autocompleteOptions = options;
    },

    _renderAutocompleteDropdown(element, expectsType) {
      const dashboardStore = useDashboardStore();
      const { datasources } = storeToRefs(dashboardStore);
      let inputString = $(element)
        .val()
        .substring(0, $(element).getCaretPosition());

      // Weird issue where the textarea box was putting in ASCII (nbsp) for spaces.
      inputString = inputString.replace(String.fromCharCode(160), " ");

      this._autocompleteFromDatasource(
        inputString,
        datasources.value,
        expectsType,
      );

      if (this.autocompleteOptions.length > 0) {
        if (!this.dropdown) {
          this.dropdown = $(
            '<ul id="value-selector" class="value-dropdown"></ul>',
          )
            .insertAfter(element)
            .width($(element).outerWidth() - 2)
            .css("left", $(element).position().left)
            .css(
              "top",
              $(element).position().top + $(element).outerHeight() - 1,
            );
        }

        this.dropdown.empty();
        this.dropdown.scrollTop(0);

        let selected = true;
        this.selectedOptionIndex = 0;

        this.autocompleteOptions.forEach((option, index) => {
          let li = this._renderAutocompleteDropdownOption(
            element,
            inputString,
            option,
            index,
          );
          if (selected) {
            $(li).addClass("selected");
            selected = false;
          }
        });
      } else {
        this._checkCurrentValueType(element, expectsType);
        $(element).next("ul#value-selector").remove();
        this.dropdown = null;
        this.selectedOptionIndex = -1;
      }
    },

    _renderAutocompleteDropdownOption(
      element,
      inputString,
      option,
      currentIndex,
    ) {
      let optionLabel = option.value;
      if (option.preview) {
        optionLabel =
          optionLabel + "<span class='preview'>" + option.preview + "</span>";
      }
      let li = $("<li>" + optionLabel + "</li>")
        .appendTo(this.dropdown)
        .mouseenter(function () {
          $(this).trigger("freeboard-select");
        })
        .mousedown(function (event) {
          $(this).trigger("freeboard-insertValue");
          event.preventDefault();
        })
        .data("freeboard-optionIndex", currentIndex)
        .data("freeboard-optionValue", option.value)
        .bind("freeboard-insertValue", function () {
          let optionValue = option.value;
          optionValue = option.precede_char + optionValue + option.follow_char;

          let replacementIndex = inputString.lastIndexOf("]");
          if (replacementIndex != -1) {
            $(element).replaceTextAt(
              replacementIndex + 1,
              $(element).val().length,
              optionValue,
            );
          } else {
            $(element).insertAtCaret(optionValue);
          }

          this.currentValue = option.entity;
          $(element).triggerHandler("mouseup");
        })
        .bind("freeboard-select", function () {
          $(this).parent().find("li.selected").removeClass("selected");
          $(this).addClass("selected");
          this.selectedOptionIndex = $(this).data("freeboard-optionIndex");
        });
      return li;
    },
    _displayValidationError(settingName, errorMessage) {
      let errorElement = $('<div class="validation-error"></div>').html(
        errorMessage,
      );
      $("#setting-value-container-" + settingName).append(errorElement);
    },

    _removeSettingsRows() {
      if ($("#setting-row-instance-name").length) {
        $("#setting-row-instance-name").nextAll().remove();
      } else {
        $("#setting-row-plugin-types").nextAll().remove();
      }
    },
    _isNumerical(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    _appendCalculatedSettingRow(
      valueCell,
      newSettings,
      settingDef,
      currentValue,
      includeRemove,
    ) {
      let input = $("<textarea></textarea>");

      if (settingDef.multi_input) {
        input.change(function () {
          let arrayInput = [];
          $(valueCell)
            .find("textarea")
            .each(function () {
              let thisVal = $(this).val();
              if (thisVal) {
                arrayInput = arrayInput.concat(thisVal);
              }
            });
          newSettings.settings[settingDef.name] = arrayInput;
        });
      } else {
        input.change(function () {
          newSettings.settings[settingDef.name] = $(this).val();
        });
      }

      if (currentValue) {
        input.val(currentValue);
      }

      this.createValueEditor(input);

      let datasourceToolbox = $(
        '<ul class="board-toolbar datasource-input-suffix"></ul>',
      );
      let wrapperDiv = $('<div class="calculated-setting-row"></div>');
      wrapperDiv.append(input).append(datasourceToolbox);

      let datasourceTool = $(
        '<li><i class="icon-plus icon-white"></i><label>DATASOURCE</label></li>',
      ).mousedown(function (e) {
        e.preventDefault();
        $(input)
          .val("")
          .focus()
          .insertAtCaret('datasources["')
          .trigger("freeboard-eval");
      });
      datasourceToolbox.append(datasourceTool);

      let jsEditorTool = $(
        '<li><i class="icon-fullscreen icon-white"></i><label>.JS EDITOR</label></li>',
      ).mousedown((e) => {
        e.preventDefault();
        this.displayJSEditor(input.val(), function (result) {
          input.val(result);
          input.change();
        });
      });
      datasourceToolbox.append(jsEditorTool);

      if (includeRemove) {
        let removeButton = $(
          '<li class="remove-setting-row"><i class="icon-minus icon-white"></i><label></label></li>',
        ).mousedown(function (e) {
          e.preventDefault();
          wrapperDiv.remove();
          $(valueCell).find("textarea:first").change();
        });
        datasourceToolbox.prepend(removeButton);
      }

      $(valueCell).append(wrapperDiv);
    },
    createValueEditor(element, expectsType = EXPECTED_TYPE.ANY) {
      $(element)
        .addClass("calculated-value-input")
        .bind("keyup mouseup freeboard-eval", (event) => {
          // Ignore arrow keys and enter keys
          if (
            this.dropdown &&
            event.type == "keyup" &&
            (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13)
          ) {
            event.preventDefault();
            return;
          }
          this._renderAutocompleteDropdown(element, expectsType);
        })
        .focus(() => {
          $(element).css({ "z-index": 3001 });
          this._resizeValueEditor(element);
        })
        .focusout(() => {
          this._checkCurrentValueType(element, expectsType);
          $(element).css({
            height: "",
            "z-index": 3000,
          });
          $(element).next("ul#value-selector").remove();
          this.dropdown = null;
          this.selectedOptionIndex = -1;
        })
        .bind("keydown", (event) => {
          if (this.dropdown) {
            if (event.keyCode == 38 || event.keyCode == 40) {
              // Handle Arrow keys
              event.preventDefault();

              let optionItems = $(this.dropdown).find("li");

              if (event.keyCode == 38) {
                // Up Arrow
                this.selectedOptionIndex--;
              } else if (event.keyCode == 40) {
                // Down Arrow
                this.selectedOptionIndex++;
              }

              if (this.selectedOptionIndex < 0) {
                this.selectedOptionIndex = optionItems.size() - 1;
              } else if (this.selectedOptionIndex >= optionItems.size()) {
                this.selectedOptionIndex = 0;
              }

              let optionElement = $(optionItems).eq(this.selectedOptionIndex);

              optionElement.trigger("freeboard-select");
              $(this.dropdown).scrollTop($(optionElement).position().top);
            } else if (event.keyCode == 13) {
              // Handle enter key
              event.preventDefault();

              if (this.selectedOptionIndex != -1) {
                $(this.dropdown)
                  .find("li")
                  .eq(this.selectedOptionIndex)
                  .trigger("freeboard-insertValue");
              }
            }
          }
        });
    },
    getMaxDisplayableColumnCount() {
      const available_width = $("#board-content").width();
      return Math.floor(available_width / COLUMN_WIDTH);
    },

    addGridColumnLeft() {},
    addGridColumnRight() {},
    subGridColumnLeft() {},
    subGridColumnRight() {},
    displayJSEditor(value, callback) {
      let exampleText =
        '// Example: Convert temp from C to F and truncate to 2 decimal places.\n// return (datasources["MyDatasource"].sensor.tempInF * 1.8 + 32).toFixed(2);';

      // If value is empty, go ahead and suggest something
      if (!value) {
        value = exampleText;
      }

      let codeWindow = $('<div class="code-window"></div>');
      let codeMirrorWrapper = $('<div class="code-mirror-wrapper"></div>');
      let codeWindowFooter = $('<div class="code-window-footer"></div>');
      let codeWindowHeader = $(
        '<div class="code-window-header cm-s-ambiance">This javascript will be re-evaluated any time a datasource referenced here is updated, and the value you <code><span class="cm-keyword">return</span></code> will be displayed in the widget. You can assume this javascript is wrapped in a function of the form <code><span class="cm-keyword">function</span>(<span class="cm-def">datasources</span>)</code> where datasources is a collection of javascript objects (keyed by their name) corresponding to the most current data in a datasource.</div>',
      );

      codeWindow.append([
        codeWindowHeader,
        codeMirrorWrapper,
        codeWindowFooter,
      ]);

      $("body").append(codeWindow);

      let codeMirrorEditor = new EditorView({
        doc: value,
        theme: "ambiance",
        extensions: [basicSetup, javascript()],
        parent: codeMirrorWrapper.get(0),
      });

      let closeButton = $(
        '<span id="dialog-cancel" class="text-button">Close</span>',
      ).click(function () {
        if (callback) {
          let newValue = codeMirrorEditor.state.doc.toString();

          if (newValue === exampleText) {
            newValue = "";
          }

          callback(newValue);
          codeWindow.remove();
        }
      });

      codeWindowFooter.append(closeButton);
    },
    createPluginEditor(
      title,
      pluginTypes,
      currentTypeName,
      currentSettingsValues,
      settingsSavedCallback,
    ) {
      const newSettings = {
        type: currentTypeName,
        settings: currentSettingsValues,
      };

      function createSettingRow(name, displayName) {
        let tr = $(
          '<div id="setting-row-' + name + '" class="form-row"></div>',
        ).appendTo(form);

        tr.append(
          '<div class="form-label"><label class="control-label">' +
            displayName +
            "</label></div>",
        );
        return $(
          '<div id="setting-value-container-' +
            name +
            '" class="form-value"></div>',
        ).appendTo(tr);
      }

      let selectedType;
      let form = $("<div></div>");

      let pluginDescriptionElement = $(
        '<div id="plugin-description"></div>',
      ).hide();
      form.append(pluginDescriptionElement);

      const createSettingsFromDefinition = (
        settingsDefs,
        typeaheadSource,
        typeaheadDataSegment,
      ) => {
        settingsDefs.forEach((settingDef) => {
          // Set a default value if one doesn't exist
          if (
            settingDef.default_value !== undefined &&
            currentSettingsValues[settingDef.name] === undefined
          ) {
            currentSettingsValues[settingDef.name] = settingDef.default_value;
          }

          let displayName = settingDef.name;

          if (settingDef.display_name !== undefined) {
            displayName = settingDef.display_name;
          }

          let valueCell = createSettingRow(settingDef.name, displayName);

          switch (settingDef.type) {
            case "array": {
              let subTableDiv = $(
                '<div class="form-table-value-subtable"></div>',
              ).appendTo(valueCell);

              let subTable = $(
                '<table class="table table-condensed sub-table"></table>',
              ).appendTo(subTableDiv);
              let subTableHead = $("<thead></thead>").hide().appendTo(subTable);
              let subTableHeadRow = $("<tr></tr>").appendTo(subTableHead);
              let subTableBody = $("<tbody></tbody>").appendTo(subTable);

              let currentSubSettingValues = [];

              // Create our headers
              settingDef.settings.forEach((subSettingDef) => {
                let subsettingDisplayName = subSettingDef.name;

                if (subSettingDef.display_name !== undefined) {
                  subsettingDisplayName = subSettingDef.display_name;
                }

                $("<th>" + subsettingDisplayName + "</th>").appendTo(
                  subTableHeadRow,
                );
              });

              if (settingDef.name in currentSettingsValues) {
                currentSubSettingValues =
                  currentSettingsValues[settingDef.name];
              }

              function processHeaderVisibility() {
                if (newSettings.settings[settingDef.name].length > 0) {
                  subTableHead.show();
                } else {
                  subTableHead.hide();
                }
              }

              function createSubsettingRow(subsettingValue) {
                let subsettingRow = $("<tr></tr>").appendTo(subTableBody);

                let newSetting = {};

                if (!Array.isArray(newSettings.settings[settingDef.name])) {
                  newSettings.settings[settingDef.name] = [];
                }

                newSettings.settings[settingDef.name].push(newSetting);

                settingDef.settings.forEach((subSettingDef) => {
                  let subsettingCol = $("<td></td>").appendTo(subsettingRow);
                  let subsettingValueString = "";

                  if (subsettingValue[subSettingDef.name] !== undefined) {
                    subsettingValueString = subsettingValue[subSettingDef.name];
                  }

                  newSetting[subSettingDef.name] = subsettingValueString;

                  $('<input class="table-row-value" type="text">')
                    .appendTo(subsettingCol)
                    .val(subsettingValueString)
                    .change(function () {
                      newSetting[subSettingDef.name] = $(this).val();
                    });
                });

                subsettingRow.append(
                  $('<td class="table-row-operation"></td>').append(
                    $('<ul class="board-toolbar"></ul>').append(
                      $("<li></li>").append(
                        $('<i class="icon-trash icon-white"></i>').click(() => {
                          let subSettingIndex =
                            newSettings.settings[settingDef.name].indexOf(
                              newSetting,
                            );

                          if (subSettingIndex != -1) {
                            newSettings.settings[settingDef.name].splice(
                              subSettingIndex,
                              1,
                            );
                            subsettingRow.remove();
                            processHeaderVisibility();
                          }
                        }),
                      ),
                    ),
                  ),
                );

                subTableDiv.scrollTop(subTableDiv[0].scrollHeight);

                processHeaderVisibility();
              }

              $('<div class="table-operation text-button">ADD</div>')
                .appendTo(valueCell)
                .click(() => {
                  let newSubsettingValue = {};

                  settingDef.settings.forEach((subSettingDef) => {
                    newSubsettingValue[subSettingDef.name] = "";
                  });

                  createSubsettingRow(newSubsettingValue);
                });

              // Create our rows
              currentSubSettingValues.forEach(
                (currentSubSettingValue, subSettingIndex) => {
                  createSubsettingRow(currentSubSettingValue);
                },
              );

              break;
            }
            case "boolean": {
              newSettings.settings[settingDef.name] =
                currentSettingsValues[settingDef.name];

              let onOffSwitch = $(
                '<div class="onoffswitch"><label class="onoffswitch-label" for="' +
                  settingDef.name +
                  '-onoff"><div class="onoffswitch-inner"><span class="on">YES</span><span class="off">NO</span></div><div class="onoffswitch-switch"></div></label></div>',
              ).appendTo(valueCell);

              let input = $(
                '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="' +
                  settingDef.name +
                  '-onoff">',
              )
                .prependTo(onOffSwitch)
                .change(function () {
                  newSettings.settings[settingDef.name] = this.checked;
                });

              if (settingDef.name in currentSettingsValues) {
                input.prop("checked", currentSettingsValues[settingDef.name]);
              }

              break;
            }
            case "option": {
              let defaultValue = currentSettingsValues[settingDef.name];

              let input = $("<select></select>")
                .appendTo(
                  $('<div class="styled-select"></div>').appendTo(valueCell),
                )
                .change(function () {
                  newSettings.settings[settingDef.name] = $(this).val();
                });

              settingDef.options.forEach((option) => {
                let optionName;
                let optionValue;

                if (
                  typeof option === "object" &&
                  !Array.isArray(option) &&
                  option !== null
                ) {
                  optionName = option.name;
                  optionValue = option.value;
                } else {
                  optionName = option;
                }

                if (optionValue === undefined) {
                  optionValue = optionName;
                }

                if (defaultValue === undefined) {
                  defaultValue = optionValue;
                }

                $("<option></option>")
                  .text(optionName)
                  .attr("value", optionValue)
                  .appendTo(input);
              });

              newSettings.settings[settingDef.name] = defaultValue;

              if (settingDef.name in currentSettingsValues) {
                input.val(currentSettingsValues[settingDef.name]);
              }

              break;
            }
            default: {
              newSettings.settings[settingDef.name] =
                currentSettingsValues[settingDef.name];

              if (settingDef.type == "calculated") {
                if (settingDef.name in currentSettingsValues) {
                  let currentValue = currentSettingsValues[settingDef.name];
                  if (
                    settingDef.multi_input &&
                    currentValue.constructor === Array
                  ) {
                    let includeRemove = false;
                    for (let i = 0; i < currentValue.length; i++) {
                      this._appendCalculatedSettingRow(
                        valueCell,
                        newSettings,
                        settingDef,
                        currentValue[i],
                        includeRemove,
                      );
                      includeRemove = true;
                    }
                  } else {
                    this._appendCalculatedSettingRow(
                      valueCell,
                      newSettings,
                      settingDef,
                      currentValue,
                      false,
                    );
                  }
                } else {
                  this._appendCalculatedSettingRow(
                    valueCell,
                    newSettings,
                    settingDef,
                    null,
                    false,
                  );
                }

                if (settingDef.multi_input) {
                  let inputAdder = $(
                    '<ul class="board-toolbar"><li class="add-setting-row"><i class="icon-plus icon-white"></i><label>ADD</label></li></ul>',
                  ).mousedown((e) => {
                    e.preventDefault();
                    this._appendCalculatedSettingRow(
                      valueCell,
                      newSettings,
                      settingDef,
                      null,
                      true,
                    );
                  });
                  $(valueCell).siblings(".form-label").append(inputAdder);
                }
              } else {
                let input = $('<input type="text">')
                  .appendTo(valueCell)
                  .change(function () {
                    if (settingDef.type == "number") {
                      newSettings.settings[settingDef.name] = Number(
                        $(this).val(),
                      );
                    } else {
                      newSettings.settings[settingDef.name] = $(this).val();
                    }
                  });

                if (settingDef.name in currentSettingsValues) {
                  input.val(currentSettingsValues[settingDef.name]);
                }

                if (typeaheadSource && settingDef.typeahead_data_field) {
                  input.addClass(
                    "typeahead_data_field-" + settingDef.typeahead_data_field,
                  );
                }

                if (typeaheadSource && settingDef.typeahead_field) {
                  let typeaheadValues = [];

                  input.keyup(function (event) {
                    if (event.which >= 65 && event.which <= 91) {
                      input.trigger("change");
                    }
                  });

                  $(input).autocomplete({
                    source: typeaheadValues,
                    select: function (event, ui) {
                      input.val(ui.item.value);
                      input.trigger("change");
                    },
                  });

                  input.change((event) => {
                    let value = input.val();
                    let source = this.template()(typeaheadSource, {
                      input: value,
                    });
                    $.get(source, function (data) {
                      if (typeaheadDataSegment) {
                        data = data[typeaheadDataSegment];
                      }
                      data = data.filter(function (elm) {
                        return elm[settingDef.typeahead_field][0] == value[0];
                      });

                      typeaheadValues = data.map(function (elm) {
                        return elm[settingDef.typeahead_field];
                      });
                      $(input).autocomplete(
                        "option",
                        "source",
                        typeaheadValues,
                      );

                      if (data.length == 1) {
                        data = data[0];
                        //we found the one. let's use it to populate the other info
                        for (let field in data) {
                          if (data.hasOwnProperty(field)) {
                            let otherInput = $(
                              this.template()(
                                "input.typeahead_data_field-<%= field %>",
                                { field: field },
                              ),
                            );
                            if (otherInput) {
                              otherInput.val(data[field]);
                              if (otherInput.val() != input.val()) {
                                otherInput.trigger("change");
                              }
                            }
                          }
                        }
                      }
                    });
                  });
                }
              }

              break;
            }
          }

          if (settingDef.suffix !== undefined) {
            valueCell.append(
              $('<div class="input-suffix">' + settingDef.suffix + "</div>"),
            );
          }

          if (settingDef.description !== undefined) {
            valueCell.append(
              $(
                '<div class="setting-description">' +
                  settingDef.description +
                  "</div>",
              ),
            );
          }
        });
      };

      this.createDialogBox(form, title, "Save", "Cancel", () => {
        $(".validation-error").remove();

        // Loop through each setting and validate it
        for (let index = 0; index < selectedType.settings.length; index++) {
          let settingDef = selectedType.settings[index];

          if (
            settingDef.required &&
            (newSettings.settings[settingDef.name] === undefined ||
              newSettings.settings[settingDef.name] == "")
          ) {
            this._displayValidationError(settingDef.name, "This is required.");
            return true;
          } else if (
            settingDef.type == "integer" &&
            newSettings.settings[settingDef.name] % 1 !== 0
          ) {
            this._displayValidationError(
              settingDef.name,
              "Must be a whole number.",
            );
            return true;
          } else if (
            settingDef.type == "number" &&
            !this._isNumerical(newSettings.settings[settingDef.name])
          ) {
            this._displayValidationError(settingDef.name, "Must be a number.");
            return true;
          }
        }

        if (typeof settingsSavedCallback === "function") {
          settingsSavedCallback(newSettings);
        }
      });

      // Create our body
      let pluginTypeNames = Object.keys(pluginTypes);
      let typeSelect;

      if (pluginTypeNames.length > 1) {
        let typeRow = createSettingRow("plugin-types", "Type");
        typeSelect = $("<select></select>").appendTo(
          $('<div class="styled-select"></div>').appendTo(typeRow),
        );

        typeSelect.append(
          $("<option>Select a type...</option>").attr("value", "undefined"),
        );

        pluginTypeNames.forEach(function (pluginTypeName) {
          const pluginType = pluginTypes[pluginTypeName];
          typeSelect.append(
            $("<option></option>")
              .text(pluginType.display_name)
              .attr("value", pluginType.type_name),
          );
        });

        typeSelect.change(() => {
          newSettings.type = typeSelect.val();
          newSettings.settings = {};

          // Remove all the previous settings
          this._removeSettingsRows();

          selectedType = pluginTypes[typeSelect.val()];

          if (selectedType === undefined) {
            $("#setting-row-instance-name").hide();
            $("#dialog-ok").hide();
          } else {
            $("#setting-row-instance-name").show();

            if (
              selectedType.description &&
              selectedType.description.length > 0
            ) {
              pluginDescriptionElement.html(selectedType.description).show();
            } else {
              pluginDescriptionElement.hide();
            }

            $("#dialog-ok").show();
            createSettingsFromDefinition(
              selectedType.settings,
              selectedType.typeahead_source,
              selectedType.typeahead_data_segment,
            );
          }
        });
      } else if (pluginTypeNames.length == 1) {
        selectedType = pluginTypes[pluginTypeNames[0]];
        newSettings.type = selectedType.type_name;
        newSettings.settings = {};
        createSettingsFromDefinition(selectedType.settings);
      }

      if (typeSelect) {
        if (currentTypeName === undefined) {
          $("#setting-row-instance-name").hide();
          $("#dialog-ok").hide();
        } else {
          $("#dialog-ok").show();
          typeSelect.val(currentTypeName).trigger("change");
        }
      }
    },
    updatePluginEditor(operation, type, viewModel) {
      const dashboardStore = useDashboardStore();
      let types = {};
      let settings = {};
      let title = "";

      if (type == "datasource") {
        types = this.datasourceData;
        title = "Datasource";
      } else if (type == "widget") {
        types = this.widgetPlugins;
        title = "Widget";
      } else if (type == "pane") {
        title = "Pane";
      }

      if (operation == "delete") {
        let phraseElement = $(
          "<p>Are you sure you want to delete this " + title + "?</p>",
        );
        this.createDialogBox(
          phraseElement,
          "Confirm Delete",
          "Yes",
          "No",
          () => {
            if (type == "datasource") {
              dashboardStore.deleteDatasource(viewModel);
            } else if (type == "widget") {
              dashboardStore.deleteWidget(viewModel.pane, viewModel);
            } else if (type == "pane") {
              dashboardStore.deletePane(viewModel);
            }
          },
        );
      } else {
        let instanceType = undefined;

        if (type == "datasource") {
          if (operation == "add") {
            settings = {};
          } else {
            instanceType = viewModel.type;
            settings = viewModel.settings;
            settings.name = viewModel.name;
          }
        } else if (type == "widget") {
          if (operation == "add") {
            settings = {};
          } else {
            instanceType = viewModel.type;
            settings = viewModel.settings;
            settings.name = viewModel.name;
          }
        } else if (type == "pane") {
          settings = {};

          if (operation == "edit") {
            settings.title = viewModel.title;
            settings.colWidth = viewModel.colWidth;
          }

          types = {
            settings: {
              settings: [
                {
                  name: "title",
                  display_name: "Title",
                  type: "text",
                },
                {
                  name: "col_width",
                  display_name: "Columns",
                  type: "integer",
                  default_value: 1,
                  required: true,
                },
              ],
            },
          };
        }

        this.createPluginEditor(
          title,
          types,
          instanceType,
          settings,
          (newSettings) => {
            if (operation == "add") {
              if (type == "datasource") {
                let newViewModel = new Datasource();
                dashboardStore.addDatasource(newViewModel);

                newViewModel.name = newSettings.settings.name;
                delete newSettings.settings.name;

                newViewModel.settings = newSettings.settings;
                newViewModel.type = newSettings.type;
              } else if (type == "widget") {
                const dashboardStore = useDashboardStore();
                let newViewModel = new Widget();

                newViewModel.settings = newSettings.settings;
                newViewModel.type = newSettings.type;

                dashboardStore.addWidget(viewModel, newViewModel);
              }
            } else if (operation == "edit") {
              if (type == "pane") {
                viewModel.title = newSettings.settings.title;
                viewModel.colWidth = newSettings.settings.colWidth;
                // this.processResize(false);
              } else {
                if (type == "datasource") {
                  viewModel.name = newSettings.settings.name;
                  delete newSettings.settings.name;
                }
                viewModel.settings = newSettings.settings;
                viewModel.type = newSettings.type;
              }
            }
          },
        );
      }
    },
    showLoadingIndicator(show) {
      if (show) {
        loadingIndicator.fadeOut(0).appendTo("body").fadeIn(500);
      } else {
        loadingIndicator.fadeOut(500).remove();
      }
    },
    setAllowEdit(allowEdit) {
      this.allowEdit = allowEdit;
    },
    setIsEditing(isEditing, animate) {
      if (!this.allowEdit && isEditing) {
        return;
      }

      this.isEditing = isEditing;

      if (animate === undefined) {
        animate = true;
      }

      let animateLength = animate ? 250 : 0;
      let barHeight = $("#admin-bar").outerHeight();

      if (!isEditing) {
        $("#toggle-header-icon")
          .addClass("icon-wrench")
          .removeClass("icon-chevron-up");
        $(".gridster .gs_w").css({ cursor: "default" });
        $("#main-header").animate(
          { top: "-" + barHeight + "px" },
          animateLength,
        );
        $("#board-content").animate({ top: "20" }, animateLength);
        $("#main-header").data().shown = false;
        $(".sub-section").unbind();
      } else {
        $("#toggle-header-icon")
          .addClass("icon-chevron-up")
          .removeClass("icon-wrench");
        $(".gridster .gs_w").css({ cursor: "pointer" });
        $("#main-header").animate({ top: "0px" }, animateLength);
        $("#board-content").animate(
          { top: barHeight + 20 + "px" },
          animateLength,
        );
        $("#main-header").data().shown = true;
        this.attachWidgetEditIcons($(".sub-section"));
      }

      this.showPaneEditIcons(isEditing, animate);
    },
    showPaneEditIcons(show, animate) {
      if (animate === undefined) {
        animate = true;
      }

      let animateLength = animate ? 250 : 0;

      if (show) {
        $(".pane-tools").fadeIn(animateLength); //.css("display", "block").animate({opacity: 1.0}, animateLength);
        $("#column-tools").fadeIn(animateLength);
      } else {
        $(".pane-tools").fadeOut(animateLength); //.animate({opacity: 0.0}, animateLength).css("display", "none");//, function()
        $("#column-tools").fadeOut(animateLength);
      }
    },
    attachWidgetEditIcons(element) {
      $(element).hover(
        () => {
          this.showWidgetEditIcons(element, true);
        },
        () => {
          this.showWidgetEditIcons(element, false);
        },
      );
    },
    showWidgetEditIcons(element, show) {
      if (show) {
        $(element).find(".sub-section-tools").fadeIn(250);
      } else {
        $(element).find(".sub-section-tools").fadeOut(250);
      }
    },
    toggleAllowEdit() {
      this.allowEdit = !this.allowEdit;
    },
    toggleIsEditing() {
      this.isEditing = !this.isEditing;
    },
    loadDatasourcePlugin(plugin) {
      if (plugin.display_name === undefined) {
        plugin.display_name = plugin.type_name;
      }

      // Add a required setting called name to the beginning
      plugin.settings.unshift({
        name: "name",
        display_name: "Name",
        type: "text",
        required: true,
      });

      this.addPluginSource(plugin.source);
      this.datasourceData[plugin.type_name] = plugin;
      // TODO
      // theFreeboardModel._datasourceTypes.valueHasMutated();
    },
    addPluginSource(pluginSource) {
      if (pluginSource && self.plugins.indexOf(pluginSource) == -1) {
        this.plugins.push(pluginSource);
      }
    },
    createJSONDatasource() {
      let jsonDatasource = function (settings, updateCallback) {
        let self = this;
        let updateTimer = null;
        let currentSettings = settings;
        let errorStage = 0; // 0 = try standard request
        // 1 = try JSONP
        // 2 = try thingproxy.freeboard.io
        let lockErrorStage = false;

        function updateRefresh(refreshTime) {
          if (updateTimer) {
            clearInterval(updateTimer);
          }

          updateTimer = setInterval(function () {
            self.updateNow();
          }, refreshTime);
        }

        updateRefresh(currentSettings.refresh * 1000);

        this.updateNow = function () {
          if (
            (errorStage > 1 && !currentSettings.use_thingproxy) ||
            errorStage > 2
          ) {
            // We've tried everything, let's quit
            return; // TODO: Report an error
          }

          let requestURL = currentSettings.url;

          if (errorStage == 2 && currentSettings.use_thingproxy) {
            requestURL =
              (location.protocol == "https:" ? "https:" : "http:") +
              "//thingproxy.freeboard.io/fetch/" +
              encodeURI(currentSettings.url);
          }

          let body = currentSettings.body;

          // Can the body be converted to JSON?
          if (body) {
            try {
              body = JSON.parse(body);
            } catch (e) {}
          }

          $.ajax({
            url: requestURL,
            dataType: errorStage == 1 ? "JSONP" : "JSON",
            type: currentSettings.method || "GET",
            data: body,
            beforeSend: function (xhr) {
              try {
                currentSettings.headers.forEach(function (header) {
                  let name = header.name;
                  let value = header.value;

                  if (name !== undefined && value !== undefined) {
                    xhr.setRequestHeader(name, value);
                  }
                });
              } catch (e) {}
            },
            success: function (data) {
              lockErrorStage = true;
              updateCallback(data);
            },
            error: function (xhr, status, error) {
              if (!lockErrorStage) {
                // TODO: Figure out a way to intercept CORS errors only. The error message for CORS errors seems to be a standard 404.
                errorStage++;
                self.updateNow();
              }
            },
          });
        };

        this.onDispose = function () {
          clearInterval(updateTimer);
          updateTimer = null;
        };

        this.onSettingsChanged = function (newSettings) {
          lockErrorStage = false;
          errorStage = 0;

          currentSettings = newSettings;
          updateRefresh(currentSettings.refresh * 1000);
          self.updateNow();
        };
      };

      this.loadDatasourcePlugin({
        type_name: "JSON",
        settings: [
          {
            name: "url",
            display_name: "URL",
            type: "text",
          },
          {
            name: "use_thingproxy",
            display_name: "Try thingproxy",
            description:
              'A direct JSON connection will be tried first, if that fails, a JSONP connection will be tried. If that fails, you can use thingproxy, which can solve many connection problems to APIs. <a href="https://github.com/Freeboard/thingproxy" target="_blank">More information</a>.',
            type: "boolean",
            default_value: true,
          },
          {
            name: "refresh",
            display_name: "Refresh Every",
            type: "number",
            suffix: "seconds",
            default_value: 5,
          },
          {
            name: "method",
            display_name: "Method",
            type: "option",
            options: [
              {
                name: "GET",
                value: "GET",
              },
              {
                name: "POST",
                value: "POST",
              },
              {
                name: "PUT",
                value: "PUT",
              },
              {
                name: "DELETE",
                value: "DELETE",
              },
            ],
          },
          {
            name: "body",
            display_name: "Body",
            type: "text",
            description:
              "The body of the request. Normally only used if method is POST",
          },
          {
            name: "headers",
            display_name: "Headers",
            type: "array",
            settings: [
              {
                name: "name",
                display_name: "Name",
                type: "text",
              },
              {
                name: "value",
                display_name: "Value",
                type: "text",
              },
            ],
          },
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
          newInstanceCallback(new jsonDatasource(settings, updateCallback));
        },
      });
    },
    createOpenWeatherMapDatasource() {
      let openWeatherMapDatasource = function (settings, updateCallback) {
        let self = this;
        let updateTimer = null;
        let currentSettings = settings;

        function updateRefresh(refreshTime) {
          if (updateTimer) {
            clearInterval(updateTimer);
          }

          updateTimer = setInterval(function () {
            self.updateNow();
          }, refreshTime);
        }

        function toTitleCase(str) {
          return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        }

        updateRefresh(currentSettings.refresh * 1000);

        this.updateNow = function () {
          $.ajax({
            url:
              "http://api.openweathermap.org/data/2.5/weather?APPID=" +
              currentSettings.api_key +
              "&q=" +
              encodeURIComponent(currentSettings.location) +
              "&units=" +
              currentSettings.units,
            dataType: "JSONP",
            success: function (data) {
              // Rejigger our data into something easier to understand
              let newData = {
                place_name: data.name,
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                conditions: toTitleCase(data.weather[0].description),
                current_temp: data.main.temp,
                high_temp: data.main.temp_max,
                low_temp: data.main.temp_min,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                wind_direction: data.wind.deg,
              };

              updateCallback(newData);
            },
            error: function (xhr, status, error) {},
          });
        };

        this.onDispose = function () {
          clearInterval(updateTimer);
          updateTimer = null;
        };

        this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;
          self.updateNow();
          updateRefresh(currentSettings.refresh * 1000);
        };
      };

      this.loadDatasourcePlugin({
        type_name: "openweathermap",
        display_name: "Open Weather Map API",
        settings: [
          {
            name: "api_key",
            display_name: "API Key",
            type: "text",
            description: "Your personal API Key from Open Weather Map",
          },
          {
            name: "location",
            display_name: "Location",
            type: "text",
            description: "Example: London, UK",
          },
          {
            name: "units",
            display_name: "Units",
            type: "option",
            default: "imperial",
            options: [
              {
                name: "Imperial",
                value: "imperial",
              },
              {
                name: "Metric",
                value: "metric",
              },
            ],
          },
          {
            name: "refresh",
            display_name: "Refresh Every",
            type: "number",
            suffix: "seconds",
            default_value: 5,
          },
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
          newInstanceCallback(
            new openWeatherMapDatasource(settings, updateCallback),
          );
        },
      });
    },
    createDweetioDatasource() {
      let dweetioDatasource = function (settings, updateCallback) {
        let self = this;
        let currentSettings = settings;

        function onNewDweet(dweet) {
          updateCallback(dweet);
        }

        this.updateNow = function () {
          dweetio.get_latest_dweet_for(
            currentSettings.thing_id,
            function (err, dweet) {
              if (err) {
                //onNewDweet({});
              } else {
                onNewDweet(dweet[0].content);
              }
            },
          );
        };

        this.onDispose = function () {};

        this.onSettingsChanged = function (newSettings) {
          dweetio.stop_listening_for(currentSettings.thing_id);

          currentSettings = newSettings;

          dweetio.listen_for(currentSettings.thing_id, function (dweet) {
            onNewDweet(dweet.content);
          });
        };

        self.onSettingsChanged(settings);
      };

      this.loadDatasourcePlugin({
        type_name: "dweet_io",
        display_name: "Dweet.io",
        external_scripts: ["http://dweet.io/client/dweet.io.min.js"],
        settings: [
          {
            name: "thing_id",
            display_name: "Thing Name",
            description: "Example: salty-dog-1",
            type: "text",
          },
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
          newInstanceCallback(new dweetioDatasource(settings, updateCallback));
        },
      });
    },
    createPlaybackDatasource() {
      let playbackDatasource = function (settings, updateCallback) {
        let self = this;
        let currentSettings = settings;
        let currentDataset = [];
        let currentIndex = 0;
        let currentTimeout;

        function moveNext() {
          if (currentDataset.length > 0) {
            if (currentIndex < currentDataset.length) {
              updateCallback(currentDataset[currentIndex]);
              currentIndex++;
            }

            if (currentIndex >= currentDataset.length && currentSettings.loop) {
              currentIndex = 0;
            }

            if (currentIndex < currentDataset.length) {
              currentTimeout = setTimeout(
                moveNext,
                currentSettings.refresh * 1000,
              );
            }
          } else {
            updateCallback({});
          }
        }

        function stopTimeout() {
          currentDataset = [];
          currentIndex = 0;

          if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
          }
        }

        this.updateNow = function () {
          stopTimeout();

          $.ajax({
            url: currentSettings.datafile,
            dataType: currentSettings.is_jsonp ? "JSONP" : "JSON",
            success: function (data) {
              if (data.constructor === Array) {
                currentDataset = data;
              } else {
                currentDataset = [];
              }

              currentIndex = 0;

              moveNext();
            },
            error: function (xhr, status, error) {},
          });
        };

        this.onDispose = function () {
          stopTimeout();
        };

        this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;
          self.updateNow();
        };
      };

      this.loadDatasourcePlugin({
        type_name: "playback",
        display_name: "Playback",
        settings: [
          {
            name: "datafile",
            display_name: "Data File URL",
            type: "text",
            description: "A link to a JSON array of data.",
          },
          {
            name: "is_jsonp",
            display_name: "Is JSONP",
            type: "boolean",
          },
          {
            name: "loop",
            display_name: "Loop",
            type: "boolean",
            description: "Rewind and loop when finished",
          },
          {
            name: "refresh",
            display_name: "Refresh Every",
            type: "number",
            suffix: "seconds",
            default_value: 5,
          },
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
          newInstanceCallback(new playbackDatasource(settings, updateCallback));
        },
      });
    },
    createClockDatasource() {
      let clockDatasource = function (settings, updateCallback) {
        let self = this;
        let currentSettings = settings;
        let timer;

        function stopTimer() {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        }

        function updateTimer() {
          stopTimer();
          timer = setInterval(self.updateNow, currentSettings.refresh * 1000);
        }

        this.updateNow = function () {
          let date = new Date();

          let data = {
            numeric_value: date.getTime(),
            full_string_value: date.toLocaleString(),
            date_string_value: date.toLocaleDateString(),
            time_string_value: date.toLocaleTimeString(),
            date_object: date,
          };

          updateCallback(data);
        };

        this.onDispose = function () {
          stopTimer();
        };

        this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;
          updateTimer();
        };

        updateTimer();
      };

      this.loadDatasourcePlugin({
        type_name: "clock",
        display_name: "Clock",
        settings: [
          {
            name: "refresh",
            display_name: "Refresh Every",
            type: "number",
            suffix: "seconds",
            default_value: 1,
          },
        ],
        newInstance: function (settings, newInstanceCallback, updateCallback) {
          newInstanceCallback(new clockDatasource(settings, updateCallback));
        },
      });
    },
    createMeshbluDatasource() {
      // ### Datasource Implementation
      //
      // -------------------
      // Here we implement the actual datasource plugin. We pass in the settings and updateCallback.
      let meshbluSource = function (settings, updateCallback) {
        // Always a good idea...
        let self = this;

        // Good idea to create a variable to hold on to our settings, because they might change in the future. See below.
        let currentSettings = settings;

        /* This is some function where I'll get my data from somewhere */

        function getData() {
          let conn = skynet.createConnection({
            uuid: currentSettings.uuid,
            token: currentSettings.token,
            server: currentSettings.server,
            port: currentSettings.port,
          });

          conn.on("ready", function (data) {
            conn.on("message", function (message) {
              let newData = message;
              updateCallback(newData);
            });
          });
        }

        // **onSettingsChanged(newSettings)** (required) : A public function we must implement that will be called when a user makes a change to the settings.
        self.onSettingsChanged = function (newSettings) {
          // Here we update our current settings with the variable that is passed in.
          currentSettings = newSettings;
        };

        // **updateNow()** (required) : A public function we must implement that will be called when the user wants to manually refresh the datasource
        self.updateNow = function () {
          // Most likely I'll just call getData() here.
          getData();
        };

        // **onDispose()** (required) : A public function we must implement that will be called when this instance of this plugin is no longer needed. Do anything you need to cleanup after yourself here.
        self.onDispose = function () {
          //conn.close();
        };

        // Here we call createRefreshTimer with our current settings, to kick things off, initially. Notice how we make use of one of the user defined settings that we setup earlier.
        //	createRefreshTimer(currentSettings.refresh_time);
      };

      this.loadDatasourcePlugin({
        // **type_name** (required) : A unique name for this plugin. This name should be as unique as possible to avoid collisions with other plugins, and should follow naming conventions for javascript variable and function declarations.
        type_name: "meshblu",
        // **display_name** : The pretty name that will be used for display purposes for this plugin. If the name is not defined, type_name will be used instead.
        display_name: "Octoblu",
        // **description** : A description of the plugin. This description will be displayed when the plugin is selected or within search results (in the future). The description may contain HTML if needed.
        description: "app.octoblu.com",
        // **external_scripts** : Any external scripts that should be loaded before the plugin instance is created.
        external_scripts: ["http://meshblu.octoblu.com/js/meshblu.js"],
        // **settings** : An array of settings that will be displayed for this plugin when the user adds it.
        settings: [
          {
            // **name** (required) : The name of the setting. This value will be used in your code to retrieve the value specified by the user. This should follow naming conventions for javascript variable and function declarations.
            name: "uuid",
            // **display_name** : The pretty name that will be shown to the user when they adjust this setting.
            display_name: "UUID",
            // **type** (required) : The type of input expected for this setting. "text" will display a single text box input. Examples of other types will follow in this documentation.
            type: "text",
            // **default_value** : A default value for this setting.
            default_value: "device uuid",
            // **description** : Text that will be displayed below the setting to give the user any extra information.
            description: "your device UUID",
            // **required** : Set to true if this setting is required for the datasource to be created.
            required: true,
          },
          {
            // **name** (required) : The name of the setting. This value will be used in your code to retrieve the value specified by the user. This should follow naming conventions for javascript variable and function declarations.
            name: "token",
            // **display_name** : The pretty name that will be shown to the user when they adjust this setting.
            display_name: "Token",
            // **type** (required) : The type of input expected for this setting. "text" will display a single text box input. Examples of other types will follow in this documentation.
            type: "text",
            // **default_value** : A default value for this setting.
            default_value: "device token",
            // **description** : Text that will be displayed below the setting to give the user any extra information.
            description: "your device TOKEN",
            // **required** : Set to true if this setting is required for the datasource to be created.
            required: true,
          },
          {
            // **name** (required) : The name of the setting. This value will be used in your code to retrieve the value specified by the user. This should follow naming conventions for javascript variable and function declarations.
            name: "server",
            // **display_name** : The pretty name that will be shown to the user when they adjust this setting.
            display_name: "Server",
            // **type** (required) : The type of input expected for this setting. "text" will display a single text box input. Examples of other types will follow in this documentation.
            type: "text",
            // **default_value** : A default value for this setting.
            default_value: "meshblu.octoblu.com",
            // **description** : Text that will be displayed below the setting to give the user any extra information.
            description: "your server",
            // **required** : Set to true if this setting is required for the datasource to be created.
            required: true,
          },
          {
            // **name** (required) : The name of the setting. This value will be used in your code to retrieve the value specified by the user. This should follow naming conventions for javascript variable and function declarations.
            name: "port",
            // **display_name** : The pretty name that will be shown to the user when they adjust this setting.
            display_name: "Port",
            // **type** (required) : The type of input expected for this setting. "text" will display a single text box input. Examples of other types will follow in this documentation.
            type: "number",
            // **default_value** : A default value for this setting.
            default_value: 80,
            // **description** : Text that will be displayed below the setting to give the user any extra information.
            description: "server port",
            // **required** : Set to true if this setting is required for the datasource to be created.
            required: true,
          },
        ],
        // **newInstance(settings, newInstanceCallback, updateCallback)** (required) : A function that will be called when a new instance of this plugin is requested.
        // * **settings** : A javascript object with the initial settings set by the user. The names of the properties in the object will correspond to the setting names defined above.
        // * **newInstanceCallback** : A callback function that you'll call when the new instance of the plugin is ready. This function expects a single argument, which is the new instance of your plugin object.
        // * **updateCallback** : A callback function that you'll call if and when your datasource has an update for freeboard to recalculate. This function expects a single parameter which is a javascript object with the new, updated data. You should hold on to this reference and call it when needed.
        newInstance: function (settings, newInstanceCallback, updateCallback) {
          // myDatasourcePlugin is defined below.
          newInstanceCallback(new meshbluSource(settings, updateCallback));
        },
      });
    },

    loadDashboard(dashboardData, callback) {
      const dashboardStore = useDashboardStore();
      this.showLoadingIndicator = true;
      dashboardStore.deserialize(dashboardData, () => {
        this.showLoadingIndicator = false;

        if (typeof callback === "function") {
          callback();
        }
        // TODO
        // freeboard.emit("dashboard_loaded");
      });
    },

    loadDashboardFromLocalFile() {
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        let input = document.createElement("input");
        input.type = "file";
        $(input).on("change", (event) => {
          let files = event.target.files;

          if (files && files.length > 0) {
            let file = files[0];
            let reader = new FileReader();

            reader.addEventListener("load", (fileReaderEvent) => {
              let textFile = fileReaderEvent.target;
              let jsonObject = JSON.parse(textFile.result);

              this.loadDashboard(jsonObject);
              this.isEditing = true;
            });

            reader.readAsText(file);
          }
        });
        $(input).trigger("click");
      } else {
        alert("Unable to load a file in this browser.");
      }
    },

    saveDashboardClicked(event) {
      let target = $(event.currentTarget);
      let siblingsShown = target.data("siblings-shown") || false;
      if (!siblingsShown) {
        $(event.currentTarget).siblings("label").fadeIn("slow");
      } else {
        $(event.currentTarget).siblings("label").fadeOut("slow");
      }
      target.data("siblings-shown", !siblingsShown);
    },

    saveDashboard(pretty) {
      const dashboardStore = useDashboardStore();
      let contentType = "application/octet-stream";
      let a = document.createElement("a");
      let blob;
      if (pretty) {
        blob = new Blob([JSON.stringify(dashboardStore.serialize(), null, 2)], {
          type: contentType,
        });
      } else {
        blob = new Blob([JSON.stringify(dashboardStore.serialize())], {
          type: contentType,
        });
      }
      document.body.appendChild(a);
      a.href = window.URL.createObjectURL(blob);
      a.download = "dashboard.json";
      a.target = "_self";
      a.click();
    },
    getDatasourceSettings(datasourceName) {
      let datasources = this.datasources;

      // Find the datasource with the name specified
      let datasource = datasources.find(function (datasourceModel) {
        return datasourceModel.name.value === datasourceName;
      });

      if (datasource) {
        return datasource.settings();
      } else {
        return null;
      }
    },
    setDatasourceSettings(datasourceName, settings) {
      let datasources = this.datasources;

      // Find the datasource with the name specified
      let datasource = datasources.find(function (datasourceModel) {
        return datasourceModel.name.value === datasourceName;
      });

      if (!datasource) {
        return;
      }

      let combinedSettings = Object.assign(settings, datasource.settings);
      datasource.settings(combinedSettings);
    },
    getStyleString(name) {
      let returnString = "";

      this.currentStyle[name]?.forEach(function (value, name) {
        returnString = returnString + name + ":" + value + ";";
      });

      return returnString;
    },

    getStyleObject(name) {
      return this.currentStyle[name];
    },
    addStyle(selector, rules) {
      let styleString = selector + "{" + rules + "}";

      let styleElement = $("style#fb-styles");

      if (styleElement.length == 0) {
        styleElement = $('<style id="fb-styles" type="text/css"></style>');
        $("head").append(styleElement);
      }

      if (styleElement[0].styleSheet) {
        styleElement[0].styleSheet.cssText += styleString;
      } else {
        styleElement.text(styleElement.text() + styleString);
      }
    },
    loadWidgetPlugin(plugin) {
      if (plugin.display_name === undefined) {
        plugin.display_name = plugin.type_name;
      }

      this.addPluginSource(plugin.source);
      this.widgetPlugins[plugin.type_name] = plugin;
      // appStore._widgetTypes.valueHasMutated();
    },
    easeTransitionText(newValue, textElement, duration) {
      let currentValue = $(textElement).text();

      if (currentValue == newValue) return;

      if ($.isNumeric(newValue) && $.isNumeric(currentValue)) {
        let numParts = newValue.toString().split(".");
        let endingPrecision = 0;

        if (numParts.length > 1) {
          endingPrecision = numParts[1].length;
        }

        numParts = currentValue.toString().split(".");
        let startingPrecision = 0;

        if (numParts.length > 1) {
          startingPrecision = numParts[1].length;
        }

        $({
          transitionValue: Number(currentValue),
          precisionValue: startingPrecision,
        }).animate(
          {
            transitionValue: Number(newValue),
            precisionValue: endingPrecision,
          },
          {
            duration: duration,
            step: function () {
              $(textElement).text(
                this.transitionValue.toFixed(this.precisionValue),
              );
            },
            done: function () {
              $(textElement).text(newValue);
            },
          },
        );
      } else {
        $(textElement).text(newValue);
      }
    },
    addSparklineLegend(element, legend) {
      let legendElt = $("<div class='sparkline-legend'></div>");
      for (let i = 0; i < legend.length; i++) {
        let color = SPARKLINE_COLORS[i % SPARKLINE_COLORS.length];
        let label = legend[i];
        legendElt.append(
          "<div class='sparkline-legend-value'><span style='color:" +
            color +
            "'>&#9679;</span>" +
            label +
            "</div>",
        );
      }
      element.empty().append(legendElt);

      this.addStyle(".sparkline-legend", "margin:5px;");
      this.addStyle(
        ".sparkline-legend-value",
        "color:white; font:10px arial,san serif; float:left; overflow:hidden; width:50%;",
      );
      this.addStyle(
        ".sparkline-legend-value span",
        "font-weight:bold; padding-right:5px;",
      );
    },

    addValueToSparkline(element, value, legend) {
      let values = $(element).data().values;
      let valueMin = $(element).data().valueMin;
      let valueMax = $(element).data().valueMax;
      if (!values) {
        values = [];
        valueMin = undefined;
        valueMax = undefined;
      }

      let collateValues = function (val, plotIndex) {
        if (!values[plotIndex]) {
          values[plotIndex] = [];
        }
        if (values[plotIndex].length >= SPARKLINE_HISTORY_LENGTH) {
          values[plotIndex].shift();
        }
        values[plotIndex].push(Number(val));

        if (valueMin === undefined || val < valueMin) {
          valueMin = val;
        }
        if (valueMax === undefined || val > valueMax) {
          valueMax = val;
        }
      };

      if (value.constructor === Array) {
        value.forEach(collateValues);
      } else {
        collateValues(value, 0);
      }
      $(element).data().values = values;
      $(element).data().valueMin = valueMin;
      $(element).data().valueMax = valueMax;

      let tooltipHTML = '<span style="color: {{color}}">&#9679;</span> {{y}}';

      let composite = false;
      values.forEach(function (valueArray, valueIndex) {
        $(element).sparkline(valueArray, {
          type: "line",
          composite: composite,
          height: "100%",
          width: "100%",
          fillColor: false,
          lineColor: SPARKLINE_COLORS[valueIndex % SPARKLINE_COLORS.length],
          lineWidth: 2,
          spotRadius: 3,
          spotColor: false,
          minSpotColor: "#78AB49",
          maxSpotColor: "#78AB49",
          highlightSpotColor: "#9D3926",
          highlightLineColor: "#9D3926",
          chartRangeMin: valueMin,
          chartRangeMax: valueMax,
          tooltipFormat:
            legend && legend[valueIndex]
              ? tooltipHTML + " (" + legend[valueIndex] + ")"
              : tooltipHTML,
        });
        composite = true;
      });
    },
    createTextWidget() {
      let valueStyle = this.getStyleString("values");

      this.addStyle(".widget-big-text", valueStyle + "font-size:75px;");

      this.addStyle(
        ".tw-display",
        "width: 100%; height:100%; display:table; table-layout:fixed;",
      );

      this.addStyle(".tw-tr", "display:table-row;");

      this.addStyle(".tw-tg", "display:table-row-group;");

      this.addStyle(".tw-tc", "display:table-caption;");

      this.addStyle(".tw-td", "display:table-cell;");

      this.addStyle(
        ".tw-value",
        valueStyle +
          "overflow: hidden;" +
          "display: inline-block;" +
          "text-overflow: ellipsis;",
      );

      this.addStyle(
        ".tw-unit",
        "display: inline-block;" +
          "padding-left: 10px;" +
          "padding-bottom: 1.1em;" +
          "vertical-align: bottom;",
      );

      this.addStyle(
        ".tw-value-wrapper",
        "position: relative;" + "vertical-align: middle;" + "height:100%;",
      );

      this.addStyle(".tw-sparkline", "height:20px;");

      let textWidget = function (settings) {
        let currentSettings = settings;
        let displayElement = $('<div class="tw-display"></div>');
        let titleElement = $('<h2 class="section-title tw-title tw-td"></h2>');
        let valueElement = $('<div class="tw-value"></div>');
        let unitsElement = $('<div class="tw-unit"></div>');
        let sparklineElement = $('<div class="tw-sparkline tw-td"></div>');

        function updateValueSizing() {
          if (
            currentSettings.units !== undefined &&
            currentSettings.units != ""
          ) {
            // If we're displaying our units
            valueElement.css(
              "max-width",
              displayElement.innerWidth() -
                unitsElement.outerWidth(true) +
                "px",
            );
          } else {
            valueElement.css("max-width", "100%");
          }
        }

        this.render = function (element) {
          $(element).empty();

          $(displayElement)
            .append($('<div class="tw-tr"></div>').append(titleElement))
            .append(
              $('<div class="tw-tr"></div>').append(
                $('<div class="tw-value-wrapper tw-td"></div>')
                  .append(valueElement)
                  .append(unitsElement),
              ),
            )
            .append($('<div class="tw-tr"></div>').append(sparklineElement));

          $(element).append(displayElement);

          updateValueSizing();
        };

        this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;

          let shouldDisplayTitle =
            newSettings.title !== undefined && newSettings.title != "";
          let shouldDisplayUnits =
            newSettings.units !== undefined && newSettings.units != "";

          if (newSettings.sparkline) {
            sparklineElement.attr("style", null);
          } else {
            delete sparklineElement.data().values;
            sparklineElement.empty();
            sparklineElement.hide();
          }

          if (shouldDisplayTitle) {
            titleElement.html(
              newSettings.title === undefined ? "" : newSettings.title,
            );
            titleElement.attr("style", null);
          } else {
            titleElement.empty();
            titleElement.hide();
          }

          if (shouldDisplayUnits) {
            unitsElement.html(
              newSettings.units === undefined ? "" : newSettings.units,
            );
            unitsElement.attr("style", null);
          } else {
            unitsElement.empty();
            unitsElement.hide();
          }

          let valueFontSize = 30;

          if (newSettings.size == "big") {
            valueFontSize = 75;

            if (newSettings.sparkline) {
              valueFontSize = 60;
            }
          }

          valueElement.css({ "font-size": valueFontSize + "px" });

          updateValueSizing();
        };

        this.onSizeChanged = function () {
          updateValueSizing();
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
          if (settingName == "value") {
            if (currentSettings.animate) {
              easeTransitionText(newValue, valueElement, 500);
            } else {
              valueElement.text(newValue);
            }

            if (currentSettings.sparkline) {
              addValueToSparkline(sparklineElement, newValue);
            }
          }
        };

        this.onDispose = function () {};

        this.getHeight = function () {
          if (currentSettings.size == "big" || currentSettings.sparkline) {
            return 2;
          } else {
            return 1;
          }
        };

        this.onSettingsChanged(settings);
      };

      this.loadWidgetPlugin({
        type_name: "text_widget",
        display_name: "Text",
        settings: [
          {
            name: "title",
            display_name: "Title",
            type: "text",
          },
          {
            name: "size",
            display_name: "Size",
            type: "option",
            options: [
              {
                name: "Regular",
                value: "regular",
              },
              {
                name: "Big",
                value: "big",
              },
            ],
          },
          {
            name: "value",
            display_name: "Value",
            type: "calculated",
          },
          {
            name: "sparkline",
            display_name: "Include Sparkline",
            type: "boolean",
          },
          {
            name: "animate",
            display_name: "Animate Value Changes",
            type: "boolean",
            default_value: true,
          },
          {
            name: "units",
            display_name: "Units",
            type: "text",
          },
        ],
        newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new textWidget(settings));
        },
      });
    },
    createGaugeWidget() {
      let gaugeID = 0;
      this.addStyle(".gauge-widget-wrapper", "width: 100%;text-align: center;");
      this.addStyle(
        ".gauge-widget",
        "width:200px;height:160px;display:inline-block;",
      );

      let gaugeWidget = function (settings) {
        let thisGaugeID = "gauge-" + gaugeID++;
        let titleElement = $('<h2 class="section-title"></h2>');
        let gaugeElement = $(
          '<div class="gauge-widget" id="' + thisGaugeID + '"></div>',
        );

        let gaugeObject;
        let rendered = false;

        let currentSettings = settings;

        function createGauge() {
          if (!rendered) {
            return;
          }

          gaugeElement.empty();

          gaugeObject = new JustGage({
            id: thisGaugeID,
            value:
              currentSettings.min_value === undefined
                ? 0
                : currentSettings.min_value,
            min:
              currentSettings.min_value === undefined
                ? 0
                : currentSettings.min_value,
            max:
              currentSettings.max_value === undefined
                ? 0
                : currentSettings.max_value,
            label: currentSettings.units,
            showInnerShadow: false,
            valueFontColor: "#d3d4d4",
          });
        }

        this.render = function (element) {
          rendered = true;
          $(element)
            .append(titleElement)
            .append(
              $('<div class="gauge-widget-wrapper"></div>').append(
                gaugeElement,
              ),
            );
          createGauge();
        };

        this.onSettingsChanged = function (newSettings) {
          if (
            newSettings.min_value != currentSettings.min_value ||
            newSettings.max_value != currentSettings.max_value ||
            newSettings.units != currentSettings.units
          ) {
            currentSettings = newSettings;
            createGauge();
          } else {
            currentSettings = newSettings;
          }

          titleElement.html(newSettings.title);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
          if (gaugeObject !== undefined) {
            gaugeObject.refresh(Number(newValue));
          }
        };

        this.onDispose = function () {};

        this.getHeight = function () {
          return 3;
        };

        this.onSettingsChanged(settings);
      };

      this.loadWidgetPlugin({
        type_name: "gauge",
        display_name: "Gauge",
        external_scripts: [
          "plugins/thirdparty/raphael.2.1.0.min.js",
          "plugins/thirdparty/justgage.1.0.1.js",
        ],
        settings: [
          {
            name: "title",
            display_name: "Title",
            type: "text",
          },
          {
            name: "value",
            display_name: "Value",
            type: "calculated",
          },
          {
            name: "units",
            display_name: "Units",
            type: "text",
          },
          {
            name: "min_value",
            display_name: "Minimum",
            type: "text",
            default_value: 0,
          },
          {
            name: "max_value",
            display_name: "Maximum",
            type: "text",
            default_value: 100,
          },
        ],
        newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new gaugeWidget(settings));
        },
      });
    },
    createSparklineWidget() {
      this.addStyle(".sparkline", "width:100%;height: 75px;");
      let sparklineWidget = function (settings) {
        let titleElement = $('<h2 class="section-title"></h2>');
        let sparklineElement = $('<div class="sparkline"></div>');
        let sparklineLegend = $("<div></div>");
        let currentSettings = settings;

        this.render = function (element) {
          $(element)
            .append(titleElement)
            .append(sparklineElement)
            .append(sparklineLegend);
        };

        this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;
          titleElement.html(
            newSettings.title === undefined ? "" : newSettings.title,
          );

          if (newSettings.include_legend) {
            this.addSparklineLegend(
              sparklineLegend,
              newSettings.legend.split(","),
            );
          }
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
          if (currentSettings.legend) {
            this.addValueToSparkline(
              sparklineElement,
              newValue,
              currentSettings.legend.split(","),
            );
          } else {
            this.addValueToSparkline(sparklineElement, newValue);
          }
        };

        this.onDispose = function () {};

        this.getHeight = function () {
          let legendHeight = 0;
          if (currentSettings.include_legend && currentSettings.legend) {
            let legendLength = currentSettings.legend.split(",").length;
            if (legendLength > 4) {
              legendHeight = Math.floor((legendLength - 1) / 4) * 0.5;
            } else if (legendLength) {
              legendHeight = 0.5;
            }
          }
          return 2 + legendHeight;
        };

        this.onSettingsChanged(settings);
      };

      this.loadWidgetPlugin({
        type_name: "sparkline",
        display_name: "Sparkline",
        external_scripts: ["plugins/thirdparty/jquery.sparkline.min.js"],
        settings: [
          {
            name: "title",
            display_name: "Title",
            type: "text",
          },
          {
            name: "value",
            display_name: "Value",
            type: "calculated",
            multi_input: "true",
          },
          {
            name: "include_legend",
            display_name: "Include Legend",
            type: "boolean",
          },
          {
            name: "legend",
            display_name: "Legend",
            type: "text",
            description: "Comma-separated for multiple sparklines",
          },
        ],
        newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new sparklineWidget(settings));
        },
      });
    },
    createPointerWidget() {
      this.addStyle(
        "div.pointer-value",
        "position:absolute;height:95px;margin: auto;top: 0px;bottom: 0px;width: 100%;text-align:center;",
      );
      let pointerWidget = function (settings) {
        let self = this;
        let paper;
        let strokeWidth = 3;
        let triangle;
        let width, height;
        let currentValue = 0;
        let valueDiv = $('<div class="widget-big-text"></div>');
        let unitsDiv = $("<div></div>");

        function polygonPath(points) {
          if (!points || points.length < 2) return [];
          let path = []; //will use path object type
          path.push(["m", points[0], points[1]]);
          for (let i = 2; i < points.length; i += 2) {
            path.push(["l", points[i], points[i + 1]]);
          }
          path.push(["z"]);
          return path;
        }

        this.render = function (element) {
          width = $(element).width();
          height = $(element).height();

          let radius = Math.min(width, height) / 2 - strokeWidth * 2;

          paper = Raphael($(element).get()[0], width, height);
          let circle = paper.circle(width / 2, height / 2, radius);
          circle.attr("stroke", "#FF9900");
          circle.attr("stroke-width", strokeWidth);

          triangle = paper.path(
            polygonPath([
              width / 2,
              height / 2 - radius + strokeWidth,
              15,
              20,
              -30,
              0,
            ]),
          );
          triangle.attr("stroke-width", 0);
          triangle.attr("fill", "#fff");

          $(element).append(
            $('<div class="pointer-value"></div>')
              .append(valueDiv)
              .append(unitsDiv),
          );
        };

        this.onSettingsChanged = function (newSettings) {
          unitsDiv.html(newSettings.units);
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
          if (settingName == "direction") {
            if (triangle !== undefined) {
              let direction = "r";

              let oppositeCurrent = currentValue + 180;

              if (oppositeCurrent < newValue) {
                //direction = "l";
              }

              triangle.animate(
                {
                  transform:
                    "r" + newValue + "," + width / 2 + "," + height / 2,
                },
                250,
                "bounce",
              );
            }

            currentValue = newValue;
          } else if (settingName == "value_text") {
            valueDiv.html(newValue);
          }
        };

        this.onDispose = function () {};

        this.getHeight = function () {
          return 4;
        };

        this.onSettingsChanged(settings);
      };

      this.loadWidgetPlugin({
        type_name: "pointer",
        display_name: "Pointer",
        external_scripts: ["plugins/thirdparty/raphael.2.1.0.min.js"],
        settings: [
          {
            name: "direction",
            display_name: "Direction",
            type: "calculated",
            description: "In degrees",
          },
          {
            name: "value_text",
            display_name: "Value Text",
            type: "calculated",
          },
          {
            name: "units",
            display_name: "Units",
            type: "text",
          },
        ],
        newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new pointerWidget(settings));
        },
      });
    },
    createPictureWidget() {
      let pictureWidget = function (settings) {
        let widgetElement;
        let timer;
        let imageURL;

        function stopTimer() {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
        }

        function updateImage() {
          if (widgetElement && imageURL) {
            let cacheBreakerURL =
              imageURL + (imageURL.indexOf("?") == -1 ? "?" : "&") + Date.now();

            $(widgetElement).css({
              "background-image": "url(" + cacheBreakerURL + ")",
            });
          }
        }

        this.render = function (element) {
          $(element).css({
            width: "100%",
            height: "100%",
            "background-size": "cover",
            "background-position": "center",
          });

          widgetElement = element;
        };

        this.onSettingsChanged = function (newSettings) {
          stopTimer();

          if (newSettings.refresh && newSettings.refresh > 0) {
            timer = setInterval(
              updateImage,
              Number(newSettings.refresh) * 1000,
            );
          }
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
          if (settingName == "src") {
            imageURL = newValue;
          }

          updateImage();
        };

        this.onDispose = function () {
          stopTimer();
        };

        this.getHeight = function () {
          return 4;
        };

        this.onSettingsChanged(settings);
      };

      this.loadWidgetPlugin({
        type_name: "picture",
        display_name: "Picture",
        fill_size: true,
        settings: [
          {
            name: "src",
            display_name: "Image URL",
            type: "calculated",
          },
          {
            type: "number",
            display_name: "Refresh every",
            name: "refresh",
            suffix: "seconds",
            description:
              "Leave blank if the image doesn't need to be refreshed",
          },
        ],
        newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new pictureWidget(settings));
        },
      });
    },
    createIndicatorWidget() {
      this.addStyle(
        ".indicator-light",
        "border-radius:50%;width:22px;height:22px;border:2px solid #3d3d3d;margin-top:5px;float:left;background-color:#222;margin-right:10px;",
      );
      this.addStyle(
        ".indicator-light.on",
        "background-color:#FFC773;box-shadow: 0px 0px 15px #FF9900;border-color:#FDF1DF;",
      );
      this.addStyle(".indicator-text", "margin-top:10px;");
      let indicatorWidget = function (settings) {
        let self = this;
        let titleElement = $('<h2 class="section-title"></h2>');
        let stateElement = $('<div class="indicator-text"></div>');
        let indicatorElement = $('<div class="indicator-light"></div>');
        let currentSettings = settings;
        let isOn = false;
        let onText;
        let offText;

        function updateState() {
          indicatorElement.toggleClass("on", isOn);

          if (isOn) {
            stateElement.text(
              onText === undefined
                ? currentSettings.on_text === undefined
                  ? ""
                  : currentSettings.on_text
                : onText,
            );
          } else {
            stateElement.text(
              offText === undefined
                ? currentSettings.off_text === undefined
                  ? ""
                  : currentSettings.off_text
                : offText,
            );
          }
        }

        this.render = function (element) {
          $(element)
            .append(titleElement)
            .append(indicatorElement)
            .append(stateElement);
        };

        this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;
          titleElement.html(
            newSettings.title === undefined ? "" : newSettings.title,
          );
          updateState();
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
          if (settingName == "value") {
            isOn = Boolean(newValue);
          }
          if (settingName == "on_text") {
            onText = newValue;
          }
          if (settingName == "off_text") {
            offText = newValue;
          }

          updateState();
        };

        this.onDispose = function () {};

        this.getHeight = function () {
          return 1;
        };

        this.onSettingsChanged(settings);
      };

      this.loadWidgetPlugin({
        type_name: "indicator",
        display_name: "Indicator Light",
        settings: [
          {
            name: "title",
            display_name: "Title",
            type: "text",
          },
          {
            name: "value",
            display_name: "Value",
            type: "calculated",
          },
          {
            name: "on_text",
            display_name: "On Text",
            type: "calculated",
          },
          {
            name: "off_text",
            display_name: "Off Text",
            type: "calculated",
          },
        ],
        newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new indicatorWidget(settings));
        },
      });
    },
    createGoogleMapWidget() {
      this.addStyle(".gm-style-cc a", "text-shadow:none;");

      let googleMapWidget = function (settings) {
        let currentSettings = settings;
        let map;
        let marker;
        let currentPosition = {};

        function updatePosition() {
          if (map && marker && currentPosition.lat && currentPosition.lon) {
            let newLatLon = new google.maps.LatLng(
              currentPosition.lat,
              currentPosition.lon,
            );
            marker.setPosition(newLatLon);
            map.panTo(newLatLon);
          }
        }

        this.render = function (element) {
          function initializeMap() {
            let mapOptions = {
              zoom: 13,
              center: new google.maps.LatLng(37.235, -115.811111),
              disableDefaultUI: true,
              draggable: false,
              styles: [
                {
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [{ color: "#2a2a2a" }],
                },
                {
                  featureType: "landscape",
                  elementType: "geometry",
                  stylers: [{ color: "#000000" }, { lightness: 20 }],
                },
                {
                  featureType: "road.highway",
                  elementType: "geometry.fill",
                  stylers: [{ color: "#000000" }, { lightness: 17 }],
                },
                {
                  featureType: "road.highway",
                  elementType: "geometry.stroke",
                  stylers: [
                    { color: "#000000" },
                    { lightness: 29 },
                    { weight: 0.2 },
                  ],
                },
                {
                  featureType: "road.arterial",
                  elementType: "geometry",
                  stylers: [{ color: "#000000" }, { lightness: 18 }],
                },
                {
                  featureType: "road.local",
                  elementType: "geometry",
                  stylers: [{ color: "#000000" }, { lightness: 16 }],
                },
                {
                  featureType: "poi",
                  elementType: "geometry",
                  stylers: [{ color: "#000000" }, { lightness: 21 }],
                },
                {
                  elementType: "labels.text.stroke",
                  stylers: [
                    { visibility: "on" },
                    { color: "#000000" },
                    { lightness: 16 },
                  ],
                },
                {
                  elementType: "labels.text.fill",
                  stylers: [
                    { saturation: 36 },
                    { color: "#000000" },
                    { lightness: 40 },
                  ],
                },
                {
                  elementType: "labels.icon",
                  stylers: [{ visibility: "off" }],
                },
                {
                  featureType: "transit",
                  elementType: "geometry",
                  stylers: [{ color: "#000000" }, { lightness: 19 }],
                },
                {
                  featureType: "administrative",
                  elementType: "geometry.fill",
                  stylers: [{ color: "#000000" }, { lightness: 20 }],
                },
                {
                  featureType: "administrative",
                  elementType: "geometry.stroke",
                  stylers: [
                    { color: "#000000" },
                    { lightness: 17 },
                    { weight: 1.2 },
                  ],
                },
              ],
            };

            map = new google.maps.Map(element, mapOptions);

            google.maps.event.addDomListener(
              element,
              "mouseenter",
              function (e) {
                e.cancelBubble = true;
                if (!map.hover) {
                  map.hover = true;
                  map.setOptions({ zoomControl: true });
                }
              },
            );

            google.maps.event.addDomListener(
              element,
              "mouseleave",
              function (e) {
                if (map.hover) {
                  map.setOptions({ zoomControl: false });
                  map.hover = false;
                }
              },
            );

            marker = new google.maps.Marker({ map: map });

            updatePosition();
          }

          if (window.google && window.google.maps) {
            initializeMap();
          } else {
            window.gmap_initialize = initializeMap;
            head.js(
              "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=gmap_initialize",
            );
          }
        };

        this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
          if (settingName == "lat") {
            currentPosition.lat = newValue;
          } else if (settingName == "lon") {
            currentPosition.lon = newValue;
          }

          updatePosition();
        };

        this.onDispose = function () {};

        this.getHeight = function () {
          return 4;
        };

        this.onSettingsChanged(settings);
      };

      this.loadWidgetPlugin({
        type_name: "google_map",
        display_name: "Google Map",
        fill_size: true,
        settings: [
          {
            name: "lat",
            display_name: "Latitude",
            type: "calculated",
          },
          {
            name: "lon",
            display_name: "Longitude",
            type: "calculated",
          },
        ],
        newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new googleMapWidget(settings));
        },
      });
    },
    createHTMLWidget() {
      this.addStyle(
        ".html-widget",
        "white-space:normal;width:100%;height:100%",
      );

      let htmlWidget = function (settings) {
        let self = this;
        let htmlElement = $('<div class="html-widget"></div>');
        let currentSettings = settings;

        this.render = function (element) {
          $(element).append(htmlElement);
        };

        this.onSettingsChanged = function (newSettings) {
          currentSettings = newSettings;
        };

        this.onCalculatedValueChanged = function (settingName, newValue) {
          if (settingName == "html") {
            htmlElement.html(newValue);
          }
        };

        this.onDispose = function () {};

        this.getHeight = function () {
          return Number(currentSettings.height);
        };

        this.onSettingsChanged(settings);
      };

      this.loadWidgetPlugin({
        type_name: "html",
        display_name: "HTML",
        fill_size: true,
        settings: [
          {
            name: "html",
            display_name: "HTML",
            type: "calculated",
            description:
              "Can be literal HTML, or javascript that outputs HTML.",
          },
          {
            name: "height",
            display_name: "Height Blocks",
            type: "number",
            default_value: 4,
            description: "A height block is around 60 pixels",
          },
        ],
        newInstance: function (settings, newInstanceCallback) {
          newInstanceCallback(new htmlWidget(settings));
        },
      });
    },
    processDatasourceUpdate(datasourceModel, newData) {
      const datasourceName = datasourceModel.name.value;

      this.datasourceData[datasourceName] = newData;

      this.panes.forEach(function (pane) {
        this.widgets.forEach(function (widget) {
          widget.processDatasourceUpdate(datasourceName);
        });
      });
    },
    getDatasourceTypes() {
      let returnTypes = [];

      this.datasourcePlugins.forEach(function (datasourcePluginType) {
        let typeName = datasourcePluginType.type_name;
        let displayName = typeName;

        if (datasourcePluginType.display_name !== undefined) {
          displayName = datasourcePluginType.display_name;
        }

        returnTypes.push({
          name: typeName,
          display_name: displayName,
        });
      });

      return returnTypes;
    },

    getWidgetTypes() {
      let returnTypes = [];

      this.widgetPlugins.forEach(function (widgetPluginType) {
        let typeName = widgetPluginType.type_name;
        let displayName = typeName;

        if (widgetPluginType.display_name !== undefined) {
          displayName = widgetPluginType.display_name;
        }

        returnTypes.push({
          name: typeName,
          display_name: displayName,
        });
      });

      return returnTypes;
    },
    createDialogBox(contentElement, title, okTitle, cancelTitle, okCallback) {
      // Initialize our modal overlay
      let overlay = $('<div id="modal_overlay" style="display:none;"></div>');

      let modalDialog = $('<div class="modal"></div>');

      function closeModal() {
        overlay.fadeOut(200, function () {
          $(this).remove();
        });
      }

      // Create our header
      modalDialog.append(
        '<header><h2 class="title">' + title + "</h2></header>",
      );

      $("<section></section>").appendTo(modalDialog).append(contentElement);

      // Create our footer
      let footer = $("<footer></footer>").appendTo(modalDialog);

      if (okTitle) {
        $('<span id="dialog-ok" class="text-button">' + okTitle + "</span>")
          .appendTo(footer)
          .click(function () {
            let hold = false;

            if (typeof okCallback === "function") {
              hold = okCallback();
            }

            if (!hold) {
              closeModal();
            }
          });
      }

      if (cancelTitle) {
        $(
          '<span id="dialog-cancel" class="text-button">' +
            cancelTitle +
            "</span>",
        )
          .appendTo(footer)
          .click(function () {
            closeModal();
          });
      }

      overlay.append(modalDialog);
      $("body").append(overlay);
      overlay.fadeIn(200);
    },
    getPositionForScreenSize(paneModel) {
      let cols = this.grid.cols;

      if (
        typeof paneModel.row === "number" &&
        typeof paneModel.col === "number"
      ) {
        // Support for legacy format
        let obj = {};
        obj[cols] = paneModel.row;
        paneModel.row = obj;

        obj = {};
        obj[cols] = paneModel.col;
        paneModel.col = obj;
      }

      let newColumnIndex = 1;
      let columnDiff = 1000;

      for (let columnIndex in paneModel.col) {
        if (columnIndex == cols) {
          // If we already have a position defined for this number of columns, return that position
          return {
            row: paneModel.row[columnIndex],
            col: paneModel.col[columnIndex],
          };
        } else if (paneModel.col[columnIndex] > cols) {
          // If it's greater than our display columns, put it in the last column
          newColumnIndex = cols;
        } // If it's less than, pick whichever one is closest
        else {
          let delta = cols - columnIndex;

          if (delta < columnDiff) {
            newColumnIndex = columnIndex;
            columnDiff = delta;
          }
        }
      }

      if (newColumnIndex in paneModel.col && newColumnIndex in paneModel.row) {
        return {
          row: paneModel.row[newColumnIndex],
          col: paneModel.col[newColumnIndex],
        };
      }

      return { row: 1, col: newColumnIndex };
    },
    updatePositionForScreenSize(paneModel, row, col) {
      let displayCols = this.grid.cols;

      if (row !== undefined) paneModel.row[displayCols] = row;
      if (col !== undefined) paneModel.col[displayCols] = col;
    },
    template() {
      // By default, Underscore uses ERB-style template delimiters, change the
      // following template settings to use alternative delimiters.
      var settings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g,
      };

      // When customizing `templateSettings`, if you don't want to define an
      // interpolation, evaluation or escaping regex, we need one that is
      // guaranteed not to match.
      var noMatch = /.^/;

      // Certain characters need to be escaped so that they can be put into a
      // string literal.
      var escapes = {
        "\\": "\\",
        "'": "'",
        r: "\r",
        n: "\n",
        t: "\t",
        u2028: "\u2028",
        u2029: "\u2029",
      };

      for (var p in escapes) {
        escapes[escapes[p]] = p;
      }

      var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
      var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

      return function (text, data, objectName) {
        settings.variable = objectName;

        // Compile the template source, taking care to escape characters that
        // cannot be included in a string literal and then unescape them in code
        // blocks.
        var source =
          "__p+='" +
          text
            .replace(escaper, function (match) {
              return "\\" + escapes[match];
            })
            .replace(settings.escape || noMatch, function (match, code) {
              return "'+\n_.escape(" + unescape(code) + ")+\n'";
            })
            .replace(settings.interpolate || noMatch, function (match, code) {
              return "'+\n(" + unescape(code) + ")+\n'";
            })
            .replace(settings.evaluate || noMatch, function (match, code) {
              return "';\n" + unescape(code) + "\n;__p+='";
            }) +
          "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) {
          source = "with(obj||{}){\n" + source + "}\n";
        }

        source =
          "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
          source +
          "return __p;\n";

        var render = new Function(settings.variable || "obj", source);

        if (data) {
          return render(data);
        }

        var template = function (data) {
          return render.call(this, data);
        };

        // Provide the compiled function source as a convenience for build time
        // precompilation.
        template.source =
          "function(" + (settings.variable || "obj") + "){\n" + source + "}";

        return template;
      };
    },
  },
});
