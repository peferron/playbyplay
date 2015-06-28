describe('appendIfEqualToLast: after clearing and appending a run', () => {
    const run = {input: 'i1', output: 'o1', status: 's1'};

    beforeEach(done => {
        playbyplay.clear(() => {
            playbyplay.append(run, done);
        });
    });

    describe('and appending the same run with appendIfEqualToLast not set and showing', () => {
        beforeEach(done => {
            playbyplay.append(run, () => {
                playbyplay.show({onShow: done}, () => {
                    assert.fail();
                });
            });
        });

        it('should show the run only once', () => {
            utils.expectRuns([run]);
        });
    });

    describe('and appending the same run with appendIfEqualToLast = true and showing', () => {
        beforeEach(done => {
            playbyplay.append(run, {appendIfEqualToLast: true}, () => {
                playbyplay.show({onShow: done}, () => {
                    assert.fail();
                });
            });
        });

        it('should show the run twice', () => {
            utils.expectRuns([run, run]);
        });
    });

    after(playbyplay.clear);
});
