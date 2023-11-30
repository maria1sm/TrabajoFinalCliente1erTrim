const logged = sessionStorage.getItem('user') !== null;
if (!logged && window.location.pathname !== "/TrabajoFinalCliente1erTrim/paginas/login.html") {
    window.location.href = "/TrabajoFinalCliente1erTrim/paginas/login.html";
}
if (logged && window.location.pathname === "/TrabajoFinalCliente1erTrim/paginas/login.html") {
    window.location.href = "../index.html";
}

if (window.location.pathname === "/TrabajoFinalCliente1erTrim/paginas/login.html") {

    const successMessage = localStorage.getItem('successMessage');
    const errorMessage = localStorage.getItem('errorMessage');

    if (successMessage) {
        // Display success message
        document.getElementById('success-login').classList.toggle("hidden");
        document.getElementById('success-login').innerText = successMessage;
        localStorage.removeItem('successMessage');
    } else if (errorMessage) {
        // Display error message
        document.getElementById('error-login').classList.toggle("hidden");
        document.getElementById('error-login').innerText = errorMessage;
        localStorage.removeItem('errorMessage');
    }

    // Add event listener for login button
    document.getElementById('loginForm').addEventListener('submit', loginUser);

    //Login Function
    async function loginUser(event) {
        event.preventDefault();
        // LOGIN
        const loginForm = document.getElementById("login");
        let username = loginForm.querySelector('#userLogin').value;
        let password = loginForm.querySelector('#passLogin').value;
        let usernameValidado = false;
        let passValidado = false;
        let arrayErrores = {};

        //Check username
        if (username.trim() !== '') {
            username = username.trim();
            usernameValidado = true;
        } else {
            arrayErrores.username = 'El username no es valido';
        }
        // Check password
        //Password with no regex because Api has different regex
        if (password.trim() !== '' /*&& /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)*/) {
            passValidado = true;
            password = password.trim();
        } else {
            arrayErrores.password = 'El password no es valido';
        }
        try {
            if (usernameValidado && passValidado) {

                const userCanLog = await canUserLogin(username, password);
                if (!userCanLog) {
                    arrayErrores.userExists = "Error en el login";
                }
                if (Object.keys(arrayErrores).length === 0) {
                    // Registration successful
                    // Save user data to localStorage
                    sessionStorage.setItem('user', JSON.stringify(userCanLog));
                    //Cart
                    let maxId = 0;
                    try {
                        maxId = await getMaxCartId();
                        console.log(maxId)
                    } catch (e) {
                        console.error("Error fetching maxId:", e);
                        throw new Error("Error fetching maxId");
                    }
                    const cart = {
                        "id": maxId + 1,
                        "userId": userCanLog.id,
                        "date": new Date().toISOString().split("T")[0],
                        "products": []
                    };
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    //Mensaje success
                    localStorage.setItem('successMessage', 'Successful Login');
                    localStorage.removeItem('errorMessage');
                    arrayErrores = {};


                } else {
                    //Mensaje array errores
                    //const arrayErrores1 = Object.entries(arrayErrores);
                    //localStorage.setItem('errorMessage', arrayErrores1);
                    sessionStorage.setItem('errorMessage', 'Error en el login');
                    localStorage.removeItem('successMessage');
                    arrayErrores = {}


                }
                location.reload();
            }
        } catch (e) {
            console.error("Error en el login:", e);
            localStorage.setItem('errorMessage', 'Error en el login');
            localStorage.removeItem('successMessage');
            location.reload();
        }

    }

    // Add event listener for registration button
    document.getElementById('registroForm').addEventListener('submit', registerUser);

    //Register Function
    async function registerUser(event) {

        event.preventDefault();
        // REGISTER

        const registerForm = document.getElementById("registro");
        let username = registerForm.querySelector('#username').value;
        let mail = registerForm.querySelector('#mail').value;
        let password = registerForm.querySelector('#password').value;
        let firstname = registerForm.querySelector('#firstname').value;
        let lastname = registerForm.querySelector('#lastname').value;
        let phone = registerForm.querySelector('#phone').value;
        let city = registerForm.querySelector('#city').value;
        let street = registerForm.querySelector('#street').value;
        let number = registerForm.querySelector('#streetNumber').value;
        let zipcode = registerForm.querySelector('#zipCode').value;
        let usernameValidado = false;
        let mailValidado = false;
        let passValidado = false;
        let arrayErrores = {};

        //Check username
        if (username.trim() !== '') {
            username = username.trim();
            usernameValidado = true;
        } else {
            arrayErrores.username = 'El username no es valido';
        }

        // Check email
        if (mail.trim().toLowerCase() !== '' && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail)) {
            mailValidado = true;
            mail = mail.trim().toLowerCase();
        } else {
            arrayErrores.mail = 'El mail no es valido';
        }

        // Check password
        if (password.trim() !== '' /*&& /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)*/) {
            passValidado = true;
            password = password.trim();
        } else {
            arrayErrores.password = 'El password no es valido';
        }
        try {
            if (mailValidado && usernameValidado && passValidado) {
                let maxId;
                try {
                    maxId = await getMaxUserId();
                } catch (e) {
                    console.error("Error fetching maxId:", e);
                    throw new Error("Error fetching maxId");
                }
                const user = new User(maxId + 1, mail, username, password, firstname, lastname, phone, new Address(city, street, number, zipcode, new Geolocation()));

                const userExists1 = await userExists(user);
                console.log(userExists1)
                if (userExists1) {
                    console.log("existe");
                    arrayErrores.userExists = "Este usuario ya está registrado";
                }
                if (Object.keys(arrayErrores).length === 0) {
                    // Registration successful
                    // Save user data to localStorage
                    addUser(user);
                    //Mensaje success
                    localStorage.setItem('successMessage', 'Successful Register');
                    localStorage.removeItem('errorMessage');
                    arrayErrores = {};


                } else {
                    //Mensaje array errores
                    //const arrayErrores1 = Object.entries(arrayErrores);
                    //localStorage.setItem('errorMessage', arrayErrores1);
                    localStorage.setItem('errorMessage', 'Error en el registro');
                    localStorage.removeItem('successMessage');
                    arrayErrores = {}


                }
                location.reload();
            }
        } catch (e) {
            console.error("Error en el registro:", e);
            localStorage.setItem('errorMessage', 'Error en el registro');
            localStorage.removeItem('successMessage');
            location.reload();
        }
    }
}
