/*
==========================================================
Coffee House Mini App

ui.js

Визуальная логика интерфейса
==========================================================
*/


import {

    getDetailedCart,

    changeQuantity,

    getCartCount,

    getCartTotal,

    removeFromCart

} from "./cart.js";





/*
DOM
*/


const cartSheet =

    document.querySelector("#cartSheet");


const overlay =

    document.querySelector("#overlay");



const openCartButton =

    document.querySelector("#cartOpen");



const openCartBottom =

    document.querySelector("#openCartBottom");



const closeCartButton =

    document.querySelector("#closeCart");



const cartItems =

    document.querySelector("#cartItems");



const cartTotal =

    document.querySelector("#cartTotal");



const cartCount =

    document.querySelector("#cartCount");



const floatingCart =

    document.querySelector("#floatingCart");



const floatingTotal =

    document.querySelector("#floatingTotal");








/*
===========================
Открытие корзины
===========================
*/


function openCart(){


    cartSheet.classList.add(

        "open"

    );



    overlay.classList.add(

        "active"

    );


    document.body.style.overflow="hidden";


}








/*
Закрытие
*/


function closeCart(){


    cartSheet.classList.remove(

        "open"

    );



    overlay.classList.remove(

        "active"

    );


    document.body.style.overflow="";


}









/*
===========================
Отрисовка корзины
===========================
*/


function renderCart(){



    const cart =

        getDetailedCart();





    cartItems.innerHTML = "";






    if(cart.length === 0){



        cartItems.innerHTML = `


        <div class="empty">


            <h3>
                Корзина пуста
            </h3>


            <p>
                Добавьте любимый кофе
            </p>


        </div>


        `;


    }






    cart.forEach(product => {



        const item =

            document.createElement(

                "div"

            );



        item.className =

            "cart-item";





        item.innerHTML = `


        <div class="cart-item-info">


            <span class="cart-item-name">

                ${product.name}

            </span>



            <span class="cart-item-price">

                ${product.price} ₽

            </span>


        </div>




        <div class="quantity">


            <button

                data-minus="${product.id}"

            >

                −

            </button>



            <span>

                ${product.quantity}

            </span>



            <button

                data-plus="${product.id}"

            >

                +

            </button>


        </div>



        `;



        cartItems.append(item);



    });





    updateCartInfo();



}









/*
===========================
Обновление счетчиков
===========================
*/


function updateCartInfo(){


    const count =

        getCartCount();



    const total =

        getCartTotal();





    cartCount.textContent =

        count;





    cartTotal.textContent =

        total + " ₽";





    floatingTotal.textContent =

        total + " ₽";





    if(count > 0){



        floatingCart.classList.remove(

            "hidden"

        );



        setTimeout(()=>{


            floatingCart.classList.add(

                "show"

            );


        },10);



    }

    else {



        floatingCart.classList.remove(

            "show"

        );


        floatingCart.classList.add(

            "hidden"

        );



    }



}









/*
===========================
События
===========================
*/



openCartButton.onclick =

    openCart;



openCartBottom.onclick =

    openCart;



closeCartButton.onclick =

    closeCart;



overlay.onclick =

    closeCart;








/*
Кнопки внутри корзины
*/


cartItems.addEventListener(

    "click",

    event=>{


        const plus =

            event.target.dataset.plus;



        const minus =

            event.target.dataset.minus;




        if(plus){



            changeQuantity(

                Number(plus),

                1

            );



        }



        if(minus){



            changeQuantity(

                Number(minus),

                -1

            );



        }



    }

);








/*
Автообновление
*/


document.addEventListener(

    "cart-updated",

    ()=>{


        renderCart();


    }

);








/*
Первый запуск
*/


renderCart();