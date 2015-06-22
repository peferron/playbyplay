describe('parent: after clearing', () => {
    beforeEach(playbyplay.clear);

    it('should append #playbyplay to the body by default', done => {
        function onShow(err) {
            expect(err).to.be.null;
            expect($('#playbyplay').parent()).to.match('body');
            done();
        }

        function callback() {
            assert.fail();
        }

        playbyplay.show({onShow: onShow}, callback);
    });

    it('should append #playbyplay to the specified parent', done => {
        const $parent = $('<div></div>').appendTo('body');

        function onShow(err) {
            expect(err).to.be.null;
            expect($('#playbyplay').parent()).to.match($parent);
            done();
        }

        function callback() {
            assert.fail();
        }

        playbyplay.show({parent: $parent[0], onShow: onShow}, callback);
    });

    after(playbyplay.clear);
});
