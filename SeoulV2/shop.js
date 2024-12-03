async function getResponce() {
    let response = await fetch("shop.json"); // Запрос для получения данных, код дожидается окончания запроса до перехода к следующей строке
    let content = await response.text(); // Извлекается текст
    content = JSON.parse(content); // Объект становится массивом, а не списком

    // Сохранение товаров для дальнейшего фильтрации
    const allProducts = content;

    // Функция для отображения товаров
    function displayProducts(products) {
        let node_for_insert = document.getElementById("node_for_insert"); // Ищет строку с таким id
        node_for_insert.innerHTML = ""; // Очищает текущий список товаров
        products.forEach((product) => { // Создает html код каждой карточки и возвращает
            node_for_insert.innerHTML += `
<li style="width: 210px" class="d-flex flex-column m-1 p-1 border bg-body"> 
    <img style="width: 180px" class="align-self-center" src="${product.img}" alt="${product.name}">
    <h5 class="card-title">${product.name}</h5>
    <p class="product-description">${product.description}</p> <!-- Описание товара -->
    <p class="product-price">Цена: ${product.price} р.</p> <!-- Цена товара -->
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

    searchButton.addEventListener("click", () => { // При нажатии на кнопку выполнится код
        const query = searchInput.value.toLowerCase().trim(); // Получает текст пользователя, приводят к нижнему регистру и удаляет пробелы
        const filteredProducts = allProducts.filter(product =>  // Создание отфильтрованного массива, проверяет, чтобы товар содержал слова, введенные пользователем
            product.name.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts); // Отображаем только найденные товары
    });

}

getResponce();
