describe('after clearing and showing', () => {
    let callbackErr;
    let callbackRun;

    beforeEach(done => {
        callbackErr = undefined;
        callbackRun = undefined;

        playbyplay.clear(() => {
            playbyplay.show({onShow: done}, (err, run) => {
                callbackErr = err;
                callbackRun = run;
            });
        });
    });

    it('should append #playbyplay', () => {
        expect($('#playbyplay')).to.exist;
    });

    describe('and hiding', () => {
        beforeEach(() => {
            $('.playbyplay-hide').click();
        });

        it('should remove #playbyplay', () => {
            expect($('#playbyplay')).to.not.exist;
        });

        it('should call the callback', () => {
            expect(callbackErr).to.be.null;
            expect(callbackRun).to.be.undefined;
        });
    });

    after(playbyplay.clear);
});
