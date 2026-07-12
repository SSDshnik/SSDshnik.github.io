/*
==========================================================
Coffee House Mini App

app.js

Главная логика интерфейса
==========================================================
*/


import {

    products,

    getCategories

} from "./products.js";



import {

    toggleFavorite,

    isFavorite

} from "./favorites.js";





/*
DOM
*/


const productsContainer =
    document.querySelector("#products");


const categoriesContainer =
    document.querySelector("#categories");


const searchInput =
    document.querySelector("#search");



const modal =
    document.querySelector("#productModal");


const modalImage =
    document.querySelector("#modalImage");


const modalTitle =
    document.querySelector("#modalTitle");


const modalComposition =
    document.querySelector("#modalComposition");



const closeModal =
    document.querySelector("#closeModal");





let currentCategory = "Все";

let searchValue = "";







/*
===========================
Инициализация
===========================
*/


function init(){


    renderCategories();


    renderProducts(products);


    setupEvents();


}





/*
===========================
Категории
===========================
*/


function renderCategories(){


    const categories = getCategories();



    categoriesContainer.innerHTML = "";



    categories.forEach(category => {



        const button =
            document.createElement("button");



        button.className =
            "category";



        if(category === "Все"){

            button.classList.add("active");

        }



        button.textContent =
            category;




        button.onclick = () => {



            document
                .querySelectorAll(".category")
                .forEach(btn =>
                    btn.classList.remove("active")
                );



            button.classList.add("active");



            currentCategory =
                category;



            renderProducts(

                getFilteredProducts()

            );



        };



        categoriesContainer.append(button);



    });



}








/*
===========================
Фильтрация
===========================
*/


function getFilteredProducts(){


    return products.filter(product => {



        const categoryMatch =

            currentCategory === "Все"

            ||

            product.category === currentCategory;



        const searchMatch =

            product.name

            .toLowerCase()

            .includes(

                searchValue.toLowerCase()

            );



        return (

            categoryMatch

            &&

            searchMatch

        );



    });



}








/*
===========================
Карточки товаров
===========================
*/


function renderProducts(items){


    productsContainer.innerHTML = "";



    if(items.length === 0){


        productsContainer.innerHTML = `

            <div class="empty">

                <h3>
                    Ничего не найдено
                </h3>

                <p>
                    Попробуйте изменить запрос
                </p>

            </div>

        `;



        return;


    }






    items.forEach(product => {



        const card =
            document.createElement("article");



        card.className =
            "product-card";



        const favorite =
            isFavorite(product.id);





        card.innerHTML = `


        <div class="product-image">


            <img
                src="${product.image}"
                alt="${product.name}"
            >



            <button
                class="favorite-btn ${favorite ? "active" : ""}"
                data-id="${product.id}"
            >

                ${favorite ? "❤️" : "🤍"}

            </button>




            <div class="product-rating">

                ⭐ ${product.rating}

            </div>



        </div>





        <div class="product-content">


            <h3 class="product-title">

                ${product.name}

            </h3>




            <p class="product-description">

                ${product.description}

            </p>




            <div class="product-price">


                <span class="price">

                    ${product.price} ₽

                </span>


            </div>




            <button

                class="composition-btn"

                data-composition="${product.id}"

            >

                Состав

            </button>




            <button

                class="add-button"

                data-add="${product.id}"

            >

                Добавить

            </button>



        </div>


        `;



        productsContainer.append(card);



    });



}









/*
===========================
События
===========================
*/


function setupEvents(){





    /*
    Поиск
    */


    searchInput.addEventListener(

        "input",

        event => {


            searchValue =
                event.target.value;



            renderProducts(

                getFilteredProducts()

            );


        }

    );









    /*
    Избранное
    */


    productsContainer.addEventListener(

        "click",

        event => {



            const favoriteButton =

                event.target.closest(
                    ".favorite-btn"
                );



            if(favoriteButton){



                const id =
                    Number(

                        favoriteButton.dataset.id

                    );



                const state =
                    toggleFavorite(id);



                favoriteButton.classList.toggle(

                    "active",

                    state

                );



                favoriteButton.textContent =

                    state

                    ? "❤️"

                    : "🤍";



            }








            /*
            Состав
            */


            const compositionButton =

                event.target.closest(

                    "[data-composition]"

                );



            if(compositionButton){


                const id =
                    Number(

                        compositionButton.dataset.composition

                    );



                openModal(id);


            }







            /*
            Добавить в корзину

            Временно вызываем событие

            Корзину подключим следующим файлом

            */


            const addButton =

                event.target.closest(

                    "[data-add]"

                );



            if(addButton){



                const id =

                    Number(

                        addButton.dataset.add

                    );



                document.dispatchEvent(

                    new CustomEvent(

                        "add-to-cart",

                        {

                            detail:id

                        }

                    )

                );



            }



        }

    );



}









/*
===========================
MODAL
===========================
*/


function openModal(id){


    const product =

        products.find(

            item => item.id === id

        );



    if(!product)

        return;




    modalImage.src =
        product.image;



    modalTitle.textContent =
        product.name;



    modalComposition.innerHTML =
        product.composition;



    modal.classList.add(

        "active"

    );



}






closeModal.onclick = () => {


    modal.classList.remove(

        "active"

    );


};






modal.onclick = event => {


    if(

        event.target === modal

    ){


        modal.classList.remove(

            "active"

        );


    }


};








/*
Запуск
*/


init();