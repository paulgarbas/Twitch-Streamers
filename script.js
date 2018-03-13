"use strict";

const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const channelOnline = "https://wind-bow.glitch.me/twitch-api/streams/";
const channelOffline = "https://wind-bow.glitch.me/twitch-api/channels/";
const info = document.getElementById("renderInfo");

let clickAll = document.querySelector(".status-1");
let clickOnline = document.querySelector(".status-2");
let clickOffline = document.querySelector(".status-3");
let all;
let online = [];
let offline = [];

//going through every channel
for (let i = 0; i < channels.length; i++) {
    fetch("https://wind-bow.glitch.me/twitch-api/streams/"+channels[i]).then(function(response) {
        return response.json();
    }).then(function(data) {
        //if channel is streaming live
        if (data.stream !== null) {
            online.push(channels[i]);
            info.innerHTML += 
                `
                <a href="https://www.twitch.tv/${channels[i]}" target="_blank" class="list-group-item list-group-item-action">
                    <img src="${data.stream.channel.logo}" alt="Logo">
                    <div class="information">
                        <h4>${data.stream.channel.display_name}</h4>
                        <p>${data.stream.channel.status}</p>
                    </div>
                    <small class="current-status">${data.stream.stream_type}</small>
                </a>
                `;
        //if channel is offline use other api         
        } else if (data.stream === null) {
            offline.push(channels[i]);
            fetch("https://wind-bow.glitch.me/twitch-api/channels/"+channels[i]).then(function(response) {
                return response.json();
            }).then(function(data) {
                info.innerHTML += 
                `
                <a href="https://www.twitch.tv/${channels[i]}" target="_blank" class="list-group-item list-group-item-action" id="offline">
                <img src="${data.logo}" alt="Logo">
                <div class="information">
                <h4>${data.display_name}</h4>
                </div>
                <small class="current-status">offline</small>
                </a>
                `;      
            })
        }}).catch(function(error) {
                console.log(error);
    });
}


//push All button, appears all channels
clickAll.addEventListener("click", function() {
    clickAll.style.border = "#5487f2 solid 1px";           
    clickOnline.style.border = "#fff solid 1px";
    clickOffline.style.border = "#fff solid 1px";
    all = online.concat(offline);
    for (let j = 0; j < all.length; j++) {
        document.querySelector(`[href = "https://www.twitch.tv/${all[j]}"]`).style.display = "block";
    }
    console.log('Pushed "All"');
});


//push Online button - offline disappears, online appears
clickOnline.addEventListener("click", function() {
    clickOnline.style.border = "#5487f2 solid 1px";
    clickAll.style.border = "#fff solid 1px";
    clickOffline.style.border = "#fff solid 1px";
    for (let j = 0; j < offline.length; j++) {       
        document.querySelector(`[href = "https://www.twitch.tv/${offline[j]}"]`).style.display = "none";
    }
    for (let j = 0; j < online.length; j++) {      
        document.querySelector(`[href = "https://www.twitch.tv/${online[j]}"]`).style.display = "block";
    }
    console.log('Pushed "Online"');
});   


//push Offline button - online disappears, offline appears
clickOffline.addEventListener("click", function() {
    clickOffline.style.border = "#5487f2 solid 1px";
    clickAll.style.border = "#fff solid 1px";
    clickOnline.style.border = "#fff solid 1px";
    for (let j = 0; j < online.length; j++) {       
        document.querySelector(`[href = "https://www.twitch.tv/${online[j]}"]`).style.display = "none";
    }
    for (let j = 0; j < offline.length; j++) { 
        document.querySelector(`[href = "https://www.twitch.tv/${offline[j]}"]`).style.display = "block";
    }
    console.log('Pushed "Offline"');
});  



        
    
