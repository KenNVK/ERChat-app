// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const nativeImage = require("electron").nativeImage;
const appVersion = require("./package.json").version;
const electronVersion = app.getVersion();
const reactVersion = require("./package.json").dependencies.react;
const icon = nativeImage.createFromPath(app.getAppPath() + "/src/images/icon.png");

let template = [
  { label: "もとに戻す", role: "undo" },
  { label: "やり直す", role: "redo" },
  { type: "separator" },
  { label: "切り取り", role: "cut" },
  { label: "コピー", role: "copy" },
  { label: "貼り付け", role: "paste" },
  { type: "separator" },
  {
    label: "ERChatについて",
    click() {
      dialog.showMessageBox({
        icon: icon,
        message: "ERChatという名前のアプリです",
        detail:
          "Electron:" +
          electronVersion +
          "\nReact:" +
          reactVersion +
          "\nアプリのバージョン:" +
          appVersion +
          "\n開発者: 🇻🇳のチーム ",
        buttons: ["OK"],
      });
    },
  },
];
let contextMenu = Menu.buildFromTemplate(template);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 554,
    width: 763,
    minHeight: 435,
    minWidth: 630,
    webPreferences: {
      nodeIntegration: false,
    },
    icon: icon,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

  // create context menu
  mainWindow.webContents.on("context-menu", () => {
    contextMenu.popup();
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
