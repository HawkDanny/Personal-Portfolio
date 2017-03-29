var widthResize = (function() {
    function init() {
        var canvas = document.querySelector("canvas");

        window.onresize = resizeCanvas;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
        }

        resizeCanvas();
    };
    return {
        resize: init
    };
}());