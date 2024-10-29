const class8n = [" Clara", " Jacob D.", " Jonas E.", " Daniel F.", " Stellan", " Muhammad", " Audun", " Casper", " Rasmus J.", " Achyuth", " Guðfinna", " Sverre L.", " Mia-Sofie", " Ferdinand", " Nora Ma.", " Vuk", " Julia", " Adine", " Mats", " Mathias", " Eric S.", " Lilly", " Pål", " Adrian", " Kristian", " Kristin", " Katherine"];
const class8r = [" Hugo", " Pil", " Amelie", " Muezullah", " Jonathan", " Ella", " Oliver B.", " Alexander B.", " Ophelia", " Jonas C.", " Sidharth", " Ola", " Oscar H.", " Sebastian", " Christian", " Shreya Khan.", " Anniken", " Henriette", " Magnus L.", " Hanyang", " Adha", " Agata", " Daniel S.", " Sofia S.", " Aleksander L.", " Mathis", " Edwin W."];
const class8g = [" Johannes B.", " Oscar B.", " Jens", " Gudrun", " Oliver F.", " Henrik", " Martin F.", " Jørgen", " Lakshmi", " Mikkel", " Vilde", " Sverre-Matti", " Nora Me.", " Chloe", " Chenul", " Alexander P.", " Dirk", " Darshika", " Mali", " Felix", " Arjun", " Karthik", " Samuel", " Rebecca", " Ludvig", " Harshini"];

const class9n = [" Magnus A.", " Aurora", " Harald", " Roskva", " Yuri", " Sophia", " Sarah", " Teo", " Serina", " Anton", " Lina", " Aleksander I.", " Arahant", " Arnav", " Methum", " Emily", " Athanasios", " Annika", " Sondre L.", " Maxim", " Charu", " Sofia P.", " Riya", " Kaushik", "Alexander R. ", " Nickan", " Johannes L.", " Banu"];
const class9r = [" Eivind", " Aditi", " Aron", " Marius", " Eliot", " Emilie", " Magnus H.", " Nimisha", " Jacob J.", " Ea", " Terry", " Klara", " Longyu", " Mark", " Pernille", " Nils R.", " Annabel", " Martin S.", " Haadiya", " Jacob S.", " Antonina", " Tias", " Ojas", " Tord", " Even", " Wenjia", " Deniz", " Edwin Ø."];

const class10n = [" Joanna", " Nils B.", " Eline", " Eric D.", " Jana", " Sondre E.", " Kajsa", " Zacharias", " Oliver H.", " Siya", " Elise", " Aradhya", " Daniel J.", " Eilif", " Erik", " Viljar", " Filip", " Sophie", " Mille", " Vebjørn", " Yiwei", " Aatmaj", " Odin", " Maya", " Trym", " Georg", " Parthavi", " Emil"];
const class10r = [" William", " Johs", " Rasmus D.", " Nikita", " Leo", " Karina", " Amalie", " Viktor", " Shreya Kham.", " Ingvil", " Sofia K.", " Alan", " Malin M.", " Christoffer", " Kabeeswar", " Christine", " Shauryaveer", " Estera", " Gabriel", " Malin S.", " Aslak", " Julius", " Victoria", " Thomas", " Nikoline", " Gregor", " Mengxi", " Maria"];

let groupSizeMin;
let groupSizeMax;
let groups;

function cleanSearchParams() {
    const searchParams = new URLSearchParams(location.search);

    searchParams.forEach((value, key) => {
        // Delete parameter if it has no value
        if (value === "") {
            searchParams.delete(key);
        }
    });

    // Update the URL without reloading the page
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, document.title, newUrl);

    return searchParams;  // Return the cleaned URLSearchParams object if you need it
}

function aquireSearchParams() {
    cleanSearchParams();
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.toString() !== "") {
        groupSizeMin = parseInt(searchParams.get('groupSizeMin'));
        groupSizeMax = parseInt(searchParams.get('groupSizeMax'));
        groups = parseInt(searchParams.get('groups'));

        const classes = {
            '8n': searchParams.get('8n'),
            '8r': searchParams.get('8r'),
            '8g': searchParams.get('8g'),
            '9n': searchParams.get('9n'),
            '9r': searchParams.get('9r'),
            '10n': searchParams.get('10n'),
            '10r': searchParams.get('10r')
        };

        updateInputs(classes, groupSizeMin, groupSizeMax, groups);
    }
};

function disableInputs() {
    const inputs = document.querySelectorAll("input.input");
    
    inputs.forEach((inputBox) => {
        if (inputBox.value) {
            inputs.forEach((otherBox) => {
                if (otherBox !== inputBox) {
                    otherBox.placeholder = "unavailable";  // Set "unavailable" for other inputs
                    otherBox.value = "";  // Clear the value of the other inputs
                }
            });
            inputBox.placeholder = "";  // Clear placeholder for the active input
        } else {
            let inputValueCount = 0;
            inputs.forEach((inputBox) => {
                if (inputBox.value) {
                    inputValueCount++;
                }
            });
            
            if (inputValueCount === 0) {
                inputs.forEach((otherBox) => {
                    otherBox.placeholder = "";  // Reset placeholder when no input is filled
                });
            }
        }
    });
}


