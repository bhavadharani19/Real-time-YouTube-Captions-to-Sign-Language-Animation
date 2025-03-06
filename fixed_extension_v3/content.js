
console.log("YouTube Sign Language Extension Loaded");

// Run initial check when page loads (for first video)
setTimeout(watchCaptions, 2000);

// Set up listener to detect video changes (SPA behavior)
window.addEventListener('yt-navigate-finish', () => {
    console.log("Video changed - resetting caption watcher.");
    setTimeout(watchCaptions, 2000);
});

function watchCaptions() {
    const captionContainer = document.querySelector('.ytp-caption-window-container');
    if (!captionContainer) {
        console.warn("Caption container not found - captions might be off.");
        return;
    }

    const observer = new MutationObserver(() => {
        captureCaptions();
    });

    observer.observe(captionContainer, { childList: true, subtree: true });
    console.log("Caption watcher started.");
}

function captureCaptions() {
    let captions = document.querySelectorAll('.ytp-caption-segment');
    let captionText = Array.from(captions).map(el => el.innerText).join(" ");

    if (captionText) {
        console.log("Sending captions to background:", captionText);
        chrome.runtime.sendMessage({ action: "sendCaption", text: captionText });
    } else {
        console.warn("No captions detected - captions might be off.");
    }
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "displayAnimation") {
        displayAnimations(message.animations);
    }
});

function displayAnimations(animations) {
    let container = document.getElementById('sign-language-overlay') || createOverlay();
    container.innerHTML = '';

    animations.forEach(anim => {
        if (Array.isArray(anim)) {
            anim.forEach(letter => container.append(createLetter(letter)));
        } else {
            let video = document.createElement('video');
            video.src = `http://localhost:8000/static/animations/${anim}`;
            video.autoplay = true;
            video.loop = false;
            video.style.width = '250px';  // Minimize the size of the animation
            video.style.height = '250px';  // Maintain aspect ratio
            container.append(video);
        }
    });
}

function createOverlay() {
    let overlay = document.createElement('div');
    overlay.id = 'sign-language-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '20px';    // Position at the top
    overlay.style.right = '20px';  // Align to the right
    overlay.style.zIndex = '9999';
    overlay.style.background = 'rgba(0,0,0,0.7)';
    overlay.style.padding = '10px';
    overlay.style.borderRadius = '10px';
    document.body.appendChild(overlay);
    return overlay;
}

function createLetter(letter) {
    let span = document.createElement('span');
    span.innerText = letter;
    span.style.fontSize = '24px';
    span.style.color = 'white';
    return span;
}
