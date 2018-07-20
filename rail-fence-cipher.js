(function(){
	function Rail(){
		this.string = "";
	}
	Rail.prototype.add = function(char){
		this.string += char;
	};
	function RailFenceIndex(numberRails){
		this.index = 0;
		this.direction = 1;
		this.numberRails = numberRails;
	}
	RailFenceIndex.prototype.advance = function(){
		if(this.index == 0){
			this.direction = 1;
		}
		if(this.index == this.numberRails - 1){
			this.direction = -1;
		}
		this.index += this.direction;
		return this.index;
	};
	function RailFence(numberRails){
		this.rails = Array.apply(null, new Array(numberRails)).map(x => new Rail());
	}
	RailFence.prototype.write = function(string){
		var index = new RailFenceIndex(this.rails.length);
		for(var char of string){
			this.rails[index.index].add(char);
			index.advance();
		}
		return this;
	};
	RailFence.prototype.toString = function(){
		return this.rails.map(r => r.string).join("");
	};

	function encodeRailFenceCipher(string, numberRails) {
	  return new RailFence(numberRails).write(string).toString();
	}

	function decodeRailFenceCipher(string, numberRails) {
	  // code
	}

	Test.assertEquals(encodeRailFenceCipher("WEAREDISCOVEREDFLEEATONCE", 3), "WECRLTEERDSOEEFEAOCAIVDEN");
	Test.assertEquals(decodeRailFenceCipher("WECRLTEERDSOEEFEAOCAIVDEN", 3), "WEAREDISCOVEREDFLEEATONCE");
	Test.assertEquals(encodeRailFenceCipher("Hello, World!", 3), "Hoo!el,Wrdl l");
})()