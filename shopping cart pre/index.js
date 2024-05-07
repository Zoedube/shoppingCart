// Cart Code

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Lily',
        image: '2.JPG',
        price: 600
    },
    {
        id: 2,
        name: 'Rose',
        image: '3.JPG',
        price: 1000
    },
    {
        id: 3,
        name: 'Peony',
        image: '4.JPG',
        price: 800
    },
    {
        id: 4,
        name: 'Cherry Blossom',
        image: '5.JPG',
        price: 790
    },
    {
        id: 5,
        name: 'Tulip',
        image: '6.JPG',
        price: 880
    },
    {
        id: 6,
        name: 'Sunflower',
        image: '9.JPG',
        price: 1100
    },
    {
        id: 7,
        name: 'Lavender',
        image: '10.JPG',
        price: 1500
    },
    {
        id: 8,
        name: 'Daisy',
        image: '11.JPG',
        price: 900
    },
    {
        id: 9,
        name: 'Iris',
        image: '12.JPG',
        price: 780
    },
    {
        id: 10,
        name: 'Violet',
        image: '13.JPG',
        price: 650
    },
    {
        id: 11,
        name: 'Orchid',
        image: '14.JPG',
        price: 1700
    },
    {
        id: 12,
        name: 'Marigold',
        image: '19.JPG',
        price: 990
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

// slideshow code
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slide = document.querySelector('.slide');

next.addEventListener('click', function() {
  let items = document.querySelectorAll('.item');
  let firstItem = items[0];
  slide.style.transition = 'transform 0.5s ease-in-out';
  slide.appendChild(firstItem);
});

prev.addEventListener('click', function() {
  let items = document.querySelectorAll('.item');
  let lastItem = items[items.length - 1];
  slide.style.transition = 'transform 0.5s ease-in-out';
  slide.insertBefore(lastItem, items[0]);
});
let toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// contact form code

let name = document.getElementById('name');
let email = document.getElementById('email');
let message = document.getElementById('message');
let contactForm = document.getElementById('contact-form');
let errorElement = document.getElementById('error');
let successMsg = document.getElementById('success-msg');
let submitBtn = document.getElementById('submit');
  
let validate = (e) => {
  e.preventDefault();
 
  if (name.value.length < 3) {
    errorElement.innerHTML = 'Your name should be at least 3 characters long.';
    return false;
  } 
  
  if (!(email.value.includes('.') && (email.value.includes('@')))) {
    errorElement.innerHTML = 'Please enter a valid email address.';
    return false;
  } 

  if (!emailIsValid(email.value)) {
    errorElement.innerHTML = 'Please enter a valid email address.';
    return false;
  }

  if (message.value.length < 15) {
    errorElement.innerHTML = 'Please write a longer message.';
    return false;
  }

  errorElement.innerHTML = '';
  successMsg.innerHTML = 'Thank you! I will get back to you as soon as possible.'; 

  e.preventDefault();
  setTimeout(function () {
    successMsg.innerHTML = '';
    document.getElementById('contact-form').reset();
  }, 6000);

  return true;

}

let emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

submitBtn.addEventListener('click', validate);