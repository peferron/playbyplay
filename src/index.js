import containerInnerHTML from './html';

const key = 'playbyplay_0fE#n9asNy4^MD1jfj&!';
const containerId = 'playbyplay';

export function save(run, options, callback) {
    setTimeout(() => {
        localhistory.save(key, run, options, callback);
    }, 0);
}

export function show(callback) {
    localhistory.load(key, (err, runs) => {
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
                localhistory.clear(key, () => {
                    show(callback);
                });
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
    } catch (e) {}
}
