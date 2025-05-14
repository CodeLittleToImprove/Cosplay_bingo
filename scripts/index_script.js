/* global skrollr */

skrollr.init();

function goToLevelPage()
{
    $("html, body").animate({scrollTop: 100}, 1000, function ()
    {
        window.location.replace("level.html");
    });
}

let scrolled = false;

$(window).on('scroll touchmove', function ()
{
    if ($(window).scrollTop() >= 100 && !scrolled)
    {
        goToLevelPage();
        scrolled = true;
    }
});

$(".logocon").on('click touchstart', goToLevelPage);

// if (/Mobi/.test(navigator.userAgent) && navigator.languages.includes("de") || navigator.languages.includes("de-DE")) {
// 	// Replace "scroll down" with "swipe up" in the hint text
// 	document.getElementById("hint-text").innerHTML = "Hier Dr&uuml;cken";
// 	// console.log("deutsch und mobil");
// } else if (/Mobi/.test(navigator.userAgent) && navigator.languages.includes("en") || navigator.languages.includes("en-en")) {
// 	// Replace "runter scrollen " with "scroll down" in the hint text
// 	document.getElementById("hint-text").innerHTML = "Press Here";
// 	// console.log("english and mobil");
// }
