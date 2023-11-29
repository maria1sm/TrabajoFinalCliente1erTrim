//import { printSingleProduct } from './litelement.js';
const body = document.body;
const productDiv = body.querySelector("#productos");
//Endpoint get USERS
//Devuelve array de JSON 
async function getAllUsers() {
    let url = 'https://fakestoreapi.com/users';
    try {
        const fetch1 = await fetch(url);
        const apiRes = await fetch1.json();
        //Devuelve todos los usuarios de la Api
        const allUsers = [];
        const keysUsers = Object.keys(localStorage);
        keysUsers.forEach((key) => {
            if (key.startsWith('u')) {
                const user = localStorage.getItem(key);
                const userJson = JSON.parse(user);
                if (userJson.method !== "DELETE") {
                    allUsers.push(userJson);
                }
            }
        })
        apiRes.forEach((el) => {
            if (localStorage.getItem("u" + el.id) === null) {
                allUsers.push(el);
            }
        })
        return allUsers;
    } catch (e) {
        console.error("Error al obtener todos los users: ", e);
    }
}

//Endpoint GetUserById
async function getUsertById(id) {
    let url = `https://fakestoreapi.com/users/${id}`;
    try {
        const fetch1 = await fetch(url);
        const apiRes = await fetch1.json();
        if (localStorage.getItem("u" + id) === null) {
            //localStorage.setItem("p" + apiRes.id, JSON.stringify(apiRes));
            return apiRes;
        } else {
            return JSON.parse(localStorage.getItem("u" + id));
            //lo devuelvo aunque este deleted porque si sabes el id del producto es porque lo estoy mostrando en el carrito
            //y puede haber productos descontinuados
        }
    } catch (e) {
        console.error("Error al obtener user por id: ", e);
    }
}
//Get UserLogin

//getAllUsers().then(users => console.log(users));

//Endpoint Get all products
//Devuelve un json de los productos recuperados del local storage
//primero llama a la api
async function getAllProducts() {
    let url = 'https://fakestoreapi.com/products';
    try {
        const fetch1 = await fetch(url);
        const apiRes = await fetch1.json();
        /*await apiRes.forEach(element => {
            if (localStorage.getItem("p" + element.id) === null) {
                localStorage.setItem("p" + element.id, JSON.stringify(element));
            }
        });*/
        const allProducts = [];
        const keysProduct = Object.keys(localStorage);
        keysProduct.forEach((key) => {
            if (key.startsWith('p')) {
                const prod = localStorage.getItem(key);
                const prodJson = JSON.parse(prod);
                if (prodJson.method !== "DELETE") {
                    allProducts.push(prodJson);
                }
            }
        })
        apiRes.forEach((el) => {
            if (localStorage.getItem("p" + el.id) === null) {
                allProducts.push(el);
            }
        })
        return allProducts;
    } catch (e) {
        console.error("Error al obtener todos los productos: ", e);
    }
}

//Endpoint Get all products BY CATEGORY and CHECK CATEGORY
//Devuelve un json de los productos recuperados del local storage
//primero llama a la api
async function getAllProductsByCategory(categoria) {
    let url1 = 'https://fakestoreapi.com/products/categories';
    try {
        const fetch1 = await fetch(url1);
        const apiRes = await fetch1.json();
        if (!apiRes.includes(categoria.toLowerCase())) {
            return
        }
    } catch (e) {
        console.error("Error al buscar categoría", e);
    }

    let url = `https://fakestoreapi.com/products/category/${categoria}`;
    try {
        const fetch1 = await fetch(url);
        const apiRes = await fetch1.json();
        /*await apiRes.forEach(element => {
            if (localStorage.getItem("p" + element.id) === null) {
                localStorage.setItem("p" + element.id, JSON.stringify(element));
            }
        });*/
        const allProducts = [];
        const keysProduct = Object.keys(localStorage);
        keysProduct.forEach((key) => {
            if (key.startsWith('p') && JSON.parse(localStorage.getItem(key)).category === categoria.toLowerCase()) {
                const prod = localStorage.getItem(key);
                const prodJson = JSON.parse(prod);
                if (prodJson.method !== "DELETE") {
                    allProducts.push(prodJson);
                }
            }
        })
        apiRes.forEach((el) => {
            if (localStorage.getItem("p" + el.id) === null) {
                allProducts.push(el);
            }
        })
        return allProducts;
    } catch (e) {
        console.error("Error al obtener todos los productos: ", e);
    }
}
//Endpoint Get a single product
//Devuelve un json del producto recuperado del local storage
async function getProductById(id) {
    let url = `https://fakestoreapi.com/products/${id}`;
    try {
        const fetch1 = await fetch(url);
        const apiRes = await fetch1.json();
        if (localStorage.getItem("p" + apiRes.id) === null) {
            //localStorage.setItem("p" + apiRes.id, JSON.stringify(apiRes));
            return apiRes;
        } else {
            return JSON.parse(localStorage.getItem("p" + id));
            //lo devuelvo aunque este deleted porque si sabes el id del producto es porque lo estoy mostrando en el carrito
            //y puede haber productos descontinuados
        }
    } catch (e) {
        console.error("Error al obtener producto por id: ", e);
    }
}


