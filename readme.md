# Online Store Webpage 🛍️


## Introduction
This documentation provides a comprehensive overview of the JavaScript codebase for an E-Commerce web application. The application interacts with [Fake Store API](https://fakestoreapi.com/) to retrieve and manage user data, products, and shopping carts. 

## Technologies Used 💻
- JavaScript
- HTML5
- CSS3
- LitElement

## LitElement 🔥
I used LitElement to manage components such as the navbar easily.

## How it Works 🤔
Our webpage fetches product data from the Fake Store API using JavaScript's async functions. Each product is represented by a custom object, allowing for structured and organized code.

## Custom Objects 🧩
We've defined custom objects to represent products, making the code modular and easy to maintain. Each product object includes properties such as `id`, `name`, `price`, and more.

## Async Functions ⏳
The use of async functions ensures a smooth user experience, especially when fetching data from external APIs. Asynchronous operations prevent the webpage from freezing during data retrieval.

## Responsive Design 📱
Our webpage is designed to be responsive, providing an optimal viewing experience across various devices, from desktops to smartphones.

## Table of Contents

1. User Management
   - getAllUsers()
   - getUserById(id)
   - canUserLogin(username, password)
   - addUser(user)
   - updateUser(user)
   - userExists(user)
   - getMaxUserId()
2. Product Management
   - getAllProducts()
   - getAllProductsByCategory(category)
   - getProductById(id)
   - addProduct(product)
   - printSingleProduct(prodJson)
   - printSingleProductById(productId)
   - printSingleProd()
   - printCategoriesProds()
3. Cart Management
    - getCartById(id)
    - postCart()
    - getCartsByUserId(userId)
    - getMaxCartId()
    - addItemToCart(cartId, productId, quantity)
    - removeItemFromCart(cartId, productId)
    - updateCartItemQuantity
    - checkoutCart(cartId)
    - Cart Operations
        - printCarts()
4. Product Update and Deletion
    - Update Product
        - updateProduct(product)
    - Product Edit Form
        - updateProductForm(event)
    - Delete Product
        - deleteProductById(productId)
    - Delete Product Button Listener
5. Edit Info
    - Edit Product Fill
    - Edit User Fill
    - User Info
6. Shopping Cart Functionality
    - Overview
    - Variables
    - Methods
7. User Authentication and Registration System Documentation
    - Initialization and Redirection
        - Display Success or Error Messages
    - Login Page Logic
        - Login Form Event Listener
        - Login Function
    - Registration Page Logic
        - Registration Form Event Listener
        - Register Function
8. Lit Element Implementation Documentation
    - Overview
    - Methods
    - Rendering Logic
    - Logout as an Event Listner
9. Data Model Classes
    - Product
    - User 
10. UI Interactions
    - Event Listeners


## User Management
### `getAllUsers()`
- **Description**: Retrieves all users from the FakeStore API and local storage.
- **Return**: An array of user objects.
- **Usage**: Used for populating user-related data in the application.

### `getUserById(id)`
- **Description**: Retrieves user information by ID from the FakeStore API or local storage.
- **Parameters**: `id` - ID of the user.
- **Return**: User object or `undefined` if not found.
- **Usage**: Used for user profile and authentication.

### `canUserLogin(username, password)`
- **Description**: Checks if a user can log in by validating the provided username and password.
- **Parameters**: `username` - User's username, `password` - User's password.
- **Return**: User object if login is successful, `false` otherwise.
- **Usage**: Used during the login process.

### `addUser(user)`
- **Description**: Registers a new user by sending a POST request to the FakeStore API and updating local storage.
- **Parameters**: `user` - User object with registration details.
- **Return**: `true` if registration is successful, `false` otherwise.
- **Usage**: Used during user registration.

### `updateUser(user)`
- **Description**: Updates user information by sending a PUT request to the FakeStore API and updating local storage.
- **Parameters**: `user` - User object with updated details.
- **Return**: `true` if the update is successful, `false` otherwise.
- **Usage**: Used for user profile updates.

### `userExists(user)`
- **Description**: Checks if a user already exists by comparing username and email.
- **Parameters**: `user` - User object.
- **Return**: `true` if the user already exists, `false` otherwise.
- **Usage**: Used during user registration to prevent duplicate accounts.

### `getMaxUserId()`
- **Description**: Retrieves the maximum user ID from the FakeStore API and local storage.
- **Return**: The maximum user ID.
- **Usage**: Used for generating a new user ID during registration.

## Product Management
### `getAllProducts()`
- **Description**: Retrieves all products from the FakeStore API and local storage.
- **Return**: An array of product objects.
- **Usage**: Used for displaying all products in the application.

### `getAllProductsByCategory(category)`
- **Description**: Retrieves products by category from the FakeStore API and local storage.
- **Parameters**: `category` - Product category.
- **Return**: An array of product objects filtered by category.
- **Usage**: Used for displaying products by category.

### `getProductById(id)`
- **Description**: Retrieves product information by ID from the FakeStore API or local storage.
- **Parameters**: `id` - ID of the product.
- **Return**: Product object or `undefined` if not found.
- **Usage**: Used for displaying detailed product information.

### `addProduct(product)`
- **Description**: Adds a new product by sending a POST request to the FakeStore API and updating local storage.
- **Parameters**: `product` - Product object with details.
- **Return**: `true` if the addition is successful, `false` otherwise.
- **Usage**: Used for adding new products to the store.

### `printSingleProduct(prodJson)`
- **Description**: Generates an HTML representation of a product.
- **Parameters**: `prodJson` - Product object.
- **Return**: A div element containing the product information.
- **Usage**: Used for displaying a single product on the UI.

### `printSingleProductById(productId)`
- **Description**: Generates an HTML representation of a product using its ID.
- **Parameters**: `productId` - ID of the product.
- **Return**: A div element containing the product information.
- **Usage**: Used for displaying a single product on the UI.

### `printSingleProd()`
- **Description**: Prints a single product on the product details page.
- **Usage**: Used for displaying a detailed view of a single product.

### `printCategoriesProds()`
- **Description**: Prints products based on the selected category.
- **Usage**: Used for displaying products based on user-selected categories.

## Cart Management
### `getCartById(id)`
- **Description**: Retrieves cart information by ID from the FakeStore API or local storage.
- **Parameters**: `id` - ID of the cart.
- **Return**: Cart object or `undefined` if not found.
- **Usage**: Used for displaying cart details.

### `postCart()`
- **Description**: Saves the cart from the session storage to local storage.
- **Usage**: Used for persisting the cart data between sessions.

### `getCartsByUserId(userId)`
- **Description**: Retrieves all carts associated with a specific user.
- **Parameters**: `userId` - ID of the user.
- **Return**: An array of cart objects.
- **Usage**: Used for managing user-specific carts.

### `getMaxCartId()`
- **Description**: Retrieves the maximum cart ID from the FakeStore API and local storage.
- **Return**: The maximum cart ID.
- **Usage**: Used for generating a new cart ID during cart creation.

## Product Update and Deletion

### Update Product
#### `updateProduct(product)`
- **Description**: Updates product information by sending a PUT request to the FakeStore API and updating local storage.
- **Parameters**: `product` - Product object with updated details.
- **Return**: `true` if the update is successful, `false` otherwise.
- **Usage**: Used for updating product information.

### Product Edit Form
#### `updateProductForm(event)`
- **Description**: Handles the submission of the product edit form.
- **Parameters**: `event` - Form submission event.
- **Usage**: Invoked when the user submits the product edit form.

### Delete Product
#### `deleteProductById(productId)`
- **Description**: Deletes a product by ID, either by sending a DELETE request to the FakeStore API or removing it from local storage.
- **Parameters**: `productId` - ID of the product to be deleted.
- **Return**: `true` if deletion is successful, `false` otherwise.
- **Usage**: Used for deleting a product.

### Delete Product Button Listener
- **Description**: Sets up an event listener for the delete product button.
- **Usage**: Invoked when the user clicks the delete product button.

### Cart Operations
#### `postCart()`
- **Description**: Saves the current cart from session storage to local storage.
- **Usage**: Used for persisting the cart data between sessions.

#### `getCartsByUserId(userId)`
- **Description**: Retrieves all carts associated with a specific user.
- **Parameters**: `userId` - ID of the user.
- **Return**: An array of cart objects.
- **Usage**: Used for managing user-specific carts.

#### `printCarts()`
- **Description**: Prints a list of carts associated with the current user.
- **Usage**: Used for displaying the user's cart history.

### Edit Product Fill
#### `fillForm()`
- **Description**: Fills the product edit form with the details of the selected product.
- **Usage**: Invoked when the product edit page is loaded.

### Edit User Fill
- **Description**: Fills the user edit form with the details of the logged-in user.
- **Usage**: Invoked when the user edit page is loaded.

### User Info
- **Description**: Displays user information in the user profile page.
- **Usage**: Invoked when the user profile page is loaded.

### Logout (Added in Litelements)
- **Description**: Handles the logout functionality.
- **Usage**: Invoked when the user clicks the logout button.

# Shopping Cart Functionality

## Overview
This code implements shopping cart functionality in a web application. It includes methods for adding products to the cart, calculating and updating the total price, updating the cart, and printing the cart.

## Variables
- `carrito`: Represents the shopping cart element in the HTML.
- `carritoProds`: Represents the product list within the shopping cart.
- `precioTotalElement`: Represents the HTML element displaying the total price.
- `arrProdsID`: An array to store product IDs.

## Methods

### 1. `agregarCarrito(idProd)`
- Adds a product to the shopping cart.
- If the product already exists, updates the quantity; otherwise, adds a new product.
- Updates session storage, total price, and re-prints the cart.

### 2. `calculateAndUpdateTotalPrice(cart)`
- Calculates and updates the total price of the products in the cart.
- Uses promises to fetch product details and waits for all promises to resolve.
- Updates the total price element in the HTML.

### 3. `updateCart(cart)`
- Updates session storage with the modified cart.

### 4. `printCarrito(cart)`
- Prints the products in the shopping cart.
- Dynamically creates HTML elements for each product, including an image, price, quantity, and delete button.
- Handles product quantity changes and updates the cart accordingly.

### 5. `btnVaciar.addEventListener("click", ...)`
- Event listener for the "Empty Cart" button.
- Clears the cart, updates session storage, and re-prints the cart.

### 6. `comprarButton.addEventListener("click", buyCart)`
- Event listener for the "Buy" button.
- Checks if there are products in the cart, posts the cart, and displays a thank you message.
- Clears the cart after the purchase, updates session storage, and initializes a new cart.

## User Authentication and Registration System Documentation

This JavaScript code orchestrates a user authentication and registration system, ensuring a smooth user journey with informative feedback messages. To effectively utilize this system, integrate the code with corresponding HTML elements.

### Initialization and Redirection

The code begins by checking the user's login status using session storage. If the user is not logged in and attempts to access a page other than the login page, redirection to the login page occurs. Similarly, if the user is already logged in and navigates to the login page, they are redirected to the home page.

### Login Page Logic

Following redirection, the code focuses on functionality specific to the login page.

#### Display Success or Error Messages

On the login page, the system checks for success and error messages stored in local storage. If a success message is found, it dynamically displays it on the page and removes it from local storage. Conversely, if an error message is present, it is displayed, and the corresponding entry is removed from local storage. This ensures that users receive feedback based on their previous actions.

#### Login Form Event Listener

The code adds an event listener to the login form submission button. Upon submission, the `loginUser` function is invoked asynchronously.

#### Login Function

The `loginUser` function manages the login process. It prevents the default form submission behavior, validates the entered username and password, and attempts to log in using the `canUserLogin` function. If successful, user data is stored in session storage, a new cart is initialized, and success messages are set. If errors occur, appropriate error messages are set, and the page is reloaded to reflect the changes.

### Registration Page Logic

Similarly, the code handles registration functionality on the registration page.

#### Registration Form Event Listener

An event listener is added to the registration form submission button, invoking the `registerUser` function upon submission.

#### Register Function

The `registerUser` function manages the user registration process. It prevents the default form submission behavior, validates user input, creates a new user object, and checks for existing users. If registration is successful, user data is stored, success messages are set, and the page is reloaded. In case of errors, appropriate error messages are set, and the page is reloaded.


## Lit Element Implementation Documentation

```javascript
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class MyNav extends LitElement {
  // CSS Styles
  static styles = css`
    /* Add your CSS styles here */
  `;

  // Shadow DOM Configuration
  createRenderRoot() {
    return this;
  }

  // Methods and Rendering Logic
  getLocation(category) {
    // Implementation for getting the location based on the category
  }

  render() {
    return html`
      <!-- HTML template for the navigation bar -->
      <nav class="navbar navbar-expand-md">
        <!-- ... (omitted for brevity) ... -->
      </nav>
    `;
  }
}

// Define the custom element
customElements.define('my-nav', MyNav);
```

### Overview

- **Import Statement:** The Lit Element class is imported along with the necessary functions for template rendering.

- **Class Definition:** The `MyNav` class extends `LitElement` and includes static styles using the `css` template literal. The `createRenderRoot` method is overridden to use the element itself as the shadow root so I can use the same js and CSS files as in the HTML.

- **Methods:**
  - `getLocation(category):` A method for determining the location based on the provided category.

- **Rendering Logic:**
  - The `render` method defines the structure of the navigation bar using the `html` template literal.



## Data Model Classes

- **Product Class:**
  - Represents a product with properties such as id, title, price, category, description, and image.
  - Ideal for modeling items within an e-commerce platform.

- **User Class:**
  - Represents a user with properties like id, email, username, password, name (firstname and lastname), phone, and address.
  - Useful for managing user-related information in a system.

- **Address Class:**
  - Models an address with properties including city, street, number, zipcode, and geolocation.
  - Suitable for capturing location details associated with users or products.

- **Geolocation Class:**
  - Represents geolocation information with latitude (lat) and longitude (long) properties.
  - Can be utilized to store coordinates related to addresses or user locations.



## UI Interactions
### Event Listeners
- **Description**: Event listeners are set up for various forms and buttons to capture user interactions.
- **Usage**: Used for handling user input, such as submitting forms and clicking buttons.

---
