const fs = require("fs");

const NODE_ID = 8;

function formatCoordinate(coord) {
  return `${(coord[0] * 100).toFixed(0)}${(coord[1] * 100).toFixed(0)}00`;
}

fs.readFile("g_mapperData.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const g_mapperData = JSON.parse(data);

  const GatherMateData2FishDB = {};

  for (const key in g_mapperData) {
    const zones = g_mapperData[key];
    GatherMateData2FishDB[key] = {};

    for (const zone of zones) {
      const transformedObject = {};
      zone.coords.forEach((coord) => {
        const formatted = formatCoordinate(coord);
        transformedObject[formatted] = NODE_ID;
      });

      GatherMateData2FishDB[key][zone.uiMapId] = transformedObject;
    }
  }

  const filePath = `output-${NODE_ID}.lua`;

  let luaTableString = "{\n";
  for (const key in GatherMateData2FishDB) {
    luaTableString += `  [${key}] = {\n`;
    for (const subkey in GatherMateData2FishDB[key]) {
      luaTableString += `    [${subkey}] = {\n`;
      for (const subsubkey in GatherMateData2FishDB[key][subkey]) {
        luaTableString += `      [${subsubkey}] = ${GatherMateData2FishDB[key][subkey][subsubkey]},\n`;
      }
      luaTableString += "    },\n";
    }
    luaTableString += "  },\n";
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
