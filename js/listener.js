
let TC = new ForceFullscreen();

// listen to events from child/parent windows
var TCrequests = [
    'requestVideos',
    'reportVideos',
    'reportDone',
    'maximizeVideo',
    'minimizeVideo',
    'addOverlay',
    'removeOverlays',
    'removeOverlay',
    'requestEndFullscreen'
];

window.addEventListener("message", function (event) {
    if (TCrequests.indexOf(event.data.message) === -1) {
        // do not respond to messages that do not belong to TC
        return;
    }

    // process message
    switch (event.data.message) {
        case 'requestVideos':
            TC.findVideos(event.data.path);
            break;
        case 'reportDone':
            TC.processReport();
            break;
        case 'reportVideos':
            TC.addVideos(event.source, event.data.videos);
            break;
        case 'maximizeVideo':
            TC.maximizeVideo(event.data.path);
            break;
        case 'minimizeVideo':
            TC.minimizeVideo();
            break;
        case 'addOverlay':
            TC.addOverlay(event.data.uid);
            break;
        case 'removeOverlays':
            TC.removeOverlays();
            break;
        case 'removeOverlay':
            TC.removeOverlay(event.data.uid);
            break;
        case 'requestEndFullscreen':
            TC.minimizeVideo();
            break;
    }
}, false);


// listen to shortcut key
document.body.addEventListener('keydown', function (e) {
    if ((e.keyCode === 32 && e.ctrlKey) || (e.keyCode === 27 && (TC.state === 'maximized' || TC.state === 'overlay'))) {
        switch (TC.state) {
            default:
            case 'normal':
                window.top.postMessage({
                    message: 'requestVideos',
                    path: []
                }, '*');
                break;
            case 'maximized':
                window.top.postMessage({
                    message: 'requestEndFullscreen'
                }, '*');
                break;
            case 'overlay':
                window.top.postMessage({
                    message: 'removeOverlays'
                }, '*');
                break;
        }
        e.stopPropagation();
        e.preventDefault();
    }
});
