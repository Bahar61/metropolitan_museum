'use strict';

// Homepage function to use users search input 
function homepage() {
    let searchParams = new URLSearchParams(window.location.search),
    queryParameter = searchParams.get("art-name"),
    artName = document.getElementById("art-name").value;

    if (queryParameter !== null && queryParameter !== "") {
        document.getElementById("art-name").value = queryParameter;
        results();
    } else if (artName !== null && artName !== "") {
        document.getElementById("connection-form").addEventListener("submit", results);
    } else {
        document.getElementById("flash-message").innerHTML = "<h2>Please enter desired art name!</h2>";
    }
}

function results() {
    let url = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
    let params = document.getElementById("art-name").value;
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url + params, true);
    xhr.onloadstart = () => {
        document.getElementById("loading").innerHTML = "<div class='spinner-border text-danger' role='status'><span class='sr-only'>Loading...</span>";
    }
    xhr.onerror = () => {
        document.getElementById("loading").innerHTML = "<h2>Something went wrong! Please re enter desired art name!</h2>";
    }
    xhr.onload = () => {
        let data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
        } 
               
            // let url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
            // for (const object in response) {
        // }
    }
    xhr.onloadend = () => {
        document.getElementById("loading").innerHTML = "";
    }
    xhr.send(null);
}