const carrito = document.querySelector("#lista-carrito");
const carritoProds = carrito.querySelector('tbody');
const precioTotalElement = document.querySelector("#precio-total");
printCarrito();
calculateAndUpdateTotalPrice(JSON.parse(sessionStorage.getItem('cart')));
let arrProdsID = [];

async function agregarCarrito(idProd) {
    try {
        const id = idProd;
        const producto = await getProductById(id);
        let cart = JSON.parse(sessionStorage.getItem('cart')) || { products: [] }; // Initialize cart if it doesn't exist
        const existingProduct = cart.products.find(product => product.productId === id);

        if (existingProduct) {
            // Product already exists, update quantity
            existingProduct.quantity += 1;
        } else {
            // Product doesn't exist, add new product
            cart.products.push({ "productId": id, "quantity": 1 });
        }

        // Update session storage and re-print cart

        updateCart(cart);
        calculateAndUpdateTotalPrice(cart);
        printCarrito(cart);
    } catch (e) {
        console.error("Error en el carrito:", e);
    }
}
async function calculateAndUpdateTotalPrice(cart) {
    try {
        // Create an array of promises to fetch product details
        const productPromises = cart.products.map(async (productCart) => {
            const product = await getProductById(productCart.productId);
            return productCart.quantity * product.price;
        });

        // Wait for all promises to resolve
        const productPrices = await Promise.all(productPromises);

        // Calculate the total price
        const totalPrice = productPrices.reduce((acc, productPrice) => acc + productPrice, 0);

        // Update the total price element in the HTML
        precioTotalElement.innerText = totalPrice + "€";
    } catch (e) {
        console.log("Todavia no hay productos añadidos")
    }

}
function updateCart(cart) {
    try {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.log("Todavia no hay productos añadidos")
    }
    // Update session storage with the modified cart

}

async function printCarrito(cart) {
    try {

        const carritoProds = document.querySelector('#lista-carrito tbody');
        cart = cart || JSON.parse(sessionStorage.getItem('cart')) || { products: [] }; // Initialize cart if it doesn't exist

        // Clear the existing products in the cart before re-printing
        carritoProds.innerHTML = '';

        for (const productCart of cart.products) {
            const id = productCart.productId;
            const product = await getProductById(id);

            const prod = document.createElement('TR');
            prod.setAttribute('id', `prod${id}`);

            const img = document.createElement('TD');
            const price = document.createElement('TD');
            const quantity = document.createElement('TD');
            quantity.setAttribute('class', 'cantidad');
            const borrarProd = document.createElement('TD');

            prod.appendChild(img);
            prod.appendChild(price);
            prod.appendChild(quantity);
            prod.appendChild(borrarProd);

            const image = document.createElement('img');
            image.setAttribute('src', product.image);
            img.appendChild(image);

            const priceTag = document.createElement('p');
            priceTag.innerText = product.price * productCart.quantity + "€";
            price.appendChild(priceTag);

            const quantContent = quantity.appendChild(document.createElement('DIV'));
            quantContent.innerText = productCart.quantity;

            const borrarProdBtn = borrarProd.appendChild(document.createElement('BUTTON'));
            borrarProdBtn.setAttribute('class', 'borrar-curso');
            borrarProdBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
            width="30" height="30" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>`;

            borrarProdBtn.addEventListener('click', () => {
                if (productCart.quantity > 1) {
                    productCart.quantity -= 1;
                    quantContent.innerText = productCart.quantity;
                } else {
                    // Remove the product from the cart when quantity is 0
                    cart.products = cart.products.filter(p => p.productId !== id);
                    // Remove the product element from the DOM
                    prod.remove();
                }
                // Recalculate total price and update the price element
                const totalPrice = product.price * productCart.quantity;
                priceTag.innerText = totalPrice + "€";

                // Update session storage and total price
                updateCart(cart);
                calculateAndUpdateTotalPrice(cart);
            });

            carritoProds.appendChild(prod);
        }
    } catch (e) {
        console.error("Error al imprimir productos del carrito", e);
    }
}

const btnVaciar = document.querySelector("#vaciar-carrito");
btnVaciar.addEventListener("click", async () => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || { products: [] }; // Initialize cart if it doesn't exist
    cart.products = [];
    // Update session storage and re-print cart
    await updateCart(cart);
    await calculateAndUpdateTotalPrice(cart);
    await printCarrito(cart);
    arrProdsID = [];
});


const comprarButton = document.querySelector("#comprar");
comprarButton.addEventListener("click", buyCart);

async function buyCart() {
    // Check if there are products in the cart
    const cart2 = JSON.parse(sessionStorage.getItem('cart')) || { products: [] };

    if (cart2.products.length === 0) {
        alert("Your cart is empty. Add products before making a purchase.");
        return;
    }
    postCart();

    alert("Thank you for your purchase!");

    // Clear the cart after the purchase (assuming you want to empty the cart)
    const cart = { products: [] };
    updateCart(cart);
    printCarrito(cart);
    calculateAndUpdateTotalPrice(cart);
    arrProdsID = [];
    sessionStorage.removeItem('cart');
    let maxId = 0;
    try {
        maxId = await getMaxCartId();
        console.log(maxId)
    } catch (e) {
        console.error("Error fetching maxId:", e);
        throw new Error("Error fetching maxId");
    }
    const cart1 = {
        "id": maxId + 1,
        "userId": JSON.parse(sessionStorage.getItem('user')).id,
        "date": new Date().toISOString().split("T")[0],
        "products": []
    };
    sessionStorage.setItem('cart', JSON.stringify(cart1));
}