//devuelve un DIV con el producto según el id que le pases
//dentro hace un roductbyId
async function printSingleProductById(productId) {
    const prodJson = await getProductById(productId);
    return await printSingleProduct(prodJson);
    //productDiv.appendChild(divProd);
}
async function printSingleProduct(prodJson) {
    if (prodJson === undefined) {
        return;
    }
    const divProd = document.createElement("DIV");

    divProd.setAttribute("class", "d-flex flex-column align-items-center card-prod-min");
    divProd.setAttribute("id-prod", prodJson.id);

    // Create a link for the image
    const imgDiv = document.createElement("A");
    imgDiv.href = `/paginas/product.html?id=${prodJson.id}`;
    imgDiv.setAttribute("class", "img-card-min");
    const img = document.createElement("IMG");
    img.src = prodJson.image;
    imgDiv.appendChild(img);
    divProd.appendChild(imgDiv);

    // Create a link for the product name
    const nombreProdLink = document.createElement("A");
    nombreProdLink.href = `/paginas/product.html?id=${prodJson.id}`;
    const nombreProd = document.createElement("H4");
    nombreProd.setAttribute("class", "text-start w-100");
    nombreProd.textContent = prodJson.title;
    nombreProdLink.appendChild(nombreProd);
    divProd.appendChild(nombreProdLink);

    const rowPrecio = document.createElement("DIV");
    rowPrecio.setAttribute("class", "d-flex align-items-center justify-content-around w-100");
    const precio = document.createElement("P");
    precio.setAttribute("class", "text-start w-100 mb-0");
    precio.textContent = prodJson.price + " €";
    const btnAddCarrito = document.createElement("BUTTON");
    btnAddCarrito.addEventListener("click", () => {
        agregarCarrito(prodJson.id);
    });
    btnAddCarrito.setAttribute("class", "btn btn-carrito");
    btnAddCarrito.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
        width="30" height="30" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
        <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>`;
    rowPrecio.appendChild(precio);
    rowPrecio.appendChild(btnAddCarrito);
    divProd.appendChild(rowPrecio);

    return divProd;
}

async function printSingleProd() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if (idParam && /^\d+$/.test(idParam)) {
            const product = await getProductById(idParam);
            const container = document.querySelector(".contenido-producto");

            if (product) {
                const productDiv = await printSingleProduct(product);
                container.appendChild(productDiv);
            } else {
                console.error("Product not found");
            }
        }
    } catch (error) {
        console.error("Error printing single product:", error);
    }
}

async function printCategoriesProds() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get("cat");
        const container = document.querySelector(".contenido-categories");

        let products = [];

        if (catParam && catParam.toLowerCase() !== "all") {
            products = await getAllProductsByCategory(catParam);
        } else {
            // All products
            products = await getAllProducts();
        }

        const productDivPromises = products.map((product) => printSingleProduct(product));
        const productDivs = await Promise.all(productDivPromises);

        productDivs.forEach((productDiv) => {
            container.appendChild(productDiv);
        });
    } catch (error) {
        console.error("Error printing category products:", error);
    }
}

if (window.location.pathname === "/paginas/product.html") {
    printSingleProd();
}
if (window.location.pathname === "/paginas/categories.html") {
    printCategoriesProds();
}

//Endpoint POST User (REGISTER)
//Registra al usuario y devuelve true si no existía antes y es correcto, si no devuielve false
async function addUser(user) {
    let url = 'https://fakestoreapi.com/users';
    try {
        //let id = user.id;
        //delete user.id;
        console.log(user)
        const fetch1 = await fetch(url, { method: "POST", body: JSON.stringify(user) });
        const newUser = await fetch1.json();
        console.log(newUser)
        //newUser.id = id;
        localStorage.setItem('u' + user.id, JSON.stringify(user));
    } catch (e) {
        console.error("Error al añadir usuario: ", e);
        return false;
    }

}

//Update User PUT
async function updateUser(user) {
    let url = `https://fakestoreapi.com/user/${user.id}`;
    try {
        //let id = user.id;
        //delete user.id;
        console.log(user)
        const fetch1 = await fetch(url, { method: "PUT", body: JSON.stringify(user) });
        const newUser = await fetch1.json();
        console.log(newUser)
        //newUser.id = id;
        //localStorage.setItem('u' + user.id, JSON.stringify(user));
    } catch (e) {
        console.error("Error al añadir usuario: ", e);
        return false;
    }

}

