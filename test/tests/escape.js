describe('after clearing and appending a run and showing', () => {
    const pbp = () => document.getElementById('playbyplay');
    const inputText = run => run.getElementsByClassName('playbyplay-input')[0].textContent.trim();
    const outputText = run => run.getElementsByClassName('playbyplay-output')[0].textContent.trim();
    const classes = run => run.className.split(/\s+/);

    const first = {
        input: '<script>alert("Mille millions de mille sabords !");</script>',
        output: '<script>alert("Tonnerre de Brest !");</script>',
        status: '"><script>alert("x");</script><div class="'
    };

    beforeEach(done => {
        playbyplay.clear(() => {
            playbyplay.append(first, () => {
                playbyplay.show({onShow: done});
            });
        });
    });

    it('should contain the escaped run', () => {
        const runs = pbp().getElementsByClassName('playbyplay-run');
        expect(runs).to.have.length(1);

        expect(inputText(runs[0])).to.equal(first.input);
        expect(outputText(runs[0])).to.equal(first.output);
        expect(classes(runs[0])).to.contain(`playbyplay-status-"><script>alert("x");</script><div`);
        expect(classes(runs[0])).to.contain(`class="`);
    });

    after(playbyplay.clear);
});
