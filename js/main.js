window.onload = init;
window.onscroll = updateNav;
var scrollItems;
var scrollSelectedItems;
var scrollEvents;
var firstSetup = true;
var scrollIndex = 0; //index of the current scrollItem being looked at by the user

var activeNavStyle = "color: var(--color-header); text-shadow: 1px 1px var(--color-fade2);";
var inactiveNavStyle = "color: var(--color-detail);";

var complete = true;

function init() {
    var fitties = fitty('.fit', {
    minSize: 12,
    maxSize: 92
    });

    for (var i = 0; i < fitties.length; i++)
    {
        fitties[0].fit();
    }

    getScrollItems();
}

//Called every time the window is scrolled
function updateNav() {
    if (document.getElementById(scrollSelectedItems[scrollIndex].dataset.sisterTag).getBoundingClientRect().y < window.innerHeight / 2)
    {
        scrollSelectedItems[scrollIndex].style = activeNavStyle;
        if (scrollIndex > 0)
            scrollSelectedItems[scrollIndex-1].style = inactiveNavStyle;
        
        scrollIndex = Math.min(scrollIndex + 1, scrollSelectedItems.length - 1);
    } else if (scrollIndex > 0 && document.getElementById(scrollSelectedItems[scrollIndex - 1].dataset.sisterTag).getBoundingClientRect().y >= 0)
    {
        scrollSelectedItems[scrollIndex - 1].style = activeNavStyle;
        scrollSelectedItems[scrollIndex].style = inactiveNavStyle;
        scrollIndex = Math.max(scrollIndex - 1, 0);
    } else if (scrollIndex === 0)
    {
        scrollSelectedItems[0].style = inactiveNavStyle;
    }
}

//Get all the scrollItems
function getScrollItems() {
    scrollItems = document.getElementsByClassName("sideBarClickable");
    scrollSelectedItems = new Array();

    //remove the previous eventListeners
    if (!firstSetup)
    {
        for (var i = 0; i < scrollItems.length; i++)
        {
            scrollItems[i].removeEventListener("click", scrollEvents[i], true);
        }
    }

    scrollEvents = new Array(scrollItems.length);

    for (var i = 0; i < scrollItems.length; i++)
    {
        if (!complete && !scrollItems[i].classList.contains('selected'))
            continue;
        
        scrollItems[i].addEventListener("click", (scrollEvents[i] = function(j) {
        return function() {
            document.getElementById(scrollItems[j].dataset.sisterTag).scrollIntoView({behavior: 'smooth'});
        }
        })(i));

        scrollSelectedItems[scrollSelectedItems.length] = scrollItems[i];
    }

    firstSetup = false;
}

function scrollTo(element, id) {
    scrollItems[scrollItems.length - 1] = id;
    console.log(scrollItems[scrollItems.length - 2]);
    //document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}

function toggleComplete() {
    document.getElementById("completeText").className = "active";
    document.getElementById("selectedText").className = "inactive";

    complete = !complete;
    var completeItems = document.getElementsByClassName('complete');

    for (var i = 0; i < completeItems.length; i++)
    {
        completeItems[i].style.display = 'block';
    }

    getScrollItems();
}

function toggleSelected() {
    document.getElementById("completeText").className = "inactive";
    document.getElementById("selectedText").className = "active";

    complete = !complete;
    var completeItems = document.getElementsByClassName('complete');

    for (var i = 0; i < completeItems.length; i++)
    {
        if (completeItems[i].classList.contains('selected'))
            continue;
        
        completeItems[i].style.display = 'none';
    }

    getScrollItems();
}