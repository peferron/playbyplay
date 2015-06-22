describe('escape: after clearing and appending a run and showing', () => {
    const run = {
        input: '<script>alert("a");</script>',
        output: '<script>alert("b");</script>',
        status: '"><script>alert("c");</script><div class="'
    };

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

    it('should keep text unchanged', () => {
        expect($('.playbyplay-input pre')).to.have.text(run.input);
        expect($('.playbyplay-output pre')).to.have.text(run.output);
    });

    it('should sanitize class names', () => {
        expect($('.playbyplay-run')).to.have.class('playbyplay-status-scriptalertcscriptdivclass');
    });

    after(playbyplay.clear);
});
