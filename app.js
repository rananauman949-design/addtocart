// ==== SELECT ELEMENTS ====
const addCartButtons = document.querySelectorAll('.addCart');
const cartCount = document.querySelector('.icon-cart span');
const cartList = document.querySelector('.ListCart');
const closeBtn = document.querySelector('.close');
const checkoutBtn = document.querySelector('.checkOut');

// Store cart items
let cart = [];

// ==== PRODUCT DATA (OPTIONAL STATIC EXAMPLE) ====
const products = [
    {
        id: 1,
        name: "Smart Watch",
        price: 200,
        image: "images/image1.png"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 180,
        image: "images/image2.png"
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: 120,
        image: "images/image3.png"
    }
];

// ==== ADD TO CART FUNCTION ====
addCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        addToCart(products[index]);
    });
});

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showAddEffect(product.name);
}

// ==== UPDATE CART DISPLAY ====
function updateCart() {
    cartList.innerHTML = '';
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('item');

        cartItem.innerHTML = `
      <div class="image"><img src="${item.image}" alt="${item.name}"></div>
      <div class="name">${item.name}</div>
      <div class="totalPrice">$${(item.price * item.quantity).toFixed(2)}</div>
      <div class="quantity">
        <span class="minus">−</span>
        <span>${item.quantity}</span>
        <span class="plus">+</span>
      </div>
    `;

        // handle quantity changes
        cartItem.querySelector('.plus').addEventListener('click', () => {
            item.quantity++;
            updateCart();
        });

        cartItem.querySelector('.minus').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(p => p.id !== item.id);
            }
            updateCart();
        });

        cartList.appendChild(cartItem);
    });

    // update cart counter
    cartCount.textContent = totalItems;
}

// ==== SIMPLE CHECKOUT ====
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`✅ Checkout successful!\n\nTotal Amount: $${totalAmount.toFixed(2)}\nThank you for shopping!`);

    cart = [];
    updateCart();
});

// ==== CLOSE CART ====
closeBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
    alert('🛒 Cart cleared!');
});

// ==== SMALL ADD EFFECT ====
function showAddEffect(productName) {
    const popup = document.createElement('div');
    popup.textContent = `${productName} added to cart!`;
    popup.style.position = 'fixed';
    popup.style.bottom = '30px';
    popup.style.right = '30px';
    popup.style.background = '#0d47a1';
    popup.style.color = '#fff';
    popup.style.padding = '10px 20px';
    popup.style.borderRadius = '30px';
    popup.style.fontWeight = '600';
    popup.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    popup.style.transition = 'all 0.5s ease';
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(20px)';
    }, 1500);

    setTimeout(() => popup.remove(), 2000);
}
