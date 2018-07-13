(function(){
	var Trajectory = function(a, n){
		var places = Array.apply(null, new Array(n));
		var power = 1;
		this.degree = 0;
		this.isRoot = false;
		while(!places[power = (power * a) % n]){
			places[power] = true;
			this.degree++;
			if(power == 0){
				this.isRoot = true;
			}
		}
	};
	var test1 = new Trajectory(6,4);
	Test.assertEquals(test1.isRoot, true, "6 should be a root of 4")
	Test.assertEquals(test1.degree, 2, "6 should have degree 2 in 4")

	var test2 = new Trajectory(7,10);
	Test.assertEquals(test2.isRoot, false, "7 should not be a root of 10")
	Test.assertEquals(test2.degree, 4, "7 should have degree 4 in 10")


	function CompoundPower(as){
		if(as.length == 0){
			this.base = 1;
		}else{
			this.base = as[0];
		}
		if(as.length > 1){
			this.exponent = new CompoundPower(as.slice(1));
		}
	}
	CompoundPower.prototype.mod = function(n){
		var result = this.base % n;
		if(!this.exponent){
			return result;
		}
		var t = new Trajectory(result, n);
		if(t.isRoot && this.exponent.atLeast(t.degree)){
			return 0;
		}
		return Math.pow(result, this.exponent.mod(t.degree)) % n;
	};
	CompoundPower.prototype.atLeast = function(n){
		if(this.base == 0){
			if(!this.exponent){
				return n == 0;
			}
			if(!this.exponent.atLeast(1)){
				return 1;
			}
		}
		return this.base >= n;
	}

	function lastDigit(as){
		var compound = new CompoundPower(as);
		return compound.mod(10);
		
	}

	Test.assertEquals(lastDigit([]         ), 1, "case 1");
	Test.assertEquals(lastDigit([0,0]      ), 1, "case 2"); // 0 ^ 0
	Test.assertEquals(lastDigit([0,0,0]    ), 0, "case 3"); // 0^(0 ^ 0) = 0^1 = 0
	Test.assertEquals(lastDigit([1,2]      ), 1, "case 4");
	Test.assertEquals(lastDigit([3,4,5]    ), 1, "case 5");
	Test.assertEquals(lastDigit([4,3,6]    ), 4, "case 6");
	Test.assertEquals(lastDigit([7,6,21]   ), 1, "case 7"); 
	Test.assertEquals(lastDigit([12,30,21] ), 6, "case 8");
	Test.assertEquals(lastDigit([2,2,2,0]  ), 4, "case 9");
	Test.assertEquals(lastDigit([937640,767456,981242] ), 0, "case 10");
	Test.assertEquals(lastDigit([123232,694022,140249] ), 6, "case 11");
	Test.assertEquals(lastDigit([499942,898102,846073] ), 6, "case 12");

	var r1 = Math.floor(Math.random() * 100);
	var r2 = Math.floor(Math.random() * 10);

	Test.assertEquals(lastDigit([]), 1);
	Test.assertEquals(lastDigit([r1]), r1 % 10);
	Test.assertEquals(lastDigit([r1, r2]), Math.pow(r1 % 10, r2) % 10);
})()