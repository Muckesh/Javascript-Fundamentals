import { products } from "./products.js";

const productContainer = document.getElementById('product-container');

const searchInput = document.getElementById("search");

let cart = [];

function renderProducts (productsData){
    productContainer.innerHTML="";

    productsData.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
                <img src="${product.img}"/>
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <h4>${product.price}</h4>
                <button class = "add-btn" data-id = "${product.id}">Add to Cart</button>
        `;
        productContainer.appendChild(card);
    });
    attachEvent();
}

function attachEvent(){
    const allAddBtns = document.querySelectorAll('.add-btn');
    allAddBtns.forEach(btn => {
        btn.addEventListener('click',function(){
            const id = parseInt(btn.getAttribute('data-id'));
            addToCart(id);
        })
    })
}

renderProducts(products);

window.addToCart = function(id){
    const item = products.find(product => product.id === id);

    const exist = cart.find(product => product.id===id);

    if (exist) {
        alert("Already in cart!");
    }else {
        cart.push({...item,quantity : 1});
        alert(`${item.name} Added to Cart!`);
        renderCart();
    }
}


searchInput.addEventListener('input', function(){
    const keyword = searchInput.value.toLowerCase();
  
    const filteredProducts = products.filter(prod => 
      prod.name.toLowerCase().includes(keyword)
    );
  
    renderProducts(filteredProducts);
  });
  
const cartContainer = document.getElementById('cart-container');

function renderCart(){
    cartContainer.innerHTML="";

    if (cart.length === 0) {
        cartContainer.innerHTML="<h1>Your Cart</h1><p> Cart is Empty!</p>";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        cartContainer.innerHTML+= `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>Price : ₹${item.price}</p>
                <p>Qty : <button onclick="decreaseQty(${item.id})">-</button> ${item.quantity} <button onclick="increaseQty(${item.id})">+</button></p>
                <p><button onclick="removeItem(${item.id})">Remove</button></p>
            </div>
        `;
    });

    const gst = total * 0.18;  // 18% GST
    const discount = total >= 1000 ? total * 0.1 : 0;  // 10% Discount if total >= 1000
    const grandTotal = total + gst - discount;

    cartContainer.innerHTML += `
        <div class="cart-summary">
            <p>Total : ₹${total.toFixed(2)}</p>
            <p>GST (18%) : ₹${gst.toFixed(2)}</p>
            <p>Discount : ₹${discount.toFixed(2)}</p>
            <h2>Grand Total : ₹${grandTotal.toFixed(2)}</h2>
        </div>
    `;

    localStorage.setItem('cart',JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;

}


window.increaseQty = function(id){
    const item = cart.find(product => product.id === id);
    item.quantity++;

    renderCart();
}

window.decreaseQty = function(id){
    const item = cart.find(product => product.id === id);
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeItem(id);
    }

    renderCart();
}

window.removeItem = function(id){
    cart = cart.filter(product => product.id !== id);

    renderCart();

    localStorage.setItem('cart',JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
}

const cartBtn = document.getElementById('cart-btn');


const cartSection = document.getElementById("cart-section");
const cartOverlay = document.getElementById("cart-overlay");

function showCart(){
    cartOverlay.style.display = 'block';
    cartSection.style.display = 'block';
}

function closeCart(){
    cartOverlay.style.display = 'none';
    cartSection.style.display = 'none';
}

const closeBtn = document.getElementById('close-btn')

cartBtn.addEventListener('click',showCart);
closeBtn.addEventListener('click',closeCart);


window.onload = function(){
    const oldCart = JSON.parse(localStorage.getItem('cart'));
    console.log(oldCart,cart);
    if (oldCart) {
        cart = oldCart;

    }
    renderCart();
}