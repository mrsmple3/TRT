document.addEventListener("DOMContentLoaded", function () {
	function size(px) {
		const conversionFactor = 24;
		const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
		return (px / conversionFactor) * index;
	}

	let minWidthMobile = window.innerWidth < 1025 ? false : true;

	// Функция для обновления слайдера, если он существует
	function updateSlider(sliderInstance, selector) {
		if (document.querySelector(selector)) {
			sliderInstance.update();
		}
	}

	window.addEventListener("resize", function () {
		minWidthMobile = window.innerWidth < 1025 ? false : true;
		updateSlider(sliderMainImgs, ".swiper.main-slider");
	});

	function updateFractionPosition(index) {
		const btnTop = $(".main-block .replacer__btns").eq(index).offset().top;
		const btnHeight = $(".main-block .replacer__btns").eq(index).height();

		const fractionTop = $(".main-block .offer__structure.replacer").eq(index).offset().top;

		if (minWidthMobile) {
			$(".main-block .offer__structure.original").css("top", `${fractionTop}px`);
		} else {
			$(".main-block .offer__structure.original .swiper-fraction").css("top", `-${btnHeight / 2 + 72}px`);
			$(".main-block .offer__structure.original").css("top", `${btnTop + btnHeight + 72}px`);
		}
		$(".main-block .btns").css("top", `${btnTop}px`);
	}

	const sliderMainImgs = new Swiper(".swiper.main-slider", {
		pagination: {
			el: ".main-slider .swiper-fraction",
			type: "fraction",
		},
		navigation: {
			nextEl: ".main-slider .btns__next",
			prevEl: ".main-slider .btns__prev",
		},
		slidesPerView: 1,
		initialSlide: 0,
		speed: 1300,
		parallax: true,
		spaceBetween: 1,
		loop: true,
		on: {
			init: function () {
				updateFractionPosition(this.realIndex);
			},
			// slideChange: function () {
			// 	setTimeout(() => {
			// 		updateFractionPosition(this.realIndex);
			// 	}, 200);
			// },
		},
	});
});
