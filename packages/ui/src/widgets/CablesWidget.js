import * as patch from "../assets/cables/Trippy_Donut2.json"
import Talker from "talker.js";

export class CablesWidget {
  static typeName = "cables";
  static label = "Cables";
  static fields = () => [
    {
      name: "url",
      label: "form.labelUrl",
      type: "text",
      default: "http://localhost:9090",
    },
    {
      name: "patch",
      label: "form.labelPatch",
      type: "code",
      default: JSON.stringify(patch, null, 2),
      language: "json"
    },
  ];

  static newInstance(settings, newInstanceCallback) {
    newInstanceCallback(new CablesWidget(settings));
  }

  controlContainer;
  fullscreenButton;
  widgetElement;
  iframeElement;
  editor;
  currentSettings;

  constructor(settings) {
    this.currentSettings = settings;

    this.widgetElement = document.createElement("div");
    this.widgetElement.className = "cables-widget";
    this.widgetElement.style.width = "100%";
    this.widgetElement.style.height = "100%";

    this.iframeElement = document.createElement("iframe");
    this.iframeElement.allow =
      "clipboard-read;clipboard-write;geolocation;camera;microphone;midi;usb;serial;xr-spatial-tracking;ambient-light-sensor;bluetooth";
    this.iframeElement.allowfullscreen = "true";
    this.iframeElement.webkitallowfullscreen = "true";
    this.iframeElement.mozallowfullscreen = "true";
    this.iframeElement.style =
      "width: 100%; height: 100%; border: 0px;";

    this.fullscreenButton = document.createElement("button");
    this.fullscreenButton.textContent = 'Fullscreen';
    this.fullscreenButton.type = 'button';
    this.fullscreenButton.onclick = () => {
      // else go fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        this.widgetElement.requestFullscreen();
      }
    }

    this.controlContainer = document.createElement("div");
    this.controlContainer.appendChild(this.fullscreenButton);

    this.widgetElement.appendChild(this.controlContainer);
    this.widgetElement.appendChild(this.iframeElement);

    this.onSettingsChanged(settings);

    this.createEditor();
  }

  render(element) {
    element.appendChild(this.widgetElement);
  }

  onSettingsChanged(newSettings) {
    this.currentSettings = newSettings;
    this.iframeElement.src = this.currentSettings.url;
  }

  onDispose() {
    this.widgetElement.remove();
  }

  createEditor() {
    this.editor = new CablesEditor(this.iframeElement, {
      isTrustedPatch: false,
      urlCables: "https://cables.gl",
      urlSandbox: "https://sandbox.cables.gl",
      user: {
        id: null,
        isAdmin: false,
        isStaff: false,
        introCompleted: false,
        username: "guest",
        usernameLowercase: "guest",
        isPatchOwner: false,
        roles: [],
        activityFeed: { count: 0 },
        isPatron: false,
      },
      usersettings: { settings: {} },
      isDevEnv: false,
      env: "live",
      patchId: "58b9547dc8746fd079db66a9",
      patchVersion: "",
      socketcluster: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiZWRxZHlQZzltQkM2OUNxbHFGM3NTTzVUb0FIV0RDSnEiLCJjaGFubmVscyI6WyJwYXRjaGNoYW5uZWxfNThiOTU0N2RjODc0NmZkMDc5ZGI2NmE5X2xpdmUvaW5mbyIsInBhdGNoY2hhbm5lbF81OGI5NTQ3ZGM4NzQ2ZmQwNzlkYjY2YTlfbGl2ZS9jb250cm9sIiwicGF0Y2hjaGFubmVsXzU4Yjk1NDdkYzg3NDZmZDA3OWRiNjZhOV9saXZlL2NoYXQiLCJwYXRjaGNoYW5uZWxfNThiOTU0N2RjODc0NmZkMDc5ZGI2NmE5X2xpdmUvdWkiXSwiaWF0IjoxNzM0NjkwNDkwfQ.pWYOez21y_4n8XmNmIi3_ukp86DiC9V0ESFNDBVZZGo",
        patchChannel: "patchchannel_58b9547dc8746fd079db66a9_live",
        userChannel: "",
        userPatchChannel: "",
        multiplayerCapable: true,
        enableTracking: true,
        enabled: true,
        hostname: "sc.cables.gl",
        port: 443,
        secure: true,
      },
      remoteClient: 0,
      buildInfo: {
        core: {
          timestamp: 1734525263816,
          created: "2024-12-18T12:34:23.816Z",
          git: {
            branch: "master",
            commit: "20b730583e0a440aa00951d2b66a7e8f3d7db458",
            date: "1734433453",
            message: "docs",
          },
          relative: "2 days ago",
        },
        api: {
          timestamp: 1734602209352,
          created: "2024-12-19T09:56:49.352Z",
          git: {
            branch: "master",
            commit: "b417f61695447a69fc91ad0a308183b07771e8a5",
            date: "1734602156",
            message: "iframe",
          },
          relative: "a day ago",
        },
        ui: {
          timestamp: 1734525271134,
          created: "2024-12-18T12:34:31.134Z",
          git: {
            branch: "master",
            commit: "15e5cd7a7259d6da4077e33c8a7e3f8274789546",
            date: "1734429017",
            message: "default ops",
          },
          relative: "2 days ago",
        },
        updateWarning: true,
      },
    });
  }
}

