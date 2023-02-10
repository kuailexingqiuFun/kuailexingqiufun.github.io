(function ($) {

	var self = this,
		container,
		running          = false, 
		currentX         = 0,
		targetX          = 0,
		oldX             = 0,
		maxScrollLeft    = 0, 
		minScrollLeft    = 0,
		direction,
		onRenderCallback = null,
		fricton          = 0.95, // higher value for slower deceleration
		vy               = 0,
		stepAmt          = 1,
		minMovement      = 0.1,
		ts               = 0.1;

	var updateScrollXTarget = function (amt) {
		targetX += amt;
		vy += (targetX - oldX) * stepAmt;

		oldX = targetX;
	}

	var renderX = function () {
		if (vy < -(minMovement) || vy > minMovement) {

			currentX = (currentX + vy);
			if (currentX > maxScrollLeft) {
				currentX = vy = 0;
			} else if (currentX < minScrollLeft) {
				vy = 0;
				//currentZ = minScrollLeft;
			}
           
			container.scrollLeft(-currentX);

			vy *= fricton;

			if(onRenderCallback){
				onRenderCallback();
			}
		}
	}

	var animateLoopX = function () {
		if (!running) return;
		requestAnimFrame(animateLoopX);
		renderX();
	}

	var onWheel = function (e) {
		e.preventDefault();
		var evt = e.originalEvent;
       
		var delta = evt.detail ? evt.detail * -1 : evt.wheelDelta / 40;
		var dir = delta < 0 ? -1 : 1;
		if (dir != direction) {
			vy = 0;
			direction = dir;
		}

		//reset currentY in case non-wheel scroll has occurred (scrollbar drag, etc.)
		currentX = -container.scrollLeft();

		updateScrollXTarget(delta);
	}

	/*
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
	window.requestAnimFrame = (function () {
		return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
 					window.setTimeout(callback, 1000 / 60);
				};            
	})();


	$.fn.smoothWheel = function () {
		//  var args = [].splice.call(arguments, 0);
		var options = jQuery.extend({}, arguments[0]);
		return this.each(function (index, elm) {
			container = $(this);
			if(!('ontouchstart' in window)) {

				container.bind("mousewheel", onWheel);
				container.bind("DOMMouseScroll", onWheel);

				//set target/old/current Y to match current scroll position to prevent jump to top of container
				targetX = oldX = container.get(0).scrollLeft;
				currentX = -targetX;

				minScrollLeft = container.get(0).clientWidth - container.get(0).scrollWidth;
				if (options.onRender) {
					onRenderCallback = options.onRender;
				}
				if (options.remove) {
					running = false;
					container.unbind("mousewheel", onWheel);
					container.unbind("DOMMouseScroll", onWheel);
				} else if (!running) {
					running = true;
					animateLoopX();
				}

			}

		});
	};


})(jQuery);