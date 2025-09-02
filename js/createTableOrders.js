
const createTableOrders = (orders, tbody) => {
  let totalSum = 0;

  orders.forEach(item => {
    const tr = document.createElement("tr");

    // TD: img
    const tdItem = document.createElement("td");
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item__info");

    const img = document.createElement("img");
    img.src = `images/products/${item.img || "default"}.png`;
    img.alt = item.title || "No title";
    img.height = 100;

    const divText = document.createElement("div");
    const p = document.createElement("p");
    p.classList.add("item__info--title");
    p.textContent = item.title || "No title";

    divText.appendChild(p);
    itemInfo.appendChild(img);
    itemInfo.appendChild(divText);
    tdItem.appendChild(itemInfo);
    tr.appendChild(tdItem);

    // TD: price
    const tdPrice = document.createElement("td");
    const price = Number(item.price || 0);
    tdPrice.textContent = `$${price.toFixed(2)}`;
    tr.appendChild(tdPrice);

    // TD: discount
    

    if(item.salePercent){
      const tdSale = document.createElement("td");
      const discountSpan = document.createElement('span');
      tdSale.appendChild(discountSpan);
      discountSpan.textContent = item.salePercent ? `- ${item.salePercent}%` : "-";
      discountSpan.classList.add('item__sale')
      tr.appendChild(tdSale);
    }else{
      const tdSale = document.createElement("td");
      tdSale.textContent = item.salePercent ? `- ${item.salePercent}%` : "-";
      tr.appendChild(tdSale);
    }



    // TD: quantity
    const tdQuantity = document.createElement("td");
    const quantity = Number(item.quantity || 1);
    tdQuantity.textContent = quantity;
    tr.appendChild(tdQuantity);

    // TD: total
    const tdTotal = document.createElement("td");
    const total = price * quantity * (1 - (item.salePercent || 0)/100);
    tdTotal.textContent = `$${total.toFixed(2)}`;
    totalSum += total;
    tr.appendChild(tdTotal);

    tbody.appendChild(tr);
  });

  // total
  const trSum = document.createElement("tr");
  const tdLabel = document.createElement("td");
  tdLabel.colSpan = 4;
  tdLabel.style.textAlign = "right";
  tdLabel.textContent = "Total:";

  const tdSum = document.createElement("td");
  tdSum.textContent = `$${totalSum.toFixed(2)}`;

  trSum.appendChild(tdLabel);
  trSum.appendChild(tdSum);
  tbody.appendChild(trSum);
};

export default createTableOrders;
