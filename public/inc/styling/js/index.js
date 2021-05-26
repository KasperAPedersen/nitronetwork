let url = "localhost:3000";
// --
document.addEventListener('DOMContentLoaded', function(){
    resize();
    updateCurrentAdmins();
    updateCurrentPlayers();
    updateAmountOfPlayers();

    setInterval(() => {
        if(changeShownServerOnInterval) changeShownServer();
        //if(changeShownShopOnInterval) changeShownShop();
    }, 5000);

    setInterval(() => {
        updateCurrentAdmins();
        updateCurrentPlayers();
        updateAmountOfPlayers();
    }, 15000);

    window.addEventListener('resize', () => {
        resize();
    });
});

// -- Generate applications
let currentlyShownApplication = 0;
let amountOfApplicationsToGenerate = 1;
let changeShownApplicationsOnInterval = true;

let applications = [
    ["Staff"],
    ["Politi"],
    ["Læger"]
];
// --
function generateApplications(){
    document.getElementById('applications').innerHTML = "";
    for(const [index, application] of applications.entries()) {
        let elem = document.createElement('article');
        elem.id = `application${index}`;
        elem.classList = "shownApplication";
        elem.innerHTML = 
        `
        <div class="applicationHead">
            <div class="applicationTitle">
                <p>${application[0]}</p>
            </div>
            <div class="applicationButton" onclick="sendApplication(${index});">
                <p>Send</p>
            </div>
            <div class="floatFixer"></div>
        </div>

        <div class="applicationBody">
            <form onsubmit="event.preventDefault();">
                <input type="text" placeholder="Discord ID" id="${index}DiscordId">
                <input type="text" placeholder="Spiller ID" id="${index}SpillerId">
                <input type="text" placeholder="Navn" id="${index}Navn">
                <input type="text" placeholder="Alder" id="${index}Alder">
                <input type="text" placeholder="Hvorfor skal vi vælge dig?" id="${index}Hvorfor">
                <textarea placeholder="Beskriv dig selv" id="${index}Beskrivelse"></textarea>
                <div class="floatFixer"></div>
            </form>
        </div>
        `;
        document.getElementById('applications').appendChild(elem);
    }

    for(let amountIndex = 0; amountIndex < amountOfApplicationsToGenerate; amountIndex++) {
        for(const [index, application] of applications.entries()) {
            if (amountOfApplicationsToGenerate > index) {
                if(applications[amountIndex] != undefined) {
                    document.getElementById(`application${index}`).style.display = "inline-block";
                    document.getElementById(`application${index}`).style.opacity = 1;
                }
            }
        }
    }
}

function changeShownApplication(newValue){
    document.getElementById(`application${currentlyShownApplication}`).classList = "fadeOut";
    setTimeout(() => {
        document.getElementById(`application${currentlyShownApplication}`).style.display = "none";
        
        currentlyShownApplication = currentlyShownApplication + newValue < applications.length ? (currentlyShownApplication + newValue < 0 ? applications.length - 1 : currentlyShownApplication + newValue) : currentlyShownApplication = 0;

        document.getElementById(`application${currentlyShownApplication}`).style.display = "inline-block";
        document.getElementById(`application${currentlyShownApplication}`).classList = "fadeIn";
    }, 1000);
}

function changeShownApplicationsWidth(newWidth){
    let shownServers = document.getElementsByClassName('shownApplication');
    for(server of shownServers) {
        server.style.width = `${newWidth}px`;
    }
}

// -- Generate shops
let currentlyShownProduct = 0;
let amountOfShopsToGenerate = 1;
let changeShownShopOnInterval = true;

