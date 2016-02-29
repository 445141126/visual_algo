var bars = function(nums, h) {
    this.arr = [];
    this.selected = -1;
    this.mini = -1;
    this.paintEvent = function(c) {
        var rect = new ctx.rect(0, 0, 0, 0);
        for (var i = 0; i < this.arr.length; i++) {
            if (this.selected == i) {
                rect.color = 'rgba(0,0,0,0.5)'
            }
            if (this.mini == i) {
                rect.color = 'red'
            }
            if (i != this.mini && i != this.selected) {
                rect.color = 'black';
            }
            rect.x = i * 10;
            rect.y = 0;
            rect.h = (this.arr[i] + 1) * h;
            rect.w = 10;
            rect.paintEvent(c);
        }
    }

    for (var i = 0; i < nums; i++) {
        this.arr.push(i);
    }

    this.sort = function() {
        var self = this;
        var _sort = function(i) {
            if (i >= self.arr.length) {
                self.selected = -1;
                self.mini = -1;
                return;
            }
            self.mini = i;

            var inner = function(j) {
                if (j >= self.arr.length) {
                    swap(self.arr, i, self.mini);
                    setTimeout(function() {
                        _sort(i + 1);
                    }, 200);
                    return;
                }
                self.selected = j;
                setTimeout(function() {
                    if (self.arr[j] < self.arr[self.mini]) {
                        self.mini = j;
                    }
                    inner(j + 1);
                }, 100)
            }
            inner(i);
        }
        _sort(0);
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

function shuffle(array) {
    for (var _ in array) {
        var i = Math.floor(Math.random() * array.length);
        var j = Math.floor(Math.random() * array.length);
        swap(array, i, j);
    }
}


// main
ctx.init('canvas');
var b = new bars(50, 4);
ctx.add_obj(b);

var random_btn = document.getElementById('random');
random_btn.addEventListener('click', function() {
    shuffle(b.arr);
});

var sort_btn = document.getElementById('sort');
sort_btn.addEventListener('click', function() {
    b.sort();
})
