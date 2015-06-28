window.onload = function() {
    var runs = [
        {
            input: 'fn main() {\n    yikes\n}',
            output: '<anon>:2:5: 2:10 error: unresolved name `yikes`\n<anon>:2     yikes\n             ^~~~~\nerror: aborting due to previous error\nplaypen: application terminated with error code 101\n\nCompilation failed.',
            status: 'error'
        },
        {
            input: 'fn main() {\n    let a = 0;\n}',
            output: '<anon>:2:9: 2:10 warning: unused variable: `a`, #[warn(unused_variables)] on by default\n<anon>:2     let a = 0;\n                 ^\n\nProgram ended.',
            status: 'warning'
        },
        {
            input: 'fn main() {\n    println!("Hello World!");\n}',
            output: 'Hello World!\n\nProgram ended.',
            status: 'success'
        }
    ];

    function appendRuns(done, start) {
        var s = start || 0;
        if (s >= runs.length) {
            done();
            return;
        }
        playbyplay.append(runs[s], function() {
            appendRuns(done, s + 1);
        });
    }

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

    playbyplay.clear(function() {
        appendRuns(show);
    });
};
