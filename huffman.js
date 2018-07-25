(function(){
	function indicesOfTwoSmallest(arr){
		var index1, index2, value1, value2;
		for(var i=0;i<arr.length;i++){
			var v = arr[i];
			if(value1 === undefined){
				value1 = v;
				index1 = i;
				continue;
			}
			if(value2 === undefined){
				value2 = v;
				index2 = i;
				continue;
			}
			if(v < value1 && v < value2){
				if(value1 >= value2){
					value1 = v;
					index1 = i;
				}else{
					value2 = v;
					index2 = i;
				}
				continue;
			}
			if(v >= value1 && v < value2){
				value2 = v;
				index2 = i;
				continue;
			}
			if(v >= value2 && v < value1){
				value1 = v;
				index1 = i;
			}
		}
		return [index1,index2];
	}

	function FreqNodeEncoding(freqNode){
		if(freqNode.character !== undefined){
			this[freqNode.character] = "";
		}else{
			this.addEncoding(new FreqNodeEncoding(freqNode[0]), "0");
			this.addEncoding(new FreqNodeEncoding(freqNode[1]), "1");
		}
	}
	FreqNodeEncoding.prototype.addEncoding = function(enc, prefix){
		for(var p in enc){
			if(enc.hasOwnProperty(p)){
				this[p] = prefix + enc[p];
			}
		}
	};
	FreqNodeEncoding.prototype.encode = function(string){
		var result = "";
		for(var s of string){
			result += this[s];
		}
		return result;
	};
	FreqNodeEncoding.prototype.getReverse = function(){
		var result = {};
		for(var p in this){
			if(this.hasOwnProperty(p)){
				result[this[p]] = p;
			}
		}
		return result;
	};
	FreqNodeEncoding.prototype.decode = function(string){
		var result = "";
		var reverse = this.getReverse();
		var rgx = this.getRegex();
		var match;
		while(match = rgx.exec(string)){
			result += reverse[match[0]];
		}
		return result;
	};
	FreqNodeEncoding.prototype.getRegex = function(){
		var parts = [];
		for(var p in this){
			if(this.hasOwnProperty(p)){
				parts.push(this[p]);
			}
		}
		return new RegExp(parts.join("|"),"g");
	};

	function FreqNode(){
		if(!(arguments[0] instanceof FreqNode)){
			this.character = arguments[0];
			this.freq = arguments[1];
		}else{
			var one = arguments[0];
			var two = arguments[1];
			this[0] = one;
			this[1] = two;
			this.freq = one.freq + two.freq;
		}
	}

	function makeTree(freqs){
		var nodes = freqs.map(f => new FreqNode(f[0],f[1]));
		while(nodes.length > 1){
			var indices = indicesOfTwoSmallest(nodes.map(n => n.freq));
			var i1 = indices[0], i2 = indices[1];
			var newNode = new FreqNode(nodes[i1], nodes[i2]);
			nodes.splice(i1, 1);
			nodes.splice(i2 - (i1 < i2 ? 1 : 0), 1);
			nodes.push(newNode);
		}
		return nodes[0];
	}
	
	// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
	function frequencies(s) {
	  var obj = {};
	  for(var c of s){
	  	if(obj[c] !== undefined){
	  		obj[c]++;
	  		continue;
	  	}
	  	obj[c] = 1;
	  }
	  var result = [];
	  for(var k in obj){
	  	result.push([k, obj[k]]);
	  }
	  return result;
	}

	// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
	function encode(freqs,s) {
		if(freqs.length < 2){
			return null;
		}
		var tree = makeTree(freqs);
		var encoding = new FreqNodeEncoding(tree);
		return encoding.encode(s);
	  
	}

	// takes [ [String, Int] ], String (with "0" and "1"); returns: String
	function decode(freqs,bits) {
	  if(freqs.length < 2){
	  	return null;
	  }
	  var tree = makeTree(freqs);
	  var encoding = new FreqNodeEncoding(tree);
	  return encoding.decode(bits);
	}

	Test.describe("example tests", ()=>{
	  const s = "aaaabcc";
	  const fs = frequencies(s);
	  Test.assertDeepEquals( [...fs].sort(), [ ["a",4], ["b",1], ["c",2] ] );
	  Test.assertEquals( encode( fs, s ).length, 10 );
	  Test.assertEquals( encode( fs, "" ), "" );
	  Test.assertEquals( decode( fs, "" ), "" );
	});

	Test.describe("error handling", ()=>{
	  Test.assertEquals( encode( [], "" ), null );
	  Test.assertEquals( decode( [], "" ), null );
	  Test.assertEquals( encode( [ ["a",1] ], "" ), null );
	  Test.assertEquals( decode( [ ["a",1] ], "" ), null );
	});
})()