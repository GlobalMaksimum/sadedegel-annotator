const electron = require('electron');
const path = require('path');
const url = require('url');
const dialog = electron.dialog;
const fs = require('fs')

// SET ENV
process.env.NODE_ENV = 'development';

const { app, BrowserWindow, Menu, ipcMain } = electron;
let mainWindow, filePaths, fileContent;
let fileIndex = 0;

// Listen for app to be ready
app.on('ready', function () {
  // Create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.setSize(600, 800);
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Quit app when closed
  mainWindow.on('closed', function () {
    app.quit();
  });


  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

function loadFile() {
  if (fileIndex === filePaths.length) {

    const options = {
      type: 'question',
      buttons: ['Ok'],
      defaultId: 2,
      title: 'Done',
      message: 'You have labeled all selected files.'
    };

    dialog.showMessageBox(null, options);
    mainWindow.webContents.send('item:clear');
    return;
  }

  const filePath = filePaths[fileIndex];
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.log("An error ocurred reading the file :" + err.message);
      return;
    }

    fileContent = JSON.parse(data);
    fileContent.sentences = fileContent.sentences.map(content => ({ content: content, deletedInRound: 0 }))
    for (i = 0; i < fileContent.sentences.length; i++)
      fileContent.sentences[i].id = i + 1;

    console.log(fileContent.sentences)
    const fileName = path.parse(filePath).base;
    mainWindow.webContents.send('item:add', fileContent.sentences, fileIndex, fileName);

  });
}


// Create menu template
const mainMenuTemplate = [
  // Each object is a dropdown
  {
    label: 'File',
    submenu: [
      /*{
        label:'Load Directory',
        click(){
          loadDirectory();
        }
      },*/
      {
        label: 'Clear Items',
        click() {
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({
    label: ''
  })
}

ipcMain.on('filesSelected', function (e, files) {

  filePaths = [];
  for (i = 0; i < files.length; i++) {
    filePath = files[i];
    extension = path.extname(filePath);
    dirname = path.dirname(filePath);
    basename = path.basename(filePath, extension);

    if (extension.toLowerCase() != '.json' || filePath.match(".*/labeled/.*"))
      continue;

    if (fs.existsSync(path.join(dirname, 'labeled', basename + '_labeled' + extension))) {
      console.log('skipping already labeled file :' + filePath);
      continue;
    }
    filePaths.push(files[i]);

  }

  fileIndex = 0;
  loadFile();

});


ipcMain.on('nextFile', function (e, results, round) {
  saveResults(results);
  fileIndex++;
  loadFile();
});



// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}



function updateRemainingSentences(round, deletedInThisRound) {
  fileContent.sentences.forEach(element => {

    if (deletedInThisRound.includes(element.id))
      element.deletedInRound = round;

    if (element.deletedInRound == 0 || element.deletedInRound == undefined || element.deletedInRound > round)
      element.deletedInRound = round + 1;

  });
}

function saveResults(results) {

  for (i = 0; i < fileContent.sentences.length; i++)
    fileContent.sentences[i].deletedInRound = results[i];

  console.log("fileContent:" + fileContent)
  jsonData = JSON.stringify(fileContent);
  inputFilePath = filePaths[fileIndex]

  inputDir = path.dirname(inputFilePath)
  inputFileName = path.basename(inputFilePath, '.json');
  outputDir = path.join(inputDir, "labeled")

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  fs.writeFile(path.join(outputDir, inputFileName + '_labeled.json',), jsonData, function (err) {
    if (err) {
      console.log(err);
    }
  });

}
