var DragableCircle = function(x, y, t) {

    this.add_link = function(link){
    	this.links.push(link);
    };

    this.pos = function() {
    	var pos = this.view.position();
    	var w = this.view.width();
    	var h = this.view.height();
    	pos.top += h/2;
    	pos.left += w/2;
    	return pos;
    };

	(function(){
		var self = this;
	    self.view = $('<div class="circle">').draggabilly();
	    self.view.css('left', x+'px');
	    self.view.css('top', y+'px');
	    self.links = [];

	    var text = $('<div class="circle-text">');
	    text.text(t);
	    self.view.append(text);

	    self.appendTo = function(c) {
	    	self.canvas = c;
	    	self.view.appendTo(c);
	    };

	    self.view.on('dragMove', function() {
	    	self.links.forEach(function(link) {
	    		link.update();
	    	});
	    });
	}).call(this);
};


function distance (p1, p2) {
	var x1 = p1.left;
	var y1 = p1.top;
	var x2 = p2.left;
	var y2 = p2.top;

	return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
}

function slope(p1, p2) {
	var x1 = p1.left;
	var y1 = p1.top;
	var x2 = p2.left;
	var y2 = p2.top;

	return Math.atan((y1 -y2) / (x1-x2));	
}

var Link = function(c1, c2) {

	this.update = function() {
		var p1 = this.c1.pos();
		var p2 = this.c2.pos();
		var len = this.len;
		var s = slope(p1, p2);
		var left = p1.left;
		var top = p1.top;
		if(p2.left <= p1.left) {
			left = p2.left;
			top = p2.top;
		}

		this.text.text(len.toFixed(2));
		this.view.css('width', len+'px');
		this.view.css('transform', 'rotate(' + s + 'rad)');
		this.view.css('left', left + 'px');
		this.view.css('top', top + 'px');
	};

	Object.defineProperty(this, 'len', {
		get: function() {
			var p1 = this.c1.pos();
			var p2 = this.c2.pos();
			return distance(p1, p2); 
		},
	});

	(function(){
		var self = this;
		self.c1 = c1;
		self.c2 = c2;
		self.c1.add_link(this);
		self.c2.add_link(this);
		self.view = $('<div class="link">');
		self.text = $('<div class="link-text">');
		self.view.append(self.text);
	}).call(this);

};

function set_canvas(conf) {
	var canvas = $('#canvas');
	var w = canvas.width();
	var h = canvas.height();
	var dcs = [];
	for(var i=0; i<conf.total; i++) {
		var dc = new DragableCircle(Math.random() * w, Math.random() * h, i+1);
		canvas.append(dc.view);
		dcs.push(dc);
	}

	for(var i=0; i<conf.links.length; i++) {
		var c1 = dcs[conf.links[i][0]];
		var c2 = dcs[conf.links[i][1]];
		var link = new Link(c1, c2);
		canvas.append(link.view);
		link.update();
	}
}


function gen_graph(N, L) {
	var links = [];
	var i = 0;
	while(i < L) {
		var ok = true;
		var c1 = Math.floor(Math.random() * N);
		var c2 = Math.floor(Math.random() * N);
		if(c1 == c2) {
			continue;
		}
		for(var c=0; c<links.length; c++) {
			if((c1 == links[c][0] && c2 == links[c][1]) || (c1==links[c][1] && c2==links[c][0])) {
				ok = false;
				break;
			}
		}
		if(ok) {
			links.push([c1, c2]);
			i++;			
		}
	}	
	return {total: N, links: links};
}

var grpah = gen_graph(12, 20);
set_canvas(grpah);

$('#shortest_path').click(function(){
	var s = $('#s').val();
	var e = $('#e').val();
	console.log(s, e);
});