let products = [
    ["Pakke #1 | 10,-", "Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-", "temp.png", "<p>Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-</p>", "<img src='inc/images/mobilepay.png'><p>1. Åben MobilePay.<br>2. Scan QR Koden.<br>3. Indtast donationsbeløbet.<br>4. Skriv donationspakkens nummer i MobilePay kommentaren.<br>5. Send beløbet<br>6. Udfyld formularen nedenfor.<br>7. Klik send</p>"],
    ["Pakke #2 | 20,-", "Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-", "temp.png", "<p>Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-</p>", "<img src='inc/images/mobilepay.png'><p>1. Åben MobilePay.<br>2. Scan QR Koden.<br>3. Indtast donationsbeløbet.<br>4. Skriv donationspakkens nummer i MobilePay kommentaren.<br>5. Send beløbet<br>6. Udfyld formularen nedenfor.<br>7. Klik send</p>"],
    ["Pakke #3 | 30,-", "Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-", "temp.png", "<p>Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-</p>", "<img src='inc/images/mobilepay.png'><p>1. Åben MobilePay.<br>2. Scan QR Koden.<br>3. Indtast donationsbeløbet.<br>4. Skriv donationspakkens nummer i MobilePay kommentaren.<br>5. Send beløbet<br>6. Udfyld formularen nedenfor.<br>7. Klik send</p>"],
    ["Pakke #4 | 40,-", "Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-", "temp.png", "<p>Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-</p>", "<img src='inc/images/mobilepay.png'><p>1. Åben MobilePay.<br>2. Scan QR Koden.<br>3. Indtast donationsbeløbet.<br>4. Skriv donationspakkens nummer i MobilePay kommentaren.<br>5. Send beløbet<br>6. Udfyld formularen nedenfor.<br>7. Klik send</p>"],
    ["Pakke #5 | 50,-", "Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-", "temp.png", "<p>Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-</p>", "<img src='inc/images/mobilepay.png'><p>1. Åben MobilePay.<br>2. Scan QR Koden.<br>3. Indtast donationsbeløbet.<br>4. Skriv donationspakkens nummer i MobilePay kommentaren.<br>5. Send beløbet<br>6. Udfyld formularen nedenfor.<br>7. Klik send</p>"],
    ["Pakke #6 | 200,-", "Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-", "temp.png", "<p>Med denne pakke modtager du en fed pik helt op i røvhullet for den billige pris af 25,-</p>", "<img src='inc/images/mobilepay.png'><p>1. Åben MobilePay.<br>2. Scan QR Koden.<br>3. Indtast donationsbeløbet.<br>4. Skriv donationspakkens nummer i MobilePay kommentaren.<br>5. Send beløbet<br>6. Udfyld formularen nedenfor.<br>7. Klik send</p>"],
];

// --
function generateProducts(){
    document.getElementById('shop').innerHTML = "";
    for(const [index, product] of products.entries()) {
        let elem = document.createElement('article');
        elem.id = `product${index}`;
        elem.classList = "shownProduct";
        elem.innerHTML = 
        `
        <div class="productHead">
            <div class="productTitle">
                <p>${product[0]}</p>
            </div>
            <div class="productButton" onclick="purchaseProduct('${index}');">
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

    for(let amountIndex = 0; amountIndex < amountOfShopsToGenerate; amountIndex++) {
        for(const [index, shop] of products.entries()) {
            if (amountOfShopsToGenerate > index) {
                if(products[amountIndex] != undefined) {
                    document.getElementById(`product${index}`).style.display = "inline-block";
                    document.getElementById(`product${index}`).style.opacity = 1;
                }
            }
        }
    }
}

function sendApplication(application){
    let dId = document.getElementById(`${application}DiscordId`).value;    
    let pId = document.getElementById(`${application}SpillerId`).value;    
    let navn = document.getElementById(`${application}Navn`).value;    
    let alder = document.getElementById(`${application}Alder`).value;    
    let why = document.getElementById(`${application}Hvorfor`).value;    
    let desc = document.getElementById(`${application}Beskrivelse`).value;    

    if(dId != undefined && isNaN(dId) && dId != "" && dId.search('#') > -1) {
        if(pId != undefined && !isNaN(pId) && pId > 0) {
            if(navn != undefined && isNaN(navn) && navn != "") {
                let pNameTemp = navn.split(' ');
                if(pNameTemp.length >= 2) {
                    if(!isNaN(alder) && alder > 0) {
                        if(isNaN(why) && why != "" && why != undefined) {
                            if(isNaN(desc) && desc != "" && desc != undefined) {
                                fetch(`http://${url}/sendApplication?application=${applications[application]}&dId=${dId.replace("#","-(/swp/)-")}&pId=${pId}&navn=${navn}&alder=${alder}&why=${why}&desc=${desc}`)
                                .then((res) => {
                                    if(res.status !== 200) {
                                        throw new Error(`Something went wrong ~ Status code: ${res.status}`);
                                    } else {
                                        alert('Du vil blive kontaktet via discord snarest!');
                                        window.location.reload();
                                    }
                                })
                            }
                        }
                    }
                }
            }
        }
    }
}

