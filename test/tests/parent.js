describe('after clearing', () => {
    beforeEach(playbyplay.clear);

    it('should append #playbyplay to the body', done => {
        playbyplay.show({
            onShow: err => {
                expect(err).to.be.null;
                expect($('#playbyplay').parent()).to.match('body');
                done();
            }
        });
    });

    it('should append #playbyplay to the parent', done => {
        const $parent = $('<div></div>').appendTo('body');
        playbyplay.show({
            parent: $parent[0],
            onShow: err => {
                expect(err).to.be.null;
                expect($('#playbyplay').parent()).to.match($parent);
                done();
            }
        });
    });

    after(playbyplay.clear);
});
