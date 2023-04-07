window.onload = init;

let items = {};

function init() {
    let tl = document.querySelector("#timeline");
    let cont = document.querySelector("#content");
    let filters = document.querySelector("#filters");
    let currentYear;
    
    for (let i = 0; i < data.projects.length; i++) {
        let currentProj = data.projects[i];

        //create a year on the timeline if it's a new one
        if (currentProj.year != currentYear) {
            currentYear = currentProj.year;
            let year = document.createElement('p');
            year.textContent = currentYear;
            year.className = "year";
            tl.appendChild(year);
        }

        //add project to timeline
        let proj = document.createElement('p');
        proj.textContent = currentProj.name;
        tl.appendChild(proj);

        for (let j = 0; j < currentProj.tags.length; j++)
        {
            let currentTag = currentProj.tags[j];

            //add to appropriate items arrays to track all the items by tag
            if (items.hasOwnProperty(currentTag)) {
                let list = items[currentTag];
                list[list.length - 1] = currentProj;
            } else {
                //create a new list in items for a new tag
                let list = items[currentTag] = [];
                list[0] = currentProj;

                //also add to the filters element
                let filter = document.createElement('p');
                filter.innerText = currentTag;
                filters.appendChild(filter);
            }
        }

        //create item
        let item = document.createElement('div');
        item.className = "item";
        item.style.backgroundImage = "url('" + currentProj.headerImageURL + "')";
        if (currentProj.invertTitleColor)
            item.style.color = "white";

        //create itemText
        let itemText = document.createElement('div');
        itemText.className = "itemText";
        item.appendChild(itemText);

        //create title
        let title = document.createElement("h1");
        title.innerText = currentProj.name.toUpperCase();
        itemText.appendChild(title);

        //create logline
        let logline = document.createElement("p");
        logline.innerText = currentProj.logline;
        itemText.appendChild(logline);

        cont.appendChild(item);
    }
}