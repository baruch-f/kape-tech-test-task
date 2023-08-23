const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const { countLetters} = require("./utils/mathModule");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load from localhost if in development
  // Otherwise load index.html file
  mainWindow.loadURL(
      isDev
          ? "http://localhost:3000"
          : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open DevTools if in dev mode
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

// Create a new browser window by invoking the createWindow
// function once the Electron application is initialized.
// Install REACT_DEVELOPER_TOOLS as well if isDev
app.whenReady().then(() => {
  createWindow();
});

// Add a new listener that tries to quit the application when
// it no longer has any open windows. This listener is a no-op
// on macOS due to the operating system's window management behavior.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Add a new listener that creates a new browser window only if
// when the application has no visible windows after being activated.
// For example, after launching the application for the first time,
// or re-launching the already running application.
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ipcMain.on('count-letters', (event, tasks) => {
//   const letterCount = countLetters(tasks);
//   event.reply('letter-count-result', letterCount);
// });

ipcMain.on("letterCount", (event, tasks) => {
  const letterCount = countLetters(tasks);
  mainWindow.webContents.send("letterCount", letterCount);
});
