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

// old version

if (/Mobi/.test(navigator.userAgent)) {
	// Replace "scroll down" with "swipe up" in the hint text
	document.getElementById("hint-text").innerHTML = "swipe up";
  }

document.addEventListener("DOMContentLoaded", function(event) {
	// Hier den JavaScript-Code einfügen
	if (/Mobi/.test(navigator.userAgent) && navigator.language === "en") {
	  // Replace "scroll down" with "swipe up" in the hint text
	  document.getElementById("hint-text").innerHTML = "swipe up";
	} else if (/Mobi/.test(navigator.userAgent) && navigator.language === "de") {
	  // Replace "scroll down" with "swipe up" in the hint text
	  document.getElementById("hint-text").innerHTML = "Nach oben wischen";
	}
  });
  