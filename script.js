const fetchApi = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

const genCategory = async (api) => {
    const data = await fetchApi(api);
    const category = document.getElementById("category");
    const newArr = data.map(it => {
        return `
            <div class="inner-box">${it}</div>
        `;
    });

    const htmls = newArr.join("");
    category.innerHTML = htmls;
}

const genProduct = async (api) => {
    const data = await fetchApi(api);
    const newArr = data.map(it => {
        return `
            <div class="product-item">
                <div class="inner-item">
                    <div class="inner-image">
                        <img src="${it.thumbnail}" alt="${it.title}">
                    </div>
                    <div class="inner-info">
                        <div class="inner-title">${it.title}</div>
                        <div class="inner-content">
                            <div class="inner-price">${it.price}$</div>
                            <div class="inner-stock">Còn lại: ${it.stock}</div>
                        </div>
                    </div>
                    <div class="inner-discount">${Math.round(it.discountPercentage)}%</div>
                </div>
            </div>
        `;
    })

    const htmls = newArr.join("");
    const products = document.getElementById("products");
    products.innerHTML = htmls;
}

const drawProduct = async () => {
    await genCategory("http://localhost:3000/category");
    const categoryBox = document.querySelectorAll(".inner-box");
    await genProduct("http://localhost:3000/products");
    for(it of categoryBox) {
        it.addEventListener("click", async (event) => {
            // console.log(event.currentTarget.textContent);
            for(item of categoryBox) item.classList.remove("active");
            event.currentTarget.classList.add("active");
            document.getElementById("filter").value = "op1";
            await genProduct(`http://localhost:3000/products?category=${event.currentTarget.textContent}`);
        })
    }
}

drawProduct();

// Button Search
const btnSearch = document.querySelector("#btnSearch");
const inputSearch = document.querySelector(".search input");
btnSearch.addEventListener("click", () => {
    const categoryBox = document.querySelectorAll(".inner-box");
    for(it of categoryBox) it.classList.remove("active");
    document.getElementById("filter").value = "op1";
    const inputContent = inputSearch.value;
    inputSearch.value = "";
    if(inputContent == "") {
        genProduct("http://localhost:3000/products");
    }
    else {
        genProduct(`http://localhost:3000/products?q=${inputContent}`);
    }
})

// Filter
const filter = document.getElementById("filter");
filter.addEventListener("change", async (event) => {
    const status = event.currentTarget.value;
    const catActive = document.querySelector(".active");
    let criteria = "";
    if(status === "op1") {
        criteria = "?";
    }
    else if(status === "op2") {
        criteria = "?_sort=price&_order=asc";
    }
    else if(status === "op3") {
        criteria = "?_sort=price&_order=desc";
    }
    else if(status === "op4") {
        criteria = "?_sort=discountPercentage&_order=desc";
    }
    if(catActive == null) {
        await genProduct(`http://localhost:3000/products${criteria}`);
    }
    else {
        // console.log(catActive);
        await genProduct(`http://localhost:3000/products${criteria}&category=${catActive.innerText}`);
    }
})