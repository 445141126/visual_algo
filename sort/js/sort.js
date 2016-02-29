
function move_to(obj, x) {

}

function swap(r1, r2) {

}


(function test() {
    ctx.init('canvas');
    var r1 = new ctx.rect(0, 0, 10, 10, 'red');
    var r2 = new ctx.rect(0, 0, 100, 100, 'black');
    r1.priority = 100;
    setInterval(function() {
        r1.x+=0.1;
        r1.y+=0.1;
    }, 100);
})();
