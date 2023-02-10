$(function () {
	App.CONFIG.section_list = [];
	$.each(App.CONFIG.sectionGroup, function (i1, v1) {
		$.each(v1.subGroup, function (i2, v2) {
			App.CONFIG.section_list = $.merge(App.CONFIG.section_list, v2.list);
		});
	});

	App.CONFIG.Control = {
		Starring: null,
		Supporting: null
	};

	var isHorizontal = function () { //more than 480px horizontal display
		return $(window).width() <= 480 ? false : true;
	}

	var resize = function () {
		if (isHorizontal()) {
			App.CONFIG.window.width = Math.max($(window).width(), App.CONFIG.window.minWidth());
			App.CONFIG.window.height = Math.max($(window).height(), App.CONFIG.window.minHeight());
			if ($(window.document).width() >= App.CONFIG.section.normalWidth()) {
				App.CONFIG.section.width = App.CONFIG.section.normalWidth();
			} else {
				App.CONFIG.section.width = App.CONFIG.section.minWidth();
			}
			App.CONFIG.section.height = Math.max(
				Math.min($(window.document).height() - App.CONFIG.unit * 2 - App.CONFIG.unit * 3, App.CONFIG.section.normalHeight()),
				App.CONFIG.section.minHeight()
			);

			App.isWheel = false;
			App.ratio = App.CONFIG.window.width / App.CONFIG.window.height;
			$("#wall").height($(window).height() - App.CONFIG.unit * 2 - App.CONFIG.unit * 3);
			$("#wall-container").width(App.CONFIG.section.width * App.CONFIG.section_list.length + $(window).width() - App.CONFIG.section.width);
		}
		$("#backgroud").width($(window).width()).height($(window).height());
	};
	resize();

	var resizeVideo = function (event) {
		App.ratioVideo = $(this).width() / $(this).height();

		if (App.ratio / App.ratioVideo >= 1) {
			$("#backgroud .backgroud-video").css("width", "100%").css("height", "auto");
		}
		else {
			$("#backgroud .backgroud-video").css("width", "auto").css("height", "100%");
		}
	};

	var reset = function (event, handler) {
		var index = 0;
		index = parseInt($("#wall").scrollLeft() / App.CONFIG.section.width, 10);

		var config = App.CONFIG.section_list[index];

		if (!!config.iconText) {
			$("#head").html("<p class='title'>{iconText}</p>".replace("{iconText}", config.iconText));
		} else if (!!config.iconClass) {
			$("#head").html("<i class='icon {iconClass}'></i>".replace("{iconClass}", config.iconClass));
		} else {
			$("#head").html("");
		}

		if (App.currentUrl !== (config.imageSrc || config.videoSrc).toLowerCase()) {
			App.currentUrl = (config.imageSrc || config.videoSrc).toLowerCase();

			if ($("#backgroud").children().length > 0) {
				App.Control.Supporting = $("#backgroud").children();
			}
			if (!!config.imageSrc) {
				App.Control.Starring = $("<div class='backgroud-image hide'></div>").appendTo($("#backgroud"));
				App.Control.Starring.css("background-image", "url({path})".replace("{path}", config.imageSrc));
			} else if (!!config.videoSrc) {
				App.Control.Starring = $("<video class='backgroud-video hide' autoplay='autoplay' loop='loop'></video>");
				App.Control.Starring.get(0).onloadedmetadata = resizeVideo;
				App.Control.Starring.appendTo($("#backgroud")).attr("src", config.videoSrc);
			}

			if (!App.Control.Supporting) {
				App.Control.Starring.fadeIn("slow", function (e) {
					if (!!handler) {
						handler.call(this, e);
					}
				});
			} else {
				App.Control.Supporting.fadeOut("slow", function (e) {
					App.Control.Starring.fadeIn("slow", function (e2) {
						if (!!handler) {
							handler.call(this, e2);
						}
					});
					App.Control.Supporting.remove();
				});
			}
		} else {
			if (!!handler) {
				handler.call(this);
			}
		}

		App.isWheel = false;
	};
	reset();

	$(window).resize(function () {
		resize();
	});

	/*var createId = function () {
		//return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		return "id{random}".replace("{random}", new Date().getTime());
	};
	var appendEventData = function (event, data) {
		var eventData = event || {};
		$.extend(true, event || {}, data);
		eventData.animateId = event.animateId;
	};*/

	var forward = function (event, handler) {
		$("#wall").animate({ scrollLeft: "+={width}".replace("{width}", App.CONFIG.section.width) }, App.CONFIG.pageTime * 1000, function (e) {
			reset.call(this, e, function (e2) {
				if (!!handler) {
					handler.call(this, $.extend(true, event || {}, { animateId: event.animateId }));
				}
			});
		});
	};
	var backward = function (event, handler) {
		$("#wall").animate({ scrollLeft: "-={width}".replace("{width}", App.CONFIG.section.width) }, App.CONFIG.pageTime * 1000, function (e) {
			reset.call(this, e, function (e2) {
				if (!!handler) {
					handler.call(this, $.extend(true, event || {}, { animateId: event.animateId }));
				}
			});
		});
	};

	/*var autoForward = function (event) {
		if (App.animateId === event.animateId) {
			forward.call(this, event, function (e) {
				setTimeout(autoForward, App.CONFIG.autoplayTime * 1000, e);
			});
		}
	};
	var autoBackward = function (event) {
		if (App.animateId === event.animateId) {
			backward.call(this, event, function (e) {
				setTimeout(autoBackward, App.CONFIG.autoplayTime * 1000, e);
			});
		}
	};*/

	var hammer = new Hammer($("#app").get(0));
	hammer.on('swipeleft swipeup', forward);
	hammer.on('swiperight swipedown', backward);

	setTimeout(function() {
		$("#wall").smoothWheel({
			onRender: function() {
				reset();
			}
		});
	}, 1000);

	//var indexer = 0;
	$.each(App.CONFIG.sectionGroup, function (i1, v1) {
		$.each(v1.subGroup, function (i2, v2) {
			if (!isHorizontal()) {
				$("#backgroud").width($(window).width()).height($(window).height());
                
				var group = $($("#group").html().replace("{title}", v2.name).replace("{fragment}", v2.fragment.toLowerCase()))
					.appendTo($("#wall-container"));

				group.attr("id", v2.fragment.toLowerCase());

				if (!v2.odd) {
					group.addClass("group-even");
				}

				$.each(v2.list, function (i3, v3) {
					var element = $($("#section").html().replace("{content}", $("#{id}".replace("{id}", v3.contentId)).html()));
					element.find(".bottom").css({
						display: "inline-block",
						margin: "30px 0 80px 0"
					});
					element.appendTo(group);

				});

			} else {
				var group = $($("#group").html().replace("{title}", v2.name).replace("{fragment}", v2.fragment.toLowerCase()))
					.width(App.CONFIG.section.width * v2.list.length)
					.appendTo($("#wall-container"))
					.find("div.group-container").height(App.CONFIG.section.height);
				$.each(v2.list, function (i3, v3) {
                    var element = $($("#section").html().replace("{content}", $("#{id}".replace("{id}", v3.contentId)).html()));
					element.width(App.CONFIG.section.width);
					element.find(".content").width(App.CONFIG.section.width - App.CONFIG.unit - App.CONFIG.unit).height(App.CONFIG.section.height);
					element.find(".top").height(0);
					element.appendTo(group);

					//indexer = indexer + 1;
				});
			}
		});
	});

	$(window).bind('hashchange', function () {
		if (!!location.hash) {
			var widthList = $("div[fragment='{fragment}']".replace("{fragment}", location.hash.toLowerCase().replace("#", "")))
				.parent(".group").prevAll(".group").map(function (index, element) {
					return $(element).width();
				});
			var left = eval(widthList.toArray().join("+")) | 0;
			if (!isHorizontal()) {
				if (location.hash) {
					if ($(".navigation-trigger").hasClass("navigation-open")) {
						$(".navigation-trigger").trigger("click");
					}
				}
			} else {
				$("#wall").animate({ scrollLeft: left }, App.CONFIG.navigateTime * 1000, "easeInOutExpo", reset);
			}
		}
	});
	$(window).trigger('hashchange');

	$(window).on( "orientationchange", function( event ) {
		location.reload();
	});

	var animateFlag = true;
	$(".navigation-trigger").on("click", function() {

		var _self = this;
		if ($(this).hasClass("navigation-open")) {
			if (animateFlag) {
				$(".navigation--main").animate({ right: -220 }, 300, "easeInOutExpo", function () {
					$(_self).removeClass("navigation-open");
					animateFlag = true;
				});
				animateFlag = false;
			}
		} else {
			if (animateFlag) {
				$(".navigation--main").animate({ right: 0 }, 300, "easeInOutExpo", function () {
					$(_self).addClass("navigation-open");  
					new IScroll('.navigation', { scrollX: true, freeScroll: true, click: true});
					animateFlag = true;
				});
				animateFlag = false;
			}
		}

	});

	/*setTimeout(function () {
		$.each(App.CONFIG.section_list, function (i1, v1) {
			if (!!v1.imageSrc) {
				$("<img />").attr("src", v1.imageSrc);
			}
		});
	}, 3000);*/
});
