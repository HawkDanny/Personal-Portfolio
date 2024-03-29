window.onload = init;

let items = {};
let header;
let tl;
let cont;
let filters;

//the choices for filters and also the order they appear
let filterOptions = [
    'all',
    'selected',
    'game',
    'video game',
    'board game',
    'card game',
    'art',
    'writing',
    'speaking',
    'streaming',
    'event',
];

function init() {
    header = document.querySelector("#contentHeader");
    tl = document.querySelector("#timeline");
    cont = document.querySelector("#content");
    filters = document.querySelector("#filters");

    buildItemsList();
    buildFilters();
    buildTimeline();

    let url = new URL(window.location);
    let p = url.searchParams.get('p'); //page
    let f = url.searchParams.get('f'); //filter

    if (p != null)
        buildPage(p);
    else if (f != null)
        buildContentFromFilter(f);
    else
        buildContentFromFilter("selected");
}

function buildItemsList() {
    
    //Create an "all" items
    items["all"] = [];

    //create and populate an entry in items for each filter
    for (let i = 0; i < data.projects.length; i++) {
        let currentProj = data.projects[i];

        //add the currentProj to the all item list
        items["all"][items["all"].length] = currentProj;

        for (let j = 0; j < currentProj.tags.length; j++)
        {
            let currentTag = currentProj.tags[j];
            
            //add to appropriate items arrays to track all the items by tag
            if (items.hasOwnProperty(currentTag)) {
                let list = items[currentTag];
                list[list.length] = currentProj;
            } else {
                //create a new list in items for a new tag
                let list = items[currentTag] = [];
                list[0] = currentProj;
            }
        }
    }
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
        let proj = document.createElement('a');
        let gotoURL = new URL(window.location.href.split('?')[0]);
        gotoURL.searchParams.append('p', currentProj.name);
        proj.href = gotoURL;
        proj.innerHTML = currentProj.name;
        tl.appendChild(proj);
    }
}

function buildContentFromFilter(filterName) {
    //clear out content div
    cont.innerHTML = "";
    cont.appendChild(header);

    //set the appropriate content header
    setContentHeader(filterName);

    for (let i = 0; i < items[filterName].length; i++) {
        let currentProj = items[filterName][i]

        //create item
        let item = document.createElement('div');
        item.className = "item";
        item.addEventListener('click',  function() {
            let gotoURL = new URL(window.location.href.split('?')[0]);
            gotoURL.searchParams.append('p', currentProj.name);
            window.location = gotoURL;
        }, false);
        item.style.backgroundImage = "url('" + currentProj.headerImageURL + "')";

        //create itemText
        let itemText = document.createElement('div');
        itemText.className = "itemText";
        item.appendChild(itemText);

        //create title
        let title = document.createElement("h1");
        title.innerHTML = currentProj.name.toUpperCase();
        itemText.appendChild(title);

        //create logline
        let logline = document.createElement("p");
        logline.innerText = currentProj.logline;
        itemText.appendChild(logline);

        cont.appendChild(item);

    }

    //grab the current filter and set it active, remove active from "all"
    for (let j = 0; j < filters.children.length; j++) {
        let elem = filters.children[j];

        if (elem.innerText == "all")
            elem.className = "";

        if (elem.innerText == filterName)
            elem.className = "filtersActive";
    }
}

function setContentHeader(filterName) {

    //URL that links to the next filter in the filters bar
    let nextFilterURL = new URL(window.location.href.split('?')[0]);

    //Get the next filter in our list of filters
    for (let i = 0; i < filterOptions.length; i++)
    {
        //if we get to the end, it's the 0th so we don't need to add a filter param
        if (i == filterOptions.length - 1) {
            break;
        }
        else if (filterOptions[i] == filterName) {
            nextFilterURL.searchParams.append('f', filterOptions[i+1]);
            break;
        }
    }
    
    //set the exact wording of the header, and the href the nextFilter link
    let wording = ""
    switch (filterName) {
        case "all":
            wording = "The <a href='" + nextFilterURL + "'>complete</a> work of Danny Hawk";
            break;
        case "art":
            wording = "The <a href='" + nextFilterURL + "'>artwork</a> of Danny Hawk";
            break;
        default:
            wording = "The <a href='" + nextFilterURL + "'>" + filterName + "</a> work of Danny Hawk";
            break;
    }
    document.querySelector('#worksof').innerHTML = wording;
}

