var bars = function(nums, h) {
    this.arr = [];
    this.paintEvent = function(c) {
        var rect = new ctx.rect(0, 0, 0, 0);
        for(var i=0;i<this.arr.length;i++) {
            rect.x = i*10;
            rect.y = 0;
            rect.h = (this.arr[i]+1) * h;
            rect.w = 10;
            rect.paintEvent(c);
        }
    }

    for(var i=0;i<nums;i++) {
        this.arr.push(i);
    }
}


ctx.rect.prototype.move_to = function(end, dur = 1000) {
    var dx = end - this.x;
    this.update = function(dt) {
        this.x += dx / dur * dt;
        if (this.x > end && dx > 0) {
            this.x = end;
        } else if (this.x < end && dx < 0) {
            this.x = end;
        }
    };
};


function swap(arr, x, y) {
    var tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
};

function select_sort(array, cmp) {
    var _sort = function(i) {
        if(i >= array.length) {
            return;
        }
        var index = i;
        for(var j = i; j<array.length; j++) {
            if(cmp(array[j], array[index])) {
                index = j;
            }
        }
        swap(array, index, i, function(){
            _sort(i+1);
        });
    };
    
    _sort(0);
}

function shuffle(array) {
    for(var _ in array) {   
        var i = Math.floor(Math.random() * array.length);
        var j = Math.floor(Math.random() * array.length);
        swap(array, i, j);
    }
}

ctx.init('canvas');


var b = new bars(50, 4);
ctx.add_obj(b);

var random_btn = document.getElementById('random');
random_btn.addEventListener('click', function() {
    shuffle(b.arr);
});

var sort_btn = document.getElementById('sort');
sort_btn.addEventListener('click', function() {
    select_sort(array, function(a, b) {
        return a.y - b.y;
    })
})
