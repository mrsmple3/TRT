(function ($) {
	let $minWidthMobile = window.innerWidth < 1050 ? false : true;

	window.addEventListener("resize", function () {
		$minWidthMobile = window.innerWidth < 1050 ? false : true;
	});
	$(document).ready(function () {
		function size(px) {
			const conversionFactor = 24;
			const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
			return (px / conversionFactor) * index;
		}

		const $header = $("header");
		const $headerHeight = $header.outerHeight();
		const $headerLogo = $("header .logo");
		const $headerTopHeight = $("header .header__top").outerHeight();

		function handleScroll($setTop) {
			const scrollTop = $(window).scrollTop();
			if (scrollTop >= $setTop) {
				$header.css("top", `-${$setTop}px`);
			} else {
				$header.css("top", "0");
			}
		}

		gsap.registerPlugin(ScrollTrigger, Observer);

		let animationRunning = false;

		const mainBlockGsap = gsap.timeline(
			{ defaults: { delay: 0.1 } },
			{
				paused: true,
				onStart: () => {
					animationRunning = true;
				},
				onComplete: () => {
					mainBlockGsap.kill();
					animationRunning = false;
				},
			}
		);

		//!Header
		if ($minWidthMobile) {
			gsap.to("header", {
				boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.07)",
				scrollTrigger: {
					trigger: "header .menu",
					start: "top top",
					end: "top top",
					scrub: true,
				},
			});

			$("#search_icon").on("click", function () {
				const $searchForm = $(".search__form");
				const $searchInput = $searchForm.find("input");

				$searchForm.toggleClass("active");
				if ($searchForm.hasClass("active")) {
					$searchInput.focus();
				}
			});

			$(".search__form__close").on("click", function () {
				$(".search__form").removeClass("active");
			});

			$(window).on("scroll", handleScroll);

			Observer.create({
				target: window,
				type: "wheel,touch,scroll",
				onUp: () => {
					handleScroll("0");
				},
				onDown: () => {
					handleScroll($headerTopHeight);
				},
			});
		}

		//!Mobile Dropdown
		$(".dropdown-lang").click(function (event) {
			event.stopPropagation();
			$(this).toggleClass("active");
		});

		$(".menu-btn").click(function (event) {
			$(this).toggleClass("active");
			$(".mobile-menu").toggleClass("active");
			$("body").toggleClass("overflow-hidden");
		});
		function format_number(x) {
			return x.toString();
		}

		//!numerical
		if ($(".numbers .num").length > 0) {
			$(".numbers .num").each(function () {
				const $counter = $(this);
				const value = { val: parseInt($counter.text()) };

				// Function to start the animation
				function startAnimation() {
					gsap.from(value, {
						duration: 3,
						ease: "circ.out",
						val: 0,
						roundProps: "val",
						onUpdate: function () {
							$counter.text(format_number(value.val));
						},
					});
				}

				// Create an Intersection Observer instance
				var observer = new IntersectionObserver(
					function (entries) {
						if (entries[0].isIntersecting) {
							startAnimation();
							observer.disconnect(); // Stop observing after the animation starts
						}
					},
					{ threshold: 0.5 } // Adjust this value to determine when the animation should start
				);

				// Start observing the counter element
				observer.observe(this);
			});
		}

		//!Filter
		$(".filter__dropdown__item").on("click", function () {
			// Получаем значение выбранного элемента
			var selectedValue = $(this).val();
			// Находим родительский элемент .filter__dropdown
			var $dropdown = $(this).closest(".filter__dropdown");
			// Обновляем значение поля .dropdown__current в этом выпадающем списке
			$dropdown.find(".dropdown__current").val(selectedValue);
			$dropdown.removeClass("active");
		});

		if (!$minWidthMobile) {
			$(".dropdown__current").on("click", function () {
				const dropdown = $(this).closest(".filter__dropdown");
				if (dropdown.hasClass("active")) {
					dropdown.removeClass("active");
				} else {
					dropdown.addClass("active");
				}
			});
		}

		$(".dropdown__current").on("input", function () {
			var searchValue = $(this).val().toLowerCase();
			var $dropdownContainer = $(this).closest(".filter__dropdown").find(".filter__dropdown__container");

			$dropdownContainer.find(".filter__dropdown__item").each(function () {
				var itemValue = $(this).val().toLowerCase();
				if (itemValue.indexOf(searchValue) > -1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		});
	});
})(jQuery);
