window.onload = init;

let root;

let dohideElements;
let filters;

let everything;
let everythingSide;

let projBorder = "solid black 4px";
let projBorderInvert = "solid white 4px";

let years = {};
let mousePos = {};

let hoveringOnProject = false;
let activeHoverElement;

let dontDoIt;

function init() {
    root = document.documentElement;
    dohideElements = document.querySelectorAll(".dohide");
    filters = document.querySelectorAll(".filter");
    everything = document.querySelectorAll(".ev");
    everythingSide = document.querySelectorAll(".ev-s");
    
    //sidebar year headers
    //years.y2015 = document.querySelector(".y2015");
    //years.y2016 = document.querySelector(".y2016");
    years.y2017 = document.querySelector(".y2017");
    years.y2018 = document.querySelector(".y2018");
    years.y2019 = document.querySelector(".y2019");
    years.y2020 = document.querySelector(".y2020");

    //sidebar year projects
    //years.y2015s = document.querySelectorAll(".y15");
    //years.y2016s = document.querySelectorAll(".y16");
    years.y2017s = document.querySelectorAll(".y17");
    years.y2018s = document.querySelectorAll(".y18");
    years.y2019s = document.querySelectorAll(".y19");
    years.y2020s = document.querySelectorAll(".y20");

    let url = new URL(window.location.href);
    if (url.hash !== "")
        filterFromURL(url.hash);
    else
        filter("hl");

    if (window.innerWidth < 1470)
        dontDoIt = true;
    else
        dontDoIt = false;
}

window.onresize = function() {
    if (window.innerWidth < 1470)
        dontDoIt = true;
    else
        dontDoIt = false;
}

document.onmousemove = function(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
}

window.onscroll = function() {
    let elmnt = document.elementFromPoint(mousePos.x, mousePos.y);
    if (hoveringOnProject && !elmnt.classList.contains("project")) {
        this.FadeOutBackground(activeHoverElement);
        hoveringOnProject = false;
    } else if (!hoveringOnProject && elmnt.classList.contains("project")) {
        this.FadeInBackground(elmnt);
    }
}

function filterFromURL(hash) {
    switch (hash) {
        case "#highlights":
            filter('hl');
        break;
        case "#everything":
            filter('ev');
        break;
        case "#videogames":
            filter('vg');
        break;
        case "#analoggames":
            filter('ag');
        break;
        case "#physicalcomputing":
            filter('pc');
        break;
        case "#events":
            filter('evn');
        break;
        case "#talks":
            filter('ta');
        break;
        case "#videos":
            filter('vi');
        break;
    }
}

function filter(clss) {
    //change the filter text styling
    for (let i = 0; i < filters.length; i++) {
        filters[i].classList.remove("filterActive");
    }
    document.getElementById(clss).classList.add("filterActive");

    filterProjects(clss);
}

function filterProjects(clss) {
    for (let i = 0; i < everything.length; i++) {
        if (everything[i].classList.contains(clss)) {
            everything[i].style.display = "block";
        }
        else
            everything[i].style.display = "none";
    }

    for (let i = 0; i < everythingSide.length; i++) {
        if (everythingSide[i].classList.contains(clss + "-s")) {
            everythingSide[i].style.display = "block";
        }
        else
            everythingSide[i].style.display = "none";
    }


    //sidebar
    //filterSidebarYear(years.y2015, years.y2015s);
    //filterSidebarYear(years.y2016, years.y2016s);
    filterSidebarYear(years.y2017, years.y2017s);
    filterSidebarYear(years.y2018, years.y2018s);
    filterSidebarYear(years.y2019, years.y2019s);
    filterSidebarYear(years.y2020, years.y2020s);
}

function filterSidebarYear(year, years) {
    let hide = false;
    for (let i = 0; i < years.length; i++) {
        if (years[i].style.display !== "none") {
            hide = true;
            break;
        }
    }

    if (hide)
        year.style.display = "block";
    else
        year.style.display = "none";
}

function FadeInBackground(elmnt)
{
    if (dontDoIt)
        return;

    hoveringOnProject = true;
    activeHoverElement = elmnt;

    dohideElements.forEach(function(elmnt) {
        elmnt.style.visibility = "hidden";
    });

    document.querySelector("#" + elmnt.id).style.visibility = "visible";

    if (!elmnt.classList.contains("projectInvert")) {
        elmnt.style.border = projBorderInvert;
        root.style.setProperty("--color-border", "#FFFFFF");
    }

    switch (elmnt.id) {
        case "narwhal":
            document.body.style.backgroundImage = "url('media/homepage/narwhal_homepage.jpg')";
            break;
        case "imagine":
            document.body.style.backgroundImage = "url('media/homepage/imagine_homepage.jpg')";
            break;
        case "court":
            document.body.style.backgroundImage = "url('media/homepage/court_homepage.jpg')";
            break;
        case "litrocks":
            document.body.style.backgroundImage = "url('media/homepage/rock_homepage.jpg')";
            break;
        case "boop2":
            document.body.style.backgroundImage = "url('media/homepage/boop2_homepage.jpg')";
            break;
        case "dog":
            document.body.style.backgroundImage = "url('media/homepage/dog_homepage.jpg')";
            break;
        case "beautiful":
            document.body.style.backgroundImage = "url('media/homepage/beautiful_homepage.jpg')";
            break;
        case "goodsex":
            document.body.style.backgroundImage = "url('media/homepage/goodsex_homepage.png')";
            break;
        case "birdtown":
            document.body.style.backgroundImage = "url('media/homepage/birdtown_homepage.png')";
            break;
        case 'newtrees':
            document.body.style.backgroundImage = "url('media/homepage/newtrees_homepage.jpg')";
            break;
        case 'abg':
            document.body.style.backgroundImage = "url('media/homepage/abg_homepage.jpg')";
            break;
        case 'sax':
            document.body.style.backgroundImage = "url('media/homepage/sax_homepage.jpg')";
            break;
        case 'folk':
            document.body.style.backgroundImage = "url('media/homepage/folk_homepage.jpg')";
            break;
        case 'tabs':
            document.body.style.backgroundImage = "url('media/homepage/tabs_homepage.jpg')";
            break;
    }
}

function FadeOutBackground(elmnt) {
    if (dontDoIt)
        return;

    document.body.style.backgroundImage = "linear-gradient(var(--color-bg), var(--color-bg))";

    dohideElements.forEach(function(elmnt) {
        elmnt.style.visibility = "visible";
    });

    if (!elmnt.classList.contains("projectInvert")) {
        elmnt.style.border = projBorder;
        root.style.setProperty("--color-border", "#000000");
    }

    hoveringOnProject = false;
    activeHoverElement = null;
}