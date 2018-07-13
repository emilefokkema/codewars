(function(){
	var assertEquals = function(v1, v2, msg){
		if(v1 != v2){
			throw msg ||('expected ' + v1 + ' to equal '+v2);
		}
	};
	var assertDeepEquals = function(o1, o2, msg, onFail){
		onFail = onFail || function(msg){
			throw msg;
		};
		if(typeof o1 !== "object" && typeof o2 !== "object"){
			if(o1 !== o2){
				msg = msg || "expected "+o1+" to equal "+o2;
				onFail(msg);
			}
		}else if(typeof o1 !== "object"){
			onFail("expected "+o1+" to deep equal "+JSON.stringify(o2));
		}else if(typeof o2 !== "object"){
			onFail("expected "+o2+" to deep equal "+JSON.stringify(o1));
		}else{
			var p;
			msg = msg || "expected "+JSON.stringify(o1)+" to deep equal "+JSON.stringify(o2);
			for(p in o1){
				if(o1.hasOwnProperty(p)){
					assertDeepEquals(o1[p], o2[p], msg, onFail);
				}
			}
			for(p in o2){
				if(o2.hasOwnProperty(p)){
					assertDeepEquals(o2[p], o1[p], msg, onFail);
				}
			}
		}
	};
	var expect = function(bool, msg){
		if(!bool){
			throw msg;
		}
	};
	var describe = function(title, describeFn){
		describeFn();
	};
	var before = function(beforeFn){
		beforeFn();
	};
	var it = function(title, itFn){
		itFn();
	};
	window.Test = {
		assertEquals: assertEquals,
		assertDeepEquals: assertDeepEquals,
		expect: expect,
		describe:describe,
		before:before,
		it:it
	};
})();