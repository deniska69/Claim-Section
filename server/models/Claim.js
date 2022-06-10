//Импортируем схему и модель из пакета mongoose
const { Schema, model, ObjectId } = require("mongoose")

//Создаём схему, в которой будет храниться информация о полях сущности Claims (претензии)
const Claims = new Schema({

    //id - создаются по умолчанию автоматически
    
    //Дата добавления претензии на сайт (тип: дата)
    date_add: { type: Date },

    //ФИО автора претензии (тип: строка)
    fio: { type: String },

    //Лицевой счёт (тип: строка)
    personal_account: { type: String },

    //Текст претензии (тип: строка)
    text: { type: String },

    //Статус претензии (тип: строка)
    status: { type: String },

    //Примечание  (тип: строка)
    note: { type: String },

    //Email  (тип: строка)
    email: { type: String },

    //Вложение (тип: строка)
    attachment: {type: String}
    
})

//Экспорт схемы
module.exports = model('Claims', Claims)