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
		const fractionTop = $(".main-block .replacer__fraction").eq(index).offset().top;
		$(".main-block .btns").css("top", `${btnTop}px`);
		$(".main-block .swiper-fraction").css("top", `${fractionTop}px`);
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
			slideChange: function () {
				setTimeout(() => {
					updateFractionPosition(this.realIndex);
				}, 200);
			},
		},
	});
});
