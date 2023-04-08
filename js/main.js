window.onload = init;

let items = {};
let tl;
let cont;
let filters;

function init() {
    tl = document.querySelector("#timeline");
    cont = document.querySelector("#content");
    filters = document.querySelector("#filters");

    buildTimeline();
    buildContent();
    //buildPage('Beautiful Series');
    buildFilters();
}

function buildTimeline() {
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
    }
}

function buildContent() {
    for (let i = 0; i < data.projects.length; i++) {
        let currentProj = data.projects[i];

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

function buildFilters() {

    for (let i = 0; i < data.projects.length; i++) {
        let currentProj = data.projects[i];

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
    }
}


/* Example HTML
<div class="page">
    <div class="pageHeader">
        <h1 class="pageTitle">Bird Town</h1>
        <div class="pageHeaderInfo">
            <p>2023 -</p>
            <p>Developer, Designer</p>
        </div>
    </div>
    <div class="pageContent">
        <p>Bird Town is a comedy video game about a town of birds where you play as Margo in the final 15 minutes of her town's summer festival. Each playthrough of the game is a real time fifteen minutes where you decide how to spend your day, whether its getting into hijinks or talking with neighbors, going on bite sized adventures or taking a nap. It's your day and you can do whatever you want.</p>
    </div>
</div>
*/
function buildPage(projName) {
    for (let i = 0; i < data.projects.length; i++) {

        //loop until we find the project TODO: make a dictionary
        if (data.projects[i].name != projName)
            continue;

        //save current proj
        let currentProj = data.projects[i];

        //clear out content div
        cont.innerHTML = "";

        let page = document.createElement('div');
        page.className = "page";
        cont.appendChild(page);

        let pageHeader = document.createElement('div');
        pageHeader.className = "pageHeader";
        pageHeader.style.backgroundImage = "url('" + currentProj.headerImageURL + "')";
        if (currentProj.invertTitleColor)
            pageHeader.style.color = "white";
        page.appendChild(pageHeader);

        let pageTitle = document.createElement('h1');
        pageTitle.className = "pageTitle";
        pageTitle.innerText = currentProj.name;
        pageHeader.appendChild(pageTitle);

        let pageHeaderInfo = document.createElement('div');
        pageHeaderInfo.className = "pageHeaderInfo";
        pageHeader.appendChild(pageHeaderInfo);

        let pageHeaderInfoYear = document.createElement('p');
        pageHeaderInfoYear.innerText = currentProj.year + " -";
        pageHeaderInfo.appendChild(pageHeaderInfoYear);

        let pageHeaderInfoRole = document.createElement('p');
        pageHeaderInfoRole.innerText = currentProj.role;
        pageHeaderInfo.appendChild(pageHeaderInfoRole);

        let pageContent = document.createElement('div');
        pageContent.className = "pageContent";
        page.appendChild(pageContent);

        for (let j = 0; j < currentProj.page.length; j++) {
            let pageElement = document.createElement(currentProj.page[j].element);
            pageElement.innerText = currentProj.page[j].text;
            pageContent.appendChild(pageElement);
        }

        return;
    }

    console.log("could not find matching project " + projName);
}