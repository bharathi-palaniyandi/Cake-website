function register(){
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    if(username && password){
        localStorage.setItem('username',username)
        localStorage.setItem('password',password);
        alert('registration sucessful please login')
        window.location.href='login.html';
    }
    else{
        alert('please enter the  both username password')
    }
}


// login  //

function login(){
    const username=document.getElementById("logiusername").value;
    const password=document.getElementById("logipassword").value;

    const storedusername=localStorage.getItem('username')
    const storedpassword=localStorage.getItem('password');

    if(username===storedusername && password===storedpassword){
        alert("login successful")
        window.location.href='home.html'
    }
    else{
        alert("invalid username and password")
    }
}





  
// Select all order buttons
const orderButtons = document.querySelectorAll('.btn-dark');

// Navbar elements
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

// Dashboard elements
const dashboardItems = document.getElementById('dashboard-items');
const dashboardTotalEl = document.getElementById('dashboard-total');

let cart = [];
let total = 0;

// Update total amount
function updateTotals() {
  total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.innerText = cart.reduce((count, item) => count + item.quantity, 0);
  totalPriceEl.innerText = total;
  dashboardTotalEl.innerText = total;
}

// Render the dashboard
function renderDashboard() {
  dashboardItems.innerHTML = '';
  cart.forEach((item, index) => {
    const dashboardCard = document.createElement('div');
    dashboardCard.classList.add('col-md-3', 'mb-3');
    dashboardCard.innerHTML = `
      <div class="card h-100">
        <img src="${item.imgSrc}" class="card-img-top" style="height: 150px; object-fit: cover;" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">Price: ₹${item.price}</p>
          <p class="card-text">Quantity: ${item.quantity}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-sm btn-success add-btn">+</button>
            <button class="btn btn-sm btn-danger delete-btn">-</button>
          </div>
        </div>
      </div>
    `;

    // Add quantity
    dashboardCard.querySelector('.add-btn').addEventListener('click', () => {
      item.quantity++;
      updateTotals();
      renderDashboard();
    });

    // Delete quantity
    dashboardCard.querySelector('.delete-btn').addEventListener('click', () => {
      item.quantity--;
      if (item.quantity <= 0) {
        cart.splice(index, 1);
      }
      updateTotals();
      renderDashboard();
    });

    dashboardItems.appendChild(dashboardCard);
  });
}

// Handle adding items to cart
orderButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    const card = this.closest('.card');
    const title = card.querySelector('.card-title').innerText;
    const priceText = card.querySelector('p price') ? card.querySelector('p .price').innerText : '400';
    const price = parseInt(priceText.replace('₹', '')) || 400;
    const imgSrc = card.querySelector('img').src;

    // Check if already in cart
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ title, price, imgSrc, quantity: 1 });
    }

    updateTotals();
    renderDashboard();
    updateCartDropdown();

    alert(`${title} has been added to your cart!`);
  });
});

// Update the cart dropdown in the navbar
function updateCartDropdown() {
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item', 'd-flex', 'align-items-center', 'mb-2');
    itemElement.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin-right: 10px;">
      <div>
        <div class="fw-bold">${item.title}</div>
        <div>₹${item.price} × ${item.quantity}</div>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });
}

