describe('after clearing and appending a run and showing', () => {
    const run = {
        input: '<script>alert("a");</script>',
        output: '<script>alert("b");</script>',
        status: '"><script>alert("c");</script><div class="'
    };

    beforeEach(done => {
        playbyplay.clear(() => {
            playbyplay.append(run, () => {
                playbyplay.show({onShow: done});
            });
        });
    });

    it('should contain the escaped run', () => {
        expect($('.playbyplay-input pre')).to.have.text(run.input);
        expect($('.playbyplay-output pre')).to.have.text(run.output);
        expect($('.playbyplay-run')).to.have.class('playbyplay-status-scriptalertcscriptdivclass');
    });

    after(playbyplay.clear);
});
