
var urlList = []

function urlExists(url){
    for(var i = 0; i < urlList.length; i++){
        if(urlList[i].url == url){
            return true;
        }
    }
    return false;
}

function addRow(){

    if (!urlExists(document.getElementById("url").value) && document.getElementById("url").value != "" && document.getElementById("url").value.length > 1) {
        // Get settings table and row
        table = document.getElementById("settings_table");

        var element = {
            url : document.getElementById("url").value,
            comment: document.getElementById("comment").value,
            index: urlList.length,
        }

        urlList.push(element);

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

        var url = document.getElementById("url").value;
        var comment = document.getElementById("comment").value;
        console.log("Adding " + url + " to list, with comment " + comment);
        urlCell.innerText = url;
        commentCell.innerText = comment;

        console.log("Resetting input fields");

        document.getElementById("url").value = "";
        document.getElementById("comment").value = "";

        row.append(urlCell);
        row.append(commentCell);
        row.append(removeCell)

        element["row"] = row;
        element.removeFunction = function(){
            for(var i = 0; i < urlList.length; i++){
                if (urlList[i].url == element.url){
                    urlList.splice(i, 1);
                }
            }
            row.remove();
        }

        removeButton.onclick = element.removeFunction;


        table.tBodies[0].append(row);
    }
    else {
        console.error("You need to enter an url, that is not already in the table" + this)
    }



}
