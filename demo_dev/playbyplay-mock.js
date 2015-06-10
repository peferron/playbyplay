(function() {
    var runs = [
        {
            input: 'input1 input1 input1 input1 input1 input1 input1 input1',
            output: 'output1 output1 output1 output1 output1 output1 output1 output1'
        },
        {
            input: 'input2 input2 input2 input2 input2 input2 input2 input2',
            output: 'output2 output2 output2 output2 output2 output2 output2 output2'
        }
    ];

    window.playbyplay = {};

    window.playbyplay.load = function(callback) {
        callback(null, runs);
    };
}());
