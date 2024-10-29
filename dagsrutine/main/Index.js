function styggCheckboks(){
    var finBoks = document.querySelectorAll("input.fin-boks")

    for (let i = 0; i < finBoks.length; i++){
        finBoks[i].addEventListener("click", function(){
            finBoks[i].classList.add("stygg-boks")

            setTimeout(function(){
                finBoks[i].classList.remove("stygg-boks")
            }, 750)
        });
    }
}

function saveCheckboxState() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        localStorage.setItem(checkbox.name, checkbox.checked);
    });
}

function loadCheckboxState() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        const isChecked = localStorage.getItem(checkbox.name) === 'true';
        checkbox.checked = isChecked;
    });
}

window.addEventListener('load', loadCheckboxState);


//  |   Code below is made by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com
//  V   This is for findig out which week the client currently is in
Date.prototype.getWeek = function (dowOffset) {
    
        dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
        var newYear = new Date(this.getFullYear(),0,1);
        var day = newYear.getDay() - dowOffset; //the day of week the year begins on
        day = (day >= 0 ? day : day + 7);
        var daynum = Math.floor((this.getTime() - newYear.getTime() - 
        (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
        var weeknum;
        //if the year starts before the middle of a week
        if(day < 4) {
            weeknum = Math.floor((daynum+day-1)/7) + 1;
            if(weeknum > 52) {
                nYear = new Date(this.getFullYear() + 1,0,1);
                nday = nYear.getDay() - dowOffset;
                nday = nday >= 0 ? nday : nday + 7;
                /*if the next year starts before the middle of
                  the week, it is week #1 of that year*/
                weeknum = nday < 4 ? 1 : 53;
            }
        }
        else {
            weeknum = Math.floor((daynum+day-1)/7);
        }
        return weeknum;
    };

// Makes the h2 on the top display the current week of the year the clients comuter is in
const weekDisplay = document.querySelector("#weekDisplay")
weekDisplay.innerText = "Uke " + new Date().getWeek();

function saveData() {
    const hverdagListe = document.querySelector("ul#hverDagListe");
    localStorage.setItem('hverdagListe', hverdagListe.innerHTML);

    const velgTreListe = document.querySelector("ul#treOmDagenListe");
    localStorage.setItem('velgTreListe', velgTreListe.innerHTML);
    
    const allCheckboxesOnPage = document.querySelectorAll("input[type='checkbox']");
    allCheckboxesOnPage.forEach((checkbox) => {
        localStorage.setItem(checkbox.name, checkbox.checked);
    });

}

function resetCheckboxes(oldWeek) {
    if (oldWeek === null || oldWeek === "") {
        oldWeek = new Date().getWeek();
    }

    oldWeek = parseInt(oldWeek);
    let weekNumber = new Date().getWeek();
    if (oldWeek !== weekNumber) {
        alert("Week change since last opened!");

        // Reset all checkboxes on the page and remove them from localStorage
        document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
            checkbox.checked = false;
            localStorage.removeItem(checkbox.name);  // Clear from localStorage
        });

        // Update stored week number
        oldWeek = weekNumber;
    }
    localStorage.setItem("week", weekNumber);
}


function loadData() {

    const hverdagListe = localStorage.getItem('hverdagListe');
    var tempHverdagListe = document.createElement('div');
    tempHverdagListe.innerHTML = hverdagListe.trim();
    const hverdagNodeList = tempHverdagListe.querySelectorAll('li.hverdag');

    if (hverdagNodeList) {

        const hverdagListe = document.querySelector("ul#hverDagListe");
        hverdagNodeList.forEach((li) => {
            li.firstChild.onclick = function(){deleteListElement(this)};
            hverdagListe.append(li);
        })
    }

    const velgTreListe = localStorage.getItem('velgTreListe');
    var tempVelgTreListe = document.createElement('div');
    tempVelgTreListe.innerHTML = velgTreListe.trim();
    const velgTreNodeList = tempVelgTreListe.querySelectorAll('li.velgTre');
    if (velgTreNodeList) {

        const velgTreListe = document.querySelector("ul#treOmDagenListe");
        velgTreNodeList.forEach((li) => {
            li.firstChild.onclick = function(){deleteListElement(this)};
            velgTreListe.append(li);
        })
    }

    const allCheckboxesOnPage = document.querySelectorAll("input[type='checkbox']");
    allCheckboxesOnPage.forEach((checkbox) => {
        checkbox.value = localStorage.getItem(checkbox.name);
    });

    // Saves all checkboxes states (checked="true" or "false") every time a checbox checkedstate changes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', saveData);
    });

    document.querySelectorAll("input.fin-boks").forEach((checkbox) => {
        checkbox.classList.remove("stygg-boks");
        styggCheckboks();
    });

    resetCheckboxes(localStorage.getItem("week"));
}

