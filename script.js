//universalis api parameters
let listings = 10;
let entries = 10;

let isLoading = false;
let itemList;

function getItemData(isSearching) {
    return;
}

async function getMarketData(isSearching) {
    if (isLoading) return;

    isLoading = true;
    
    let newId = await getID(document.getElementById('searchKeyword').value)
    let url;

    if (isSearching) {
        let region = document.getElementById('region').value;
        url = `https://universalis.app/api/v2/${region}/${newId}?listings=${listings}&entries=${entries}`;
    } 
   
    const market = document.getElementById('marketTable');
    market.innerHTML = '';
    const recent = document.getElementById('recentTable');
    recent.innerHTML = '';

    let response = await fetch(url);
    let data = await response.json();

    
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
            server = listing.worldName;
        } else {
            server = region;
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

    isLoading = false;
}

// alternative to findID using direct string search
async function getID(keyword) {
    let url = `https://xivapi.com/search?indexes=Item&string=${keyword}`;
    let response = await fetch(url);
    let data = await response.json();
    return data.Results[0].ID;
}