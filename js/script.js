import getData from "./getData.js";
import { getUser } from "./getUser.js";
import { addShoppingCart } from "./addProductShoppingCart.js";
import logOut from "./logOut.js";

document.addEventListener("DOMContentLoaded", async () => {
  const APIproduct = "https://634e9f834af5fdff3a625f84.mockapi.io/products";

  
  const products = await getData(APIproduct);

  const user = getUser();

  if (user) {
    const headerShoppingCartCount = document.querySelector("#headerShoppingCartCount");
    headerShoppingCartCount.textContent = user.shoppingCart?.length || 0;

    const headerUser = document.querySelector("#headerUser");
    headerUser.textContent = user.name ;
    headerUser.setAttribute("href", "./account.html");
    
    const headerLogout = document.querySelector('#headerLogout');
    headerLogout.style.display = 'block';
  }

  // group
  const groupedCategories = products.reduce((acc, prod) => {
    if (!acc[prod.category]) acc[prod.category] = [];
    acc[prod.category].push(prod);
    return acc;
  }, {});

  const categoriesContainer = document.querySelector("#categoriesContainer");
  categoriesContainer.innerHTML = "";

  for (const [categoryName, items] of Object.entries(groupedCategories)) {
    const section = document.createElement("section");
    section.classList.add("category");

    const h2 = document.createElement("h2");
    h2.textContent = categoryName;
    section.appendChild(h2);

    const container = document.createElement("div");
    container.classList.add("category__container");

    items.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.dataset.id = product.id;

      const oldPrice = product.salePercent && product.sale === true
        ? Math.round(product.price / (1 - product.salePercent / 100))
        : null;

      div.innerHTML = `
        <img src="images/products/${product.img || "default"}.png" 
             class="product__img" 
             alt="${product.title}" height="80" />
        <p class="product__title">${product.title}</p>
        ${
          (product.salePercent && product.sale === true)
          ? `<div class="product__sale">
              <span class="product__sale--old">$${oldPrice}</span>
              <span class="product__sale--percent">-${product.salePercent}%</span>
            </div>`
          : ""
        }
        <div class="product__info">
          <span class="product__price">$${product.price}</span>
          <button class="product__cart" data-id="${product.id}">
            <img src="images/shopping-cart.png" alt="shopping cart" height="20"/>
          </button>
        </div>
      `;

      if (user?.shoppingCart.find(p => p.id === product.id)) {
        div.querySelector(".product__cart").classList.add("product__cart--in");
      }

      container.appendChild(div);
    });

    section.appendChild(container);
    categoriesContainer.appendChild(section);
  }

 
  const shoppingCartArr = user?.shoppingCart || [];
  addShoppingCart(shoppingCartArr);
  headerLogout.addEventListener('click', async e =>logOut(user))
});
