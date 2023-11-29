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

    const imgDiv = document.createElement("DIV");
    imgDiv.setAttribute("class", "img-card-min");
    const img = document.createElement("IMG");
    //img.setAttribute("class", "card-image");
    img.src = prodJson.image;
    imgDiv.appendChild(img);
    divProd.appendChild(imgDiv);
    //productDiv.appendChild(divProd);

    const nombreProd = document.createElement("H4");
    nombreProd.setAttribute("class", "text-start w-100")
    nombreProd.textContent = prodJson.title;
    divProd.appendChild(nombreProd);
    //productDiv.appendChild(divProd);
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

async function printCategoriesProds() {
    let prods = [];
    //Categoria
    const urlParams = new URLSearchParams(window.location.search);
    const catParamm = urlParams.get("cat");
    if (catParamm && catParamm.toLowerCase() !== "all") {
        prods = await getAllProductsByCategory(catParamm);

    } else {
        //All
        prods = await getAllProducts();
    }

    //LitElement
    const container = document.querySelector(".contenido-categories");
    const prodsDivProm = prods.map((el) => printSingleProduct(el));
    const prodDivs = await Promise.all(prodsDivProm);
    prodDivs.forEach((el) => {
        container.appendChild(el);
    })
    //console.log(products);
    //const b = document.querySelector(".contenido-categories");
    //b.appendChild(products);
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

//Check if User Exists (already registered at some point)
async function userExists(user) {
    console.log(user)
    const allUsers = await getAllUsers();
    return allUsers.some((el) => {
        console.log(el)
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
async function getCartByUserId(userId) {
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

//UPDATE USER


//User Info
const userData = JSON.parse(sessionStorage.getItem('user'));

// Display user information in HTML
document.getElementById('userEmail').innerText = userData.email;
document.getElementById('userUsername').innerText = userData.username;
document.getElementById('userFirstName').innerText = userData.name.firstname;
document.getElementById('userLastName').innerText = userData.name.lastname;
document.getElementById('userPhone').innerText = userData.phone;
document.getElementById('userCity').innerText = userData.address.city;
document.getElementById('userStreet').innerText = userData.address.street;
document.getElementById('userStreetNumber').innerText = userData.address.number;
document.getElementById('userZipCode').innerText = userData.address.zipcode;
//Logout //Añadido en litelements
/*if (window.location.pathname !== "/paginas/login.html") {
    document.querySelector(".logout-btn").addEventListener("click", () => { localStorage.removeItem('user'); location.reload(); });
}*/

