/*
All rights reserved to krrish yadav, rotate lib 1.0v 
free to use ,
For personal as well as commercial :)
*/

(function (root, factory) {
  'use strict';

  function degreesToRadians (degrees) {
		return degrees * (Math.PI/180);
	}

	function calculateAngle(x1,x2,y1,y2){
		"use strict";

		var X = x2 - x1;
		var Y = y2 - y1;
		var angle = Math.atan2(Y,X);
		var deg = angle * (180/Math.PI)
		return deg;
	};
	function init(_ev,options) {
		_ev.options = Object.assign({ move : function(){} , moveEnd : function(){},moveStart : function(){}}, options);

		var attr = $(_ev).attr('disabled');
		if (typeof attr !== typeof undefined && attr !== false) 
			_ev.disabled = true;

		_ev.on("mousedown touchstart",function (event) {
			if(_ev.disabled == true) return;
			_ev.options.moveStart(_ev);
			_ev.touchstart = true;
			var e = event || window.event, _lastAngle = 0,_computeAngle;

			e.preventDefault();
			_ev.direction = 1;
			var offset = _ev.offset(),x2,y2;
			_ev.cx = offset.left + (_ev.width() / 2);
			_ev.cy = offset.top  + (_ev.height() / 2);

			_ev.previous_angle = _ev.current_angle == undefined ? 0 : _ev.current_angle;

		    $(document).on("mousemove touchmove",function(e){
				
				_ev.css('-moz-transform', 'rotate(' + _ev.current_angle + 'deg)');
			    _ev.css('-webkit-transform', 'rotate(' + _ev.current_angle + 'deg)');
			    _ev.css('-o-transform', 'rotate(' + _ev.current_angle + 'deg)');
			    _ev.css('-ms-transform', 'rotate(' + _ev.current_angle + 'deg)');

			    x2 = e.pageX || e.originalEvent.touches[0].pageX;
				y2 = e.pageY || e.originalEvent.touches[0].pageY;

				var deg = calculateAngle(_ev.cx , x2 , _ev.cy , y2);
				deg = deg < 0 ? 360 + deg : deg;
				_ev.current_angle = deg;

				if((Number(_lastAngle) - Number(deg) < 0) && Number(_lastAngle) != 360)
					_ev.direction = 1;
				else 
					_ev.direction = -1;


			    _ev.options.move(_ev);

			    _lastAngle = deg;
		    });
		    return false;
		});

		$(document).on("mouseup touchend",function(e) {
			if(_ev.disabled == true) return;
			_ev.x = e.pageX || e.originalEvent.changedTouches[0].pageX;
			_ev.y = e.pageY || e.originalEvent.changedTouches[0].pageY;
			_ev.current_angle = calculateAngle(_ev.cx,  _ev.x , _ev.cy , _ev.y);
		    $(document).off("mousemove");
		    $(document).off("touchmove");

		    if(_ev.touchstart){
		    	_ev.options.moveEnd(_ev);
		    	_ev.touchstart = false;
		    }
		    
		});
	};

	$.fn.Rotate = function(options) {
		return this.each(function(e) {
			init($(this),options!=undefined ? options : {} );
		});
	};
})($);
