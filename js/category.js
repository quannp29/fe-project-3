import { fetchApi } from "./fetchApi.js";
import { params } from "./variable.js";
import { drawProducts } from "./drawProducts.js";
import { API_CATEGORY } from "./constant.js";

// Hien thi danh sach danh muc
const elementCategory = document.querySelector("#category");

fetchApi(API_CATEGORY)
    .then(data => {
        console.log(data);
        let arrHTML = data.map(item => {
            return `
                <div class="category-item" data-category="${item}">
                    ${item}
                </div>
            `;
        });
        elementCategory.innerHTML = arrHTML.join("");
        const categoryList = document.querySelectorAll(".category-item");
        categoryList.forEach(item => {
            item.addEventListener("click", () => {
                const value = item.getAttribute("data-category");
                params.category = value;
                drawProducts();
            })
        })
    })
// Het Hien thi danh sach danh muc