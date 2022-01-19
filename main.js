// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const createMenu = require("./menu");

let template = [
    { label: "もとに戻す", role: "undo" },
    { label: "やり直す", role: "redo" },
    { type: "separator" },
    { label: "切り取り", role: "cut" },
    { label: "コピー", role: "copy" },
    { label: "貼り付け", role: "paste" },
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
    });

    // and load the index.html of the app.
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.webContents.on("context-menu", () => {
        contextMenu.popup();
    });

    //Create menu
    createMenu();
}

app.whenReady().then(() => {
    createWindow();
    app.on("activate", function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") app.quit();
});