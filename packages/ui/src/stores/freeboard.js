import { defineStore, storeToRefs } from "pinia";
import { Datasource, useDashboardStore, Widget } from "./dashboard";
import { basicSetup, EditorView } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import $ from "jquery";
import renderComponent from "../render-component";
import ConfirmDialogBox from "../components/ConfirmDialogBox.vue";

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

let EXPECTED_TYPE = {
  ANY: "any",
  ARRAY: "array",
  OBJECT: "object",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
};

export const useFreeboardStore = defineStore("freeboard", {
  state: () => ({
    isSaved: false,
    allowEdit: false,
    isEditing: false,
    datasourceData: {},
    showLoadingIndicator: true,
    currentStyle: {},
    widgetPlugins: {},
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
      let inputString = $(element).val();
      //.substring(0, $(element).getCaretPosition());

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
    setIsSaved(isSaved) {
      this.isSaved = isSaved;
    },
    setAllowEdit(allowEdit) {
      this.allowEdit = allowEdit;
    },
    toggleLoadingIndicator() {
      this.showLoadingIndicator = !this.showLoadingIndicator;
    },
    toggleAllowEdit() {
      this.allowEdit = !this.allowEdit;
    },
    toggleIsEditing() {
      this.isEditing = !this.isEditing;
    },
    loadDatasourcePlugin(plugin) {
      if (plugin.label === undefined) {
        plugin.label = plugin.typeName;
      }

      this.datasourceData[plugin.typeName] = plugin;
    },
    loadWidgetPlugin(plugin) {
      if (plugin.label === undefined) {
        plugin.label = plugin.typeName;
      }

      this.widgetPlugins[plugin.typeName] = plugin;
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

        const updateRefresh = (refreshTime) => {
          if (updateTimer) {
            clearInterval(updateTimer);
          }

          updateTimer = setInterval(() => {
            this.updateNow();
          }, refreshTime);
        };

        updateRefresh(currentSettings.refresh * 1000);

        this.updateNow = function () {
          if (
            (errorStage > 1 && !currentSettings.use_proxy) ||
            errorStage > 2
          ) {
            // We've tried everything, let's quit
            return; // TODO: Report an error
          }

          let requestURL = currentSettings.url;

          if (errorStage == 2 && currentSettings.use_proxy) {
            requestURL = "/proxy/" + encodeURI(currentSettings.url);
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
            name: "use_proxy",
            display_name: "Use Proxy",
            description:
              "A direct JSON connection will be tried first, if that fails, a JSONP connection will be tried. If that fails, you can use the Proxy.",
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
    loadDashboard(dashboardData, callback) {
      const dashboardStore = useDashboardStore();
      this.showLoadingIndicator = true;
      dashboardStore.deserialize(dashboardData, () => {
        this.showLoadingIndicator = false;

        if (typeof callback === "function") {
          callback();
        }
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
    processDatasourceUpdate(datasourceModel, newData) {
      const datasourceName = datasourceModel.name;

      this.datasourceData[datasourceName] = newData;

      const dashboardStore = useDashboardStore();
      const { panes } = storeToRefs(dashboardStore);

      panes.forEach(function (pane) {
        pane.widgets.forEach(function (widget) {
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
    createDialogBox(component, props = {}) {
      const c = renderComponent({
        el: document.body,
        component,
        props: {
          ...props,
          onClose: (event) => {
            if (props.onClose) {
              props.onClose(event);
            }
            c.destroy();
          },
        },
      });
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