class CablesEditor {
  constructor(frame, config) {
    this.config = config;

    // const frame = document.getElementById("editorIframe");
    this._talker = new TalkerAPI(frame.contentWindow);
    // api.setTalkerApi(this._talker);
    this.isTrustedPatch = this.config.isTrustedPatch;

    this._patchId = this.config.patchId;

    window.addEventListener("unhandledrejection", (e) => {
      this._logError({ level: "error", message: e.reason });
    });

    window.addEventListener("error", (e) => {
      this._logError({ level: "error", message: e.error });
    });

    this._talker.addEventListener("requestPatchData", (options, next) => {
      if (next) next(this.config);
    });

    // -------------------------
    // patch
    this._talker.addEventListener("getOpInfo", (options, next) => {
      this.warnOpName(options.opName, "getopinfo");
      console.log(
        "op/" + options.opName + "/info",
        (r) => {
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("getChangelog", (options, next) => {
      console.log(
        "changelog?num=" + options.num,
        (r) => {
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("updateFile", (options, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "project/" + this._patchId + "/" + options.fileName,
        {
          content: options.content,
        },
        (res) => {
          next(null, res);
          if (res.hasOwnProperty("success") && !res.success) {
            let msg = res.msg;
            const text = res.error ? res.error.errors : null;
            if (text) msg = text;
            this._talker.send("notifyError", { msg: msg });
          }
          this._talker.send("fileUpdated", {
            filename: options.fileName,
          });
          if (res.updatedFiles) {
            res.updatedFiles.forEach((updatedFile) => {
              this._talker.send("fileUpdated", {
                filename: updatedFile,
              });
            });
          }
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("toggleFav", (options, next) => {
      console.log(
        "fav/toggle/" + this._patchId,
        {},
        (r) => {
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("checkProjectUpdated", (options, next) => {
      console.log(
        "project/" + this._patchId + "/updated?nc=" + Date.now(),
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("patchCreateBackup", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "projectversion/createbackup/" + this._patchId,
        {
          title: data.title,
        },
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("reload", (options) => {
      if (options && options.patchId) {
        document.location.href = "/edit/" + options.patchId;
      } else {
        document.location.reload();
      }
    });

    this._talker.addEventListener("savePatch", (options, next) => {
      if (options.buildInfo) {
        options.buildInfo.host = location.hostname;
      }

      let url = "project/" + this._patchId;
      if (options.fromBackup) url += "?fromBackup=" + options.fromBackup;
      console.log(
        url,
        {
          name: options.name,
          namespace: options.namespace,
          data: options.data,
          dataB64: options.dataB64,
          buildInfo: options.buildInfo,
        },
        (r) => {
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("getPatch", (options, next) => {
      let url = "project/" + this._patchId;
      if (this.config.patchVersion)
        url += "/version/" + this.config.patchVersion;

      console.log(
        url,
        (r) => {
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("gotoPatch", (options) => {
      document.location.href = "/edit/" + options.id;
    });

    this._talker.addEventListener("newPatch", (options, next) => {
      console.log(
        "project",
        {
          name: options.name,
        },
        (r) => {
          let id = r._id;
          if (r.shortId) id = r.shortId;
          document.location.href = "/edit/" + id;
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("saveProjectAs", (options, next) => {
      const data = {
        name: options.name,
        originalId: this._patchId,
        copyCollaborators: options.copyCollaborators,
      };

      if (options.collabUsers) data.collabUsers = options.collabUsers;
      if (options.collabTeams) data.collabTeams = options.collabTeams;

      console.log(
        "project/copy",
        data,
        (r) => {
          if (r && r.shortId) this._patchId = r.shortId;
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("saveScreenshot", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "project/" + this._patchId + "/screenshot",
        {
          screenshot: data.screenshot,
        },
        (r) => {
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("setProjectName", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "project/" + this._patchId + "/name",
        {
          name: data.name,
        },
        (r) => {
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    // -------------------------
    // files

    this._talker.addEventListener("setIconUnsaved", (data, next) => {
      this.changeFavicon(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADGElEQVR4AaxWA4w0SRhdDE7r8fR4WuvYOUyMjXO2bVtrK3bOCM62bfy2bb6/3np70dX/35W8pPzeh0JRNpuVhSpwhcCwwKcCqwQOEqyzj2MTc1TZfWUmnSMwKLBSAJLg3EGuPRUBLK0CGwRwkuDaVm7kVEBB4E0BuATuVZAV0CLwgxvEqVRqZpt7ttgJKLhF3qgn0aApCAZq0FybmSmisJAAFlfcrqoq6lQFPz/ixZq2EuRTEWs4svMJaHUr5ko8Bi0TxYpnPPjuAY/wRMI6p9Uq4Bz7bJdHvZbCi9f5gdEivHq9V7ST1jnkOmemgEGnJJqmIR6LIRaNsj5NXl8PIxvDf0968P4dfuYCMillvj0GJwWoTi4ZEtAikiTjIQJmLk6rkU7GSQgzH8f69lJkkxGSMycWuqxUCrjCSWwbBEEkHMQ/T3iwrbsExF+Pe0CX91/gx3u3+0DXRyNBirKSW3EFBQzLkBuGAZJ/dNc4we6+Yrx5i49gnX1T+ORuHzjXNE27fYcp4FMpAXlaHsD+gWJs6SpBTVUZ1FQIWjrMOvtITs8wPMwN2z3JTQGrZAQ06Al8dd+49WVlZyGdTk+NZTIZ9nGMczhXNplXUcBBu4m5XA60itZ9ca8X+WTAOod9HGM+MCllBRyUFcBNubmtgIkQcI2cAPkQJMHkopsrK8qs4+zjmBDhOAT2Schs5nX6/YNekIQJV1FeBiYgwTr79vYXIxYJMmG5TjoJh+0elgY9hVAwQPIpHB4qxru3+UCwzr4P7vTxIoKu67IChm0vIlNYQ3KSfPuAF6MX+/H8tX78+ogXmzpLCPz+qBeBQA3DxOuZ62RxxYJXMS3n1cpXbdnTHpKjXlWQSysw1QTq8grSSpjg04s6LYna2lo4/DeqCz5GJKfr377Nj9WtpcglI1Di0ZkC+S4QlutWGoOLPse8x1++bjzpXr/Rb31SncPmObZ+SJj1/ExYrXcLrbZfMpLyO/Xjw17GmG5274fMYvcpbTLTCAYDfNvRaKTcIufeBUff8lTKVfIT8xvkHRP6d80GvnM64N1zAEl3BQ73jdv6AAAAAElFTkSuQmCC"
      );
    });

    this._talker.addEventListener("setIconSaved", (data, next) => {
      this.changeFavicon(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAACOElEQVR42q2Vy2sTURTG5285daqV0KqLquCiEG0RYqtYFy6E8UFEq8USFESwEWGigliGWehSxBYq1SKDFBRJaqFoRG2hQotCJqFOFoVuIy5+LvKeuYmD5J7d4X7fPa/7HU1THNHFEFvS4kpJSuJKWmwxRNfCHBkQS3KCwnJiyUB7sIgpnhJcNU9MkVbwqDhtwVVzJKqCD0s2FBxBsjIcfD0E/DzLzJMqU0Sbcw8RvM4NPBaZqiZSr4WYYQLfy33yzJCoesx647wwBCPM43KPU/WOlJsqVitIN3300o0gRLjLOssYHKjfsMpTpxybCKMkecJjbjPCfgyWKDDFQfTG0dI1MVTwPVziNT8okGeDOR7g4OJwohGOIIYmdhC+iwssUiTLc6b5yCZbbPOeOD3+u7Ym6SDBIM/wWCDOYY4QZ4HfFLhDbzDWtCZukOAKn1lhnC4EYQfjrPCNq6pCu5qU/M4uknzHIVbzxHBYY1JFUFISTLKGwzEfQbISkZ9AkcJFPrHKRKXiOtdYJctYixQCRewhwQZ/eMdlhhhijLf84imDKoJ0oI06p3nFFtsUyTLLC75QJMM5dqoI7MAgHWUGlwwWs6yRJ886c8TpU4+70TTKOv2kyPGVCQ4R4yY2Nrc4zm5aqKTe9Jn6OcMHfvKQfRXCCBH/8Daa5fvOJ0nh8obRcMLm1TS6KigJpinU3v+nmQFJe0SGTa63C7pRmyUgqiYvWeJsOF2OdlbWO7BYOrDaOrBc/2e9/wUAaeUZ3CQzkAAAAABJRU5ErkJggg=="
      );
    });

    this._talker.addEventListener("getFilelist", (data, next) => {
      let apiUrl = "library/";
      if (data.source == "patch")
        apiUrl = "project/" + this._patchId + "/files/";

      console.log(
        apiUrl,
        (res) => {
          next(null, res);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("fileConvert", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "project/" +
          this._patchId +
          "/file/convert/" +
          data.fileId +
          "/" +
          data.converterId,
        {
          options: data.options,
        },
        (res) => {
          if (res) {
            if (res.filename)
              this._talker.send("fileUpdated", {
                filename: res.filename,
              });
            if (res.updatedFiles) {
              res.updatedFiles.forEach((updatedFile) => {
                this._talker.send("fileUpdated", {
                  filename: updatedFile,
                });
              });
            }
          }
          next(null, res);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("updatePatchName", (opts, next) => {
      document.title = opts.name;
      if (next) next(null, opts);
    });

    this._talker.addEventListener("getFileDetails", (data, next) => {
      console.log(
        "project/" + data.projectId + "/file/info/" + data.fileid,
        (res) => {
          next(null, res);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("getLibraryFileInfo", (data, next) => {
      console.log(
        "files/library/info/" + data.fileCategory + "/" + data.filename,
        (res) => {
          return next(null, res);
        },
        (r) => {
          return next(r, r);
        }
      );
    });

    this._talker.addEventListener("deleteFile", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      api.delete(
        "project/" + this._patchId + "/file/" + data.fileid,
        {},
        (res) => {
          next(null, res);
          this._talker.send("fileDeleted", res.data);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("checkNumAssetPatches", (data, next) => {
      const filenames = data.filenames || [];
      console.log(
        "assets/uses/count",
        { filenames: filenames },
        (res) => {
          next(null, res);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("createFile", (options, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "project/" + this._patchId + "/" + options.name,
        {
          content: "this is an empty file...",
        },
        (r) => {
          next(null, r);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("fileUploadStr", (options, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      const fd = this.dataUriToFormData(options.fileStr, options.filename);
      if (fd) {
        this.uploadFormData(fd, options.filename, { next: next });
      } else {
        return next({ error: true, msg: "FAILED_PARSE_DATAURI" }, null);
      }
    });

    // -------------------------
    // ops

    this._talker.addEventListener("getAllProjectOps", (data, next) => {
      console.log(
        "doc/ops/project/" + this._patchId + "/?nc=" + Date.now(),
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("getOpDocsAll", (data, next) => {
      let url = "doc/ops/all?nc=" + String(Date.now()).substr(-6);
      url += "&p=" + this._patchId;
      console.log(
        url,
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("getOpDocs", (opIdentifier, next) => {
      let url =
        "doc/ops/" + opIdentifier + "?nc=" + String(Date.now()).substr(-6);
      url += "&p=" + this._patchId;
      console.log(
        url,
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("getCollectionOpDocs", (data, next) => {
      let url = "doc/ops/collection/" + data.name + "?nc=" + Date.now();
      url += "&p=" + this._patchId;
      console.log(
        url,
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opCreate", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "opcreate");
      console.log(
        "ops/create/" + data.opname,
        data,
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("saveOpCode", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "saveopcode");
      console.log(
        "ops/" + data.opname,
        {
          code: data.code,
          format: data.format,
        },
        (res) => {
          next(null, res);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("getOpCode", (data, next) => {
      this.warnOpName(data.opname, "getopcode");
      const opIdentifier = data.opId || data.opname;
      let url = "ops/" + opIdentifier + "?p=" + this._patchId;
      console.log(
        url,
        (res) => {
          next(null, res);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("formatOpCode", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "ops/code/format",
        { code: data.code },
        (res) => {
          next(null, res);
        },
        (r) => {
          next(r, r);
        }
      );
    });

    this._talker.addEventListener("opSaveLayout", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      if (data.layout && data.layout.name) delete data.layout.name;
      this.warnOpName(data.opname, "opsavelayout");
      console.log(
        "op/layout/" + data.opname,
        { layout: data.layout },
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opAddLib", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "op/" + data.opname + "/libs",
        {
          libName: data.name,
        },
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opRemoveLib", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "opremovelib");
      api.delete(
        "op/" + data.opname + "/libs",
        { libName: data.name },
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opAddCoreLib", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "opaddcorelib");
      console.log(
        "op/" + data.opname + "/corelibs/" + data.name,
        {},
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opRemoveCoreLib", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "opremovecorelibv");
      api.delete(
        "op/" + data.opname + "/corelibs/" + data.name,
        {},
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opClone", (data, next) => {
      this.warnOpName(data.opname, "opclone");
      console.log(
        "ops/clone/" + data.opname + "/" + data.name + "?p=" + this._patchId,
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opUpdate", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "opupdate");
      console.log(
        "op/update/" + data.opname,
        data.update,
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    // -------------------------
    // ops attachments

    this._talker.addEventListener("opAttachmentAdd", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "opattachmentadd");
      console.log(
        "op/" + data.opname + "/attachments/" + data.name,
        {},
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opAttachmentGet", (data, next) => {
      this.warnOpName(data.opname, "opattachmentget");
      let url =
        "op/" +
        data.opname +
        "/attachment/" +
        data.name +
        "?nc=" +
        (Date.now() + "").substr(-6);
      url += "&p=" + this._patchId;
      console.log(
        url,
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opAttachmentDelete", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "opattachdelete");
      api.delete(
        "op/" + data.opname + "/attachments/" + data.name,
        {},
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("opAttachmentSave", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      this.warnOpName(data.opname, "opattsave");
      console.log(
        "op/" + data.opname + "/attachment/" + data.name,
        { content: data.content },
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("saveUserSettings", (data, next) => {
      if (!this.isTrustedPatch)
        return next({ error: true, msg: "NO_RIGHTS_UNTRUSTED" }, null);

      console.log(
        "usersettings/",
        { settings: data.settings },
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("toggleMultiplayerSession", (data, next) => {
      let url = window.location.href;
      const toggle = url.indexOf("mp=false") > -1;
      if (toggle) {
        url = url.replaceAll("?mp=false", "").replaceAll("&mp=false", "");
      } else {
        if (url.indexOf("?") > -1) {
          url += "&mp=" + toggle;
        } else {
          url += "?mp=" + toggle;
        }
      }
      window.location.href = url;
    });

    this._talker.addEventListener("checkOpName", (data, next) => {
      const newName = encodeURIComponent(data.v);
      let url = "op/checkname?newName=" + data.v;
      if (this.isTrustedPatch && this._patchId) url += "&p=" + this._patchId;
      console.log(
        url,
        {
          newName: newName,
          namespace: data.namespace,
          sourceName: data.sourceName,
          fromRename: data.rename,
        },
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });

    this._talker.addEventListener("getRecentPatches", (data, next) => {
      console.log(
        "recentpatches",
        (r) => {
          next(null, r);
        },
        (r, r2) => {
          next(r, r2);
        }
      );
    });
  }

  uploadFormData(formData, filename, options) {
    const url = "/api/project/" + this._patchId + "/file";

    this._talker.send("jobStart", {
      id: "upload" + filename,
      title: "Uploading " + filename,
    });

    // now post a new XHR request
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const complete = ((event.loaded / event.total) * 100) | 0;
        this._talker.send("jobProgress", {
          id: "upload" + filename,
          progress: complete,
        });

        if (complete === 100) {
          this._talker.send("notify", {
            msg: "File Uploaded: " + filename,
          });
          this._talker.send("jobFinish", { id: "upload" + filename });

          setTimeout(() => {
            this._talker.send("refreshFileManager");
            // if (filename) this._talker.send("fileUpdated", { "filename": filename });
          }, 100);
        }
      }
    };

    xhr.onload = (e, r) => {
      let msg = "";
      let res = "";

      try {
        res = JSON.parse(e.target.response);
      } catch (ex) {
        this._logError({ level: "log", message: ex });
      }

      if (xhr.status === 502) {
        this._logError({
          level: "warn",
          message: "ajax 502 error ! possibly upload ?",
        });
        return;
      }

      if (xhr.status === 200) {
        if (res.error && res.code === 402) {
          this._talker.send("notifyError", {
            msg: "Warning: " + (res.msg || ""),
            options: {
              force: true,
              closeable: true,
              timeout: 1000000000,
            },
          });
        }

        this._talker.send("refreshFileManager");
        if (res && res.filename)
          this._talker.send("fileUpdated", {
            filename: res.filename,
          });
        if (res && res.updatedFiles) {
          res.updatedFiles.forEach((updatedFile) => {
            this._talker.send("fileUpdated", {
              filename: updatedFile,
            });
          });
        }

        if (options.next) options.next();
      } else {
        if (res.msg) msg = res.msg;
        if (xhr.status === 402) {
          this._talker.send("notifyError", {
            msg: "Warning: " + (res.msg || ""),
            options: {
              force: true,
              closeable: true,
              timeout: 1000000000,
            },
          });
        } else {
          this._talker.send("notifyError", { msg: res.msg || "" });
        }
        this._talker.send("refreshFileManager");
        let level = "error";
        if (xhr.status === 413) level = "warn";
        this._logError({
          level: level,
          message: "upload error: " + msg,
        });
      }

      if (res.hasOwnProperty("success") && !res.success) {
        this._talker.send("notifyError", { msg: res.msg || "" });
        let level = "error";
        if (xhr.status === 413) level = "warn";
        this._logError({
          level: level,
          message: "upload error: " + res.msg,
        });
      }
    };

    xhr.send(formData);

    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        this._logError({
          level: "log",
          message: "reloading because of persisted navigation stuff.....",
        });
        this.document.location.reload();
      }
    });
  }

  dataUriToFormData(dataURI, filename) {
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    try {
      // separate out the mime component
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

      // write the bytes of the string to a typed array
      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], { type: mimeString });
      const fd = new FormData();
      fd.append(0, blob, filename);
      return fd;
    } catch (e) {
      return null;
    }
  }

  changeFavicon(src) {
    let link = document.createElement("link");
    let oldLink = document.getElementById("dynamic-favicon");
    link.id = "dynamic-favicon";
    link.rel = "shortcut icon";
    link.href = src;
    if (oldLink) {
      document.head.removeChild(oldLink);
    }

    document.head.appendChild(link);
  }

  warnOpName(opname, method) {
    if (!opname || opname.startsWith("Ops.")) {
      this._logError({
        level: "warn",
        message: "talkerapi opname should be id? " + method + " " + opname,
      });
    }
  }

  _logError(errorData) {
    if (!this._talker) {
      const errorMessage = errorData.message || "unknown error";
      switch (errorData.level) {
        case "error":
          console.error(errorMessage);
          break;
        case "warn":
          console.warn(errorMessage);
          break;
        case "verbose":
          console.verbose(errorMessage);
          break;
        case "info":
          console.info(errorMessage);
          break;
        default:
          console.log(errorMessage);
          break;
      }
    } else {
      this._talker.send("logError", errorData);
    }
  }
}

export default class Events {
  constructor() {
    // this._log = new Logger("eventtarget");
    this._eventCallbacks = {};
    this._logName = "";
    this._logEvents = false;
    this._listeners = {};

    this.on = this.addEventListener;
    this.off = this.removeEventListener;
  }

  /**
   * add event listener
   * @param which event name
   * @param cb callback
   * @param {string} idPrefix prefix for id, default empty
   * @return {string} event id
   */
  addEventListener(which, cb, idPrefix = "") {
    const event = {
      id: (idPrefix || "") + this.simpleId(),
      name: which,
      cb: cb,
    };
    if (!this._eventCallbacks[which]) this._eventCallbacks[which] = [event];
    else this._eventCallbacks[which].push(event);

    this._listeners[event.id] = event;

    return event.id;
  }

  /**
   * generate a simple ID using an internal counter
   *
   * @return {Number} new id
   * @static
   */
  simpleId()
  {
      this._simpleIdCounter++;
      return this._simpleIdCounter;
  }

  /**
   * check event listener registration
   * @param id event id
   * @param cb callback - deprecated
   * @return {boolean}
   */
  hasEventListener(id, cb = null) {
    if (id && !cb) {
      // check by id
      return !!this._listeners[id];
    } else {
      // this._log.warn("old eventtarget function haseventlistener!");
      if (id && cb) {
        if (this._eventCallbacks[id]) {
          const idx = this._eventCallbacks[id].indexOf(cb);
          return idx !== -1;
        }
      }
    }
  }

  /**
   * check event listener by name
   * @param eventName event name
   * @return {boolean}
   */
  hasListenerForEventName(eventName) {
    return (
      this._eventCallbacks[eventName] &&
      this._eventCallbacks[eventName].length > 0
    );
  }

  /**
   * rempve event listener registration
   * @param id event id
   * @param cb callback - deprecated
   * @return
   */
  removeEventListener(id, cb = null) {
    if (id === null || id === undefined) return;

    if (!cb) {
      // new style, remove by id, not by name/callback
      const event = this._listeners[id];
      if (!event) {
        // this._log.log("could not find event...", id, this);
        return;
      }

      let found = true;
      while (found) {
        found = false;
        let index = -1;
        for (let i = 0; i < this._eventCallbacks[event.name].length; i++) {
          if (this._eventCallbacks[event.name][i].id.indexOf(id) === 0) {
            // this._eventCallbacks[event.name][i].id == which ||
            found = true;
            index = i;
          }
        }

        if (index !== -1) {
          this._eventCallbacks[event.name].splice(index, 1);
          delete this._listeners[id];
        }
      }

      return;
    }

    // this._log.info("[eventtaget] ", "old function signature: removeEventListener! use listener id");
    // this._log.log((new Error()).stack);

    let index = null;
    for (let i = 0; i < this._eventCallbacks[id].length; i++)
      if (this._eventCallbacks[id][i].cb === cb) index = i;

    if (index !== null) {
      delete this._eventCallbacks[index];
    } // else this._log.warn("removeEventListener not found " + id);
  }

  /**
   * enable/disable logging of events for the class
   *
   * @param {boolean} enabled
   * @param {string} logName
   */
  logEvents(enabled, logName) {
    this._logEvents = enabled;
    this._logName = logName;
  }

  /**
   * emit event
   *
   * @param {string} which event name
   * @param {*} param1
   * @param {*} param2
   * @param {*} param3
   * @param {*} param4
   * @param {*} param5
   * @param {*} param6
   */
  emitEvent(
    which,
    param1 = null,
    param2 = null,
    param3 = null,
    param4 = null,
    param5 = null,
    param6 = null
  ) {
    // if (this._logEvents)
    //   this._log.log("[event] ", this._logName, which, this._eventCallbacks);

    if (this._eventCallbacks[which]) {
      for (let i = 0; i < this._eventCallbacks[which].length; i++) {
        if (this._eventCallbacks[which][i]) {
          this._eventCallbacks[which][i].cb(
            param1,
            param2,
            param3,
            param4,
            param5,
            param6
          );
        }
      }
    }
    // else {
    //   if (this._logEvents)
    //     this._log.log(
    //       "[event] has no event callback",
    //       which,
    //       this._eventCallbacks
    //     );
    // }
  }
}


class TalkerAPI extends Events {
  constructor(target) {
    super();

    // eslint-disable-next-line no-undef
    this._talker = new Talker(target, "*");
    this._callbackCounter = 0;
    this._callbacks = {};

    this._talker.onMessage = (msg) => {
      if (msg.data && msg.data.cmd) {
        // other messages are not for talkerapi, i.e. anything that somehow is sent via .postMessage
        if (msg.data.cmd === "callback") {
          if (this._callbacks[msg.data.cb])
            this._callbacks[msg.data.cb](msg.data.error, msg.data.response);
        } else {
          if (!this.hasListenerForEventName(msg.data.cmd)) {
            console.error("TalkerAPI has no listener for", msg.data.cmd);
          }
          this.emitEvent(msg.data.cmd, msg.data.data, (error, r) => {
            this._talker.send("cables", {
              cmd: "callback",
              cb: msg.data.cb,
              response: r,
              error: error,
            });
          });
        }
      }
    };
  }

  /**
   * send message via cables-talkerapi
   * @param cmd name of the event
   * @param data payload
   * @param cb callback
   */
  send(cmd, data, cb) {
    const payload = { cmd: cmd, data: data };
    if (cb) {
      this._callbackCounter++;
      this._callbacks[this._callbackCounter] = cb;
      payload.cb = this._callbackCounter;
    }

    this._talker.send("cables", payload);
  }
}
