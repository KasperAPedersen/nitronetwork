// --
let currentlyShownServer = 0;

let servers = [
    ["ip"],
    ["ip1"]
];
// --
let currentlyShownProduct = 0;

let products = [
    ["Pakke #1", "Product beskrivelse", "temp.png"],
    ["Pakke #2", "Product beskrivelse", "temp.png"],
    ["Pakke #3", "Product beskrivelse", "temp.png"],
    ["Pakke #4", "Product beskrivelse", "temp.png"],
    ["Pakke #5", "Product beskrivelse", "temp.png"],
    ["Pakke #6", "Product beskrivelse", "temp.png"],
];
// --
let currentlyShownApplication = 0;

let applications = [
    ["Politi"],
    ["Staff"]
];
// --
document.addEventListener('DOMContentLoaded', function(){
    generateServers();
    generateProducts();
    generateApplications();

    setInterval(() => {
        changeShownServer();
    }, 5000);
});

function changeShownApplication(newValue){
    document.getElementById(`application${currentlyShownApplication}`).classList = "fadeOut";
    setTimeout(() => {
        document.getElementById(`application${currentlyShownApplication}`).style.display = "none";
        
        currentlyShownApplication = currentlyShownApplication + newValue < applications.length ? (currentlyShownApplication + newValue < 0 ? applications.length - 1 : currentlyShownApplication + newValue) : currentlyShownApplication = 0;

        document.getElementById(`application${currentlyShownApplication}`).style.display = "block";
        document.getElementById(`application${currentlyShownApplication}`).classList = "fadeIn";
    }, 1000);
}

function generateApplications(){
    for(const [index, application] of applications.entries()) {
        let elem = document.createElement('article');
        elem.id = `application${index}`;
        elem.innerHTML = 
        `
        <div class="applicationHead">
            <div class="applicationTitle">
                <p>${application[0]}</p>
            </div>
            <div class="applicationButton">
                <p>Send</p>
            </div>
            <div class="floatFixer"></div>
        </div>

        <div class="applicationBody">
            <form onsubmit="event.preventDefault();">
                <input type="text" placeholder="Discord ID">
                <input type="text" placeholder="Spiller ID">
                <input type="text" placeholder="Navn">
                <input type="text" placeholder="Alder">
                <input type="text" placeholder="Hvorfor skal vi vælge dig?">
                <textarea placeholder="Beskriv dig selv"></textarea>
                <div class="floatFixer"></div>
            </form>
        </div>
        `;
        
        document.getElementById('applications').appendChild(elem);
    }

    document.getElementById(`application${currentlyShownApplication}`).style.display = "block";
    document.getElementById(`application${currentlyShownApplication}`).style.opacity = 1;
}

function changeShownProduct(newValue){
    document.getElementById(`product${currentlyShownProduct}`).classList = "fadeOut";
    setTimeout(() => {
        document.getElementById(`product${currentlyShownProduct}`).style.display = "none";
        
        currentlyShownProduct = currentlyShownProduct + newValue < products.length - 1 ? (currentlyShownProduct + newValue < 0 ? products.length - 1 : currentlyShownProduct + newValue) : currentlyShownProduct = 0;

        document.getElementById(`product${currentlyShownProduct}`).style.display = "block";
        document.getElementById(`product${currentlyShownProduct}`).classList = "fadeIn";
    }, 1000);
}

function generateProducts(){
    for(const [index, product] of products.entries()) {
        let elem = document.createElement('article');
        elem.id = `product${index}`;
        elem.innerHTML = 
        `
        <div class="productHead">
            <div class="productTitle">
                <p>${product[0]}</p>
            </div>
            <div class="productButton">
                <p>Køb</p>
            </div>
            <div class="floatFixer"></div>
        </div>

        <div class="productBody">
            <p>${product[1]}</p>
            <img src="inc/images/${product[2]}">
        </div>
        `;
        document.getElementById('shop').appendChild(elem);
    }

    document.getElementById(`product${currentlyShownProduct}`).style.display = "block";
    document.getElementById(`product${currentlyShownProduct}`).style.opacity = 1;
}

function changeShownServer(){
    document.getElementById(`server${currentlyShownServer}`).classList = "fadeOut";
    setTimeout(() => {
        document.getElementById(`server${currentlyShownServer}`).style.display = "none";
        currentlyShownServer < servers.length - 1 ? currentlyShownServer++ : currentlyShownServer = 0;
        document.getElementById(`server${currentlyShownServer}`).style.display = "block";
        document.getElementById(`server${currentlyShownServer}`).classList = "fadeIn";
    }, 1000);
}

function generateServers(){
    for(const [index, server] of servers.entries()) {
        let elem = document.createElement('article');
        elem.id = `server${index}`;
        elem.innerHTML = 
        `
        <div class="serverBody">
            <img src="inc/images/server${index}.png" alt="nope">
        </div>
        <div class="serverFooter">
            <div class="serverJoin">
                <p onclick="joinServer('${server[0]}');">Join</p>
            </div>
            <div class="serverSpillere">
                <p>Spillere</p>
            </div>
            <div class="floatFixer"></div>
        </div>
        `;
        document.getElementById('servers').appendChild(elem);
    }

    document.getElementById(`server${currentlyShownServer}`).style.display = "block";
    document.getElementById(`server${currentlyShownServer}`).style.opacity = 1;
}

function joinServer(ip) {
    console.log(ip);
}