describe('after clearing', () => {
    const pbp = () => document.getElementById('playbyplay');

    beforeEach(playbyplay.clear);

    describe('and showing with default parent', () => {
        beforeEach(done => {
            playbyplay.show({onShow: done});
        });

        it('should append #playbyplay to the body', () => {
            expect(pbp()).to.not.be.null;
            expect(pbp().parentNode).to.equal(document.body);
        });
    });

    describe('and showing with non-default parent', () => {
        let parent;

        beforeEach(done => {
            parent = document.createElement('div');
            document.body.appendChild(parent);
            playbyplay.show({parent: parent, onShow: done});
        });

        it('should append #playbyplay to the parent', () => {
            expect(pbp()).to.not.be.null;
            expect(pbp().parentNode).to.equal(parent);
        });
    });

    after(playbyplay.clear);
});
