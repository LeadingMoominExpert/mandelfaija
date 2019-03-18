(() => {
    // Create Canvas
    var canvas = document.getElementById('mandelbrot'),
            ctx = canvas.getContext('2d');
    // Eventlistener to resize canvas 
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Draw on canvas
        var zoomParam = 200; // 200
        var panXParam = 4; // 4
        var panYParam = 2; // 2
        var hslColor = 135;
        drawMandel(zoomParam, panXParam, panYParam, hslColor);
    }
    resizeCanvas();
    
    /* 
    * Function to determine if a point belongs to the Mandelbrot set or not
    * If not, return 0. If yes, return percentage value in order to draw color
    */
    function isInMandel(x, y) {
        var real = x;
        var img = y;
        const maxLimit = 100;
        for(var i = 0; i < maxLimit; i++) { // Increasing the range gives a crisper image
            // Calculate the real and imaginary components of the result
            var tmpReal = real * real - img * img + x; 
            var tmpImg = 2 * real * img + y;

            real = tmpReal;
            img = tmpImg;
            if (real * img > 10) return (i/maxLimit * 100); // In the Mandelbrot set return percentage value
        }
        return 0; // Not in the set
    }
    function drawMandel(zoom, panX, panY, color) {
        for(var x = 0; x < canvas.width; x++) {
            for(var y = 0; y < canvas.height; y++) {
                var isInSet = isInMandel(x / zoom - panX, y / zoom - panY);
                if(isInSet === 0) {
                    ctx.fillStyle = '#000'; //black
                    ctx.fillRect(x, y, 1, 1);
                } else {
                    ctx.fillStyle = 'hsl(' + color + ', 100%, ' + isInSet + '%)';
                    ctx.fillRect(x,y, 1,1); // Draw a colorful pixel
                }
            } 
        }
    }
})();