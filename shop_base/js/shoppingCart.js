 import { getUser } from "./getUser.js";
import getData from "./getData.js";
import logOut from "./logOut.js";

document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.querySelector('#shoppingCartTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    const user = getUser();
    if (!user) return;

    // header
    const headerUser = document.querySelector('#headerUser');
    headerUser.textContent = user.name;
    headerUser.setAttribute('href', './account.html');
    const headerLogout = document.querySelector('#headerLogout');
    headerLogout.style.display = 'block';

    const headerShoppingCartCount = document.querySelector('#headerShoppingCartCount');
    headerShoppingCartCount.textContent = user.shoppingCart?.length || 0;


    const APIproduct = "https://634e9f834af5fdff3a625f84.mockapi.io/products";
    const products = await getData(APIproduct);

    const orderSummaryTotal = document.querySelector('#orderSummaryTotal');

    // total amnt
    const updateOrderTotal = () => {
        const total = user.shoppingCart.reduce((sum, cartItem) => {
            const prod = products.find(p => p.id === cartItem.id);
            if (!prod) return sum;
            return sum + (prod.salePercent 
                ? Math.round(prod.price * cartItem.count * (1 - prod.salePercent / 100))
                : prod.price * cartItem.count);
        }, 0);
        orderSummaryTotal.textContent = `$${total}`;
    };

    user.shoppingCart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const tr = document.createElement('tr');

        const price = product.price;
        const totalPrice = product.salePercent ? Math.round(price * item.count * (1 - product.salePercent / 100)) : price * item.count;

        tr.innerHTML = `
            <td>
                <div class="item__info">
                    <img src="images/products/${product.img || "default"}.png" alt="${product.title}" height="100"/>
                    <div>
                        <p class="item__info--title">${product.title}</p>
                    </div>
                </div>
            </td>
            <td>$${price}</td>
            <td><span class="item__sale">${product.salePercent ? '-' + product.salePercent + '%' : '-'}</span></td>
            <td><input type="number" value="${item.count}" min="1" /></td>
            <td class="item__total">$${totalPrice}</td>
            <td>
                <button class="item__remove">
                    <img src="images/delete.png" alt="delete" height="20" />
                </button>
            </td>
        `;

        const input = tr.querySelector('input');
        const totalCell = tr.querySelector('.item__total');

        // change quantity
        input.addEventListener('input', () => {
            let count = parseInt(input.value) || 1;
            item.count = count;

            const newTotal = product.salePercent ? Math.round(price * count * (1 - product.salePercent / 100)) : price * count;
            totalCell.textContent = `$${newTotal}`;
            localStorage.setItem('user', JSON.stringify(user));

            updateOrderTotal();
        });

        // remove
        const buttonRemove = tr.querySelector('.item__remove');
        buttonRemove.addEventListener('click', () => {
            tr.remove();

            user.shoppingCart = user.shoppingCart.filter(p => p.id !== item.id);
            localStorage.setItem('user', JSON.stringify(user));

            headerShoppingCartCount.textContent = user.shoppingCart.length;

            updateOrderTotal();
        });

        tableBody.appendChild(tr);
    });


    updateOrderTotal();
    const orderForm = document.querySelector('#orderSummary');
    const APIusers = "https://634e9f834af5fdff3a625f84.mockapi.io/users";

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            orders: [...(user.orders || []), ...(user.shoppingCart || [])],
            shoppingCart: []
        };

        try {
            await fetch(`${APIusers}/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser)
            });

            localStorage.setItem("user", JSON.stringify(updatedUser));

            window.location.href = "account.html";
        } catch (error) {
            console.error("Error:", error);
        }
    })

    headerLogout.addEventListener('click', async e =>logOut(user))
});
