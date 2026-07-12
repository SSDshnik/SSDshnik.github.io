/*
==========================================================
Coffee House Mini App

products.js

Локальные данные товаров.
Позже можно заменить на API.
==========================================================
*/


export const products = [

    {
        id: 1,

        name: "Капучино",

        category: "Кофе",

        price: 290,

        rating: 4.9,

        emoji: "☕",

        description:
            "Классический итальянский кофе с нежной молочной пенкой",

        composition:
            `
            Эспрессо<br>
            Молоко 3.2%<br>
            Молочная пена<br>
            Арабика 100%
            `,

        volume:
            "250 мл"

    },


    {
        id: 2,

        name: "Латте",

        category: "Кофе",

        price: 340,

        rating: 4.8,

        emoji: "☕",

        description:
            "Мягкий кофейный напиток с большим количеством молока",

        composition:
            `
            Эспрессо<br>
            Взбитое молоко<br>
            Молочная пена<br>
            Арабика
            `,

        volume:
            "300 мл"

    },


    {
        id: 3,

        name: "Эспрессо",

        category: "Кофе",

        price: 190,

        rating: 4.9,

        emoji: "☕",

        description:
            "Насыщенный кофе с плотной кремовой пенкой",

        composition:
            `
            Кофейные зерна арабика<br>
            Вода<br>
            Обжарка medium
            `,

        volume:
            "60 мл"

    },


    {
        id: 4,

        name: "Чизкейк Нью-Йорк",

        category: "Десерты",

        price: 450,

        rating: 5.0,

        emoji: "🍰",

        description:
            "Нежный сливочный чизкейк с песочной основой",

        composition:
            `
            Сливочный сыр<br>
            Сливки<br>
            Яйца<br>
            Песочная основа<br>
            Ваниль
            `,

        weight:
            "120 г"

    },


    {
        id: 5,

        name: "Эклер ванильный",

        category: "Десерты",

        price: 320,

        rating: 4.7,

        emoji: "🥐",

        description:
            "Французский десерт с нежным кремом",

        composition:
            `
            Заварное тесто<br>
            Ванильный крем<br>
            Сливки<br>
            Глазурь
            `,

        weight:
            "90 г"

    }


];





/*
Получение товара по ID

Используется:
- корзиной
- избранным
- модальным окном
*/


export function getProduct(id){

    return products.find(

        product => product.id === id

    );

}





/*
Получение категорий

Используется для кнопок фильтра
*/


export function getCategories(){


    return [

        "Все",

        ...new Set(

            products.map(

                item => item.category

            )

        )

    ];


}