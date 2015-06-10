const containerId = 'playbyplay';

const containerInnerHTML = runs =>
`<button type="button" class="playbyplay__hide">Close history</button>
<table class="playbyplay__runs">
    ${runs.map(runHTML).join('')}
</table>`;

const runHTML = (run, index) =>
`<tr>
    <td class="playbyplay__run__col playbyplay__run__input">
        ${run.input}
    </td>
    <td class="playbyplay__run__col playbyplay__run__output">
        ${run.output}
    </td>
    <td class="playbyplay__run__col">
        <button type="button" class="playbyplay__run__restore" data-index="${index}">Restore</button>
    </td>
</tr>`;

// Same arguments as playbyplay.save.
export const save = playbyplay.save;

export function hide() {
    try {
        const container = document.getElementById(containerId);
        container.parentNode.removeChild(container);
    } catch (e) { // eslint-disable-line no-empty
    }
}

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
