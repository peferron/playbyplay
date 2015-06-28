describe('noOnShow: after clearing and proxying localhistory.append', () => {
    let localhistoryLoad;
    let onAppend;

    before(done => {
        localhistoryLoad = localhistory.load;

        localhistory.load = function(key, callback) {
            localhistoryLoad(key, (err, runs) => {
                expect(err).to.be.null;
                callback(err, runs);
                onAppend();
            });
        };

        playbyplay.clear(done);
    });

    it('should append #playbyplay even if onShow is not set', done => {
        onAppend = () => {
            expect($('#playbyplay')).to.exist;
            done();
        };

        playbyplay.show(() => {
            assert.fail();
        });
    });

    after(done => {
        localhistory.load = localhistoryLoad;
        playbyplay.clear(done);
    });
});
