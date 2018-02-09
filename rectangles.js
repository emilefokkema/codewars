(function(){
	function Side(min, max){
		this.min = min;
		this.max = max;
	}
	Side.prototype.size = function(){
		return this.max - this.min;
	};
	Side.prototype.intersect = function(other){
		
	};
	function Rectangle(x0, y0, x1, y1){
		this.horizontal = new Side(x0, x1);
		this.vertical = new Side(y0, y1);
	}
	Rectangle.prototype.area = function(){
		return this.horizontal.size() * this.vertical.size();
	};
	function calculate(recs){

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