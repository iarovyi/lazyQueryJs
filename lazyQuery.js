(function($){
	
	/*
	 * Create lazy evaluated query that can be evaluated with execute method
	 * @example
	 * 	   var lazyQuery = $.lazy('#contentContainer').width(70).css({paddingLeft: 45}); //nothing happens
	 *     lazyQuery.execute(); // query executes
	 * @param {Object} selector $() first argument
	 * @param {Object} context $() second argument
	 * @return {$.lazy.init} lazy evaluated query
	 */
	$.lazy = function(selector, context){
		return new $.lazy.init(selector, context);
	};
	
	/*
	 * Delayed function with promise
	 * @example $.wait(1000).then(function(){ });
	 */
	$.wait = function(delay) {
		var deferred = $.Deferred();
		setTimeout(deferred.resolve, delay);
		return deferred;
	};

	$.lazy.init = function(){
		this._selectors = arguments;
		this._methods = [];
	};
	
	$.lazy.init.prototype = {
		_execute: function(){
			var $dom = $.apply(this, this._selectors);
				
			$.each(this._methods, function(i, methodObj){
				var args = methodObj.args;
				$.each(args, function(i, param){
					args[i] = param instanceof $.lazy.init ? param.execute() : param;
				});
				$dom = $dom[methodObj.method].apply($dom, args);
			});
		
			return $dom;
		},
		/*
		 * Execute lazy query
		 * @param {Number} delay, if not provided - will execute immediately
		 */
		execute: function(delay){
			if (isNaN(Number(delay))){
				return this._execute();
			} else {
				return $.wait(delay).then($.proxy(this._execute, this));
			}
		}
	};
	
	for(var name in $.fn){
		if ($.type($.fn[name]) !== "function") {
			$.lazy.init.prototype[name] = $.fn[name];
			continue;
		}
		
		$.lazy.init.prototype[name] = (function(){
			var methodName = name;
			return function(){
				this._methods.push({ method: methodName, args: arguments });
				return this;
			};
		})();
	}

})(jQuery)