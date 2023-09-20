function luaToJson(luaString) {
    try {
      // Remove Lua comments and line breaks
      const cleanedLuaString = luaString.replace(/(--[^\r\n]*|\/\*[\s\S]*?\*\/|\n|\r)/g, '');
  
      // Remove leading/trailing spaces and semicolons
      const trimmedLuaString = cleanedLuaString.trim().replace(/;$/, '');
  
      // Replace '=' with ':' to make it valid JSON
      const jsonCompatibleLuaString = trimmedLuaString.replace(/=/g, ':');
  
      // Wrap the Lua table in {} to make it a valid JSON object
      const jsonObjectString = `{${jsonCompatibleLuaString}}`;

      console.log(jsonObjectString)
  
      const jsonObject = JSON.parse(jsonObjectString);
      return JSON.stringify(jsonObject, null, 2); // Convert JSON object to formatted JSON string
    } catch (error) {
      console.error("Error converting Lua to JSON:", error);
      return null;
    }
  }
  
  // Example Lua string
//   const luaString = '{ name = "John", age = 30, city = "New York" }';
  
  const luaString = `
  {
    	[2023] = {
    		[6430598000] = 1117,
            [6430598001] = 1117,
            [6430598002] = 1117,
    	},
        [2024] = {
            [3040250003] = 1117,
        }
    }
  `


  // Convert Lua to JSON
  const jsonString = luaToJson(luaString);
  
  if (jsonString !== null) {
    console.log(jsonString);
  }
  
  
//   // Example Lua string
//   const luaString = `
//   GatherMateData2FishDB = {
// 	[2023] = {
// 		[6430598000] = 1117,
//         [6430598000] = 1117,
//         [6430598000] = 1117,
// 	},
//     [2024] = {
//         [3040250000] = 1117,
//     }
// }
//   `;
  
