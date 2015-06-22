import containerInnerHTML from './html';

const key = 'playbyplay_0fE#n9asNy4^MD1jfj&!';
const containerId = 'playbyplay';

export const supported = localhistory.supported;

export function append(run, options, callback) {
    setTimeout(() => {
        localhistory.append(key, run, options, callback);
    }, 0);
}

// options is optional, callback is required. Usually, required arguments go first, but having the
// callback last leads to cleaner calling code with closures.
export function show(options, callback) {
    const cb = typeof options === 'function' ? options : callback;
    const opts = fillShowOptions(typeof options === 'object' ? options : {});

    localhistory.load(key, (err, runs) => {
        if (err) {
            if (opts.onShow) {
                opts.onShow(err);
            }
            return;
        }
        showRuns(runs, opts, cb);
    });
}

function fillShowOptions(options) {
    if (!options.parent) {
        options.parent = document.body;
    }
    return options;
}

function showRuns(runs, options, callback) {
    hide();

    // The most recently appended runs should be on top.
    runs.reverse();

    const container = document.createElement('div');

    container.id = containerId;
    container.innerHTML = containerInnerHTML(runs);

    container.addEventListener('click', e => {
        switch (e && e.target && e.target.className) {
            case 'playbyplay-button playbyplay-hide':
                hide();
                callback(null);
                return;

            case 'playbyplay-button playbyplay-clear':
                hide();
                clear(() => {
                    show(callback);
                });
                return;

            case 'playbyplay-button playbyplay-restore':
                // Use getAttribute instead of dataset for compatibility:
                // http://caniuse.com/#feat=dataset
                const index = e.target.getAttribute('data-index');
                hide();
                callback(null, runs[index]);
                return;
        }
    }, false);

    let err = null;
    try {
        options.parent.appendChild(container);
    } catch (e) {
        err = e;
    }

    if (options.onShow) {
        options.onShow(err);
    }
}

function hide() {
    try {
        const container = document.getElementById(containerId);
        container.parentNode.removeChild(container);
    } catch (e) {}
}

export function clear(callback) {
    localhistory.clear(key, callback);
}
