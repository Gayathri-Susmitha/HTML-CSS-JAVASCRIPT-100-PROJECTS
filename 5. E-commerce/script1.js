const prod_container = document.querySelector(".products");
const cart_container = document.getElementById("cart");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartBtn = document.getElementById("cartBtn"); 
let isCartVisible = false; 
let allProducts = []; 
const cartItems = new Map(); // {productId: quantity}

async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
            throw new Error("Products could not be loaded");
        }
        const prod = await response.json();
        allProducts = prod.products.map(details => ({
            id: details.id,
            name: details.title,
            price: details.price,
            images: details.images
        }));
        populateProducts(allProducts);
    } catch (err) {
        console.error("There was an error while fetching the products", err);
        
    }
}

//displays the fetched products on the screen
function populateProducts(products) {
    prod_container.innerHTML = ''; 
    products.forEach(prod => {
        let currentImageIndex = 0;
        const imgLen = prod.images.length;

        const product = document.createElement('div');
        product.className = "product";

        const img_con = document.createElement("div");
        img_con.className = "img_con";

        const prod_details = document.createElement("div");
        prod_details.className = "card_footer";

        const image = document.createElement('img');
        image.src = prod.images[0];
        image.alt = prod.name; 

        const prev_button = document.createElement('button');
        prev_button.textContent = "<<";
        prev_button.addEventListener("click", () => {
            if (imgLen > 1) {
                currentImageIndex = (currentImageIndex - 1 + imgLen) % imgLen;
                image.src = prod.images[currentImageIndex];
            }
        });

        const next_button = document.createElement('button');
        next_button.textContent = ">>";
        next_button.addEventListener("click", () => {
            if (imgLen > 1) {
                currentImageIndex = (currentImageIndex + 1) % imgLen;
                image.src = prod.images[currentImageIndex];
            }
        });

        const prod_name = document.createElement('h3');
        prod_name.textContent = prod.name;
        const prod_price = document.createElement('p');
        prod_price.textContent = `Price: $${prod.price.toFixed(2)}`; 

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = "Add To Cart";
        addToCartBtn.className = "addToCartBtn";
        addToCartBtn.addEventListener("click", () => {
            addToCart(prod.id);
        });

        img_con.append(prev_button, image, next_button); 
        prod_details.append(prod_name, prod_price, addToCartBtn);
        product.append(img_con, prod_details);
        prod_container.appendChild(product);
    });
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const currentQuantity = cartItems.get(productId) || 0;
    cartItems.set(productId, currentQuantity + 1);
    renderCart(); 
}

function removeFromCart(productId) {
    const currentQuantity = cartItems.get(productId);
    if (currentQuantity > 1) {
        cartItems.set(productId, currentQuantity - 1);
    } else {
        cartItems.delete(productId); 
    }
    renderCart();
}

//creates and displays the items added to the cart.
function renderCart() {
    cart_container.innerHTML = '<h2>Cart</h2>'; 
    if (cartItems.size === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your cart is empty.";
        cart_container.appendChild(emptyMessage);
        return;
    }

    cartItems.forEach((quantity, productId) => {
        const product = allProducts.find(p => p.id === productId);
        if (!product) return; 

        const cart_item = document.createElement('div');
        cart_item.classList.add('cart_item');
        cart_item.dataset.productId = productId; 

        const cart_item_name = document.createElement('span');
        cart_item_name.textContent = `${product.name}`;

        const cart_item_price = document.createElement('span');
        cart_item_price.textContent = `Price: $${product.price.toFixed(2)}`;

        const cart_item_quant = document.createElement('span');
        cart_item_quant.textContent = `Quantity: ${quantity}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '➖';
        deleteBtn.addEventListener('click', () => {
            removeFromCart(productId);
        });

        cart_item.append(cart_item_name, cart_item_price, cart_item_quant, deleteBtn);
        cart_container.appendChild(cart_item);
    });
}

cartBtn.addEventListener("click", () => {
    isCartVisible = !isCartVisible; 
    if (isCartVisible) {
        prod_container.style.display = 'none'; 
        cart_container.style.display = 'block'; 
        renderCart(); 
    } else {
        prod_container.style.display = 'flex'; 
        cart_container.style.display = 'none'; 
    }
});

checkoutBtn.addEventListener("click", () => {
    let totalPrice = 0;
    cartItems.forEach((quantity, productId) => {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            totalPrice += product.price * quantity;
        }
    });
    if (totalPrice > 0) {
        alert(`Your total price is: $${totalPrice.toFixed(2)}`);
    } else {
        alert("Your cart is empty!");
    }
});

document.addEventListener("DOMContentLoaded", fetchProducts);