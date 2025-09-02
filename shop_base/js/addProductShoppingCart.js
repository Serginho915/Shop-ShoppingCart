export const addShoppingCart = (arr) => {
  const cartButtons = document.querySelectorAll(".product__cart");

  cartButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      
      const user = JSON.parse(localStorage.getItem("user")) || { shoppingCart: [] };

      const productId = btn.closest(".product").dataset.id;

      
      const existingIndex = user.shoppingCart.findIndex(p => p.id === productId);

      if (existingIndex === -1) {
        
        user.shoppingCart.push({ id: productId, count: 1 });
        btn.classList.add("product__cart--in");
      } else {
        
        user.shoppingCart.splice(existingIndex, 1);
        btn.classList.remove("product__cart--in");
      }

      
      localStorage.setItem("user", JSON.stringify(user));

      
      const headerShoppingCartCount = document.querySelector("#headerShoppingCartCount");
      headerShoppingCartCount.textContent = user.shoppingCart.length;
    });
  });
};
