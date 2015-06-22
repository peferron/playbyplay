describe('after clearing', () => {
    beforeEach(playbyplay.clear);

    describe('and showing with default parent', () => {
        beforeEach(done => {
            playbyplay.show({onShow: done});
        });

        it('should append #playbyplay to the body', () => {
            expect($('#playbyplay').parent()).to.match('body');
        });
    });

    describe('and showing with non-default parent', () => {
        let $parent;

        beforeEach(done => {
            $parent = $('<div></div>').appendTo('body');
            playbyplay.show({parent: $parent[0], onShow: done});
        });

        it('should append #playbyplay to the parent', () => {
            expect($('#playbyplay').parent()).to.match($parent);
        });
    });

    after(playbyplay.clear);
});
