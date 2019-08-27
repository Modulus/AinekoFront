
var urlList = [];
var postUrl = "http://localhost:8090/sites";
var getUrl = "http://localhost:8090/site"

function urlExists(url){
    for(var i = 0; i < urlList.length; i++){
        if(urlList[i].url == url){
            return true;
        }
    }
    return false;
}


function fetchSites(){
    $.getJSON(getUrl, function(data){
        console.log("Found data")
        console.log(data);
        for(var i = 0; i < data.length; i++){
            urlList.push(data[i]);
            addSite(data[i].url);
        }
    });
}

function deleteUrl(id){
    console.log("Deleting site with id: " + id);

    const url = getUrl + "?id="+id

    $.ajax(url, {
        crossDomain: true,
        method: "DELETE",
    }).done(function(data){
        console.log(data);
    });
}

function saveUrl(url){
    const saveUlr = getUrl + "?url=" + url;

    $.ajax(saveUlr, {
        crossDomain: true,
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        method: "PUT",
    }).done(function(data){
        console.log(data);
    });
}

function addTestData(){
    var input = ["http://www.itavisen.no", "http://www.hardware.no", "http://tv2.no", "http://vg.no", "http://e24.no", "http://dn.no", "http://nrk.no"];


    $.ajax(postUrl, {
        data: JSON.stringify(input),
        crossDomain: true,
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        method: "POST",
    }).done(function(data){
        console.log(data);
    });
}

function init(){
    fetchSites();
    console.log("ENV: ", process.env);

  
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
        var removeCell = document.createElement("td");

        // Create remove button with icon and function
        var removeButton = document.createElement("button");
        removeButton.className = "button";
        removeButton.classList.add("is-danger");
        removeButton.classList.add("is-pulled-right");

        var minusIcon = document.createElement("i")
        minusIcon.className = "fas";
        minusIcon.classList.add("fa-minus");
        removeButton.append(minusIcon);

        removeCell.append(removeButton);

        // Extract text from url and comment

        var url = url;
        var comment = "";
        console.log("Adding " + url + " to list, with comment " + comment);
        urlCell.innerText = url;
        commentCell.innerText = comment;

        console.log("Resetting input fields");

        row.append(urlCell);
        row.append(commentCell);
        row.append(removeCell)

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