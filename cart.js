/*
==========================================================
Coffee House Mini App

cart.js

Логика корзины
==========================================================
*/


import { 

    getProduct 

} from "./products.js";





const STORAGE_KEY = "coffee_cart";





/*
Получить корзину
*/


export function getCart(){


    const saved = 

        localStorage.getItem(

            STORAGE_KEY

        );



    if(!saved){

        return [];

    }



    return JSON.parse(saved);



}







/*
Сохранить корзину
*/


function saveCart(cart){


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(cart)

    );


}









/*
Добавление товара
*/


export function addToCart(productId){



    let cart = getCart();




    const item = cart.find(

        product =>

            product.id === productId

    );





    if(item){


        item.quantity++;


    }

    else{


        cart.push({

            id:productId,

            quantity:1

        });


    }




    saveCart(cart);



    updateCartEvent();



}









/*
Изменение количества
*/


export function changeQuantity(

    productId,

    amount

){



    let cart = getCart();




    const item = cart.find(

        product =>

            product.id === productId

    );




    if(!item)

        return;





    item.quantity += amount;






    if(item.quantity <= 0){



        cart = cart.filter(

            product =>

                product.id !== productId

        );



    }





    saveCart(cart);



    updateCartEvent();



}








/*
Удаление товара
*/


export function removeFromCart(productId){



    let cart = getCart();



    cart = cart.filter(

        item =>

            item.id !== productId

    );



    saveCart(cart);



    updateCartEvent();



}








/*
Очистка корзины
*/


export function clearCart(){



    localStorage.removeItem(

        STORAGE_KEY

    );



    updateCartEvent();



}








/*
Количество товаров
*/


export function getCartCount(){


    return getCart()

        .reduce(

            (sum,item)=>

                sum + item.quantity,

            0

        );


}








/*
Общая стоимость
*/


export function getCartTotal(){


    return getCart()

        .reduce(

            (sum,item)=>{


                const product =

                    getProduct(item.id);



                if(!product)

                    return sum;



                return (

                    sum +

                    product.price *

                    item.quantity

                );



            },

            0

        );


}









/*
Получение расширенной корзины

Для отображения


id + данные товара
*/


export function getDetailedCart(){



    return getCart()

        .map(item => {



            const product =

                getProduct(item.id);



            return {


                ...product,


                quantity:

                    item.quantity



            };



        });



}








/*
Событие обновления

Чтобы UI обновлялся автоматически
*/


function updateCartEvent(){



    document.dispatchEvent(

        new CustomEvent(

            "cart-updated"

        )

    );



}








/*
Первичное подключение

Добавление из карточек
*/


document.addEventListener(

    "add-to-cart",

    event => {



        addToCart(

            event.detail

        );



    }

);