function sendSupportMessage(){
    let email = document.getElementById('supportEmail').value;
    let pId = document.getElementById('supportSpillerId').value;
    let subject = document.getElementById('supportSubject').value;
    let message = document.getElementById('supportMessage').value;

    if(email != "" && email != undefined) {
        if(!isNaN(pId) && pId > 0) {
            if(isNaN(subject) && subject != "" && subject != undefined) {
                if(isNaN(message) && message != "" && message != undefined) {
                    fetch(`http://${url}/sendSupportMessage?email=${email}&pId=${pId}&subject=${subject}&message=${message}`)
                    .then((res) => {
                        if(res.status !== 200) {
                            throw new Error(`Something went wrong ~ Status code: ${res.status}`);
                        } else {
                            alert('Du vil blive kontaktet via email snarest!');
                            window.location.reload();
                        }
                    })
                } else {
                    // Invalid message
                }
            } else {
                // Invalid subject
            }
        } else {
            // Invalid spiller id
        }
    } else {
        // invalid email
    }
}

function sendDonationLookup(){
    let pId = document.getElementById('donationPlayerId').value;
    let idDiscord = document.getElementById('donationDiscordId').value;
    let pName = document.getElementById('donationPlayerName').value;
    let pPhone = document.getElementById('donationPlayerPhone').value;
    if(pId != undefined && !isNaN(pId)) {
        if(idDiscord != undefined && isNaN(idDiscord) && idDiscord != "" && idDiscord.search('#') > -1) {
            if(pName != undefined && isNaN(pName) && pName != "") {
                let pNameTemp = pName.split(' ');
                if(pNameTemp.length >= 2) {
                    if(pPhone != undefined && !isNaN(pPhone)) {
                        fetch(`http://${url}/sendDonationCheckup?pId=${Number(pId)}&idDiscord=${idDiscord.replace("#","-(/swp/)-")}&pName=${pName}&pPhone=${Number(pPhone)}`)
                        .then((res) => {
                            if(res.status !== 200) {
                                throw new Error(`Something went wrong ~ Status code: ${res.status}`);
                            } else {
                                alert('Du vil blive kontaktet via discord snarest!');
                                window.location.reload();
                            }
                        })
                    } else {
                        // missing or invalid phone number
                    }
                } else {
                    // Missing last name
                }
            } else {
                // missing or invalid discord id
            }
        } else {
            // missing or invalid discord id
        }
    } else {
        // missing or invalid player id
    }
}

function hidePurchaseCard(){
    document.getElementById('purchaseCard').style.display = "none";
}

function purchaseProduct(product){
    document.getElementById('productInfo').innerHTML = `${products[product][3]}`;
    document.getElementById('purchaseGuide').innerHTML = `${products[product][4]}`;
    document.getElementById('productCardTitle').innerHTML = `Pakke #${(Number(product)+1)}`;
    document.getElementById('purchaseCard').style.display = "block";
}

