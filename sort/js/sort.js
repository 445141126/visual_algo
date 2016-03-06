function swap(arr, x, y) {
    var tmp = arr[x];
    arr[x] = arr[y];
    arr[y] = tmp;
};

var bars = function(nums, h) {
    this.arr = [];
    this.selected = -1;
    this.mini = -1;
    this.timerId = -1;
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

    this.clear = function() {
        clearTimeout(this.timerId);
        this.selected = -1;
        this.mini = -1;
    }

    this.shuffle = function() {
        this.clear();
        for (var _ in this.arr) {
            var i = Math.floor(Math.random() * this.arr.length);
            var j = Math.floor(Math.random() * this.arr.length);
            swap(this.arr, i, j);
        }
    }

    this.select_sort = function() {
        this.clear();
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
                    self.timerId = setTimeout(function() {
                        _sort(i + 1);
                    }, 50);
                    return;
                }
                self.selected = j;
                self.timerId = setTimeout(function() {
                    if (self.arr[j] < self.arr[self.mini]) {
                        self.mini = j;
                    }
                    inner(j + 1);
                }, 50)
            }
            inner(i);
        }
        _sort(0);
    }

    this.buble_sort = function() {
        this.clear();
        var self = this;
        var _sort = function(i) {
            if (i >= self.arr.length) {
                self.clear();
                return;
            }

            var inner = function(j) {
                if (j == self.arr.length - i - 1) {
                    self.timerId = setTimeout(function() {
                        _sort(i + 1);
                    }, 50);
                    return;
                }
                if (self.arr[j] > self.arr[j + 1]) {
                    swap(self.arr, j, j + 1);
                }
                self.timerId = setTimeout(function() {
                    inner(j + 1);
                }, 50)
                self.selected = j + 1;
            }

            inner(0);
        }
        _sort(0);
    }

    this.insert_sort = function() {
        this.clear();
        var self = this;

        var _sort = function(i) {
            if (i >= self.arr.length) {
                self.clear();
                return;
            }
            var inserted = self.arr[i];
            self.mini = i;
            self.selected = 0;

            var inner1 = function(j) {

                self.selected = j;
                var inner2 = function(m) {
                    swap(self.arr, m, m + 1);
                    self.mini = m;
                    if (m <= j) {
                        self.timerId = setTimeout(function() {
                            _sort(i + 1);
                        }, 50);
                        return;
                    }
                    self.timerId = setTimeout(function() {
                        inner2(m - 1);
                    }, 50);
                }
                if (i == j) {
                    self.timerId = setTimeout(function() {
                        _sort(i + 1);
                    }, 50);
                    return;
                }
                if (inserted < self.arr[j]) {
                    self.timerId = setTimeout(function() {
                        inner2(i - 1);
                    }, 50)
                    return;
                }
                inner1(j + 1);
            }

            inner1(0);
        }

        _sort(0);
    }

    this.quick_sort = function() {

        var self = this;
        this.clear();

        var partition = function(s, e) {
            var index = s;
            self.mini = index;
            var pivot = self.arr[e];

            var inner = function(i) {
                self.selected = i;
                if (i == e) {
                    console.log(s, e, index);
                    swap(self.arr, e, index);
                    _sort(s, index - 1);
                    _sort(index + 1, e);
                    return;
                }
                if (self.arr[i] < pivot) {
                    swap(self.arr, index, i);
                    index++;
                    self.mini = index;
                }
                self.timerId = setTimeout(function() {
                    inner(i + 1);
                }, 50);
            }

            inner(s);
        };

        var _sort = function(s, e) {
            console.log(s, e);
            if (s >= e) {
                return;
            }
            partition(s, e);
        };

        _sort(0, self.arr.length-1);
    }

}

// main
ctx.init('canvas');
var b = new bars(50, 4);
ctx.add_obj(b);

var random_btn = document.getElementById('random');
random_btn.addEventListener('click', function() {
    b.shuffle();
});

var sort_btn = document.getElementById('sort');
sort_btn.addEventListener('click', function() {
    var sort_name = location.hash.slice(1);
    if (b[sort_name] == null) {
        alert(sort_name + '未实现');
    } else {
        b[sort_name]();
    }
})
