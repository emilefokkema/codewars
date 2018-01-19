(function(){
	//---------- https://www.codewars.com/kata/count-ones-in-a-segment ---------------
	function cycle(size, index){
		var half = size / 2;
		if(index >= half){
			return index - half + 1;
		}
		return 0;
	}
	function countUpTo(n){
		var position = 1, result = 0;
		do{
			result += position * (Math.floor(n / (2 * position))) + cycle(2 * position, n % (2 * position));
			position = position << 1;
		}while(position <= n)
		return result;
	}

	function countOnes(left, right) {
	  return countUpTo(right) - countUpTo(left - 1);
	}
	console.log(countUpTo(6));
	Test.assertEquals(countOnes(556385, 684810), 1248133);
	Test.assertEquals(countOnes(191694, 744854), 5473782);
})();