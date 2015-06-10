$(function() {
    function getOutput(input) {
        var output = 0;
        for (var i = 0; i < input.length; i++) {
            output += input.charCodeAt(i);
        }

        return output;
    }

    $('#run').on('click', function() {
        var input = $('#input').val();
        var output = getOutput(input);

        playbyplayui.save({
            input: input,
            output: output
        });

        $('#output').text(output);
    });

    $('#load').on('click', playbyplayui.show);
});
