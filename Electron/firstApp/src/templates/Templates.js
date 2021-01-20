const { app } = require('electron/main');
const Windows = require('../index');

module.exports = {
    'MenuBar': [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Bella',
                    accelerator: 'Ctrl+ N',
                    click() {
                        Windows.createNewProductWindow();
                    }
                }, {
                    label: 'Remove all products',
                    accelerator: process.platform == 'darwin' ? 'command+Q ' : 'Ctrl+Q',
                    click() {

                    }
                }, {
                    label: 'Quit',
                    accelerator: process.platform == 'darwin' ? 'command+Q ' : 'Ctrl+W',
                    click() {
                        app.quit();
                    }
                }
            ]
        }
    ],
    'DevTools': {
        label: 'Dev',
        submenu: [
            {
                label: 'show/hide',
                accelerator: 'Ctrl+f11',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }, {
                role: 'reload'
            }
        ]
    }
}


