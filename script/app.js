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
		if ($(".benefits__nums .num").length > 0) {
			$(".benefits__nums .num").each(function () {
				var $counter = $(this);
				var value = { val: parseInt($counter.text()) };

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
		//!Catalog Products
		$(".catalog-products-page__cards__item").each(function () {
			const $item = $(this);
			const $downloadLink = $item.find(".item__download-link");
			const $image = $item.find(".item__img");
			const url = $image.data("url");

			// Если у изображения есть data-url, делаем кликабельным элемент .item__download-link
			if (url) {
				$downloadLink.on("click", function (event) {
					event.preventDefault();
					console.log(url);
					window.location.href = url; // Перенаправляем на ссылку из data-url
				});
			}
		});
	});
})(jQuery);
