//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require('express');
const User = require('../models/User');
const Claim = require('../models/Claim');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

//POST-запрос по ссылке /login для авторизации
router.post(
  '/login',
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { email, password } = req.body;

      //Проверяем есть ли пользователь с такой эл.почтой
      const user = await User.findOne({ email });

      //Если пользователь не найден - выводим сообщение об ошибке
      if (!user) {
        return res.status(404).json({ message: `Пользователь с эл.почтой ${email} не найден.` });
      }
      //Проверяем пароль на корректность
      const isPassValid = bcrypt.compareSync(password, user.password);

      //Если пароль не верный - выводим сообщение об ошибке
      if (!isPassValid) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }

      //Получаем токен авторизации
      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

      //Выводим в логи сервера результат
      console.log('\nАвторизован пользователь:');
      console.log({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      //Возвращаем клиентской части сервера данные пользователя
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log('\nОшибка авторизации:\n', e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/login')." });
    }
  }
);

//GET-запрос по ссылке /auth для аутентификации пользователя
router.get(
  '/auth',
  authMiddleware,
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем id пользователя
      const user = await User.findOne({ _id: req.user.id });

      //Получаем токен пользователя
      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/auth')." });
    }
  }
);

//POST-запрос по ссылке /addClaim для добавления новых претензий
router.post(
  '/addClaim',

  [check('email', 'Некоректный Email.').isEmail()],

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Проверяем, нет ли ошибок в отправляемых полях
      const errors = validationResult(req);

      //В случае ошибки выводим сообщение об ошибке в консоль сервера и на сайт
      if (!errors.isEmpty()) {
        console.log('\nОшибка регистрации претензии:\n', errors.errors);
        return res.status(400).json({ message: 'Ошибка регистрации претензии. \nПроверьте поле Email на корректность заполнения.', errors });
      } else {
        //Выводим в логи сервера результат
        console.log('\nЗапрос на регистрацию новой претензии:');

        //Получаем значения отправленных полей
        const { date_add, fio, personal_account, text, status, note, attachment, email } = req.body;

        console.log({
          'Дата регистрации': date_add,
          'Ф.И.О.': fio,
          'Л/С': personal_account,
          'Текст претензии': text,
          Вложение: attachment,
          Email: email,
        });

        //Создаём в базе новую претензию
        const claim = new Claim({ date_add, fio, personal_account, text, status, note, attachment, email });

        //Сохранем претензию
        await claim.save();

        //Выводим в логи сервера результат успешной регистрации нового пользователя
        console.log('\nЗарегистрирована новая претензия:');
        console.log({
          ID: claim._id,
          'Дата регистрации': claim.date_add.toISOString(),
          'Ф.И.О.': claim.fio,
          'Л/С': claim.personal_account,
          'Текст претензии': claim.text,
          Вложение: claim.attachment,
          Email: claim.email,
        });

        //////////////////////////////////////////////////////////////////
        //Отправляем письмо автору претензии об регистрации претензии
        //////////////////////////////////////////////////////////////////

        // let transporter = nodemailer.createTransport({
        //     host: 'smtp.yandex.ru',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: "",
        //         pass: "",
        //     },
        // })

        // let result = await transporter.sendMail({
        //     from: '"Отдел претензий <otdel_pretenziy@sample.ru>',
        //     to: claim.email,
        //     subject: "Новая претензия",
        //     html:
        //         'Вы зарегистрировали новую претензию' +
        //         '<p>№ претензии: ' + claim._id + '</p>' +
        //         '<p>Ф.И.О.: ' + claim.fio + '</p>' +
        //         '<p>Л/С: ' + claim.personal_account + '</p>' +
        //         '<p>Email: ' + claim.email + '</p>' +
        //         "\nСтатус: " + claim.status +
        //         '<p>Текст претензии: ' + claim.text + '</p>' +
        //         '<a href=' + String(config.get("wwwUrl")) + "claimView/" + claim._id + ' target="_blank">Ссылка на отчет по претензии</a>'
        // })

        // console.log("\nСсылка на претензию отправлена почту автора: " + claim.email)

        //////////////////////////////////////////////////////////////////
        //Отправляем письмо администратору о регистрации новой претензии
        //////////////////////////////////////////////////////////////////

        // result = await transporter.sendMail({
        //     from: '"Отдел претензий <otdel_pretenziy@sample.ru>',
        //     to: "otdel_pretenziy@sample.ru",
        //     subject: "Поступила новая претензия",
        //     html:
        //         '<p>№ претензии: ' + claim._id + '</p>' +
        //         '<p>Ф.И.О.: ' + claim.fio + '</p>' +
        //         '<p>Л/С: ' + claim.personal_account + '</p>' +
        //         '<p>Email: ' + claim.email + '</p>' +
        //         '<p>Текст претензии: ' + claim.text + '</p>' +
        //         '<a href=' + String(config.get("wwwUrl")) + "claimView/" + claim._id + ' target="_blank">Ссылка на отчет по претензии</a>'
        // })

        // console.log("\nНа почту админстратора отправлено уведомление о поступлении новой претензии.")

        ////////////////////////////////////////////////////////////////////////////

        //Возвращаем клиентской части ID созданной претензии
        return res.json({ _id: claim._id });
      }

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log('\nОшибка регистрации новой претензии:\n', e);
      res.send({ message: "Ошибка сервера в auth.routes router.post('/addClaim')." });
    }
  }
);

