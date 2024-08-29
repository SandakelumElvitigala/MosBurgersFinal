// Function to get the value of the input field
function getInputValue() {
    // Get the input field element by its ID
    const key = document.getElementById('passkey');

    // Get the value of the input field
    const enteredPasskey = key.value;

    const pass = window.users.find(item => item.name === enteredPasskey) || window.users.find(item => item.num === enteredPasskey);

    if (pass) {
        const name = pass.name;
        
        window.location.href = `../home.html?name=${name}`;
    }
}

