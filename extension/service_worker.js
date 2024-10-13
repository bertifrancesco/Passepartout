"use strict";

chrome.runtime.onMessage.addListener((m) => {
    switch (m.method) {
        case "enableRules":
            chrome.declarativeNetRequest.updateEnabledRulesets(
                { enableRulesetIds: ["ruleset_1"] },
                () => console.log("Passepartout: enabled.")
            );
            break;
        case "disableRules":
            chrome.declarativeNetRequest.updateEnabledRulesets(
                { disableRulesetIds: ["ruleset_1"] },
                () => console.log("Passepartout: disabled.")
            );
            break;
    }
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
    console.log(`Passepartout: ${e.request.url} successfully bypassed.`);
});

console.log("Passepartout: service worker started.");
