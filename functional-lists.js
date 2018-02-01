(function(){
	//----- https://www.codewars.com/kata/functional-lists --------------
	function List() {}

	function EmptyList() {}
	EmptyList.prototype = new List();
	EmptyList.prototype.constructor = EmptyList;

	EmptyList.prototype.toString = function() { return "()"; };
	EmptyList.prototype.isEmpty = function() { return true; };
	EmptyList.prototype.length = function() { return 0; };
	EmptyList.prototype.push = function(x) { return new ListNode(x, this); };
	EmptyList.prototype.remove = function(x) { return this; };
	EmptyList.prototype.append = function(xs) { return xs; };

	function ListNode(value, next) { this.value = value;this.next = next; }
	ListNode.prototype = new List();
	ListNode.prototype.constructor = ListNode;
	ListNode.prototype.isEmpty = function() { return false; };

	ListNode.prototype.toString = function() {
		var nextToStringContent =  this.next.toString().match(/^\(([^)]*)\)$/)[1];
		return "("+this.value+(nextToStringContent? " "+nextToStringContent:"")+")";
	};

	ListNode.prototype.head = function() { return this.value; };
	ListNode.prototype.tail = function() { return this.next;  };
	ListNode.prototype.length = function() { return 1 + this.next.length(); };
	ListNode.prototype.push = function(x) { return new ListNode(x, this); };
	ListNode.prototype.remove = function(x) {
		var removedFromNext =  this.next.remove(x);
		if(x === this.value){
			return removedFromNext;
		}
		if(removedFromNext === this.next){
			return this;
		}
		return new ListNode(this.value, removedFromNext); 
	};
	ListNode.prototype.append = function(xs) { return new ListNode(this.value, this.next.append(xs)); };


	Test.describe("Example list tests", function () {
	  var mt, l1, l2, l3, l4;
	  
	  Test.before( function () {
	    mt = new EmptyList();
	    l1 = mt.push('c').push('b').push('a');
	    l2 = l1.append(l1);
	    l3 = l1.remove('b');
	    l4 = l2.remove('b');
	  });
	    
	  Test.it( "Simple checks", function () {
	    Test.expect(mt.isEmpty(), "Empty List is empty");
	    Test.expect( !l1.isEmpty(), "Non-empty list is not empty");
	    Test.expect(mt.toString() === "()", "()");
	    Test.expect(l3.toString() === "(a c)", "(a c)");
	    Test.expect(mt.length() === 0, "Empty list has length zero");
	    Test.expect(l1.length() === 3, "(a b c) length 3");
	  });
	    
	  Test.it( "Shared structure", function () {
	    Test.expect(l2.tail().tail().tail() === l1, "(a b c a b c) shares");
	    Test.expect(l2 !== l1, "(a b c a b c) doesn't share too much");
	    Test.expect(l3.tail() === l1.tail().tail(), "(a b c) remove b shares c");
	  });
	});
})()