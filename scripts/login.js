
function getInputValue() {
    
    const key = document.getElementById('passkey');

    const enteredPasskey = key.value;

    const pass = window.users.find(item => item.name === enteredPasskey) || window.users.find(item => item.num === enteredPasskey);

    if (pass) {
        const name = pass.name;
        
        window.location.href = `home.html?name=${name}`;
    }
}

