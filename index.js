#!/usr/bin/env node

const fs = require("fs"); // Or `import fs from "fs";` with ESM
const path = require("path");
const version = '1.0.0';
const usage = `
Usage: boltinfo /path/to/asset/file [OPTIONS]

DESCRIPTION:
  Show the information of a Bolt Asset
  
OPTIONS
  -d --directory  Target directory for searching the asset dependencies.
                  [Default] The current directory of the asset file.
  -v --version    Show the Bolt Info version
`;

if (process.argv.length < 3) {
  console.log(usage);
  process.exit();
}

const supportOptions = [ '-v', '--version', '-d', '--directory' ];

let option = '';
for (const argv of process.argv) {
  if (supportOptions.includes(argv)) {
    option = argv;
    break;
  }
}

let directory = '';
let assetFile = '';
switch(option) {
  case '-v':
  case '--version':
    console.log(`Bolt Info version ${version}`);
    process.exit();
    break;

  case '-d':
  case '--directory':
    if (process.argv.length < 5) {
      console.log(usage);
      process.exit();
    }
    assetFile = path.resolve(process.argv[2]);
    directory = process.argv[4];
    directory = path.resolve(directory);
    directory = directory.endsWith('/') ? directory : `${directory}/`;
    showInfo(directory, assetFile);
    break;
  default:
    assetFile = path.resolve(process.argv[2]);
    directory = path.dirname(assetFile);
    directory = directory.endsWith('/') ? directory : `${directory}/`;
    showInfo(directory, assetFile);
    break;
}

function showInfo(directory, assetFilePath) {
  // Check if directory exists
  if (!fs.existsSync(directory)) {
    console.log(`Directory ${directory} doesn't exist`);
    return;
  }

  // Check if asset file exists
  if (!fs.existsSync(assetFilePath)) {
    console.log(`File ${assetFilePath} doesn't exist`);
    return;
  }

  if (!assetFilePath.endsWith('.asset')) {
    console.log(`Invalid asset file ${assetFilePath}`);
    return;
  }

  fs.readFile(assetFilePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const assetFile = parseBoltFlowAssetFile(data);
    const allFiles = walkSync(directory, [], file => {
      return file.endsWith('.meta');
    });

    if (typeof (assetFile.asset) === 'undefined') {
      console.log(`Invalid asset file ${assetFile}`);
      process.exit();
    }

    const dependencyFiles = assetFile.dependencies;
    const allMetaFileContents = [];

    // Get all meta files in the directory.
    for (const file of allFiles) {
      allMetaFileContents.push(new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          resolve(data);
        });
      }));
    }

    Promise.all(allMetaFileContents).then(fileContents => {
      const foundDependencyFiles = {};
      for (const [index, file] of allFiles.entries()) {
        const guid = parseMetaFile(fileContents[index]);
        const assetFilePath = file.replace(/.meta$/g, '');
        if (dependencyFiles.includes(guid) && fs.existsSync(assetFilePath)) {
          foundDependencyFiles[guid] = assetFilePath;
        }
      }
      for (const guid of dependencyFiles) {
        if (!(guid in foundDependencyFiles)) {
          foundDependencyFiles[guid] = `Not found`;
        }
      }
      let result = {
        'title': assetFile.asset.title,
        'summary': assetFile.asset.summary,
        'dependencies': foundDependencyFiles
      };
      console.log(JSON.stringify(result, null, 2));
    });
  });
}

//=====================================================================================================================
function parseBoltFlowAssetFile(fileContent) {
  const lines = fileContent.toString().split('\n');
  let lineJson = '';
  const lineObjectReferences = [];
  for (let i = 0; i < lines.length;) {
    let line = lines[i];
    if (line.trim().startsWith('_json')) {
      lineJson = line;
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('_')) {
        line = lines[i].trim();
        lineJson += line;
        i++;
      }
    } else if (line.trim().startsWith('_objectReferences')) {
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('_')) {
        line = lines[i].trim();
        const guidMessage = line.match(/guid:\s[a-z0-9]+/);
        if (guidMessage !== null) {
          const objectReference = guidMessage.pop().split(' ').pop();
          lineObjectReferences.push(objectReference);
        }
        i++;
      }
    } else {
      i++;
    }
  }

  const jsonString = lineJson.substring(lineJson.indexOf('{'), lineJson.lastIndexOf('}') + 1);
  try {
    return {
      asset: JSON.parse(jsonString).graph,
      dependencies: lineObjectReferences
    };
  } catch (e) {
    return null;
  }
}

function parseMetaFile(fileContent) {
  const lines = fileContent.toString().split('\n');
  for (const line of lines) {
    const guidMessage = line.match(/guid:\s[a-z0-9]+/);
    if (guidMessage !== null) {
      return guidMessage.pop().split(' ').pop();
    }
  }
  return '';
}

// Get list of all file in the directory
function walkSync(dir, fileList, filterCallback = null) {
  const files = fs.readdirSync(dir);
  fileList = fileList || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      fileList = walkSync(dir + file + '/', fileList, filterCallback);
    }
    else {
      if (filterCallback === null || filterCallback(dir + file)) {
        fileList.push(dir + file);
      }
    }
  });
  return fileList;
}
