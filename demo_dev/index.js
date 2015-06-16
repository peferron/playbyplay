window.onload = function() {
    function show() {
        playbyplay.show(function(err, run) {
            if (err) {
                alert(err);
                return;
            }
            if (run) {
                setInput(run.input);
            }
        });
    }

    function setInput(text) {
        var input = document.getElementById('input');
        input.innerHTML = '';
        input.appendChild(document.createTextNode(text));
    }

    document.getElementById('show').addEventListener('click', show, false);
};
