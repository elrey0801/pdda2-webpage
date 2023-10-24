const HOST = process.env.URL;
tag = `
        <div class="form-control">
                <label for="username">User Name: </label>
                <input type="text" name="username" id="username">
        </div>
        <button id = "create-button" onclick="login(event)" type="button">Login</button>`
document.getElementById("login-form").innerHTML = tag;

async function login(event) {
        var username = document.getElementById('username').value;
        const options = {
                method: 'POST',
                headers: {
                        'Content-type': 'application/json'
                },
                body: JSON.stringify({
                        username: username
                })
                };
        let response = await fetch(HOST + '/login', options);
        response = await response.json();
        console.log(response);
        const red = {
                method: 'POST',
                headers: {
                        'Content-type': 'application/json'
                },
                body: JSON.stringify({
                        username: username
                })
        };
}