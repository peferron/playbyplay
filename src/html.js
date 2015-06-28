const escapeClass = str => String(str).replace(/[^a-z0-9]/g, '');

const escapeHTML = str => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

const emptyHTML = `<span class="playbyplay-empty">History is empty.</span>`;

const statusClass = run => run.status ? `playbyplay-status-${escapeClass(run.status)}` : '';

const runHTML = (run, index) =>
`<tr class="playbyplay-run ${statusClass(run)}">
    <td class="playbyplay-col playbyplay-input">
        <pre class="playbyplay-pre"><code>${escapeHTML(run.input)}</code></pre>
    </td>
    <td class="playbyplay-col playbyplay-output">
        <pre class="playbyplay-pre">${escapeHTML(run.output)}</pre>
    </td>
    <td class="playbyplay-col">
        <button class="playbyplay-button playbyplay-restore" data-index="${index}">
            Restore
        </button>
    </td>
</tr>`;

const runsHTML = runs =>
`<button class="playbyplay-button playbyplay-clear">Clear</button>
<table class="playbyplay-runs">
    ${runs.map(runHTML).join('')}
</table>`;

const containerInnerHTML = runs =>
`<button class="playbyplay-button playbyplay-hide">&lt; Back</button>` +
`${runs.length ? runsHTML(runs) : emptyHTML}`;

export default containerInnerHTML;
