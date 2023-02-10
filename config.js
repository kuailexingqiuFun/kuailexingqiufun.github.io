window.App = {
	CONFIG: {
		unit: 40,
		window: {
			width: 800,
			height: 560,
			minWidth: function () { return 320; },
			minHeight: function () { return 560; }
		},
		//soloSection: {
		//	width: function () { return 600; }
		//},
		section: {
			width: 530,
			height: 640,
			normalWidth: function () { return 530; },
			normalHeight: function () { return 640; },
			minWidth: function () { return 320; },
			minHeight: function () { return 240; }
		},
		sectionGroup: [
			{
				name: "",
				subGroup: [
					{
						name: "",
						fragment: "home",
						list: [
							{ contentId: 'tmpl-home-01', contentSrc: 'content/home-01.html', iconClass: "", iconText: "", imageSrc: "media/home-01.jpg", videoSrc: "" },
							{ contentId: 'tmpl-blank', contentSrc: 'content/blank.html', iconClass: "", iconText: "", imageSrc: "media/home-01.jpg", videoSrc: "" }
						],
						odd: true
					}
				],
			},
			{
				name: "ABOUT",
				subGroup: [
					{
						name: "",
						fragment: "about",
						list: [
							{ contentId: 'tmpl-about-mission', contentSrc: 'content/about-mission.html', iconClass: "", iconText: "about us", imageSrc: "media/office-01.jpg", videoSrc: "" },
							{ contentId: 'tmpl-about-investment', contentSrc: 'content/about-investment.html', iconClass: "", iconText: "about us", imageSrc: "media/office-01.jpg", videoSrc: "" },
							{ contentId: 'tmpl-about-culture-less', contentSrc: 'content/about-culture-less.html', iconClass: "", iconText: "about us", imageSrc: "media/culture-01.jpg", videoSrc: "" }
						],
						odd: false
					}
				]
			},
			{
				name: "PEOPLE",
				subGroup: [
					{
						name: "",
						fragment: "people",
						list: [
							{ contentId: 'tmpl-people-01', contentSrc: 'content/people-01.html', iconClass: "", iconText: "people", imageSrc: "media/people-02.jpg", videoSrc: "" },
							{ contentId: 'tmpl-people-02', contentSrc: 'content/people-02.html', iconClass: "", iconText: "people", imageSrc: "media/people-01.jpg", videoSrc: "" },
							{ contentId: 'tmpl-people-03', contentSrc: 'content/people-03.html', iconClass: "", iconText: "people", imageSrc: "media/people-05.jpg", videoSrc: "" }
						],
						odd: true
					}
				]
			},
			{
				name: "contact",
				subGroup: [
					{
						name: "",
						fragment: "contact",
						list: [
							{ contentId: 'tmpl-contact-01', contentSrc: 'content/contact-01.html', iconClass: "", iconText: "Contact / Visit Us", imageSrc: "media/contact-01.jpg", videoSrc: "" },
							{ contentId: 'tmpl-contact-02', contentSrc: 'content/contact-02.html', iconClass: "", iconText: "Contact / Visit Us", imageSrc: "media/contact-01.jpg", videoSrc: "" },
							{ contentId: 'tmpl-contact-03', contentSrc: 'content/contact-03.html', iconClass: "", iconText: "Contact / Visit Us", imageSrc: "media/contact-01.jpg", videoSrc: "" },
							{ contentId: 'tmpl-blank', contentSrc: 'content/blank.html', iconClass: "", iconText: "", imageSrc: "media/contact-01.jpg", videoSrc: "" }
						],
						odd: true
					}
				]
			},
			{
				name: "product",
				subGroup: [
					{
						name: "",
						fragment: "product",
						list: [
							{ contentId: 'tmpl-product-01', contentSrc: 'content/product-01.html', iconClass: "", iconText: "Product", imageSrc: "media/product-01.jpg", videoSrc: "" },
							{ contentId: 'tmpl-product-02', contentSrc: 'content/product-02.html', iconClass: "", iconText: "Product", imageSrc: "media/product-01.jpg", videoSrc: "" },                                                        
							{ contentId: 'tmpl-blank', contentSrc: 'content/blank.html', iconClass: "", iconText: "", imageSrc: "media/product-01.jpg", videoSrc: "" }
						],
						odd: false
					}
				]
			}
		],
		autoplayTime: 3, //second
		pageTime: 1, //second
		navigateTime: 2 //second
	},
	//isSolo: false,
	isWheel: false,
	currentWheelTime: (new Date()),
	effectiveWheelTime: 1500, //millisecond
	isAuto: false,
	ratio: 1,
	ratioVideo: 1,
	currentUrl: "",
	Control: {}
};
