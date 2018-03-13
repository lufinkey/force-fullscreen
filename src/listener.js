
let TC = new TabCinema();

// listen to events from child/parent windows
var TCrequests = [
    'ff_requestVideos',
    'ff_reportVideos',
    'ff_reportDone',
    'ff_maximizeVideo',
    'ff_minimizeVideo',
    'ff_addOverlay',
    'ff_removeOverlays',
    'ff_removeOverlay',
    'ff_requestEndFullscreen'
];

window.addEventListener("message", function (event) {
    if (TCrequests.indexOf(event.data.message) === -1) {
        // do not respond to messages that do not belong to TC
        return;
    }

    // process message
    switch (event.data.message) {
        case 'ff_requestVideos':
            TC.findVideos(event.data.path);
            break;
        case 'ff_reportDone':
            TC.processReport();
            break;
        case 'ff_reportVideos':
            TC.addVideos(event.source, event.data.videos);
            break;
        case 'ff_maximizeVideo':
            TC.maximizeVideo(event.data.path);
            break;
        case 'ff_minimizeVideo':
            TC.minimizeVideo();
            break;
        case 'ff_addOverlay':
            TC.addOverlay(event.data.uid);
            break;
        case 'ff_removeOverlays':
            TC.removeOverlays();
            break;
        case 'ff_removeOverlay':
            TC.removeOverlay(event.data.uid);
            break;
        case 'ff_requestEndFullscreen':
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
                    message: 'ff_requestVideos',
                    path: []
                }, '*');
                break;
            case 'maximized':
                window.top.postMessage({
                    message: 'ff_requestEndFullscreen'
                }, '*');
                break;
            case 'overlay':
                window.top.postMessage({
                    message: 'ff_removeOverlays'
                }, '*');
                break;
        }
        e.stopPropagation();
        e.preventDefault();
    }
});
