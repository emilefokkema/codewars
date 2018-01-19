(function(){
	//---------- https://www.codewars.com/kata/brace-expansion ---------------
	var split = function*(pattern){
		var match, currentPart = "", level = 0, rgx = /[^{}]+|[{}]/g;
		while((match = rgx.exec(pattern)) && (match = match[0])){
			if(match == "{"){
				if(currentPart && level == 0){
					yield currentPart;
					currentPart = "";
				}
				currentPart += match;
				level++;
			}else if(match == "}"){
				currentPart += match;
				level--;
				if(level == 0){
					yield currentPart;
					currentPart = "";
				}
			}else{
				currentPart += match;
			}
		}
		if(currentPart){
			yield currentPart;
		}
	};
	var product = function(...iterables){
		return function*(...things){
			for(let one of iterables){
				one = [...one];
				for(let two of things){
					yield (function*(){
						for(let ofOne of one){
							yield ofOne;
						}
						yield two;
					})();
				}
			}
		};
	};
	var productOfMany = function(...iterables){
		var result, first = true;
		for(let it of iterables){
			if(first){
				result = (function*(){for(let ofIt of it){yield [ofIt];}})();
				first = false;
			}else{
				result = product(...result)(...it);
			}
		}
		return result;
	};
	var splitOnCommas = function*(list){
		var current = "", parts = split(list);
		for(var part of parts){
			if(part.match(/^[^{}]+$/)){
				var subParts = part.match(/[^,]+|,/g);
				for(var subPart of subParts){
					if(subPart == ","){
						yield current;
						current = "";
					}else{
						current += subPart;
					}
				}
			}else{
				current += part;
			}
		}
		yield current;
	};
	var getList = function*(partWithinBraces){
		var parts = splitOnCommas(partWithinBraces);
		for(let part of parts){
			if(part.match(/^[^{}]*$/)){
				yield part;
			}else{
				var expanded = expand(part);
				for(let subPart of expanded){
					yield subPart;
				}
			}
		}
	};
	var possibilities = function*(pattern){
		var parts = split(pattern);
		for(let part of parts){
			if(part.match(/^[^{}]*$/)){
				yield [part];
			}else{
				yield getList(part.substr(1,part.length - 2));
			}
		}
	};
	var expand = function(pattern){
		return [...productOfMany(...possibilities(pattern))].map(function(x){return [...x].join("");});
	};
	//console.log(expand("~/{Downloads,Pictures}/*.{jpg,gif,png}"));
})();