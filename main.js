const fs = require("fs"); // Import the fs module

const NODE_ID = 1113;

// Read the JSON file
fs.readFile("g_mapperData.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  const g_mapperData = JSON.parse(data);

  const myformat = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
  });

  const formatCoordinate = (coord) => {
    const pointX = myformat.format(coord[0]).toString().replace(".", "");
    const pointY = myformat.format(coord[1]).toString().replace(".", "");

    return `${pointX}${pointY}00`;
  };

  const GatherMateData2FishDB = {};

  for (const key in g_mapperData) {
    const zones = g_mapperData[key];

    for (const zone of zones) {
      const coordinates = zone.coords;

      const transformedObject = {};
      coordinates.forEach((coord) => {
        const formatted = formatCoordinate(coord);

        transformedObject[formatted] = NODE_ID;
      });

      GatherMateData2FishDB[zone["uiMapId"]] = transformedObject;
    }
  }

  // Define the file path where you want to save the Lua data
  const filePath = `output-${NODE_ID}.lua`;

  // Write the Lua data to the file
  fs.writeFile(filePath, jsonToLua(GatherMateData2FishDB), "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log(`Lua data has been written to ${filePath}`);
  });
});

function jsonToLua(obj) {
  try {
    function convertToLuaTable(obj) {
      let luaTable = "{\n";
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          let value = obj[key];
          if (typeof value === "object") {
            value = convertToLuaTable(value);
          } else if (typeof value === "string") {
            value = `"${value}"`;
          }
          luaTable += `  ${key} = ${value},\n`;
        }
      }
      luaTable += "}";
      return luaTable;
    }

    const luaTableString = convertToLuaTable(obj);
    return luaTableString;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}
