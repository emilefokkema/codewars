(function(){
	//------- https://www.codewars.com/kata/point-in-polygon-1/ -------------
	function Quadrant(index){
		this.index = index;
	}
	Quadrant.prototype.distance = function(other){
		var d = 0, otherIndex = other.index;
		while(otherIndex != this.index){
			otherIndex = (otherIndex+1) % 4;
			d++;
		}
		return d;
	};
	function Point(p){
		this.x = p[0];
		this.y = p[1];
	}
	Point.prototype.minus = function(p){
		return new Point([this.x - p.x, this.y - p.y]);
	};
	Point.prototype.getQuadrant = function(){
		if(this.x >= 0){
			if(this.y >= 0){
				return new Quadrant(0);
			}
			return new Quadrant(3);
		}
		if(this.y >= 0){
			return new Quadrant(1);
		}
		return new Quadrant(2);
	};
	function pointInPoly(poly, point) {
	  poly = poly.map(p => new Point(p)), point = new Point(point);
	  var newQuadrant, 
	  	startQuadrant = poly[0].minus(point).getQuadrant(),
	  	currentQuadrant = startQuadrant,
	  	totalDistance = 0;
	  for(var i=1;i<poly.length;i++){
	  	newQuadrant = poly[i].minus(point).getQuadrant();
	  	totalDistance += newQuadrant.distance(currentQuadrant);
	  	currentQuadrant = newQuadrant;
	  }
	  totalDistance += startQuadrant.distance(currentQuadrant);
	  console.log(totalDistance);
	}
	var poly = [
	  [-5, -5], [5, -5],
	  [5, 5], [-5, 5]
	];
	Test.expect(!pointInPoly(poly, [-6,0]));
	Test.expect(pointInPoly(poly, [1,1]))
})()