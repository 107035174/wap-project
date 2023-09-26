window.onload = function () {
    document.getElementById('loginButton').onclick = function (event) {
        event.preventDefault();
        login();
    }
}

async function login() {
    let result = await fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        })
    }).then(res => res.json());
    if (result.status >= 400) {
        alert(result.message);
    } else {
        localStorage.setItem("data", result.token)
        window.location.href = 'main.html';
    }
}

// async function loadProduct(){

// }