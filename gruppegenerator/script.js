const class8n = [];
const class8r = [];
const class8g = [];

const class9n = [];
const class9r = [' Aditi', ' Aron', ' Annabel', ' Antonina', ' Deniz', ' Ea', ' Edwin', ' Eivind', ' Eliot', ' Emilie', ' Even', ' Haadiya', ' Jacob J', ' Jacob S', ' Klara', ' Longyu', ' Magnus', ' Marius', ' Mark', ' Martin', ' Nils', ' Nimisha', ' Ojas', ' Pernille', ' Terry', ' Tias', ' Tord', ' Wenjia'];

const class10n = [];
const class10r = [];

const minGroupSize = 2;
const maxGroupSize = 28;

const minGroups = Math.floor(minGroupSize/2)
const maxGroups = Math.floor(maxGroupSize/2)

let inputType;

function main() {

    const groupSizeMinInput = document.querySelector('input#groupSizeMin');
    groupSizeMinInput.min = minGroupSize;
    groupSizeMinInput.max = maxGroupSize;

    aquireSearchParams();
};

document.querySelectorAll("input.input").forEach((inputBox) => {
    inputBox.addEventListener("input", function() {
        if (inputBox.value) {
            document.querySelectorAll("input.input").forEach((otherBox) => {
                if (otherBox !== inputBox) {
                    otherBox.disabled = true;
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
    if (inputBox.value = "") {
        console.log(inputBox)
    }
});

function aquireSearchParams() {

    const searchParams = new URLSearchParams(location.search);

    if (searchParams != "") {
        const groupSizeMin = searchParams.getAll('groupSizeMin');
        const groups = searchParams.getAll('groups');


        const classes = {
            '8n': searchParams.getAll('8n'),
            '8r': searchParams.getAll('8r'),
            '8g': searchParams.getAll('8g'),
            '9n': searchParams.getAll('9n'),
            '9r': searchParams.getAll('9r'),
            '10n': searchParams.getAll('10n'),
            '10r': searchParams.getAll('10r')
        }

        if (groupSizeMin >= minGroupSize && groupSizeMin <= maxGroupSize && groups >= minGroups && groups <= maxGroups) {
            makeGroups(groupSizeMin, groups, classes);
        } else {
            // alert("The chosen groupSizeMin is not a valid value, it has to be between 2 and 28!");
        }

        updateCheckboxes(classes, groupSizeMin);

    }
}

function updateCheckboxes(classes, groupSizeMin) {

    document.querySelector('#groupSizeMin').value = groupSizeMin;

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

function makeGroups(groupSizeMin, groups, classes) {

    alert(`${groupSizeMin}\n${groups}\n${inputType}`)

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

    makeGroupLists(nameBundle, groupSizeMin);
}

function makeGroupLists(values, groupSizeMin) {
    
    // ===== This section is creating random lists =====

    let numberOfLists = Math.ceil(values.length/groupSizeMin);

    // Create an array of empty lists based on the numberOfLists
    let targetLists = Array.from({ length: numberOfLists }, () => []);

    // Shuffle the values array to randomize the order
    values = values.sort(() => Math.random() - .5);

    // Distribute values into the lists in a round-robin fashion
    values.forEach((value, index) => {
        targetLists[index % numberOfLists].push(value);
    });


    // ===== This section is displaying the lists =====

    const container = document.getElementById('listContainer');
    container.innerHTML = '';

    targetLists.forEach((list, i) => {

        const listDiv = document.createElement('div');
        listDiv.classList.add('output', 'popup');
        listDiv.innerHTML = `<h2>Gruppe ${(i+1)}: ${list} (${list.length})</h2><span class='popuptext' id='myPopup'>Copied to clipboard!</span>`;

        container.appendChild(listDiv);
    });

    
    copyClickListeners();
}

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