//GET-запрос по ссылке /allClaims для получения всех записей претензий
router.get(
  '/allClaims',
  authMiddleware,

  //Выполнение асинхронной функции
  async (req, res) => {
    //Получаем значения отправленных полей
    let filter = req.query.filter;
    let claims = '';

    console.log(filter);

    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      if (filter == 'Все претензии') {
        //Получаем все записи претензий
        claims = await Claim.find();
      } else {
        console.log('тут');

        const status = { status: filter };

        //Получаем все записи претензий
        claims = await Claim.find({
          $or: [status],
        });
      }

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ claims });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/allClaims')." });
    }
  }
);

//PUT-запрос по ссылке /updateClaim для обновления записи одной претензии
router.put(
  '/updateClaim',

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id, note, status } = req.body;

      //Получаем из базы данных текущие данные претензии
      const claim = await Claim.findOne({ _id: _id });

      //Выводим в логи сервера результат
      console.log('\nЗапрос на обновление записи претензии: (ID: ' + claim.id + ')');
      console.log('\nТекущие данные:');
      console.log({
        'Дата регистрации': new Date(claim.date_add).toLocaleDateString(),
        'Ф.И.О': claim.fio,
        'Лицевой счёт': claim.personal_account,
        'Текст претензии': claim.text,
        'Статус претензии': claim.status,
        Примечание: claim.note,
        Вложение: claim.attachment,
      });
      console.log('\nНовые данные:');
      console.log({
        'Дата регистрации': new Date(claim.date_add).toLocaleDateString(),
        'Ф.И.О': claim.fio,
        'Лицевой счёт': claim.personal_account,
        'Текст претензии': claim.text,
        'Статус претензии': status,
        Примечание: note,
        Вложение: claim.attachment,
      });

      //Применяем новые значения и сохраняет претензию в базе данных
      claim.status = status;
      claim.note = note;
      await claim.save();

      //////////////////////////////////////////////////////////////////
      //Отправляем письмо автору претензии об изменении статуса
      //////////////////////////////////////////////////////////////////

      // let transporter = nodemailer.createTransport({
      //     host: 'smtp.yandex.ru',
      //     port: 465,
      //     secure: true,
      //     auth: {
      //         user: "otdel_pretenziy@sample.ru",
      //         pass: "",
      //     },
      // })

      // let result = await transporter.sendMail({
      //     from: '"Отдел претензий <otdel_pretenziy@sample.ru>',
      //     to: claim.email,
      //     subject: "Сменился статус вашей претензии",
      //     html:
      //         'Сменился статус поданной вами претензии' +
      //         '<p>№ претензии: ' + claim._id + '</p>' +
      //         '<p>Ф.И.О.: ' + claim.fio + '</p>' +
      //         '<p>Л/С: ' + claim.personal_account + '</p>' +
      //         '<p>Email: ' + claim.email + '</p>' +
      //         '<p>Новый статус: ' + claim.status + '</p>' +
      //         '<p>Текст претензии: ' + claim.text + '</p>' +
      //         '<p>----------------------------------------------------------------</p>' +
      //         '<p>Ответ на претензию: ' + claim.note + '</p>' +
      //         '<a href=' + String(config.get("wwwUrl")) + "claimView/" + claim._id + ' target="_blank">' + "http://localhost:3000/claimView/" + claim._id + '</a>'
      // })

      // console.log("\nАвтору претензии направленно уведомлении о смене статуса на эл.почту: " + claim.email)

      ////////////////////////////////////////////////////////////////////////////

      //Выводим сообщение об успешной регистрации в консоль сервера и на сайт
      console.log('\nДанные претензии обновленны.\n');
      return res.json({ message: 'Данные претензии обновленны.' });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log('\nОшибка обновления претензии:\n', e);
      res.send({ message: "Ошибка сервера в auth.routes router.put('/updateClaim')." });
    }
  }
);

//GET-запрос по ссылке /claimView для получения одной записи претензии
router.get(
  '/claimView',

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id } = req.query;

      //Получаем все записи претензий
      const claim = await Claim.findOne({ _id: _id });

      //Выводим в логи сервера результат успешной регистрации нового пользователя
      console.log('\nОткрыт отчёт просмотра претензии:');
      console.log({
        ID: claim._id,
        'Дата регистрации': claim.date_add.toISOString(),
        'Ф.И.О.': claim.fio,
        'Л/С': claim.personal_account,
        'Текст претензии': claim.text,
        Вложение: claim.attachment,
        Email: claim.email,
      });

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ claim });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/claimView')." });
    }
  }
);

module.exports = router;
