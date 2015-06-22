(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.playbyplay = {});
})(this, function (exports) {

    var escapeClass = function escapeClass(str) {
        return String(str).replace(/[^a-z0-9]/g, '');
    };

    var escapeHTML = function escapeHTML(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    var containerInnerHTML = function containerInnerHTML(runs) {
        return '<button class="playbyplay-button playbyplay-hide">&lt; Back</button>' + ('' + (runs.length ? runsHTML(runs) : emptyHTML));
    };

    var runsHTML = function runsHTML(runs) {
        return '<button class="playbyplay-button playbyplay-clear">Clear</button>\n<table class="playbyplay-runs">\n    ' + runs.map(runHTML).join('') + '\n</table>';
    };

    var runHTML = function runHTML(run, index) {
        return '<tr class="playbyplay-run ' + statusClass(run) + '">\n    <td class="playbyplay-col playbyplay-input">\n        <pre class="playbyplay-pre"><code>' + escapeHTML(run.input) + '</code></pre>\n    </td>\n    <td class="playbyplay-col playbyplay-output">\n        <pre class="playbyplay-pre">' + escapeHTML(run.output) + '</pre>\n    </td>\n    <td class="playbyplay-col">\n        <button class="playbyplay-button playbyplay-restore" data-index="' + index + '">\n            Restore\n        </button>\n    </td>\n</tr>';
    };

    var statusClass = function statusClass(run) {
        return run.status ? 'playbyplay-status-' + escapeClass(run.status) : '';
    };

    var emptyHTML = '<span class="playbyplay-empty">History is empty.</span>';

    var key = 'playbyplay_0fE#n9asNy4^MD1jfj&!';
    var containerId = 'playbyplay';

    var supported = localhistory.supported;

    function append(run, options, callback) {
        setTimeout(function () {
            localhistory.append(key, run, options, callback);
        }, 0);
    }

    // options is optional, callback is required. Usually, required arguments go first, but having the
    // callback last leads to cleaner calling code with closures.
    function show(options, callback) {
        var cb = typeof options === 'function' ? options : callback;
        var opts = fillShowOptions(typeof options === 'object' ? options : {});

        localhistory.load(key, function (err, runs) {
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

        var container = document.createElement('div');

        container.id = containerId;
        container.innerHTML = containerInnerHTML(runs);

        container.addEventListener('click', function (e) {
            switch (e && e.target && e.target.className) {
                case 'playbyplay-button playbyplay-hide':
                    hide();
                    callback(null);
                    return;

                case 'playbyplay-button playbyplay-clear':
                    hide();
                    clear(function () {
                        show(callback);
                    });
                    return;

                case 'playbyplay-button playbyplay-restore':
                    // Use getAttribute instead of dataset for compatibility:
                    // http://caniuse.com/#feat=dataset
                    var index = e.target.getAttribute('data-index');
                    hide();
                    callback(null, runs[index]);
                    return;
            }
        }, false);

        var err = null;
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
            var container = document.getElementById(containerId);
            container.parentNode.removeChild(container);
        } catch (e) {}
    }

    function clear(callback) {
        localhistory.clear(key, callback);
    }

    exports.supported = supported;
    exports.append = append;
    exports.show = show;
    exports.clear = clear;
});
//# sourceMappingURL=./playbyplay.js.map