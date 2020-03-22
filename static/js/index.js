'use strict';

// homepage function to use user input to search MET API 

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

// results function to send live request to MET API, evaluate the respons and construct the result on HTML page
function results() {
    let url = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
    let params = document.getElementById("art-name").value;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + params, true);
    xhr.onerror = function() {
        document.getElementById("flash-message").innerHTML = "<h2>Something went wrong please try again!</h2>";
    }
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            let ids = obj.objectIDs.slice(0,20);
        if (ids == null) {
                document.getElementById("flash-message").innerHTML = "<h2>There is no results for... " + params + " please try again!</h2>";
            }
            console.log("first: " + ids)
        // send second request to API with returned object ids    
        for(const id in ids) {
            let url2 = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
            let params2 = id
            const xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url2 + params2, true);
            xhr2.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let artInfo = JSON.parse(this.responseText);
                    const output = document.getElementById("output");
                    const body = document.createElement('div');
                    body.innerHTML = '<img src="' + artInfo.primaryImageSmall + '" class="card-img" alt="' + artInfo.additionalImages + '">' + 
                                        '<h5 class="card-title">Title: "' + artInfo.title +'</div></h5>' +
                                        "Artist : " + artInfo.artistDisplayName + "<br>" +
                                        "Department : " + artInfo.department + "<br>" +
                                        "Period : " + artInfo.period + "<br>" +
                                        "Dimensions : " + artInfo.dimensions + "<br>" +
                                        "Credit Line : " + artInfo.creditLine + "<br>" +
                                        "Bio : " + artInfo.artistDisplayBio + "<br>" +
                                        '<a href="' + artInfo.objectURL + '">More Info</a>'; 
    
                    output.appendChild(body);
                }
            }
            xhr2.send();
         } 
        }
    }
    xhr.send();
}
window.onload = function() {
    homepage();
}