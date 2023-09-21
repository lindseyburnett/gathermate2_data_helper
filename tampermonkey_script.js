// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wowhead.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wowhead.com
// @grant    GM.setClipboard
// ==/UserScript==

(function() {
    window.addEventListener("load", () => {
      addButton("Copy g_mapperData");
    });
  
    function addButton(text, onclick, cssObj) {
      cssObj = cssObj || {
        position: "relative",
        top: "15%",
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: "#00cccc",
        color: "white",
        border: "none",
        padding: "10px 20px"
      };
      let button = document.createElement("button"),
        btnStyle = button.style;
  
  
        document.getElementsByClassName("mapper")[0].appendChild(button);
  
      button.innerHTML = text;
      // Settin function for button when it is clicked.
      button.onclick = selectReadFn;
      Object.keys(cssObj).forEach(key => (btnStyle[key] = cssObj[key]));
      return button;
    }
  
    function selectReadFn() {
  
  
  GM.setClipboard (JSON.stringify(g_mapperData));
    }
  })();
  