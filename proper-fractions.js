(function(){
	//---------- https://www.codewars.com/kata/number-of-proper-fractions-with-denominator-d ---------------

	var factors = function*(n){
		var left = n, current = 2;
		while(left > 1 && current < n){
			if(left % current == 0){
				yield current;
				left = left / current;
			}else{
				current++;
			}
		}
	}
	var distinct = function*(numbers){
		var previous, current;
		for(current of numbers){
			if(current != previous){
				previous = current;
				yield current;
			}
		}
	};
	
	var properFractionsUsingFactors = function(n, factors){
		var factorsSoFar = [], result = n;
		for(var i=0;i<factors.length;i++){
			result -= properFractionsUsingFactors(n / factors[i], factorsSoFar);
			factorsSoFar.push(factors[i]);
		}
		return result - 1;
	};
	var properFractions = function(n){
		return properFractionsUsingFactors(n, [...distinct(factors(n))]);
	};
	Test.assertEquals(properFractions(1),0);
	Test.assertEquals(properFractions(2),1);
	Test.assertEquals(properFractions(5),4);
	Test.assertEquals(properFractions(15),8);
	Test.assertEquals(properFractions(25),20);
	Test.assertEquals(properFractions(30),8);
})();