function buildFilters() {

    //build the filters html sctructure w/ links
    for (let i = 0; i < filterOptions.length; i++) {
        //also add to the filters element
        let filter = document.createElement('a');
        let gotoURL = new URL(window.location.href.split('?')[0]);
        gotoURL.searchParams.append('f', filterOptions[i]);
        filter.href = gotoURL;
        filter.innerText = filterOptions[i];
        //specifics for all
        if (filter.innerText == "all") {
            filter.className = "filtersActive";
        }
        filters.appendChild(filter);
    }
}

/* Example HTML
<div class="page">
    <div class="pageHeader">
        <h1>Bird Town</h1>
        <p>2023 - Developer, Designer</p>
    </div>
    <div class="pageContent">
        <p>Bird Town is a comedy video game about a town of birds where you play as Margo in the final 15 minutes of her town's summer festival. Each playthrough of the game is a real time fifteen minutes where you decide how to spend your day, whether its getting into hijinks or talking with neighbors, going on bite sized adventures or taking a nap. It's your day and you can do whatever you want.</p>
    </div>
</div>
*/
function buildPage(projName) {
    //clear out content div
    cont.innerHTML = "";
    cont.appendChild(header);

    for (let i = 0; i < data.projects.length; i++) {

        //loop until we find the project TODO: make a dictionary
        if (data.projects[i].name != projName)
            continue;

        //save current proj
        let currentProj = data.projects[i];


        let page = document.createElement('div');
        page.className = "page";
        cont.appendChild(page);

        let pageHeader = document.createElement('div');
        pageHeader.className = "pageHeader";
        pageHeader.style.backgroundImage = "url('" + currentProj.headerImageURL + "')";
        page.appendChild(pageHeader);

        let pageHeaderText = document.createElement('div');
        pageHeaderText.className = "pageHeaderText";
        pageHeader.appendChild(pageHeaderText);

        let pageHeaderTitle = document.createElement('h1');
        pageHeaderTitle.innerHTML = currentProj.name;
        pageHeaderText.appendChild(pageHeaderTitle);

        let pageHeaderInfo = document.createElement('p');
        pageHeaderInfo.innerHTML = currentProj.year + " - " + currentProj.role
        pageHeaderText.appendChild(pageHeaderInfo);

        let pageContent = document.createElement('div');
        pageContent.className = "pageContent";
        page.appendChild(pageContent);

        for (let j = 0; j < currentProj.page.length; j++) {
            if (currentProj.page[j].html != null)
                pageContent.innerHTML += currentProj.page[j].html;
            else if (currentProj.page[j].youtube != null) {
                let yt = document.createElement('div');
                yt.className = "pageYT";
                yt.innerHTML = currentProj.page[j].youtube;
                pageContent.appendChild(yt);
            }
            else {
                let pageElement = document.createElement(currentProj.page[j].element);
                pageElement.innerHTML = currentProj.page[j].text;
                pageContent.appendChild(pageElement);
            }
        }

        //set the correct timeline link to active
        for (let j = 0; j < tl.children.length; j++) {
            let elem = tl.children[j];

            if (elem.innerHTML == projName)
                elem.className = "pageActive";
        }

        //remove active from "all"
        for (let j = 0; j < filters.children.length; j++) {
            let elem = filters.children[j];

            if (elem.innerText == "all") {
                elem.className = "";
                break;
            }
        }

        return;
    }

    console.log("could not find matching project " + projName);
}