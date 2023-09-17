import { drawProducts } from "./drawProducts.js";
import { params } from "./variable.js";


// Hien thi danh sach san pham
drawProducts()
// Het Hien thi danh sach san pham

// Tim kiem san pham
const inputSearch = document.querySelector("#search input");
const buttonSearch = document.querySelector("#search button");

const search = () => {
    const value = inputSearch.value;
    params.q = value;
    drawProducts();
}

buttonSearch.addEventListener("click", () => {
    search();
});

inputSearch.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        search();
    }
})
// Het Tim kiem san pham

// Phan trang san pham
const paginationPrev = document.querySelector("#pagination-prev");
const paginationNumber = document.querySelector("#pagination-number");
const paginationNext = document.querySelector("#pagination-next");

paginationNext.addEventListener("click", () => {
    params.page += 1;
    paginationNumber.innerHTML = params.page;
    drawProducts();
})

paginationPrev.addEventListener("click", () => {
    if(params.page > 1){
        params.page -= 1;
        paginationNumber.innerHTML = params.page;
        drawProducts();
    }
})
// Het Phan trang san pham

// Sap xep san pham
const filter = document.querySelector("#filter");
filter.addEventListener("change", (e) => {
    const value = e.target.value;
    switch (value) {
        case "normal":
            params.sort = "";
            params.order = "";
            break;
        case "price-asc":
            params.sort = "price";
            params.order = "asc";
            break;
        case "price-desc":
            params.sort = "price";
            params.order = "desc";
            break;
        case "discount-desc":
            params.sort = "discountPercentage";
            params.order = "desc";
            break;
        default:
            break;
    }
    drawProducts();
}); 
// Het Sap xep san pham