//UPDATE FORM
if (window.location.pathname === "/paginas/editUser.html") {


    document.getElementById('updateForm').addEventListener('submit', function (event) {
        // Call the function that handles form submission
        updateUser(event);
    });

    //Update Function
    async function updateUser(event) {
        try {
            event.preventDefault();
            // Update

            const updateForm = document.getElementById("update");
            let username = updateForm.querySelector('#username').value;
            let mail = updateForm.querySelector('#mail').value;
            let password = updateForm.querySelector('#password').value;
            let firstname = updateForm.querySelector('#firstname').value;
            let lastname = updateForm.querySelector('#lastname').value;
            let phone = updateForm.querySelector('#phone').value;
            let city = updateForm.querySelector('#city').value;
            let street = updateForm.querySelector('#street').value;
            let number = updateForm.querySelector('#streetNumber').value;
            let zipcode = updateForm.querySelector('#zipCode').value;
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

            if (mailValidado && usernameValidado && passValidado) {
                const userLogged = JSON.parse(sessionStorage.getItem('user'));
                const userId = userLogged.id;
                const user = new User(userId, mail, username, password, firstname, lastname, phone, new Address(city, street, number, zipcode, new Geolocation()));

                const userExists1 = await userExists(user);
                console.log(userExists1 && !(user.username.toLowerCase() === userLogged.username.toLowerCase()) && !(user.email.toLowerCase() === userLogged.email.toLowerCase()))
                if (userExists1 && (!user.username.toLowerCase() === userLogged.username.toLowerCase() || !user.email.toLowerCase() === userLogged.email.toLowerCase())) {
                    console.log("existe");
                    arrayErrores.userExists = "Este usuario ya está registrado";
                }
                if (Object.keys(arrayErrores).length === 0) {
                    // Registration successful
                    // Save user data to localStorage
                    //updateUser(user);
                    //Mensaje success
                    //console.log(user)
                    //localStorage.setItem('successMessage', 'Successful Edit');
                    localStorage.setItem('u' + user.id, JSON.stringify(user));
                    sessionStorage.setItem('user', JSON.stringify(user));
                    //localStorage.removeItem('errorMessage');
                    arrayErrores = {};
                    window.location.href = "userProfile.html";

                } else {
                    //Mensaje array errores
                    //const arrayErrores1 = Object.entries(arrayErrores);
                    //localStorage.setItem('errorMessage', arrayErrores1);
                    //localStorage.setItem('errorMessage', 'Error en el edit');
                    //localStorage.removeItem('successMessage');
                    arrayErrores = {}


                }
                //location.reload();
            }
        } catch (e) {
            console.error("Error en el registro:", e);
            //localStorage.setItem('errorMessage', 'Error en el edit');
            //localStorage.removeItem('successMessage');
            location.reload();
        }
    }
}

//Check if User Exists (already registered at some point)
async function userExists(user) {
    const allUsers = await getAllUsers();
    return allUsers.some((el) => {
        return (el.username.toLowerCase() === user.username.toLowerCase() || el.email.toLowerCase() === user.email.toLowerCase());
    })

}
//Retrieves User by username and checks if the pass is correct
//If Login is correct it returns the User, if it's not, it returns False
async function canUserLogin(username, password) {
    const allUsers = await getAllUsers();
    let user = false;
    allUsers.some((el) => {
        if (el.username.toLowerCase() === username.toLowerCase() && el.password === password) {
            user = el;
            return true
        };
    })
    return user;
}
//Check last UserId
async function getMaxUserId() {
    let url = 'https://fakestoreapi.com/users';
    try {
        const fetch1 = await fetch(url);
        const apiRes = await fetch1.json();
        //Devuelve todos los usuarios de la Api
        const allUsers = [];
        const keysUsers = Object.keys(localStorage);
        keysUsers.forEach((key) => {
            if (key.startsWith('u')) {
                const user = localStorage.getItem(key);
                const userJson = JSON.parse(user);
                allUsers.push(userJson);
            }
        })
        apiRes.forEach((el) => {
            if (localStorage.getItem("u" + el.id) === null) {
                allUsers.push(el);
            }
        })
        let arrId = [];
        allUsers.forEach((el) => {
            if (el.id !== undefined && !isNaN(el.id)) { arrId.push(el.id) }
        });
        const maxId = Math.max(...arrId);
        if (!isNaN(maxId)) {
            return maxId;
        } else {
            console.log(maxId)
            throw new Error("Error al obtener maxUserId");
        }
    } catch (e) {
        console.error("Error al obtener todos los users: ", e);
        throw new Error(e);
    }
}
async function getMaxCartId() {
    let url = 'https://fakestoreapi.com/carts';
    try {
        const fetch1 = await fetch(url);
        const apiRes = await fetch1.json();
        //Devuelve todos los carts de la Api
        const allCarts = [];
        const keysCarts = Object.keys(localStorage);
        keysCarts.forEach((key) => {
            if (key.startsWith('c')) {
                const cart = localStorage.getItem(key);
                const cartJson = JSON.parse(cart);
                allCarts.push(cartJson);
            }
        })
        apiRes.forEach((el) => {
            if (localStorage.getItem("c" + el.id) === null) {
                allCarts.push(el);
            }
        })
        let arrId = [];
        allCarts.forEach((el) => {
            if (el.id !== undefined && !isNaN(el.id)) { arrId.push(el.id) }
        });
        const maxId = Math.max(...arrId);
        if (!isNaN(maxId)) {
            return maxId;
        } else {
            console.log(maxId)
            throw new Error("Error al obtener maxCartId");
        }
    } catch (e) {
        console.error("Error al obtener todos los carts: ", e);
        throw new Error(e);
    }
}



