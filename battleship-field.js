(function(){
	//There must be single battleship (size of 4 cells), 
	//2 cruisers (size 3), 
	//3 destroyers (size 2) and 
	//4 submarines (size 1). Any additional ships are not allowed, as well as missing ships.
	function Position(x, y){
		this.x = x;
		this.y = y;
	}
	Position.prototype.adjacentTo = function(other){
		return Math.max(Math.abs(this.x - other.x), Math.abs(this.y - other.y)) <= 1;
	};
	function groupBy(arr, belongTogether){
		var all = arr.slice();
		var groups = [], currentGroup = [];
		if(all.length == 0){
			return groups;
		}
		while(all.length){
			var matchIndex;
			if(currentGroup.length == 0){
				matchIndex = 0;
			}else{
				matchIndex = all.findIndex(el => currentGroup.some(e => belongTogether(e, el)));
			}
			if(matchIndex == -1){
				groups.push(currentGroup);
				matchIndex = 0;
				currentGroup = [];
			}
			var match = all[matchIndex];
			currentGroup.push(match);
			all.splice(matchIndex, 1);
		}
		groups.push(currentGroup);
		return groups;
	}
	
	function validateBattlefield(field) {
		var positions = [];
		for(var i=0;i<field.length;i++){
			var row = field[i];
			for(var j=0;j<row.length;j++){
				if(row[j]){
					positions.push(new Position(i,j));
				}
			}
		}
		var shipGroups = groupBy(positions, (p1,p2) => p1.adjacentTo(p2));
		console.log(shipGroups);
	}
	Test.expect(validateBattlefield(
	                [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	                 [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
	                 [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
	                 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	                 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	                 [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	                 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	                 [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	                 [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	                 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]));

})()