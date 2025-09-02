import { getUser } from "./getUser.js";
import createTableOrders from "./createTableOrders.js";
import getData from "./getData.js";
import deleteAcc from "./deleteAcc.js";
import logOut from "./logOut.js";

document.addEventListener("DOMContentLoaded", async ()=> {
  const deleteBtn = document.querySelector("#deleteAcc");
  const user = getUser();
  if (!user) return;

  
  const headerUser = document.querySelector("#headerUser");
  headerUser.textContent = user.name;
  headerUser.href = "./account.html";
  const headerLogout = document.querySelector('#headerLogout');
  headerLogout.style.display = 'block';

  // info
  const userInfoName = document.querySelector("#userInfoName");
  const userInfoEmail = document.querySelector("#userInfoEmail");
  const headerShoppingCartCount = document.querySelector('#headerShoppingCartCount');
  userInfoName.textContent = user.name;
  userInfoEmail.textContent = user.email;

  // orders table
  const tbody = document.querySelector("#orderTable tbody");
  tbody.innerHTML = ""; 

  // products arr
  const products = await getData("https://634e9f834af5fdff3a625f84.mockapi.io/products");
  if (!products) return;
  
  headerShoppingCartCount.textContent = user.shoppingCart.length;
  
  const ordersWithDetails = user.orders.map(order => {
    const product = products.find(p => p.id === order.id);
    if (!product) return null;

    return {
      ...product,
      quantity: Number(order.quantity || 1)
    };
  }) 

  if (ordersWithDetails.length > 0) {
    createTableOrders(ordersWithDetails, tbody);
  }

  deleteBtn.addEventListener('click', async e =>deleteAcc())

  headerLogout.addEventListener('click', async e =>logOut(user))
});
