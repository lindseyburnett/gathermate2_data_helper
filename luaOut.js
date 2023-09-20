
function jsonToLua(jsonString) {
    try {
      const jsonObject = {
        2023: {
          6430598000: 1117,
          6430598000: 1117,
          6430598000: 1117,
        },
        2024: {
          3040250000: 1117,
        },
      };
  
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
  
      const luaTableString = convertToLuaTable(jsonObject);
      return luaTableString;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  
  // Example JSON string
  const jsonString = '{"name": "John", "age": 30, "city": "New York"}';

  
  // Convert JSON to Lua
  const luaString = jsonToLua(jsonString);
  
  
  if (luaString !== null) {
    console.log("GatherMateData2FishDB = " + luaString);
  }