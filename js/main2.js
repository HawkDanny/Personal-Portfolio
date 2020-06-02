window.onload = init;

let dohideElements;
let filters;

let everything;

let projBorder = "solid black 4px";
let projBorderInvert = "solid white 4px";


function init() {
    dohideElements = document.querySelectorAll(".dohide");
    filters = document.querySelectorAll(".filter");
    everything = document.querySelectorAll(".ev");
}

function filter(clss, elmnt) {
    //change the filter text styling
    for (let i = 0; i < filters.length; i++) {
        filters[i].classList.remove("filterActive");
    }
    elmnt.classList.add("filterActive");

    for (let i = 0; i < everything.length; i++) {
        if (everything[i].classList.contains(clss)) {
            everything[i].style.display = "block";
        }
        else
            everything[i].style.display = "none";
    }
}

function FadeInBackground(background, elmnt)
{
    dohideElements.forEach(function(elmnt) {
        elmnt.style.visibility = "hidden";
    });

    document.querySelector("#" + background).style.visibility = "visible";

    if (!elmnt.classList.contains("projectInvert")) {
        elmnt.style.border = projBorderInvert;
    }

    switch (background) {
        case "narwhal":
            document.body.style.backgroundImage = "url('media/homepage/narwhal_homepage.jpg')";
            break;
        case "imagine":
            document.body.style.backgroundImage = "url('media/homepage/imagine_homepage.jpg')";
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
    }
}

function FadeOutBackground(elmnt) {
    document.body.style.backgroundImage = "linear-gradient(var(--color-bg), var(--color-bg))";

    dohideElements.forEach(function(elmnt) {
        elmnt.style.visibility = "visible";
    });

    if (!elmnt.classList.contains("projectInvert")) {
        elmnt.style.border = projBorder;
    }
}