const btnAgregar = document.getElementsByClassName("agregar-carrito");

Array.from(btnAgregar).forEach(el => {
    el.addEventListener("click", () => {
        const cardProd = el.parentElement.parentElement;
        agregarCarrito(cardProd)
    });
});


const carrito = document.querySelector("#lista-carrito");
const carritoProds = carrito.querySelector('tbody');

let arrProdsID = [];
function agregarCarrito(cardProd) {

    const id = cardProd.querySelector("[data-id]").getAttribute("data-id");

    if (arrProdsID.indexOf(id) === -1) {
        arrProdsID.push(id);
        console.log("a");
        const prod = document.createElement("TR");
        prod.setAttribute("id", "prod" + id);

        const img = document.createElement("TD");
        const name = document.createElement("TD");
        const price = document.createElement("TD");
        const quantity = document.createElement("TD");
        quantity.setAttribute("class", "cantidad");
        const borrarProd = document.createElement("TD");

        prod.appendChild(img);
        prod.appendChild(name);
        prod.appendChild(price);
        prod.appendChild(quantity);
        prod.appendChild(borrarProd);

        img.appendChild(cardProd.querySelector("img").cloneNode(true));
        name.appendChild(cardProd.querySelector("H4").cloneNode(true));
        price.appendChild(cardProd.querySelector(".u-pull-right").cloneNode(true));

        const quantContent = quantity.appendChild(document.createElement("DIV"));
        quantContent.innerText = 1;

        const borrarProdBtn = borrarProd.appendChild(document.createElement("BUTTON"));
        borrarProdBtn.setAttribute("class", "borrar-curso");
        borrarProdBtn.textContent = "X";

        borrarProdBtn.addEventListener("click", () => {
            arrProdsID.splice(arrProdsID.indexOf(id), 1)
            if (arrProdsID.indexOf(id) === -1) {
                prod.remove();;
            } else {
                quantContent.innerText = quantContent.innerText - 1;
            }
        });

        carritoProds.appendChild(prod);
    } else {
        let prodCantidad = 0;
        arrProdsID.push(id);
        arrProdsID.forEach((el) => { if (el === id) { prodCantidad++ } });
        console.log("cantidad:" + prodCantidad);
        carritoProds.querySelector("#prod" + id).querySelector(".cantidad div").innerText = prodCantidad;
    }
}


const btnVaciar = document.querySelector("#vaciar-carrito");
btnVaciar.addEventListener("click", () => { carritoProds.replaceChildren(); arrProdsID = [] });