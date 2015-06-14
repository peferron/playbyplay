(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.playbyplay = {});
})(this, function (exports) {

    var entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;'
    };

    var escapeHTML = function escapeHTML(str) {
        return String(str).replace(/[&<>"'\/]/g, function (s) {
            return entities[s];
        });
    };

    var containerInnerHTML = function containerInnerHTML(runs) {
        return '<button class="playbyplay__hide">&lt; Back</button>' + ('' + (runs.length ? runsHTML(runs) : 'History is empty.'));
    };

    var runsHTML = function runsHTML(runs) {
        return '<button class="playbyplay__clear">Clear</button>\n<table class="playbyplay__runs">' + runs.map(runHTML).join('') + '</table>';
    };

    var runHTML = function runHTML(run, index) {
        return '<tr class="playbyplay__run ' + statusClass(run) + '">\n    <td class="playbyplay__run__col playbyplay__run__input">\n        <pre><code>' + escapeHTML(run.input) + '</code></pre>\n    </td>\n    <td class="playbyplay__run__col playbyplay__run__output">\n        <pre>' + escapeHTML(run.output) + '</pre>\n    </td>\n    <td class="playbyplay__run__col">\n        <button class="playbyplay__run__restore" data-index="' + escapeHTML(index) + '">Restore</button>\n    </td>\n</tr>';
    };

    var statusClass = function statusClass(run) {
        return run.status ? 'playbyplay__run--' + escapeHTML(run.status) : '';
    };

    var key = 'playbyplay_0fE#n9asNy4^MD1jfj&!';
    var containerId = 'playbyplay';

    function save(run, options, callback) {
        setTimeout(function () {
            localhistory.save(key, run, options, callback);
        }, 0);
    }

    function show(callback) {
        localhistory.load(key, function (err, runs) {
            if (err) {
                callback(err);
                return;
            }
            showRuns(runs, callback);
        });
    }

    function showRuns(runs, callback) {
        hide();

        var container = document.createElement('div');

        container.id = containerId;
        container.innerHTML = containerInnerHTML(runs);

        container.addEventListener('click', function (e) {
            switch (e && e.target && e.target.className) {
                case 'playbyplay__hide':
                    hide();
                    callback(null);
                    return;
                case 'playbyplay__clear':
                    hide();
                    localhistory.clear(key, function () {
                        show(callback);
                    });
                    return;
                case 'playbyplay__run__restore':
                    // Use getAttribute instead of dataset for compatibility:
                    // http://caniuse.com/#feat=dataset
                    var index = e.target.getAttribute('data-index');
                    hide();
                    callback(null, runs[index]);
                    return;
            }
        }, false);

        document.body.appendChild(container);
    }

    function hide() {
        try {
            var container = document.getElementById(containerId);
            container.parentNode.removeChild(container);
        } catch (e) {}
    }

    exports.save = save;
    exports.show = show;
});
//# sourceMappingURL=./playbyplay.js.map
// eslint-disable-line no-empty