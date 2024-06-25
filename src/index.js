const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const listFiles = require('./functions/listFiles');
const countFolders = require('./functions/countFolders');

process.env = 'pro'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 450,
        maxWidth: 450,
        minWidth: 450,
        height: 600,
        title: "[PPC] : PDF Page Counter",
        icon: './src/images/icon.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    if (process.env == 'dev') {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }

    mainWindow.menuBarVisible = false
};

async function hdl_OpenDir () {
    try {

        const { canceled, filePaths } = await dialog.showOpenDialog({"properties": ["openDirectory"]})

        if (!canceled) {

            let revision = await listFiles(path.resolve(filePaths[0]), path.resolve(filePaths[0]))
            //console.log(`INFO <revision> `,  JSON.stringify(revision) )

            let folders = await countFolders( path.resolve(filePaths[0]) )
            console.log(`INFO <folders> `, JSON.stringify( folders ))

            let response = {
                "filepath": filePaths[0],
                "filesData": revision,
                "foldersData": folders
            }

            console.log(`INFO <response> `, JSON.stringify(response) )
            return response
        }

    } catch (error) {
        console.log('ERR <hdl_OpenDir>: ', error)
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', async () => {

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('dialog:open_dir', hdl_OpenDir)