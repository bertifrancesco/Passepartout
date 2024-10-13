"use strict";

const checkStatus = () => {
    const status = document.getElementById("status");
    if (document.getElementById("toggle").checked == true) {
        status.textContent = "ENABLED";
    } else {
        status.textContent = "DISABLED";
    }
};

const saveSettings = () => {
    chrome.storage.local.set(
        { toggle: document.getElementById("toggle").checked },
        () => {
            checkStatus();
        }
    );
};

const restoreSettings = () => {
    chrome.storage.local.get({ toggle: true }, (items) => {
        document.getElementById("toggle").checked = items.toggle;
        checkStatus();
    });
};

document.addEventListener("DOMContentLoaded", () => {
    restoreSettings();
});

document.getElementById("toggle").addEventListener("click", () => {
    saveSettings();
    if (document.getElementById("toggle").checked == true) {
        chrome.runtime.sendMessage({ method: "enableRules" });
    } else {
        chrome.runtime.sendMessage({ method: "disableRules" });
    }
});
