window.onload = init;

let dohideElements;


function init() {
    dohideElements = document.querySelectorAll(".dohide");
}

function FadeInBackground(background)
{
    dohideElements.forEach(function(elmnt) {
        elmnt.style.visibility = "hidden";
    });

    document.querySelector("#" + background).style.visibility = "visible";

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
    }
}

function FadeOutBackground() {
    document.body.style.backgroundImage = "linear-gradient(var(--color-bg), var(--color-bg))";

    dohideElements.forEach(function(elmnt) {
        elmnt.style.visibility = "visible";
    });
}