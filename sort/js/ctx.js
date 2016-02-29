var ctx = (function() {

    var ctx = null;
    var objs = [];
    var ctx_width = 0;
    var ctx_height = 0;
    var dt = 1000/60;

    function paintEvent() {
        ctx.clearRect(0, 0, ctx_width, ctx_height);
        objs.sort(function(a, b) {
            return a.priority > b.priority;
        })
        for (var i in objs) {
            if(typeof objs[i].update === 'function') {
                objs[i].update(dt);
            }
            objs[i].paintEvent(ctx);
        }
    }

    function init(id, fps) {
        var canvas = document.getElementById(id);
        ctx = canvas.getContext('2d');
        ctx_width = canvas.width;
        ctx_height = canvas.height;
        fps = fps ? fps : 60;
        dt = 1000 / fps;
        setInterval(paintEvent, dt);
    }

    function add_obj() {
        for (var i in arguments) {
            var obj = arguments[i];
            if (typeof obj.paintEvent === 'function') {
                objs.push(obj);
            } else {
                console.warn(obj, 'obj have no paintEvent or paintEvent is not function, unable add to canvas');
            }
        }
    }

    var figure = function() {
        this.update = null;
        this.priority = 0;
    };

    var rect = function(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = c ? c : 'black';

        this.paintEvent = function(ctx) {
            ctx.fillStyle = this.color;
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y+this.h);
            ctx.lineTo(this.x+this.w, this.y+this.h);
            ctx.lineTo(this.x+this.w, this.y);
            ctx.fill();
            ctx.stroke();
        }
    };
    rect.prototype = new figure();


    return {
        init: init,
        rect: rect,
        height: ctx_height,
        width: ctx_width,
        add_obj: add_obj,
    }
})();