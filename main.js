const { promisify } = require("util");

const fs = require("fs");
const path = require("path");

const readdir = promisify(require("fs").readdir);
const readFile = promisify(require("fs").readFile);

const directoryPath = "g_mapperData"; // Specify the directory path

async function loadAllTheTables() {
  const luaTables = []; // Initialize an array to store the Lua tables

  let files = await readdir(directoryPath);

  const jsonFiles = files;

  for (let jsonFile of jsonFiles) {
    const filePath = path.join(directoryPath, jsonFile);

    let data = await readFile(filePath);

    let luaTable = JSON.parse(data);

    for (const property in luaTable) {
      luaTable[property][0].nodeId = jsonFile.substring(0, 4);
    }

    luaTables.push(luaTable);
  }

  return luaTables;
}

const GatherMateData2FishDB = {};
loadAllTheTables().then((luaTables) => {
  let g_mapperData = mergeNodeTypes(luaTables);

  const myformat = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
  });

  const formatCoordinate = (coord) => {
    const pointX = myformat.format(coord[0]).toString().replace(".", "");
    const pointY = myformat.format(coord[1]).toString().replace(".", "");

    return `${pointX}${pointY}00`;
  };

  for (const key in g_mapperData) {
    const zone = g_mapperData[key];

    GatherMateData2FishDB[key] = {};

    for (const property of zone) {
      const coordString = {};

      property["coords"].forEach((coord) => {
        const formatted = formatCoordinate(coord);
        coordString[formatted] = property.nodeId;
      });

      GatherMateData2FishDB[key][property.uiMapId] = {
        ...GatherMateData2FishDB[key][property.uiMapId],
        ...coordString,
      };
    }
  }

  const filePath = `FishData.lua`;

  let luaTableString = "{\n";
  for (const key in GatherMateData2FishDB) {
    for (const subkey in GatherMateData2FishDB[key]) {
      luaTableString += `    [${subkey}] = {\n`;
      for (const subsubkey in GatherMateData2FishDB[key][subkey]) {
        luaTableString += `      [${subsubkey}] = ${GatherMateData2FishDB[key][subkey][subsubkey]},\n`;
      }
      luaTableString += "    },\n";
    }
  }
  luaTableString += "}";

  fs.writeFile(filePath, luaTableString, "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log(`Lua data has been written to ${filePath}`);
  });
});

function mergeNodeTypes(nodeTypes) {
  const mergedNodeTypes = {};

  nodeTypes.forEach((nodeType) => {
    for (const key in nodeType) {
      if (nodeType.hasOwnProperty(key)) {
        if (mergedNodeTypes[key]) {
          // If the key exists in both mergedNodeTypes and nodeType, concatenate the arrays
          mergedNodeTypes[key] = [...mergedNodeTypes[key], ...nodeType[key]];
        } else {
          // If the key only exists in nodeType, copy it as is
          mergedNodeTypes[key] = nodeType[key];
        }
      }
    }
  });

  // console.log(mergedNodeTypes)

  return mergedNodeTypes;
}
