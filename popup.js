// Open any url in the current tab
window.addEventListener('click',function(e){
    if(e.target.href !== undefined){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log("open a url");
            chrome.tabs.update(tabs[0].id, {url:e.target.href});
        });
    }
});

// Set name by enter in the text field and press enter
$(document).ready(function () {
    // Read from storage and resume last action
    resume();

    $(document).keypress(function(e) {
        if (e.keyCode == '13') {
            e.preventDefault(); //Stops the default action for the key pressed
            setName();
            return false; //extra caution, may not be necessary
        }
    })

	$('#GoogleSubmit').submit(function(ev) {
	    ev.preventDefault(); // to stop the form from submitting
	    /* Validations go here */
	    var query = document.getElementById("GoogleQuery").value;
	    console.log(query);
	    googleSearch(query);
	});

})

function googleSearch(query) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
		document.getElementById("GoogleResult").innerHTML = xhttp.responseText
	       // Action to be performed when the document is read;
	    }
	};
	xhttp.open("GET", "http://www.purestorage.com", true);
	xhttp.send();
}

function resume() {
    chrome.storage.local.get("username", function(name) {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }

        console.log("retrive name " + name.username + " from storage");

	/* Chrome.storage.local.get() returns an object with items in their
	 *  key-value mappings, so you have to use the index of key
	 */
        displayName(name.username);
    });
}

function setName() {
    console.log("setting name");
    var nameSet = document.getElementById("nameSet");
    var name = nameSet.value;

    chrome.storage.local.set({"username": name}, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }

	console.log("name " + name + " set");
        displayName(name);
    });
}

function displayName(name) {
    var nameGet = document.getElementById("nameGet");
    nameGet.innerHTML = name;
    nameSet.value = "";
}
