window.onload = function() {
    var input = document.getElementById('input');
    var output = document.getElementById('output');

    function run() {
        try {
            output.value = eval(input.value);
            output.className = 'success';
        } catch (err) {
            output.value = err + '';
            output.className = 'error';
        }

        playbyplay.append({
            input: input.value,
            output: output.value,
            status: output.className
        });
    }

    function showHistory() {
        playbyplay.show(function(err, run) {
            if (err) {
                alert(err);
                return;
            }
            if (run) {
                input.value = run.input;
                output.value = '';
            }
        });
    }

    function setInput(text) {
        var input =
        input.innerHTML = '';
        input.appendChild(document.createTextNode(text));
    }

    document.getElementById('run').addEventListener('click', run, false);
    document.getElementById('show-history').addEventListener('click', showHistory, false);
};
