//Sepet Açma Kapama
const toggleModel = () => {
  const basketModelEl = document.querySelector(".basket_modal");
  basketModelEl.classList.toggle("active");
}


// Sepete ürün ekleme
function addToBasket(productId, productName, price, imageUrl) {
  // Ürün zaten sepette mi
  var existingItem = document.getElementById(productId);

  if (existingItem) {
    // eğer sepette ise sayısını arttır
    var quantityElement = existingItem.querySelector('.number_of_books');
    var quantity = parseInt(quantityElement.innerText) + 1;
    quantityElement.innerText = quantity;
  } else {
    //değilse sepete ekle
    var basketList = document.querySelector('.basket_list');

    var newItem = document.createElement('li');
    newItem.className = 'basket_item';
    newItem.id = productId;
    newItem.innerHTML = `
      <img src="${imageUrl}" height="100" width="80">
      <div class="basket_items_info">
        <h3 class="book_name">${productName}</h3>
        <span class="basket_price">${price}₺</span><br>
        <span class="book_remove" onclick="removeFromBasket('${productId}')">remove</span>
      </div>
      <div class="book_count">
        <span class="decrease" onclick="decreaseQuantity('${productId}')">-</span>
        <span class="number_of_books">1</span>
        <span class="increase" onclick="increaseQuantity('${productId}')">+</span>
      </div>
    `;

    basketList.appendChild(newItem);
  }

  // Fiyatı güncelle
  updateTotal();
}

// remove tuşu 
function removeFromBasket(productId) {
  var itemToRemove = document.getElementById(productId);
  itemToRemove.remove();

  // Fiyatı güncelle
  updateTotal();
}

// item sayısını azaltma
function decreaseQuantity(productId) {
  var quantityElement = document.getElementById(productId).querySelector('.number_of_books');
  var quantity = parseInt(quantityElement.innerText);

  if (quantity > 1) {
    quantityElement.innerText = quantity - 1;
  } else {
    // 1 ürün varsa ürünü sepetten kaldırma
    removeFromBasket(productId);
  }

  //Fiyatı güncelle
  updateTotal();
}

// item sayısını arttırma
function increaseQuantity(productId) {
  var quantityElement = document.getElementById(productId).querySelector('.number_of_books');
  quantityElement.innerText = parseInt(quantityElement.innerText) + 1;

  // Fiyatı güncelle
  updateTotal();
}

// Fiyatı güncelle
function updateTotal() {
  var basketItems = document.querySelectorAll('.basket_item');
  var totalPrice = 0;

  basketItems.forEach(function (item) {
    var priceElement = item.querySelector('.basket_price');
    var quantityElement = item.querySelector('.number_of_books');
    var price = parseFloat(priceElement.innerText);
    var quantity = parseInt(quantityElement.innerText);
    totalPrice += price * quantity;
  });

  var totalElement = document.querySelector('.basket_total span');
  totalElement.innerText = `Total : ${totalPrice.toFixed(2)}₺`;
}


//Anket

function openSurveyPopup() {
const surveyPopup = document.getElementById('surveyPopup');
if (surveyPopup) {
    surveyPopup.style.display = 'block';
}
}

function closeSurveyPopup() {
const surveyPopup = document.getElementById('surveyPopup');
if (surveyPopup) {
    surveyPopup.style.display = 'none';
}
}

function closeThanksPopup() {
const thanksPopup = document.getElementById('thanksPopup');
if (thanksPopup) {
    thanksPopup.style.display = 'none';
}
}

document.addEventListener('DOMContentLoaded', function () {
const surveyForm = document.getElementById('surveyForm');
const thanksPopup = document.getElementById('thanksPopup');

if (surveyForm) {
    surveyForm.addEventListener('submit', function (event) {
        event.preventDefault();

        closeSurveyPopup();
        thanksPopup.style.display = 'block';
    });
}
});




document.addEventListener('DOMContentLoaded', function () {
  const surveyForm = document.getElementById('surveyForm');
  const thanksPopup = document.getElementById('thanksPopup');

  if (surveyForm) {
    surveyForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Sepeti temizle
      clearBasket();

      closeSurveyPopup();
      thanksPopup.style.display = 'block';
    });
  }

  // Sepeti temizleme fonksiyonu
  function clearBasket() {
    var basketList = document.querySelector('.basket_list');
    
    // Tüm öğeleri kaldır
    basketList.innerHTML = '';

    // localStorage'daki sepet verilerini temizle
    localStorage.removeItem('basketData');

    // Toplamı güncelle
    updateTotal();
  }
});
