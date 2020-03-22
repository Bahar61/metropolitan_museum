'use strict';

// homepage function to use user input to search MET API 

function homepage() {
    // get the input value that user entered from search box
    let searchParams = new URLSearchParams(window.location.search),
    queryParameter = searchParams.get("art-name"),
    artName = document.getElementById("art-name").value;
    // validate the user input and pass it to results function
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
    // create the XMLH request based on the info from MET API website
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
            // make sure to show only 20 results max
            let ids = obj.objectIDs.slice(0,21 || obj.length);
        if (ids == null) {
                document.getElementById("flash-message").innerHTML = "<h2>There is no results for... " + params + " please try again!</h2>";
            }

        // send second request to API with returned object ids    
        for(const id in ids) {
            let url2 = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
            let params2 = id
            const xhr2 = new XMLHttpRequest();
            xhr2.open("GET", url2 + params2, true);
            xhr2.onreadystatechange = function() {
                // if response is ok 
                if (this.readyState == 4 && this.status == 200) {
                    let artInfo = JSON.parse(this.responseText);
                    // use bootsrtap to show results in homepage for user to see
                    const output = document.getElementById("output");
                    const body = document.createElement('div');
                    body.innerHTML = '<img src="' + artInfo.primaryImage + '" class="rounded float-left max-width: 25% height: auto" alt="Image is not avilable!"' + artInfo.additionalImages + '">' + "<br>" +
                                        '<h5 class="card-title">Title: "' + artInfo.title +'</div></h5>' +
                                        "Artist : " + artInfo.artistDisplayName + "<br>" +
                                        "Department : " + artInfo.department + "<br>" +
                                        '<div class="dropdown">' +
                                            '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                                'More Info' +
                                              '</button>' +
                                              '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                                                '<p class="dropdown-item">' + "Dimensions : " + artInfo.dimensions + '</p>' +
                                                '<p class="dropdown-item">' + "Credit Line : " + artInfo.creditLine + '</p>' +
                                                '<a class="dropdown-item" href="' + artInfo.objectURL + '">Click Here</a>' +
                                              '</div>';
                                        
                    output.appendChild(body);
                }
            }
            xhr2.send();
         } 
        }
    }
    xhr.send();
}
// call homepage function as soon as window has loaded
window.onload = function() {
    homepage();
}