function updateInputs(classes, groupSizeMin, groupSizeMax, groups) {

    let inputType;
    let continueOperation;
    if (!groupSizeMax && !groups) {
        if (groupSizeMin) {
            document.querySelector("#groupSizeMin").value = groupSizeMin;
            continueOperation = true;
        } else {
            console.error("Neither groupSizeMin, groupSizeMax or groups have a value, future operations canceled!");
        }
        inputType = "groupSizeMin";
    } else if (!groupSizeMin && !groups) {
        if (groupSizeMax) {
            document.querySelector("#groupSizeMax").value = groupSizeMax;
            continueOperation = true;
        } else {
            console.error("Neither groupSizeMin, groupSizeMax or groups have a value, future operations canceled!");
        }
        inputType = "groupSizeMax";
    } else {
        if (groups) {
            document.querySelector('#groups').value = groups;
            continueOperation = true;
        } else {
            console.error("Neither groupSizeMin, groupSizeMax or groups have a value, future operations canceled!");
        }
        inputType = "groups";
    }

    if (continueOperation) {
        disableInputs();
        makeGroups(groupSizeMin, groupSizeMax, groups, classes, inputType);
    }
    

    if (classes['8n'] == "on") {
        document.getElementById('8n').checked = true;
    }
    if (classes['8r'] == "on") {
        document.getElementById('8r').checked = true;
    }
    if (classes['8g'] == "on") {
        document.getElementById('8g').checked = true;
    }
    if (classes['9n'] == "on") {
        document.getElementById('9n').checked = true;
    }
    if (classes['9r'] == "on") {
        document.getElementById('9r').checked = true;
    }
    if (classes['10n'] == "on") {
        document.getElementById('10n').checked = true;
    }
    if (classes['10r'] == "on") {
        document.getElementById('10r').checked = true;
    }
}

function makeGroups(groupSizeMin, groupSizeMax, groups, classes, inputType) {

    var activeClasses = [];
    var nameBundle = [];

    if (classes['8n'] == "on") {
        activeClasses.push('8n');
        nameBundle.push(...class8n);
    }
    if (classes['8r'] == "on") {
        activeClasses.push('8r')
        nameBundle.push(...class8r);
    }
    if (classes['8g'] == "on") {
        activeClasses.push('8g')
        nameBundle.push(...class8g);
    }
    if (classes['9n'] == "on") {
        activeClasses.push('9n')
        nameBundle.push(...class9n);
    }
    if (classes['9r'] == "on") {
        activeClasses.push('9r')
        nameBundle.push(...class9r);
    }
    if (classes['10n'] == "on") {
        activeClasses.push('10n')
        nameBundle.push(...class10n);
    }
    if (classes['10r'] == "on") {
        activeClasses.push('10r')
        nameBundle.push(...class10r);
    }

    makeGroupLists(nameBundle, groupSizeMin, groupSizeMax, groups, inputType)
}

function makeGroupLists(names, groupSizeMin, groupSizeMax, groups, inputType) {
    let numberOfLists;

    if (!groupSizeMin && !groupSizeMax && !groups) {
        if (inputType === "groupSizeMin") {
            groupSizeMin = 1;
        } else if (inputType === "groupSizeMax") {
            groupSizeMax = 1;
        } else if (inputType === "groups") {
            groups = 1;
        } else {
            console.error(`Error declaring inputType\ninputType${inputType}`);
            return;
        }
    }

    if (groupSizeMin) {
        numberOfLists = Math.floor(names.length / groupSizeMin);
    } else if (groupSizeMax) {
        numberOfLists = Math.ceil(names.length / groupSizeMax);
    } else if (groups) {
        numberOfLists = parseInt(groups);
    } else {
        console.error("Invalid inputType or missing parameters for group creation.");
        console.log(`InputType:${inputType}\ngroupSizeMin:${groupSizeMin}\ngroupSizeMax:${groupSizeMax}\ngroups:${groups}`)
        return;
    }

    // Check if numberOfLists is valid
    if (numberOfLists <= 0 || isNaN(numberOfLists)) {
        console.error("Error: Invalid numberOfLists calculated:", numberOfLists);
        console.log(`Names array: ${names}\ngroupSizeMin: ${groupSizeMin}\ngroups: ${groups}`);
        return;
    }

    // Create an array of empty lists based on the number of groups
    let targetLists = Array.from({ length: numberOfLists }, () => []);

    // Shuffle names array to randomize order
    names = names.sort(() => Math.random() - 0.5);

    // Distribute names into the lists in a round-robin fashion
    names.forEach((value, index) => {
        targetLists[index % numberOfLists].push(value);
    });

    const container = document.getElementById('listContainer');
    container.innerHTML = '';

    targetLists.forEach((list, i) => {
        const listDiv = document.createElement('div');
        listDiv.classList.add('output', 'popup');
        listDiv.innerHTML = `<h2>Group ${(i + 1)}: ${list.join(", ")} (${list.length})</h2>`;
        container.appendChild(listDiv);
    });

    copyClickListeners();
}


document.querySelectorAll("input.input").forEach((inputBox) => {
    inputBox.addEventListener("input", function() {
        if (inputBox.value) {
            document.querySelectorAll("input.input").forEach((otherBox) => {
                if (otherBox !== inputBox) {
                    // otherBox.disabled = true;
                    otherBox.placeholder = "unavailiable";
                    otherBox.value = "";
                    
                    inputType = inputBox.id;
                }
            });
        } else {
            document.querySelectorAll("input.input").forEach((otherBox) => {
                otherBox.disabled = false;
                otherBox.placeholder = "";
            });
        }
    });
});



function copyClickListeners() {
    const nameFields = document.querySelectorAll('div.output');
    var activeContent = "";
    for (var i = 0; i < nameFields.length; i++) {
        nameFields[i].addEventListener('click', function() {
            togglePopup(this);
            activeContent = this.innerText;
            activeContent = activeContent.slice(0, -25);
            copyToClipboard(activeContent);
        })
    }
}

const copyToClipboard = async (str) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return await navigator.clipboard.writeText(str);
    }
    
    
    alert('Clipoard not supported!');
    throw new Error('Clipoard not supported!');
}