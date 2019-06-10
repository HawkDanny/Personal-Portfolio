window.onload = init;
window.onscroll = updateNav;
var scrollItems;

var activeNavStyle = "color: var(--color-detail); text-shadow: 2px 2px 1px var(--color-fade3);";
var inactiveNavStyle = "color: var(--color-header); text-shadow: 2px 2px 1px var(--color-fade2);";

function init() {
    var fitties = fitty('.fit', {
    minSize: 12,
    maxSize: 92
    });

    for (var i = 0; i < fitties.length; i++)
    {
        fitties[0].fit();
    }
}

//Called every time the window is scrolled
function updateNav() {
    console.log(window.scrollY);
}

function setupScroll(element, id) {
    scrollItems[scrollItems.length - 1] = id;
    console.log(scrollItems[scrollItems.length - 2]);
    //document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}