window.onload = init;

function init() {
    createTimeline();
    createContent();

    console.log(data.projects.length);
}

function createTimeline() {
    let tl = document.querySelector("#timeline");
    let currentYear;
    for (let i = 0; i < data.projects.length; i++) {
        //create a year if it's a new one
        if (data.projects[i].year != currentYear) {
            currentYear = data.projects[i].year;
            let year = document.createElement('p');
            year.textContent = currentYear;
            year.className = "year";
            tl.appendChild(year);
        }

        let proj = document.createElement('p');
        proj.textContent = data.projects[i].name;
        tl.appendChild(proj);
    }
}

function createContent() {
    let cont = document.querySelector("#content");

    for (let i = 0; i < data.projects.length; i++) {

        //create item
        let item = document.createElement('div');
        item.className = "item";
        item.style.backgroundImage = "url('" + data.projects[i].headerImageURL + "')";
        if (data.projects[i].invertTitleColor)
            item.style.color = "white";

        //create itemText
        let itemText = document.createElement('div');
        itemText.className = "itemText";
        item.appendChild(itemText);

        //create title
        let title = document.createElement("h1");
        title.innerText = data.projects[i].name.toUpperCase();
        itemText.appendChild(title);

        //create logline
        let logline = document.createElement("p");
        logline.innerText = data.projects[i].logline;
        itemText.appendChild(logline);

        cont.appendChild(item);
    }
}