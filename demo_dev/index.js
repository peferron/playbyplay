$(function() {
    function show() {
        playbyplay.show(function(err, run) {
            if (err) {
                alert(err);
                return;
            }
            if (run) {
                $('#input').text(run.input);
            }
        });
    }

    $('#show').on('click', show);
});
