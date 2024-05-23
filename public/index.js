let currentProductIndex = 0;
let productsData = [];

function loadProducts() {
  const productsContainer = document.querySelector('#products .products-card');
  const product = productsData[currentProductIndex]; // 获取当前产品
  const featureList = product.highlighted_features.map(feature =>
    `<li>${feature}</li>`
  ).join('');

const productCard = document.createElement('div');
productCard.className = 'card';
productCard.innerHTML = `
    <div class="card-image-box">
        <figure class="image card-image">
          <img src="${product.imageUrl}" alt="${product.title}">
        </figure>
    </div>
    <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${product.title}</p>
            <p class="subtitle is-6">$${product.price}</p>
          </div>
        </div>
        <div class="content">
          ${product.description}
          <br>
          <ul>${featureList}</ul>
        </div>
        <div class="foot">
            <button class="button is-link is-large buy-button" onclick="location.href='${product.paymentLink}'">Buy now</button>
        </div>
    </div>
 `;

  productsContainer.innerHTML = '';
  productsContainer.appendChild(productCard);
}

function showNextProduct() {
  currentProductIndex = (currentProductIndex + 1) % productsData.length;
  loadProducts();
}

function showPreviousProduct() {
  currentProductIndex = (currentProductIndex - 1 + productsData.length) % productsData.length;
  loadProducts();
}

function init() {
  fetchProductsData();
  document.getElementById('nextButton').addEventListener('click', showNextProduct);
  document.getElementById('prevButton').addEventListener('click', showPreviousProduct);
}

async function fetchProductsData() {
  try {
    const response = await fetch('./data/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    productsData = await response.json();
    productsData = productsData.filter(feature => {
      return feature.active;
    });
    loadProducts();
  } catch (error) {
    console.error('Error fetching the products data: ', error);
  }
}

init();

const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
let currentSlideIndex = 0;

function moveToSlide(slideIndex, noTransition = false) {
    if (noTransition) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.5s ease';
    }
    const slideWidth = track.clientWidth;
    const newTransformValue = -slideWidth * slideIndex;
    track.style.transform = `translateX(${newTransformValue}px)`;
  }

setInterval(() => {
    currentSlideIndex++;
    if (currentSlideIndex === slides.length - 1) {
      moveToSlide(currentSlideIndex);
      setTimeout(() => {
        moveToSlide(0, true);
        currentSlideIndex = 0;
      }, 500);
    } else {
      moveToSlide(currentSlideIndex);
    }
}, 3000);
