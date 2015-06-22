function expectRuns(runs) {
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

describe('after clearing and appending a run and showing', () => {
    const run = {input: 'i1', output: 'o1', status: 's1'};

    beforeEach(done => {
        playbyplay.clear(() => {
            playbyplay.append(run, () => {
                playbyplay.show({onShow: done});
            });
        });
    });

    it('should contain the run', () => {
        expectRuns([run]);
    });

    describe('and clearing', () => {
        beforeEach(() => {
            $('.playbyplay-clear').click();
        });

        it('should contain the empty label', () => {
            expect($('.playbyplay-empty')).to.exist;
        });

        it('should not contain any run', () => {
            expect($('.playbyplay-run')).to.not.exist;
        });

        describe('and hiding and showing', () => {
            beforeEach(done => {
                $('.playbyplay-clear').click();
                playbyplay.show({onShow: done});
            });

            it('should contain the empty label', () => {
                expect($('.playbyplay-empty')).to.exist;
            });

            it('should not contain any run', () => {
                expect($('.playbyplay-run')).to.not.exist;
            });
        });
    });

    after(playbyplay.clear);
});
