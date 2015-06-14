import containerInnerHTML from './html';

const containerId = 'playbyplay';

export const save = playbyplay.save;

export function show(callback) {
    playbyplay.load((err, runs) => {
        if (err) {
            callback(err);
            return;
        }
        showRuns(runs, callback);
    });
}

function showRuns(runs, callback) {
    hide();

    const container = document.createElement('div');

    container.id = containerId;
    container.innerHTML = containerInnerHTML(runs);

    container.addEventListener('click', e => {
        switch (e && e.target && e.target.className) {
            case 'playbyplay__hide':
                hide();
                callback(null);
                return;
            case 'playbyplay__clear':
                hide();
                playbyplay.clear();
                callback(null);
                return;
            case 'playbyplay__run__restore':
                // Use getAttribute instead of dataset for compatibility:
                // http://caniuse.com/#feat=dataset
                const index = e.target.getAttribute('data-index');
                hide();
                callback(null, runs[index]);
                return;
        }
    }, false);

    document.body.appendChild(container);
}

function hide() {
    try {
        const container = document.getElementById(containerId);
        container.parentNode.removeChild(container);
    } catch (e) { // eslint-disable-line no-empty
    }
}
