/*
 to respond to the submit button
*/
function solve() {
    // access the form defined in index and create a form data object using FormData()
    const form = document.getElementById('input_form');
    const formData = new FormData(form);
    
    // get the name of the celebrant and gender
    const name = formData.get('name');
    const gender = formData.get('gender');
    
    // Get number of guests and their names
    const numGuests = parseInt(formData.get('number'));
    const guests = [];
    
    // Collect guest names who are marked as "Going"
    for (let i = 1; i <= numGuests; i++) {
        if (formData.get('checkbox' + i)) {
            const guestName = formData.get('name' + i);
            if (guestName) guests.push(guestName);
        }
    }
    
    if (guests.length === 0) {
        alert('Please add at least one guest who is going!');
        return;
    }

    // Create the birthday song lyrics
    const birthdayWords = `Happy birthday to you Happy birthday to you Happy birthday dear ${name} Happy birthday to you`.split(' ');
    
    // Create the good fellow lyrics with proper pronoun
    const pronoun = gender === 'male' ? "he's" : "she's";
    const goodFellowWords = `For ${pronoun} a jolly good fellow For ${pronoun} a jolly good fellow For ${pronoun} a jolly good fellow which nobody can deny`.split(' ');
    
    // Generate the song output
    let output = '<h3>Happy Birthday Song:</h3>';
    
    // Assign words to guests in rotation
    let guestIndex = 0;
    for (let i = 0; i < birthdayWords.length; i++) {
        const currentGuest = guests[guestIndex];
        output += `<p>${currentGuest}: ${birthdayWords[i]}</p>`;
        guestIndex = (guestIndex + 1) % guests.length;
    }
    
    // Add the Good Fellow song
    output += '<h3>For a Jolly Good Fellow:</h3>';
    guestIndex = 0;
    for (let i = 0; i < goodFellowWords.length; i++) {
        const currentGuest = guests[guestIndex];
        output += `<p>${currentGuest}: ${goodFellowWords[i]}</p>`;
        guestIndex = (guestIndex + 1) % guests.length;
    }
    
    // Display the output
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = output;
}

// PLEASE STUDY THE CODES BELOW, BUT DO NOT CHANGE ANYTHING 

// this function will create the needed input fields and corresponding Going checkboxes for the number of expected guests
function generateGuestFields() {
    const num = document.getElementById('number').value; // gets the numer of guests
    const container = document.getElementById('guests');
    container.innerHTML = 'Enter the name(s) of your invitees: <br>';

    for (let i = 0; i < num; i++) {
        // steps to create the individual input field 
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'name' + (i + 1); // creates the assigned name to the field
        input.className = 'w3-input w3-half  ' // assign a css class
        container.appendChild(input); // include it in the guests div

        // steps to create the individual checkbox for Going? per guest 
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox' + (i + 1);  // creates the assigned id to the field
        checkbox.name = 'checkbox' + (i + 1);
        // applies a css class and include it in the guests div
        checkbox.className = 'w3-check w3-margin-left w3-margin-right w3-margin-bottom'
        container.appendChild(checkbox);

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = "Going?";
        container.appendChild(label);
        // applies a newline on the browser after each guests Name and Going? checkbox.
        container.appendChild(document.createElement('br'));
    }
}

// A quick data dump on Output div to show users input on the browser.
function printFormData() {
    const form = document.getElementById('input_form');
    const formData = new FormData(form);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<h2> Output <h2>';
    for (let [key, value] of formData.entries()) {
        outputDiv.innerHTML += `${key}: ${value} <br>`;
    }
    const myData = Object.fromEntries(formData.entries());
    console.log(myData)
    console.log(formData.entries())
}