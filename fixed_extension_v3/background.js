
chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
    chrome.scripting.executeScript({
        target: {tabId: details.tabId},
        files: ["content.js"]
    });
}, {url: [{hostContains: "youtube.com"}]});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sendCaption") {
        fetch('http://localhost:8000/api/animation/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: message.text })
        })
        .then(response => response.json())
        .then(data => {
            chrome.tabs.sendMessage(sender.tab.id, { action: "displayAnimation", animations: data.animations });
        })
        .catch(err => console.error("Error talking to backend:", err));
    }
});
