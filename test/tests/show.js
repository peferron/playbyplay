describe('show: after clearing', () => {
    beforeEach(playbyplay.clear);

    it('should show the empty label', done => {
        function onShow(err) {
            expect(err).to.be.null;
            expect($('.playbyplay-empty')).to.exist;
            expect($('.playbyplay-run')).to.not.exist;
            done();
        }

        function callback() {
            assert.fail();
        }

        playbyplay.show({onShow: onShow}, callback);
    });

    describe('and appending a first run', () => {
        const first = {input: 'i1', output: 'o1', status: 's1'};

        beforeEach(done => {
            playbyplay.append(first, done);
        });

        it('should show the first run', done => {
            function onShow(err) {
                expect(err).to.be.null;
                expect($('.playbyplay-empty')).to.not.exist;
                utils.expectRuns([first]);
                done();
            }

            function callback() {
                assert.fail();
            }

            playbyplay.show({onShow: onShow}, callback);
        });

        describe('and appending a second run', () => {
            const second = {input: 'i2', output: 'o2', status: 's2'};

            beforeEach(done => {
                playbyplay.append(second, done);
            });

            it('should show the second then first run', done => {
                function onShow(err) {
                    expect(err).to.be.null;
                    expect($('.playbyplay-empty')).to.not.exist;
                    utils.expectRuns([second, first]);
                    done();
                }

                function callback() {
                    assert.fail();
                }

                playbyplay.show({onShow: onShow}, callback);
            });
        });
    });

    after(playbyplay.clear);
});
