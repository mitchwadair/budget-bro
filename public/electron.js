const electron = require('electron');
const app = electron.app;
const session = electron.session;
const BrowserWindow = electron.BrowserWindow;

const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const path = require('path');
const fs = require('fs-extra');
const isDev = require('electron-is-dev');

//clear cache so itll launch
function deleteFolderRecursive(rmPath) {
    if (fs.existsSync(rmPath)) {
        fs.readdirSync(rmPath).forEach((file, index) => {
        const curPath = path.join(rmPath, file);
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
            deleteFolderRecursive(curPath);
        } else { // delete file
            fs.unlinkSync(curPath);
        }
        });
        fs.rmdirSync(rmPath);
    }
};

const appName = app.name;
const appPath = path.join(app.getPath('appData'), appName);
console.log(appPath);
deleteFolderRecursive(appPath);


app.disableHardwareAcceleration()

let mainWindow;

function createWindow() {
    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    mainWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true
            },
            show: false,
            frame: false,
        });
        mainWindow.maximize();
        mainWindow.show();
        mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
        if (isDev) {
                // Open the DevTools.
                //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
                mainWindow.webContents.openDevTools();
        }
        mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});