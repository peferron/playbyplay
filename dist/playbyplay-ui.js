(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.playbyplayui = {});
})(this, function (exports) {

    function save(run, options) {
        playbyplay.save(run, options);
    }

    function show(callback) {
        alert('Show!');
    }

    exports.save = save;
    exports.show = show;
});
//# sourceMappingURL=./playbyplay-ui.js.map