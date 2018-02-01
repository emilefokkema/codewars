(function(){
	//------- https://www.codewars.com/kata/point-in-polygon-1/ -------------
	
	function Point(p){
		this.x = p[0];
		this.y = p[1];
	}
	Point.prototype.minus = function(p){
		return new Point([this.x - p.x, this.y - p.y]);
	};
	Point.prototype.cross = function(p){
		return this.x * p.y - this.y * p.x;
	};
	Point.prototype.rotateQuarter = function(){
		return new Point([-this.y, this.x]);
	};
	Point.prototype.quadrantAngleFrom = function(p){
		var self = this;
		while(p.x < 0 || p.y < 0){
			p = p.rotateQuarter();
			self = self.rotateQuarter();
		}
		if(self.x > 0){
			if(self.y > 0){
				return 0;
			}
			return -1;
		}
		if(self.y > 0){
			return 1;
		}
		var cross = new Point([0,0]).minus(p).cross(self.minus(p));
		return cross < 0 ? 2 : -2;
	};
	function pointInPoly(poly, point) {
	  poly = poly.map(p => new Point(p)), point = new Point(point);
	  
	}
	var poly = [
	  [-5, -5], [5, -5],
	  [5, 5], [-5, 5]
	];
	Test.assertEquals(new Point([-1.1,-1]).quadrantAngleFrom(new Point([1,1])), 2);
	Test.assertEquals(new Point([-0.9,-1]).quadrantAngleFrom(new Point([1,1])), -2);
	//Test.expect(!pointInPoly(poly, [-6,0]));
	//Test.expect(pointInPoly(poly, [1,1]))
})()