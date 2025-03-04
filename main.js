const { app, BrowserWindow, screen } = require('electron/main');

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({ 
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,  // Allows fs access
            contextIsolation: false
        }
    });
    win.setFullScreen(false)
    win.loadFile('index.html');
    // win.webContents.openDevTools(); // Open DevTools
};

app.whenReady().then(() => {
    createWindow();
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
});
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
