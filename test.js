(function(){
	var assertEquals = function(v1, v2){
		if(v1 != v2){
			throw 'expected ' + v1 + ' to equal '+v2;
		}
	};
	window.Test = {
		assertEquals: assertEquals
	};
})();