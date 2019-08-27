
var urlList = [];
var postUrl = "http://localhost:8090/sites";
var getUrl = "http://localhost:8090/site/"



function urlExists(url){
    for(var i = 0; i < urlList.length; i++){
        if(urlList[i].url == url){
            return true;
        }
    }
    return false;
}


function fetchSites(){

    fetch(getUrl, {
        mode: "cors",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
        })
        .then(function(response){
            return response.json();
        }).then(function(json){
            for(var i = 0; i < json.length; i++){
                urlList.push(json[i]);
                addSite(json[i].url);
            }
        }).catch(function(error){
            console.log("Request failed: ", error);
        });
}

function deleteUrl(id){
    console.log("Deleting site with id: " + id);

    const url = getUrl + "?id="+id

    fetch(url, {
        mode: "cors",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    }).then(function(response){
        return response.status;
    })
    .then(function(json){
        console.log("Response: ", json);
    })
    .catch(function(error){
        console.error("Failed to delete element", error);
    });

    // $.ajax(url, {
    //     crossDomain: true,
    //     method: "DELETE",
    // }).done(function(data){
    //     console.log(data);
    // });
}

function saveUrl(url){
    const saveUlr = getUrl + "?url=" + url;

    fetch(saveUlr, {
        mode: "cors",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
    }).then(function(response){
        console.log("Added site");
        return response.json();
    }).then(function(json){
        console.log("json: ", json)
    }).catch(function(error){
        console.error("Failed: ", error);
    });
}

function addTestData(){
    var input = ["http://www.itavisen.no", "http://www.hardware.no", "http://tv2.no", "http://vg.no", "http://e24.no", "http://dn.no", "http://nrk.no"];

    fetch(postUrl, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(input),
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
        })
        .then(function(response){
            return response.json();
        }).then(function(json){
            init();
        }).catch(function(error){
            console.log("Request failed: ", error);
        });

}

function init(){
    fetchSites();

  
}

function addSite(url){

    var element = {
        url : url,
        index: urlList.length,
    }

        console.log(element);

        console.log("Saving url to backend")
        table = document.getElementById("settings_table");

        var row = document.createElement("tr");
        var urlCell = document.createElement("td");
        var commentCell = document.createElement("td");
        var editCell = document.createElement("td");
        
        //Create grouping of buttons
        var editParagraph = document.createElement("p");
        editParagraph.className = "buttons";
        editParagraph.classList.add("is-pulled-right")
        

        // Create remove button with icon and function
        var removeButton = document.createElement("button");
        removeButton.className = "button";
        removeButton.classList.add("is-danger");
        removeButton.classList.add("is-pulled-right");

        var minusIcon = document.createElement("i")
        minusIcon.className = "fas";
        minusIcon.classList.add("fa-minus");
        minusIcon.classList.add("is-small");

        var removeSpan = document.createElement("span");
        removeSpan.className = "icon";
        removeSpan.classList.add("is-small");

        removeSpan.append(minusIcon);


        removeButton.append(removeSpan);


        // Create edit button with icon and function
        var editButton = document.createElement("button");
        editButton.className = "button";
        editButton.classList.add("is-info");
        editButton.classList.add("is-pulled-right");
        
        var editIcon = document.createElement("i")
        editIcon.className = "fas";
        editIcon.classList.add("fa-edit");

        var spanEdit = document.createElement("span");
        spanEdit.className = "icon";
        spanEdit.classList.add("is-small");

        spanEdit.append(editIcon);


        editButton.append(spanEdit);

        editParagraph.append(editButton);
        editParagraph.append(removeButton);
            

        editCell.append(editParagraph);
        

        // Extract text from url and comment

        var url = url;
        var comment = "";
        console.log("Adding " + url + " to list, with comment " + comment);
        urlCell.innerText = url;
        commentCell.innerText = comment;

        console.log("Resetting input fields");

        row.append(urlCell);
        row.append(commentCell);
        row.append(editCell);
        

        element["row"] = row;
        element.removeFunction = function(){
            for(var i = 0; i < urlList.length; i++){
                const current = urlList[i];
              
                if (current.url == element.url){
                    if("id" in current && current.id >= 0){
                        console.log("Deleting element with id: "+ current.id)
                        deleteUrl(current.id);
                    }
                    console.log("Removing element from cache list")
                    urlList.splice(i, 1);
                }
            }
            row.remove();
        }
        console.log("Adddind element");
        removeButton.onclick = element.removeFunction;

        table.tBodies[0].append(row);

    
}

function clearTBody(){
    table = document.getElementById("settings_table");
    table.tBodies[0].remove();
}

function addRow(){

    if (!urlExists(document.getElementById("url").value) && document.getElementById("url").value != "" && document.getElementById("url").value.length > 1) {
        
        addSite(document.getElementById("url").value);

        urlList.push(document.getElementById("url").value);
        // Get settings table and row
        console.log("Saving element to backend");
        saveUrl(document.getElementById("url").value)

        document.getElementById("url").value = "";
        document.getElementById("comment").value = "";

    }
    else {
        showWarning(document.getElementById("url").value + " allready exists in table!")
        console.error("You need to enter an url, that is not already in the table" + document.getElementById("url").value)
    }
}

function showWarning(message){
    var modal = document.getElementById("warningModal");

    var modalContent = document.getElementById("warningModalBody");

    modalContent.innerText = message;

    modal.classList.add("is-active");
}


function hideWarning(){
    var modal = document.getElementById("warningModal");

    modal.classList.remove("is-active");
}