//CARRITO
//Post
async function postCart() {
    cart = sessionStorage.getItem('cart');
    localStorage.setItem('c' + JSON.parse(cart).id, cart)
}
//Get cart by User
async function getCartsByUserId(userId) {
    let url = 'https://fakestoreapi.com/carts';
    try {
        const fetch1 = await fetch(url);
        const apiRes = await fetch1.json();
        //Devuelve todos los usuarios de la Api
        const allCarts = [];
        const keysCarts = Object.keys(localStorage);
        keysCarts.forEach((key) => {
            if (key.startsWith('c')) {
                const cart = localStorage.getItem(key);
                const cartJson = JSON.parse(cart);
                console.log(userId)
                if (cartJson.method !== "DELETE" && cartJson.userId === userId) {
                    allCarts.push(cartJson);
                }
            }
        })
        apiRes.forEach((el) => {
            if (localStorage.getItem("c" + el.id) === null && el.userId === userId) {
                allCarts.push(el);
            }
        })
        return allCarts;
    } catch (e) {
        console.error("Error al obtener todos los carts: ", e);
    }
}

async function printCarts() {
    const oldCartsList = document.getElementById('oldCartsList');

    const userId = JSON.parse(sessionStorage.getItem('user')).id;
    const oldCartsData = await getCartsByUserId(userId);
    console.log(oldCartsData);

    for (const cart of oldCartsData) {
        const cardItem = document.createElement('div');
        cardItem.className = 'card mb-3';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';

        // Calculate the total price dynamically for each cart
        const totalPrice = await cart.products.reduce(async (accPromise, productCart) => {
            const acc = await accPromise;
            const product = await getProductById(productCart.productId);
            return acc + product.price * productCart.quantity;
        }, Promise.resolve(0));
        cardTitle.innerText = `Cart ID: ${cart.id}, Date: ${cart.date}, Total Price: ${totalPrice}€`;

        // Create a list to display products in the cart
        const productList = document.createElement('div');
        productList.className = 'list-group';

        for (const productCart of cart.products) {
            const product = await getProductById(productCart.productId);

            const productItem = document.createElement('div');
            productItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            productItem.innerHTML = `
                <div class="media">
                    <img src="${product.image}" class="mr-3" alt="${product.name}" style="width: 50px;">
                    <div class="media-body">
                        <h5 class="mt-0">${product.name}</h5>
                        <p>Price: ${product.price}€</p>
                        <p>Quantity: ${productCart.quantity}</p>
                    </div>
                </div>
                <span>Total: ${product.price * productCart.quantity}€</span>
            `;
            productList.appendChild(productItem);
        }

        // Append the product list to the card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(productList);
        cardItem.appendChild(cardBody);

        oldCartsList.appendChild(cardItem);
    }
}








//User Info
const userData = JSON.parse(sessionStorage.getItem('user'));
if (window.location.pathname === "/paginas/userProfile.html") {
    printCarts();
    document.getElementById('userEmail').innerText = userData.email;
    document.getElementById('userUsername').innerText = userData.username;
    document.getElementById('userFirstName').innerText = userData.name.firstname;
    document.getElementById('userLastName').innerText = userData.name.lastname;
    document.getElementById('userPhone').innerText = userData.phone;
    document.getElementById('userCity').innerText = userData.address.city;
    document.getElementById('userStreet').innerText = userData.address.street;
    document.getElementById('userStreetNumber').innerText = userData.address.number;
    document.getElementById('userZipCode').innerText = userData.address.zipcode;
}
// Display user information in HTML

//Logout //Añadido en litelements
/*if (window.location.pathname !== "/paginas/login.html") {
    document.querySelector(".logout-btn").addEventListener("click", () => { localStorage.removeItem('user'); location.reload(); });
}*/

