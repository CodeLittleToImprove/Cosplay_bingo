const $left = $('.left');
const $right = $('.right');
const $container = $('.container');

$left
    .on('mouseenter', () => $container.addClass('left-is-hovered'))
    .on('mouseleave', () => $container.removeClass('left-is-hovered'));

$right
    .on('mouseenter', () => $container.addClass('right-is-hovered'))
    .on('mouseleave', () => $container.removeClass('right-is-hovered'));


window.addEventListener('pagehide', function ()
{
    localStorage.clear();
    sessionStorage.clear();
    console.log('Page is hiding, storage cleared.');
});
