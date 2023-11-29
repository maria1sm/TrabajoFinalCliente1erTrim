import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class MyNav extends LitElement {

    //${MyNav.getStyles()}
    static styles = css`
    
  `;

    createRenderRoot() {
        return this;
    }

    getLocation(category) {
        const currentLocation = window.location.pathname;

        if (currentLocation === 'index.html') {
            return `./paginas/categories.html?cat=${category}`;
        } else if (currentLocation === '/paginas/categories.html') {
            return `categories.html?cat=${category}`;
        }
    }
    render() {
        return html`
    <nav class="navbar navbar-expand-md">
    <div class="container flex justify-content-between">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-start flex-grow-0" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasLeftLabel">Products</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body ">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/paginas/categories.html?cat=all">All</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page"
                            href="/paginas/categories.html?cat=jewelery">Jewellery</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/paginas/categories.html?cat=electronics">Electronics</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Clothing
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/paginas/categories.html?cat=men's clothing">Men</a>
                            </li>
                            <li><a class="dropdown-item"
                                href="/paginas/categories.html?cat=women's clothing">Women</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <a class="navbar-brand m-auto" href="../index.html">
            <h2 class="fw-bold m-0"><span class="main-blue">Hello</span>Store</h2>
        </a>

        <ul class="navbar-nav d-flex flex-row ">

            <li class="nav-item dropdown-center">
                <a class="nav-link me-4" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                    data-bs-offset="10,20">
                    <svg width="27" height="27" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16.1814" cy="9.41964" r="8.41964" stroke="black" stroke-width="2" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M31.615 32.8527C30.1354 27.3869 24.308 23 16.8405 23C9.37304 23 3.54561 27.3869 2.06597 32.8527H0C1.50115 26.1039 8.47013 21 16.8405 21C25.2109 21 32.1799 26.1039 33.681 32.8527H31.615Z"
                            fill="black" />
                    </svg>
                </a>
                <ul class="dropdown-menu" id="user-dropdown">
                    <li><a class="dropdown-item" href="#">Edit User</a></li>
                    <li><a class="dropdown-item logout-btn" href="#" @click="${() => { sessionStorage.removeItem('user'); location.reload() }}">Logout<i
                                class="bi bi-box-arrow-in-right text-danger ps-1 "></i></a></li>
                </ul>
            </li>
            <li class="nav-item">
                <div class="two columns u-pull-right">
                    <ul>
                        <li class="submenu">
                        <a class="nav-link" href="#">
                            <img src="/media/img/cart.svg" width="25" height="28.22" alt="Icon">
                        </a>
                            <div id="carrito">

                                <table id="lista-carrito" class="u-full-width">
                                    <!--<thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>-->
                                    <tbody></tbody>
                                </table>

                                <a href="#" id="vaciar-carrito" class="button u-full-width">Vaciar Carrito</a>
                            </div>
                        </li>
                    </ul>
                </div> 
            </li>
        </ul>
    </div>
</nav>
    `;
    }

}


customElements.define('my-nav', MyNav);


class SingleProduct extends LitElement {
    static styles = css`
    `;
    createRenderRoot() {
        return this;
    }
    static properties = {
        prodJson: { type: Object },
    };

    constructor() {
        super();
        this.prodJson = {};
    }

    render() {
        return html`
        <div class="d-flex flex-column align-items-center card-prod-min" id-prod = "${this.prodJson.id}">
          <div class="img-card-min">
            <img src=${this.prodJson.image} alt="Product Image">
          </div>
          <h4 class="text-start w-100">${this.prodJson.title}</h4>
          <div class="d-flex align-items-center justify-content-around w-100">
            <p class="text-start w-100 mb-0">${this.prodJson.price} €</p>
            <button class="btn btn-carrito">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </button>
          </div>
        </div>
      `;
    }
}

customElements.define('single-product', SingleProduct);

export function printSingleProduct(prodJson) {
    const productElement = document.createElement('single-product');
    productElement.prodJson = prodJson;
    return productElement;
}