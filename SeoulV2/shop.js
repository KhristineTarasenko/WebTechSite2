async function getResponce() {
    let response = await fetch("shop.json");
    let content = await response.text();
    content = JSON.parse(content);

    // Сохраним товары в массив для дальнейшего фильтрации
    const allProducts = content;

    // Функция для отображения товаров
    function displayProducts(products) {
        let node_for_insert = document.getElementById("node_for_insert");
        node_for_insert.innerHTML = ""; // Очищаем текущий список товаров
        products.forEach((product) => {
            node_for_insert.innerHTML += `
            <li style="width: 210px" class="d-flex flex-column m-1 p-1 border bg-body">
                <img style="width: 180px" class="align-self-center" src="${product.img}" alt="${product.name}">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}. Цена ${product.price} р.</p>
                <input type="hidden" name="vendor_code" value="${product.vendor_code}">
                <p class="card-text">Заказать <input class="w-25" type="number" name="amount" value="0"></p>
            </li>
            `;
        });
    }

    // Отображаем все товары при загрузке страницы
    displayProducts(allProducts);

    // Логика поиска
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();
        const filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts); // Отображаем только найденные товары
    });

    // Обновляем список товаров при нажатии Enter в поле ввода
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.toLowerCase().trim();
            const filteredProducts = allProducts.filter(product => 
                product.name.toLowerCase().includes(query)
            );
            displayProducts(filteredProducts); // Отображаем только найденные товары
        }
    });
}

getResponce();