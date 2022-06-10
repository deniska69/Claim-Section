//Импортируем модули с соответсвующим названиями для удобной работы
const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const corsMiddleware = require('./middleware/cors.middleware')

//Из Експресса создаём сервер
const app = express()

//Получение из файла настроек номер порта, на котором будет запущен сервер
const PORT = config.get('serverPort')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

//Функция для подключения к базе данных и запуска сервера
const start = async () => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
        //Получаем ссылку подключения к БД из файла настроек
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        //Выводим в лог сообщение об успешном запуске сервера
        app.listen(PORT, () => {
            console.log('Сервер запущен на порту: ', PORT)
        })
    } catch (e) {

    }
}

//Вызов функции запуска сервера
start()