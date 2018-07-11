(function(){
	function Side(min, max){
		this.min = min;
		this.max = max;
	}
	Side.prototype.size = function(){
		return this.max - this.min;
	};
	Side.prototype.intersects = function(other){
		return this.max > other.min && this.min < other.max;
	};
	Side.prototype.intersect = function(other){
		if(this.contains(other)){
			return other;
		}
		if(other.contains(this)){
			return this;
		}
		if(other.min < this.min){
			return new Side(this.min, other.max);
		}
		return new Side(other.min, this.max);
	};
	Side.prototype.contains = function(other){
		return this.min <= other.min && this.max >= other.max;
	};
	
	Side.prototype.toString = function(){
		return "["+this.min+","+this.max+"]";
	};


	function Rectangle(arr){
		if(arguments.length == 2){
			this.horizontal = arguments[0];
			this.vertical = arguments[1];
		}else{
			var x0 = arr[0], 
				y0 = arr[1], 
				x1 = arr[2], 
				y1 = arr[3];
			Rectangle.apply(this, [new Side(x0, x1), new Side(y0, y1)]);
		}
		
	}
	Rectangle.prototype.area = function(){
		return this.horizontal.size() * this.vertical.size();
	};
	Rectangle.prototype.intersects = function(other){
		return this.vertical.intersects(other.vertical) && this.horizontal.intersects(other.horizontal);
	};
	Rectangle.prototype.intersect = function(other){
		if(this.contains(other)){
			return other;
		}
		if(other.contains(this)){
			return this;
		}
		return new Rectangle(this.horizontal.intersect(other.horizontal), this.vertical.intersect(other.vertical));
	};
	Rectangle.prototype.contains = function(other){
		return this.vertical.contains(other.vertical) && this.horizontal.contains(other.horizontal);
	};
	Rectangle.prototype.toString = function(){return this.horizontal.toString() + "x" + this.vertical.toString();};
	

	var RectangleSet = function(){
		this.recs = [];
	};
	RectangleSet.prototype.add = function(rec){
		if(!this.recs.some(r => r.contains(rec))){
			this.recs = this.recs.filter(r => !rec.contains(r)).concat([rec]);
		}
		return this;
	};
	RectangleSet.prototype.area = function(){
		return this.recs.reduce((a,b) => a.addRectangle(b), new AreaAdder()).currentArea;
	};

	function AreaAdder(){
		this.currentArea = 0;
		this.currentRectangles = [];
	}
	AreaAdder.prototype.addRectangle = function(rect){
		var intersections = [];
		for(var currentRectangle of this.currentRectangles){
			if(currentRectangle.intersects(rect)){
				intersections.push(rect.intersect(currentRectangle))
			}
		}
		this.currentArea += rect.area() - intersections.reduce((a,b) => a.add(b), new RectangleSet()).area();
		this.currentRectangles.push(rect);
		return this;
	};



	function calculate(recs){
		return recs.reduce((a,b) => a.add(new Rectangle(b)), new RectangleSet()).area();
	}
	Test.describe("basic cases", function() {
	  Test.it("0 rectangles", function() {
	    Test.assertEquals(calculate([]), 0, 'calculate([]) should return 0');
	  });
	  
	  Test.it("1 rectangle", function() {
	    Test.assertEquals(calculate([[0,0,1,1]]), 1, 'calculate([[0,0,1,1]]) should return 1');
	  });
	 
	  Test.it("1 rectangle (version 2)", function() {
	    Test.assertEquals(calculate([[0, 4, 11, 6]]), 22, 'calculate([[0, 4, 11, 6]]]) should return 22');
	  });
	  
	  Test.it("2 rectangles", function() {
	    Test.assertEquals(calculate([[0,0,1,1], [1,1,2,2]]), 2, 'calculate([[0,0,1,1], [1,1,2,2]]) should return 2');
	  });

	  Test.it("2 rectangle (version 2)", function() {
	    Test.assertEquals(calculate([[0,0,1,1], [0,0,2,2]]) , 4, 'calculate([[0,0,1,1], [0,0,2,2]]) should return 4');
	  });

	  Test.it("3 rectangle ", function() {
	    Test.assertEquals(calculate([[3,3,8,5], [6,3,8,9],[11,6,14,12]]), 36, 'calculate([[3,3,8,5], [6,3,8,9],[11,6,14,12]]) should return 36');
	  });
	});
})()