"use strict";

class App {
	static async run() {
		const products = await APIService.fetchProducts();
		console.log(products);

		HomePage.renderProducts(products);
	}
}

class APIService {
	static STORE_BASE_URL = "https://fakestoreapi.com";
	static async fetchProducts() {
		const url = APIService._constructUrl("products");
		const res = await fetch(url);
		const data = await res.json();
		return data.map((product) => new Product(product));
	}
	static async fetchProduct(productId) {
		const url = APIService._constructUrl(`products/${productId}`);
		const res = await fetch(url);
		const data = await res.json();
		return new Product(data);
	}
	static _constructUrl(path) {
		return `${APIService.STORE_BASE_URL}/${path}`;
	}
}

class HomePage {
	static container = document.querySelector("body");

	static renderProducts(products) {
		this.container.classList.add("bg-gray-100", "p-6");

		const gridDiv = document.createElement("div");

		gridDiv.classList.add(
			"container",
			"mx-auto",
			"px-4",
			"grid",
			"grid-cols-1",
			"sm:grid-cols-2",
			"md:grid-cols-3",
			"lg:grid-cols-3",
			"gap-6",
			"mt-5"
		);

		products.forEach((product) => {
			const productDiv = document.createElement("div");
      productDiv.id = product.id;
			productDiv.classList.add(
				"bg-gradient-to-br",
				"from-blue-50",
				"to-blue-100",
				"border-2",
				"border-blue-200",
				"rounded-xl",
				"shadow-lg",
				"overflow-hidden",
				"transition-all",
				"duration-400",
				"hover:shadow-2xl",
				"hover:scale-105",
				"flex",
				"flex-col",
				"justify-between",
				"h-full"
			);

			productDiv.innerHTML = `
        <div class="grid grid-cols-1 gap-4 h-full">
          <div class="relative p-4 rounded-lg bg-gradient-to-b from-gray-100 to-gray-200">
            <img 
              class="w-full p-3 object-cover rounded-lg mx-auto transform transition-transform duration-300 hover:scale-110 shadow-md border border-blue-300" src="${product.image}" alt="${product.title} poster" style="height: 270px; object-fit: contain; max-width: 272px;">
            <div class="absolute top-2 left-2 bg-yellow-400 text-yellow-800 text-xs font-bold rounded-full px-2 py-1 shadow-md">
              New
            </div>
          </div>
          <div class="flex-grow bg-white bg-opacity-80 px-4 py-4 flex flex-col justify-between rounded-lg">
            <div>
              <h3 class="text-lg font-semibold mb-1 text-blue-700">${product.title}</h3>
              <p class="text-gray-500 italic">${product.category}</p>
              <p class="text-gray-600">${product.rating} / 5 (${product.count})</p>
            </div>
            <p class="text-2xl font-extrabold text-blue-800 mt-1">$ ${product.price}</p>
          </div>
          <div class="flex items-center justify-center mt-3">
            <button class="min-w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold py-3 px-4 rounded shadow-md transform transition-transform duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700 add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      `;

			productDiv.addEventListener("click", () => {
				Products.run(product);
			});
			gridDiv.appendChild(productDiv);
		});

		this.container.appendChild(gridDiv);
	}
}

class Products {
	static async run(product) {
		const productDetails = await APIService.fetchProduct(product.id);
		ProductPage.renderProduct(productDetails);
	}
}

class ProductPage {
	static container = document.querySelector("body");
	static renderProduct(product) {
		ProductPage.container.innerHTML = `
      <div>
        ${product.title}
      </div>`;
	}
}

class Product {
	constructor(json) {
		this.id = json.id;
		this.title = json.title;
		this.image = json.image;
		this.price = json.price;
		this.category = json.category;
		this.description = json.description;
		this.rating = json.rating.rate;
		this.count = json.rating.count;
	}
}

document.addEventListener("DOMContentLoaded", App.run);
