window.onload = function () {
    getProducts();
    getUserCart();
    const token = localStorage.getItem("data")
    document.getElementById('loginUser').innerText = token.split(",")[0];

    document.getElementById('logoutButton').addEventListener('click', function (event) {
        window.location.href = 'login.html';
    });
}

async function getProducts() {
    let products = await fetch('http://localhost:3000/products/').then(response => response.json());
    renderProduct(products)
}

async function placeOrder() {
    const token = localStorage.getItem("data")
    await fetch('http://localhost:3000/shoppingCart/order/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `${token}`
        }
    })
    getProducts();
    let text = document.createElement('h4');
    text.textContent = "There is no item in your shopping cart !"
    text.classList.add('head')
    let container = document.getElementById('myCart');
    container.innerHTML = '';
    container.appendChild(text);
}

async function getUserCart() {
    const token = localStorage.getItem("data")
    let result = await fetch('http://localhost:3000/shoppingCart/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `${token}`
        }
    }).then(res => {
        return res.json();
    })

    if (result.length > 0) {
        renderCart(result)
    } else {
        let text = document.createElement('h4');
        text.textContent = "There is no item in your shopping cart !"
        text.classList.add('head')
        let container = document.getElementById('myCart');
        container.innerHTML = '';
        container.appendChild(text);
    }

}

async function addToCart(id) {
    const token = localStorage.getItem("data")
    let result = await fetch('http://localhost:3000/shoppingCart/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({
            productid: id
        })
    }).then(res => {
        return res.json();
    })
    renderCart(result)
}

async function removeProduct(id) {
    const token = localStorage.getItem("data")
    let result = await fetch('http://localhost:3000/shoppingCart/', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({
            productid: id
        })
    }).then(res => {
        return res.json();
    })

    if (result.length > 0) {
        renderCart(result)
    } else {
        let text = document.createElement('h4');
        text.textContent = "There is no item in your shopping cart !"
        text.classList.add('head')
        let container = document.getElementById('myCart');
        container.innerHTML = '';
        container.appendChild(text);
    }
}

function renderCart(products) {
    let table = document.createElement('table');
    table.classList.add('table', 'table-bordered');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let headers = ['Name', 'Price', 'Total', 'Quantity'];
    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.classList.add('text-center');
        th.textContent = headerText;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    let tbody = document.createElement('tbody');

    let total_amount = 0;
    products.forEach(product => {
        let tr = document.createElement('tr');
        tr.setAttribute('data-product-id', product.id);

        let nameTd = document.createElement('td');
        nameTd.textContent = product.name;
        tr.appendChild(nameTd);

        let priceTd = document.createElement('td');
        priceTd.textContent = product.price;
        tr.appendChild(priceTd);

        let total = document.createElement('td');
        total.textContent = (product.price * product.quantity).toFixed(2);
        total_amount += product.price * product.quantity;
        tr.appendChild(total);

        let quantity = document.createElement('td');
        quantity.classList.add("column");

        let quantityContainer = document.createElement('div');
        quantityContainer.classList.add('d-flex');

        let minus = document.createElement('button');
        minus.textContent = '-';
        minus.classList.add('p-0');
        minus.onclick = () => { removeProduct(product.id) };
        let count = document.createElement('p');
        count.textContent = product.quantity;
        count.classList.add('head');
        let plus = document.createElement('button');
        plus.textContent = '+';
        plus.classList.add('p-0');
        plus.onclick = () => { addToCart(product.id) };

        quantityContainer.appendChild(minus);
        quantityContainer.appendChild(count);
        quantityContainer.appendChild(plus);
        quantity.appendChild(quantityContainer);
        tr.appendChild(quantity);

        tbody.appendChild(tr);
    });

    let ttr = document.createElement('tr');
    let total_line = document.createElement('td');
    total_line.colSpan = 4;
    total_line.textContent = "Total: " + total_amount.toFixed(2);
    total_line.style.textAlign = "right";
    total_line.style.marginLeft = "300px";
    ttr.appendChild(total_line);
    tbody.appendChild(ttr);

    table.appendChild(tbody);
    let container = document.getElementById('myCart');
    container.innerHTML = '';
    container.appendChild(table);
    let submit_btn = document.createElement('button');
    let submit_div = document.createElement('div');
    submit_btn.textContent = "Place order"
    submit_btn.classList.add('ms-auto')
    submit_btn.onclick = () => { placeOrder() };
    submit_div.appendChild(submit_btn)
    container.appendChild(submit_div)
}

function renderProduct(prod) {
    let table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    let thead = document.createElement('thead');
    let tr = document.createElement('tr');

    let headers = ['Name', 'Price', 'Image', 'Stock', 'Actions'];
    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.classList.add('text-center');
        th.textContent = headerText;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');
    prod.forEach(product => {
        let tr = document.createElement('tr');

        let nameTd = document.createElement('td');
        nameTd.textContent = product.name;
        tr.appendChild(nameTd);

        let priceTd = document.createElement('td');
        priceTd.textContent = product.price;
        tr.appendChild(priceTd);

        let imageTd = document.createElement('td');
        let image = document.createElement('img');
        image.src = `./logos/${product.img}`;
        image.alt = product.name;
        image.height = 30;
        image.classList.add('logo-img');
        imageTd.appendChild(image);
        tr.appendChild(imageTd);

        let stockTd = document.createElement('td');
        stockTd.textContent = product.stock;
        tr.appendChild(stockTd);

        let actionsTd = document.createElement('td');
        let button = document.createElement('button');

        let logo = document.createElement('img');
        logo.src = `./logos/shoppingcart_logo.jpg`
        logo.alt = 'Add to Cart';
        logo.width = 30;
        button.appendChild(logo);
        button.onclick = () => {
            addToCart(product.id);
        };
        let icon = document.createElement('i');
        icon.classList.add('fa', 'fa-shopping-cart');
        button.appendChild(icon);
        actionsTd.appendChild(button);
        tr.appendChild(actionsTd);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    let container = document.getElementById('productTable');
    container.innerHTML = '';
    container.appendChild(table);
}