function deleteListElement(element) {
    element.parentElement.remove();
    saveData();
}

document.getElementById("toDoADayBtn").addEventListener("click", function() {
    const form = document.getElementById("hverDagForm");

    if (form.checkValidity()) {

        document.getElementById("lagreHverDag-btn").classList.remove("no-content")
        makeActivity(0);
    } else {

        form.reportValidity();
    }

})

document.getElementById("threeADayBtn").addEventListener("click", function() {
    const form = document.getElementById("treOmDagenForm");

    if (form.checkValidity()) {

        document.getElementById("lagreTreOmDagen-btn").classList.remove("no-content")
        makeActivity(1);
    } else {

        form.reportValidity();
    }

})

function addCheckboxes(inputValue) {
    let listItems;
    if (inputValue === 0) {
        document.getElementById("lagreHverDag-btn").classList.add("no-content");
        listItems = document.querySelectorAll("ul#hverDagListe > li.needsCheckbox");
    } else if (inputValue === 1) {
        document.getElementById("lagreTreOmDagen-btn").classList.add("no-content");
        listItems = document.querySelectorAll("ul#treOmDagenListe > li.needsCheckbox");
    } else {
        alert("Add checkbox-button not found");
        return;
    }

    // Loop through each list item and prepend the trashcan icon
    listItems.forEach((item) => {
        // Prepend the trashcan image to each list item

        var trashcanSvg = document.createElement("img");
        trashcanSvg.src = "../../resources/trashbin.svg";
        trashcanSvg.draggable = false;
        trashcanSvg.alt = "Trashcan symbol (.svg)";
        trashcanSvg.classList.add("trashcanSvg");
        trashcanSvg.onclick = function() {
            deleteListElement(this);  // Pass the element reference
        };

        item.prepend(trashcanSvg);

        // Only add checkboxes if the item doesn't already have them
        if (!item.querySelector("span")) {
            const checkboxContainer = document.createElement("span");
            checkboxContainer.classList.add("checkboxSpan");

            for (var i = 0; i < 7; i++) {
                var checkBoxDiv = document.createElement("div");
                checkBoxDiv.classList.add("checkboxDiv");
                
                var newLabel = document.createElement("label");
                if (i === 0) {
                    newLabel.innerText = "Man.";
                } else if (i === 1) {
                    newLabel.innerText = "Tir.";
                } else if (i === 2) {
                    newLabel.innerText = "Ons.";
                } else if (i === 3) {
                    newLabel.innerText = "Tor.";
                } else if (i === 4) {
                    newLabel.innerText = "Fre.";
                } else if (i === 5) {
                    newLabel.innerText = "Lør.";
                } else if (i === 6) {
                    newLabel.innerText = "Søn.";
                }
                checkBoxDiv.appendChild(newLabel);

                var newCheckBox = document.createElement("input");
                newCheckBox.type = "checkbox";
                newCheckBox.classList.add("fin-boks");

                var checkboxes = document.querySelectorAll("input[type='checkbox']");
                if (checkboxes.length > 1) {
                    for (let i = 0; i < 7; i++){
                    var count = checkboxes[i].name;
                    newCheckBox.name = `${count}${i}`;
                    }
                    newCheckBox.name = `${i}`;
                } else {
                    newCheckBox.name = `${i}`;
                }

                checkBoxDiv.appendChild(newCheckBox);
                checkboxContainer.appendChild(checkBoxDiv);
            }

            item.appendChild(checkboxContainer);
            item.classList.remove("needsCheckbox");
            styggCheckboks();

        }
    });
    // Saves all checkboxes states (checked="true" or "false") every time a checbox checkedstate changes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', saveData);
    });
    saveData();
}

function makeActivity(inputValue) {
    var activity = document.getElementById("activity"+inputValue).value;
    var time = document.getElementById("time"+inputValue).value;
    var color = document.getElementById("colorPicker"+inputValue).value;

    var a = activity.slice(0,1)
    var b = activity.slice(1)
    a = a.toUpperCase();
    b = b.toLowerCase();
    activity = a + b
    var liElement = document.createElement("li");
    liElement.innerHTML = `<div class="activityDiv">${activity}: ${time}</div>`;
    liElement.classList.add(color);
    liElement.classList.add("needsCheckbox")

    if (inputValue == 0) {
        var UnorderedList = document.getElementById("hverDagListe");
        liElement.classList.add("hverdag")
    } else if (inputValue == 1) {
        var UnorderedList = document.getElementById("treOmDagenListe");
        liElement.classList.add('velgTre')
    } else {
        var UnorderedList = null;
        alert("Error finding a list to place activity in!")
    }

    UnorderedList.appendChild(liElement);
    addCheckboxes(1);
    addCheckboxes(0);
}

document.querySelectorAll("*").forEach((elementOnScreen) => {
    elementOnScreen.draggable = false;
})