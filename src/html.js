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
`<button class="playbyplay__hide">
    &lt; Back
</button><!--
-->${runs && runs.length ? runsHTML(runs) : emptyHTML}`;

const runsHTML = runs =>
`<button class="playbyplay__clear">
    Clear
</button>
<table class="playbyplay__runs">
    ${runs.map(runHTML).join('')}
</table>`;

const emptyHTML = `<span class="playbyplay__empty">History is empty.</span>`;

const runHTML = (run, index) =>
`<tr class="playbyplay__run ${statusClass(run)}">
    <td class="playbyplay__run__col playbyplay__run__input">
        <pre><code>${escapeHTML(run.input)}</code></pre>
    </td>
    <td class="playbyplay__run__col playbyplay__run__output">
        <pre>${escapeHTML(run.output)}</pre>
    </td>
    <td class="playbyplay__run__col">
        <button class="playbyplay__run__restore" data-index="${escapeHTML(index)}">Restore</button>
    </td>
</tr>`;

const statusClass = run => run.status ? `playbyplay__run--${escapeHTML(run.status)}` : '';

export default containerInnerHTML;
