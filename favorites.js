/*
==========================================================
Coffee House Mini App

favorites.js

Логика избранных товаров
==========================================================
*/


const STORAGE_KEY = "coffee_favorites";





/*
Получить избранные товары
*/


export function getFavorites(){


    const saved = localStorage.getItem(STORAGE_KEY);



    if(!saved){

        return [];

    }



    return JSON.parse(saved);


}







/*
Проверка:
есть ли товар в избранном
*/


export function isFavorite(productId){


    const favorites = getFavorites();



    return favorites.includes(productId);



}








/*
Добавить товар в избранное
*/


export function addFavorite(productId){


    const favorites = getFavorites();



    if(

        !favorites.includes(productId)

    ){


        favorites.push(productId);


    }



    saveFavorites(favorites);



}








/*
Удалить из избранного
*/


export function removeFavorite(productId){


    let favorites = getFavorites();



    favorites = favorites.filter(

        id => id !== productId

    );



    saveFavorites(favorites);



}








/*
Переключатель состояния

Используется кнопкой ❤️
*/


export function toggleFavorite(productId){


    if(

        isFavorite(productId)

    ){


        removeFavorite(productId);



        return false;


    }


    else{


        addFavorite(productId);



        return true;


    }



}








/*
Сохранение
*/


function saveFavorites(data){


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );


}








/*
Очистка избранного

Можно использовать позже
*/


export function clearFavorites(){


    localStorage.removeItem(

        STORAGE_KEY

    );


}