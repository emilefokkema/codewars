(function(){
	//-------- https://www.codewars.com/kata/snail -----------
	var Rectangle = function(array){
		this.rows = array;
		this.width = Math.min.apply(null, this.rows.map(function(r){return r.length}));
		this.height = array.length;
	};
	Rectangle.prototype.transpose = function(){
		var transposedRows = [];
		for(var i = this.width - 1;i>=0;i--){
			transposedRows.push(this.rows.map(function(r){return r[i];}));
		}
		return new Rectangle(transposedRows);
	};
	Rectangle.prototype.fromRow = function(rowIndex){
		return new Rectangle(this.rows.slice(rowIndex));
	};
	var walkSnailwise = function*(rectangle){
		for(var i=0;i<rectangle.width;i++){
			yield rectangle.rows[0][i];
		}
		if(rectangle.height > 1){
			for(var x of walkSnailwise(rectangle.fromRow(1).transpose())){
				yield x;
			}
		}
	};
	var snail = function(array) {
	  return [...walkSnailwise(new Rectangle(array))];
	};
	Test.assertDeepEquals(snail([[1,2],[4,3]]), [1,2,3,4]);
	Test.assertDeepEquals(snail([[1,2,3],[8,9,4],[7,6,5]]), [1,2,3,4,5,6,7,8,9]);
})();