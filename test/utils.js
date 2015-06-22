const utils = {
    expectRuns: function(runs) {
        const $runs = $('.playbyplay-run');
        expect($runs.length).to.equal(runs.length);

        runs.forEach((run, i) => {
            const $run = $runs.eq(i);
            expect($('.playbyplay-input pre', $run)).to.have.text(run.input);
            expect($('.playbyplay-output pre', $run)).to.have.text(run.output);
            expect($('.playbyplay-restore', $run)).to.have.data('index', i);
            if (run.status) {
                expect($run).to.have.class(`playbyplay-status-${run.status}`);
            }
        });
    }
};
