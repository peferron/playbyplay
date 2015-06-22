describe('hide: after clearing', () => {
    beforeEach(playbyplay.clear);

    it('should call the callback and hide', done => {
        function onShow(err) {
            expect(err).to.be.null;
            expect($('#playbyplay')).to.exist;
            $('.playbyplay-hide').click();
        }

        function callback(err, runToRestore) {
            expect(err).to.be.null;
            expect(runToRestore).to.be.undefined;
            expect($('#playbyplay')).to.not.exist;
            done();
        }

        playbyplay.show({onShow: onShow}, callback);
    });

    after(playbyplay.clear);
});
