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

describe('after clearing', () => {
    beforeEach(playbyplay.clear);

    describe('and showing', () => {
        beforeEach(done => {
            playbyplay.show({onShow: done});
        });

        it('should contain the empty label', () => {
            expect($('.playbyplay-empty')).to.exist;
        });

        it('should not contain any run', () => {
            expect($('.playbyplay-run')).to.not.exist;
        });
    });

    describe('and appending a first run', () => {
        const first = {input: 'i1', output: 'o1', status: 's1'};

        beforeEach(done => {
            playbyplay.append(first, done);
        });

        describe('and showing', () => {
            beforeEach(done => {
                playbyplay.show({onShow: done});
            });

            it('should not contain the empty label', () => {
                expect($('.playbyplay-empty')).to.not.exist;
            });

            it('should contain the first run', () => {
                expectRuns([first]);
            });
        });

        describe('and appending a second run', () => {
            const second = {input: 'i2', output: 'o2', status: 's2'};

            beforeEach(done => {
                playbyplay.append(second, done);
            });

            describe('and showing', () => {
                beforeEach(done => {
                    playbyplay.show({onShow: done});
                });

                it('should contain the second then first run', () => {
                    expectRuns([second, first]);
                });
            });
        });
    });

    after(playbyplay.clear);
});
