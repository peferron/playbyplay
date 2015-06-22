describe('after clearing', () => {
    const pbp = () => document.getElementById('playbyplay');
    const inputText = run => run.getElementsByClassName('playbyplay-input')[0].textContent.trim();
    const outputText = run => run.getElementsByClassName('playbyplay-output')[0].textContent.trim();
    const classes = run => run.className.split(/\s+/);

    beforeEach(playbyplay.clear);

    describe('and showing', () => {
        beforeEach(done => {
            playbyplay.show({onShow: done});
        });

        it('should contain the empty label', () => {
            expect(pbp().getElementsByClassName('playbyplay-empty')).to.not.be.null;
        });
    });

    describe('and appending a first run', () => {
        const first = {input: 'a1', output: 'b1', status: 's1'};

        beforeEach(done => {
            playbyplay.append(first, done);
        });

        describe('and showing', () => {
            beforeEach(done => {
                playbyplay.show({onShow: done});
            });

            it('should contain the first run', () => {
                const runs = pbp().getElementsByClassName('playbyplay-run');
                expect(runs).to.have.length(1);

                expect(inputText(runs[0])).to.equal(first.input);
                expect(outputText(runs[0])).to.equal(first.output);
                expect(classes(runs[0])).to.contain(`playbyplay-status-${first.status}`);
            });
        });

        describe('and appending a second run', () => {
            const second = {input: 'a2', output: 'b2', status: 's1'};

            beforeEach(done => {
                playbyplay.append(second, done);
            });

            describe('and showing', () => {
                beforeEach(done => {
                    playbyplay.show({onShow: done});
                });

                it('should contain the first and second runs with the second run on top', () => {
                    const runs = pbp().getElementsByClassName('playbyplay-run');
                    expect(runs).to.have.length(2);

                    expect(inputText(runs[0])).to.equal(second.input);
                    expect(outputText(runs[0])).to.equal(second.output);
                    expect(classes(runs[0])).to.contain(`playbyplay-status-${second.status}`);

                    expect(inputText(runs[1])).to.equal(first.input);
                    expect(outputText(runs[1])).to.equal(first.output);
                    expect(classes(runs[0])).to.contain(`playbyplay-status-${first.status}`);
                });
            });
        });
    });

    after(playbyplay.clear);
});
