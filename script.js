const XIVAPI_KEY = '';
const UNIVERSALIS_KEY = '';

let isLoading = false;

//universalis api parameters
let listings = 10;
let entries = 10;


function getGameData(isSearching) {
    return;
}

function getMarketData(isSearching) {
    if (isLoading) return;

    isLoading = true;
    let url;
    if (isSearching) {
        const keyword = document.getElementById('searchKeyword').value;
        const region = document.getElementById('region').value;
        url = `https://universalis.app/api/v2/${region}/14869?listings=${listings}&entries=${entries}`;
    }

    const market = document.getElementById('marketTable');
    market.innerHTML = '';
    const recent = document.getElementById('recentTable');
    recent.innerHTML = '';

    fetch(url).then(response => response.json()).then(data => {
        data.listings.forEach((listing, index) => {
            let isHighQuality;
            if (listing.hq) {
                isHighQuality = 'HQ';
            } else {
                isHighQuality = 'NQ';
            }
            
            let server;
            const regionList = ["Aether", "Crystal", "Dynamis","Primal" ,"Materia" ,"North America" ,"Oceania"]
            const region = document.getElementById('region').value;
            if (regionList.includes(region)) {
                server = listing.worldName
            } else {
                server = region
            }

            const listItem = document.createElement('tr');
            listItem.classList.add('listItem');
            listItem.innerHTML = `<tr><td>${index + 1}</td><td>${server}</td><td>${isHighQuality}</td><td class="unit">${listing.pricePerUnit}</td><td>${listing.quantity}</td><td class="total">${listing.total}</td><td>${listing.retainerName}</td></tr>`;
            market.appendChild(listItem);
        });

        
        
        data.recentHistory.forEach((listing, index) => {
            let isHighQuality;
            if (listing.hq) {
                isHighQuality = 'HQ';
            } else {
                isHighQuality = 'NQ';
            }
            
            let server;
            const regionList = ["Aether", "Crystal", "Dynamis","Primal" ,"Materia" ,"North America" ,"Oceania"]
            const region = document.getElementById('region').value;
            if (regionList.includes(region)) {
                server = listing.worldName
            } else {
                server = region
            }

            const listItem = document.createElement('tr');
            listItem.classList.add('listItem');
            listItem.innerHTML = `<tr><td>${index + 1}</td><td>${server}</td><td>${isHighQuality}</td><td class="unit">${listing.pricePerUnit}</td><td>${listing.quantity}</td><td class="total">${listing.total}</td><td>${listing.buyerName}</td></tr>`;
            recent.appendChild(listItem);
        });
        
    });

    isLoading = false;
}