describe('restore: after clearing and appending a run', () => {
    const run = {input: 'i1', output: 'o1', status: 's1'};

    beforeEach(done => {
        playbyplay.clear(err => {
            expect(err).to.be.null;
            playbyplay.append(run, done);
        });
    });

    it('should call the callback and hide', done => {
        function onShow(err) {
            expect(err).to.be.null;
            expect($('#playbyplay')).to.exist;
            $('.playbyplay-restore').click();
        }

        function callback(err, runToRestore) {
            expect(err).to.be.null;
            expect(runToRestore).to.deep.equal(run);
            expect($('#playbyplay')).to.not.exist;
            done();
        }

        playbyplay.show({onShow: onShow}, callback);
    });

    after(playbyplay.clear);
});
