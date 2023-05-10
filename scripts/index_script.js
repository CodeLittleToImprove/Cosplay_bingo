skrollr.init();

var scrolled = false;

$(window).on('scroll touchmove', function () {
	var scrollPos = $(window).scrollTop();
	if (scrollPos >= 100 && !scrolled) {
		$("html, body").animate({ scrollTop: 100 }, 1000, function () {
			window.location.replace("page2.html");
		});
		scrolled = true;
	}
});

$(".logocon").on('click touchstart', function () {
	$("html, body").animate({ scrollTop: 100 }, 1000, function () {
		window.location.replace("page2.html");
	});
});

  if (/Mobi/.test(navigator.userAgent) && navigator.languages.includes("de")) {
	// Replace "scroll down" with "swipe up" in the hint text
	document.getElementById("hint-text").innerHTML = "Nach oben wischen";
  } else if(/Mobi/.test(navigator.userAgent) && navigator.languages.includes("en")) {
	// Replace "runter scrollen " with "scroll down" in the hint text
	document.getElementById("hint-text").innerHTML = "scroll down";
  }
  