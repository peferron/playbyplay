const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
};

const escapeHTML = str => String(str).replace(/[&<>"'\/]/g, s => entities[s]);

const containerInnerHTML = runs =>
`<button class="playbyplay-button playbyplay-hide">&lt; Back</button>` +
`${runs.length ? runsHTML(runs) : 'History is empty.'}`;

const runsHTML = runs =>
`<button class="playbyplay-button playbyplay-clear">Clear</button>
<table class="playbyplay-runs">${runs.map(runHTML).join('')}</table>`;

const runHTML = (run, index) =>
`<tr class="playbyplay-run ${statusClass(run)}">
    <td class="playbyplay-col playbyplay-input">
        <pre class="playbyplay-pre"><code>${escapeHTML(run.input)}</code></pre>
    </td>
    <td class="playbyplay-col playbyplay-output">
        <pre class="playbyplay-pre">${escapeHTML(run.output)}</pre>
    </td>
    <td class="playbyplay-col">
        <button class="playbyplay-button playbyplay-restore" data-index="${escapeHTML(index)}">
            Restore
        </button>
    </td>
</tr>`;

const statusClass = run => run.status ? `playbyplay-status-${escapeHTML(run.status)}` : '';

export default containerInnerHTML;
