describe('localhistoryErr: after replacing localhistory.load with a failing mock', () => {
    const originalLoad = localhistory.load;

    beforeEach(() => {
        localhistory.load = function(key, callback) {
            callback(new Error('Mock error'));
        };
    });

    it('should call the callback with an error', done => {
        function onShow(err) {
            expect(err).to.deep.equal(new Error('Mock error'));
            expect($('#playbyplay')).to.not.exist;
            done();
        }

        function callback() {
            assert.fail();
        }

        playbyplay.show({onShow: onShow}, callback);
    });

    after(() => {
        localhistory.load = originalLoad;
    });
});
