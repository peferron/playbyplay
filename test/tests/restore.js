describe('after clearing and appending a run and showing', () => {
    const run = {input: 'i1', output: 'o1', status: 's1'};
    let callbackErr;
    let callbackRun;

    beforeEach(done => {
        callbackErr = undefined;
        callbackRun = undefined;

        playbyplay.clear(() => {
            playbyplay.append(run, () => {
                playbyplay.show({onShow: done}, (err, r) => {
                    callbackErr = err;
                    callbackRun = r;
                });
            });
        });
    });

    it('should not call the callback', () => {
        expect(callbackErr).to.be.undefined;
        expect(callbackRun).to.be.undefined;
    });

    describe('and restoring', () => {
        beforeEach(() => {
            $('.playbyplay-restore').click();
        });

        it('should call the callback', () => {
            expect(callbackErr).to.be.null;
            expect(callbackRun).to.deep.equal(run);
        });
    });

    after(playbyplay.clear);
});
