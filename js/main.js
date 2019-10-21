window.onload = init;

var bodyBackgroundStyle = "linear-gradient(var(--color-bg), var(--color-bg))"
var activeNavStyle = "color: var(--color-header); cursor: default;";
var inactiveNavStyle = "color: var(--color-detail); cursor: pointer;";

var complete = true;
var inverted = false;
var doUninvert = false;
var root;

function init() {
    //Temporarily like this. TODO: the css and html itself should reflect the selected start state
    toggleSelected();
    root = document.documentElement;
}

function scrollToProject(elementID) {
    document.getElementById(elementID).scrollIntoView({behavior: 'smooth'});
}

function toggleComplete() {
    document.getElementById("completeText").className = "active";
    document.getElementById("completeText").style = activeNavStyle;
    document.getElementById("selectedText").className = "inactive";
    document.getElementById("selectedText").style = inactiveNavStyle;

    complete = !complete;
    var completeItems = document.getElementsByClassName('complete');

    for (var i = 0; i < completeItems.length; i++)
    {
        completeItems[i].style.display = 'block';
    }
}

function toggleSelected() {
    document.getElementById("completeText").className = "inactive";
    document.getElementById("completeText").style = inactiveNavStyle;
    document.getElementById("selectedText").className = "active";
    document.getElementById("selectedText").style = activeNavStyle;

    complete = !complete;
    var completeItems = document.getElementsByClassName('complete');

    for (var i = 0; i < completeItems.length; i++)
    {
        if (completeItems[i].classList.contains('selected'))
            continue;
        
        completeItems[i].style.display = 'none';
    }
}

function FadeInBackground(background)
{
    switch (background) {
        case "narwhal":
            document.body.style.backgroundImage = "url('media/homepage/narwhal_homepage.jpg')";
            break;
        case "imagine":
            InvertColors();
            doUninvert = true;
            document.body.style.backgroundImage = "url('media/homepage/imagine_homepage.jpg')";
            break;
        case "rocks":
            document.body.style.backgroundImage = "url('media/homepage/rock_homepage.jpg')";
            break;
        case "boop2":
            document.body.style.backgroundImage = "url('media/homepage/boop2_homepage.jpg')";
            break;
        case "dog":
            InvertColors();
            doUninvert = true;
            document.body.style.backgroundImage = "url('media/homepage/dog_homepage.jpg')";
            break;
        case "beautiful":
            document.body.style.backgroundImage = "url('media/homepage/beautiful_homepage.jpg')";
            break;
    }
}

function FadeOutBackground() {
    if (doUninvert)
    {
        doUninvert = false;
        InvertColors();
    }

    document.body.style.backgroundImage = bodyBackgroundStyle;
}

function InvertColors() {
    if (!inverted)
    {
        root.style.setProperty("--color-header", "#000000");
        root.style.setProperty("--color-text", "#00000085");
        root.style.setProperty("--color-inactive", "#00000063");
        root.style.setProperty("--color-detail", "#00000052");
        root.style.setProperty("--color-shadow", "#ffffff");
    } else {
        root.style.setProperty("--color-header", "#ffffff");
        root.style.setProperty("--color-text", "#ffffff85");
        root.style.setProperty("--color-inactive", "#ffffff63");
        root.style.setProperty("--color-detail", "#ffffff52");
        root.style.setProperty("--color-shadow", "#000000");
    }
    inverted = !inverted;
}