1. Open fish/node/whatever in WoWhead
2. from devtools console, get g_mapperData.  Copy the object value.  Or use the tampermonkey script that will create the button to copy them all
3. Create files in the g_mapperData directory.  First four characters need to be the corresponding Constant for the node type as defined in GatherMate2/Constants.lua
4. Run main.js
5. Use output file to update GatherMate2_Data datafiles


TODO
- [ ] Configurable names for the output file 