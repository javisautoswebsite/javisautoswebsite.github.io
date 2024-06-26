/*
	Threshold by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/


(function($) {

	var	$window = $(window),
		$header = $('#header'),
		$banner = $('#banner'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() { return $header.height() - 5; }
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
			});

		}

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350,
			baseZIndex: 100000
		});
	
	// Reviews
		document.addEventListener('DOMContentLoaded', function () {
			const stars = document.querySelectorAll('.star');
			const ratingContainer = document.getElementById('ratingContainer');
			const redirectButton = document.getElementById('redirectButton');
		
			stars.forEach(star => {
				star.addEventListener('mouseover', function () {
					resetStars();
					highlightStars(this);
				});
		
				star.addEventListener('mouseout', resetStars);
		
				star.addEventListener('click', function () {
					const rating = this.getAttribute('data-rating');
					if (rating <= 3) {
						window.location.href = 'review.html';
					} else {
						window.location.href = 'reviews.html';
					}
				});
			});
		
			function resetStars() {
				stars.forEach(star => star.classList.remove('active'));
			}
		
			function highlightStars(selectedStar) {
				const selectedRating = selectedStar.getAttribute('data-rating');
				for (let i = 0; i < stars.length; i++) {
					const star = stars[i];
					if (star.getAttribute('data-rating') <= selectedRating) {
						star.classList.add('active');
					}
				}
			}
		});


	// Menu.
		$('<a href="#navPanel" class="navPanelToggle"><span>Menu</span></a>')
			.appendTo($header);

		$( '<div id="navPanel">' +
				'<nav>' +
					$('#nav') .navList() +
				'</nav>' +
				'<a href="#navPanel" class="close"></a>' +
			'</div>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'is-navPanel-visible',
					side: 'right'
				});

})(jQuery);
