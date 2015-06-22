describe('clear: after clearing and appending a run and showing', () => {
    const run = {input: 'i1', output: 'o1', status: 's1'};

    beforeEach(done => {
        playbyplay.clear(clearErr => {
            expect(clearErr).to.be.null;

            playbyplay.append(run, appendErr => {
                expect(appendErr).to.be.null;

                playbyplay.show({onShow: done}, () => {
                    assert.fail();
                });
            });
        });
    });

    it('should contain the run', () => {
        utils.expectRuns([run]);
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
