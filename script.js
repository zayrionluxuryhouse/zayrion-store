const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('search');
const categoryList = document.getElementById('categoryList');
let productsData = [];

// Load products from JSON
fetch('products.json')
.then(res => res.json())
.then(data => {
  productsData = data;
  displayProducts(data);
});

// Display products function
function displayProducts(products){
  productsContainer.innerHTML = '';
  products.forEach(p=>{
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${p.image}">
      <h4>${p.name}</h4>
      <p>৳${p.price}</p>
      <button onclick="orderWhatsApp('${p.name}')">Order Now</button>
    `;
    productsContainer.appendChild(div);
  });
}

// WhatsApp order function
function orderWhatsApp(productName){
  const phone = '8801330092552';
  const text = `Hi, I want to order ${productName}`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

// Search
searchInput.addEventListener('input', e=>{
  const term = e.target.value.toLowerCase();
  const filtered = productsData.filter(p=>p.name.toLowerCase().includes(term));
  displayProducts(filtered);
});

// Category filter
categoryList.addEventListener('click', e=>{
  if(e.target.tagName==='LI'){
    [...categoryList.querySelectorAll('li')].forEach(li=>li.classList.remove('active'));
    e.target.classList.add('active');
    const category = e.target.dataset.category;
    if(category==='All'){
      displayProducts(productsData);
    }else{
      displayProducts(productsData.filter(p=>p.category===category));
    }
  }
});
