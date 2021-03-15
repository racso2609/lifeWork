const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');
const template = require('./templates/Templates');



//windows
let mainWindow;
let productWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(template.MenuBar);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    })
});

exports.createNewProductWindow = () => {
    productWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'New putica'
    });
    //productWindow.setMenu(null);
    productWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/newProduct.html'),
        protocol: 'file',
        slashes: true
    }))
    productWindow.on('closed', () => {
        productWindow = null;
    })
}

//Validations
if (process.platform !== 'darwin') {
    template.MenuBar.unshift({
        label: app.getName()
    });
}
if (process.env.NODE_ENV !== 'production') {
    template.MenuBar.push(template.DevTools);
}
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', 'bin', 'electron')
    })
}