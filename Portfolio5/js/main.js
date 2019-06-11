window.onload = init;
window.onscroll = updateNav;
var scrollItems;
var scrollIndex = 0; //index of the current scrollItem being looked at by the user

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


    //Get all the scrollItems
    scrollItems = document.getElementsByClassName("sideBarClickable");
    console.dir(scrollItems);
    for (var i = 0; i < scrollItems.length; i++)
    {
        scrollItems[i].addEventListener("click", (function(j) {
            return function() {
                document.getElementById(scrollItems[j].dataset.sisterTag).scrollIntoView({behavior: 'smooth'});
            }
        })(i));
    }
}

//Called every time the window is scrolled
function updateNav() {
    if (document.getElementById(scrollItems[scrollIndex].dataset.sisterTag).getBoundingClientRect().y < window.innerHeight / 2)
    {
        scrollItems[scrollIndex].style = activeNavStyle;
        if (scrollIndex > 0)
            scrollItems[scrollIndex-1].style = inactiveNavStyle;
        scrollIndex = Math.min(scrollIndex + 1, scrollItems.length - 1);
    } else if (scrollIndex > 0 && document.getElementById(scrollItems[scrollIndex - 1].dataset.sisterTag).getBoundingClientRect().y >= 0)
    {
        scrollItems[scrollIndex - 1].style = activeNavStyle;
        scrollItems[scrollIndex].style = inactiveNavStyle;
        scrollIndex = Math.max(scrollIndex - 1, 0);
    }
}

function scrollTo(element, id) {
    scrollItems[scrollItems.length - 1] = id;
    console.log(scrollItems[scrollItems.length - 2]);
    //document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}