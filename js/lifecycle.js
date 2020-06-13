(function(window) {
	// 对document.hidden做前缀处理
	function getHiddenProp(){
	    var prefixes = ['webkit','moz','ms','o'];
	    
	    // if 'hidden' is natively supported just return it
	    if ('hidden' in document) return 'hidden';
	    
	    // otherwise loop over all the known prefixes until we find one
	    for (var i = 0; i < prefixes.length; i++){
	        if ((prefixes[i] + 'Hidden') in document) 
	            return prefixes[i] + 'Hidden';
	    }
	 
	    // otherwise it's not supported
	    return null;
	};

	// 获取document.visibilityState属性
	function getVisibilityState() {
	    var prefixes = ['webkit', 'moz', 'ms', 'o'];
	    if ('visibilityState' in document) return 'visibilityState';
	    for (var i = 0; i < prefixes.length; i++) {
	        if ((prefixes[i] + 'VisibilityState') in document)
	            return prefixes[i] + 'VisibilityState';
	    }
	    // otherwise it's not supported
	    return null;
	};

	// 给document添加事件
	window.onTabChange = function(onShow, onHide) {
		var visProp = getHiddenProp();
		if (visProp) {
		    var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
		    document.addEventListener(evtname, function () {
		        if (document[getVisibilityState()] == 'visible') {
		        	onShow();
		        }else{
		        	onHide();
		        }
		    },false);
		};
	};
})(window)