function changeShownShop(newValue){
    document.getElementById(`product${currentlyShownProduct}`).classList = "fadeOut";
    setTimeout(() => {
        document.getElementById(`product${currentlyShownProduct}`).style.display = "none";
        currentlyShownProduct = currentlyShownProduct + newValue < products.length ? (currentlyShownProduct + newValue < 0 ? products.length - 1 : currentlyShownProduct + newValue) : currentlyShownProduct = 0;

        document.getElementById(`product${currentlyShownProduct}`).style.display = "inline-block";
        document.getElementById(`product${currentlyShownProduct}`).classList = "fadeIn";
    }, 1000);
}

function changeShownShopWidth(newWidth){
    let shownServers = document.getElementsByClassName('shownProduct');
    for(server of shownServers) {
        server.style.width = `${newWidth}px`;
    }
}

// -- Generate servers
let amountOfServersToGenerate = 1;
let currentlyShownServer = 0;
let changeShownServerOnInterval = true;

let servers = [
    ["88.99.184.93", "30120"],
    ["88.99.184.93", "30122"]
];

// --

function generateServers(){
    document.getElementById('servers').innerHTML = "";

    for(const [index, server] of servers.entries()) {
        let elem = document.createElement('article');
        elem.id = `server${index}`;
        elem.classList = "shownServer";
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
                <p onclick="generatePlayerList('${server[0]}:${server[1]}');">Spillere</p>
            </div>
            <div class="floatFixer"></div>
        </div>
        `;
        document.getElementById('servers').appendChild(elem);
    }
    
    for(let amountIndex = 0; amountIndex < amountOfServersToGenerate; amountIndex++) {
        for(const [index, server] of servers.entries()) {
            if (amountOfServersToGenerate > index) {
                if(servers[amountIndex] != undefined) {
                    document.getElementById(`server${amountIndex}`).style.display = "inline-block";
                    document.getElementById(`server${amountIndex}`).style.opacity = 1;
                }
            }
        }
    }
}

function changeShownServer(){
    document.getElementById(`server${currentlyShownServer}`).classList = "fadeOut";
    setTimeout(() => {
        document.getElementById(`server${currentlyShownServer}`).style.display = "none";
        currentlyShownServer < servers.length - 1 ? currentlyShownServer++ : currentlyShownServer = 0;
        document.getElementById(`server${currentlyShownServer}`).style.display = "inline-block";
        document.getElementById(`server${currentlyShownServer}`).classList = "fadeIn";
    }, 1000);
}

function changeShownServerWidth(newWidth){
    let shownServers = document.getElementsByClassName('shownServer');
    for(server of shownServers) {
        server.style.width = `${newWidth}px`;
    }
}

function resize(){
    // -- Servers
    changeShownServerOnInterval = false;
    amountOfServersToGenerate = servers.length;
    currentlyShownServer = 0;
    if (window.innerWidth < 720) {
        amountOfServersToGenerate = 1;
        changeShownServerOnInterval = true;
    }
    generateServers();
    changeShownServerWidth(amountOfServersToGenerate > 3 ? 330 : ( window.innerWidth > 430 ? 330 : ((window.innerWidth - (amountOfServersToGenerate * 30)) / amountOfServersToGenerate)));

    // -- Shop
    changeShownShopOnInterval = false;
    amountOfShopsToGenerate = products.length;
    currentlyShownProduct = 0;
    if (window.innerWidth < 720) {
        document.getElementById('shopIndexer').style.display = "block";
        amountOfShopsToGenerate = 1;
        changeShownShopOnInterval = true;
    } else {
        document.getElementById('shopIndexer').style.display = "none";
    }
    generateProducts();
    changeShownShopWidth(amountOfShopsToGenerate > 3 ? 330 : ( window.innerWidth > 430 ? 330 : ((window.innerWidth - (amountOfShopsToGenerate * 30)) / amountOfShopsToGenerate)));

    // -- Applications
    changeShownApplicationsOnInterval = false;
    amountOfApplicationsToGenerate = applications.length;
    currentlyShownApplication = 0;
    if (window.innerWidth < 720) {
        document.getElementById('applicationIndexer').style.display = "block";
        amountOfApplicationsToGenerate = 1;
        changeShownApplicationsOnInterval = true;
    } else {
        document.getElementById('applicationIndexer').style.display = "none";
    }
    generateApplications();
    changeShownApplicationsWidth(amountOfApplicationsToGenerate > 3 ? 330 : ( window.innerWidth > 430 ? 330 : ((window.innerWidth - (amountOfApplicationsToGenerate * 30)) / amountOfApplicationsToGenerate)));
}

let isScrolling = false;
function scrollToElement(place){
    isScrolling = true;
    let doc = document.getElementById(place);
    let desiredLocation = doc.offsetTop - 50;
    let scroller = setInterval(() => {
        if(isScrolling) {
            if (desiredLocation < window.scrollY) window.scrollTo(0, (window.scrollY-10));
            if (desiredLocation > window.scrollY) window.scrollTo(0, (window.scrollY+10));
            if(desiredLocation < (window.scrollY + 10) && desiredLocation >( window.scrollY - 10)) {
                window.clearInterval(scroller);
                isScrolling = false;
            }
        } else {
            window.clearInterval(scroller);
        }
        
        
    }, 1);
}

document.addEventListener('wheel', () => {
    if (isScrolling) {
        isScrolling = false;
    }
});

function joinServer(ip) {
    location.href = `fivem://connect/${ip}`;
}

function generatePlayerList(ip){
    fetch(`http://${url}/getPlayers?ip=${ip}`)
    .then((res) => {
        if(res.status !== 200) {
            throw new Error(`Something went wrong ~ Status code: ${res.status}`);
        } else {
            return res.json();
        }
    })
    .then((json) => {
        document.getElementById('playerList').innerHTML = "<div id='playerName'><p>Player</p><i class='fas fa-times' onclick='closePlayerList();'></i></div><div class='floatFixer'></div>";
        if (json.length <= 0) {
            let elem = document.createElement('p');
            elem.innerHTML = `Der er ingen spillere online!`;  
            document.getElementById('playerList').appendChild(elem);
        } else {  
            
            for(const [index, player] of json.entries()) {
                let elem = document.createElement('p');
                elem.innerHTML = `<span>${index + 1}</span> ${player}`;
                document.getElementById('playerList').appendChild(elem);
            }
        }
            
            document.getElementById('playerList').style.display = "block";
    })
}

function closePlayerList(){
    document.getElementById('playerList').innerHTML = "<div id='playerName'><p>Player</p><i class='fas fa-times' onclick='closePlayerList();'></i></div><div class='floatFixer'></div>";
    document.getElementById('playerList').style.display = "none";
}

function updateCurrentPlayers(){
    fetch(`http://${url}/getCurrentPlayers`)
    .then((res) => {
        if(res.status !== 200) {
            throw new Error(`Something went wrong ~ Status code: ${res.status}`);
        } else {
            return res.json();
        }
    })
    .then((json) => {
        let players = json.currentAmountOfPlayers;
        document.getElementById('activePlayerNumber').innerHTML = players == undefined || players == "" ? 0 : players;
    })
}

function updateCurrentAdmins(){
    fetch(`http://${url}/getCurrentAdmins`)
    .then((res) => {
        if(res.status !== 200) {
            throw new Error(`Something went wrong ~ Status code: ${res.status}`);
        } else {
            return res.json();
        }
    })
    .then((json) => {
        let players = json.currentAmountOfAdmins;
        document.getElementById('activeAdminNumber').innerHTML = players == undefined || players == "" ? 0 : players;
    })
}

function updateAmountOfPlayers(){
    fetch(`http://${url}/getPlayerCount`)
    .then((res) => {
        if(res.status !== 200) {
            throw new Error(`Something went wrong ~ Status code: ${res.status}`);
        } else {
            return res.json();
        }
    })
    .then((json) => {
        let players = json.currentAmountOfPlayers;
        document.getElementById('playerAmountNumber').innerHTML = players == undefined || players == "" ? 0 : players;
    })
}