import axios from 'axios';
import { setUser } from '../reducers/userReducer';
import { setAllClaims } from '../reducers/claimReducer';
import { setOneClaim } from '../reducers/claimReducer';
import { API_URL } from '../config';
import { WWW_URL } from '../config';

//Функция авторизации, принимает параметры
export const login = (email, password) => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user)); //Обработка ответа от сервера

      localStorage.setItem('token', response.data.token); //Сохранение токена аутентификации в локальном хранилище на компьютер клиента
    } catch (e) {
      alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};

//Функция аутентификации пользователя
export const auth = () => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного GET-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });
      dispatch(setUser(response.data.user)); //Обработка ответа от сервера
      localStorage.setItem('token', response.data.token); //Сохранение токена авторизации на компьютер клиента
    } catch (e) {
      localStorage.removeItem('token'); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};

//Функция загрузки вложения на сервер
export const uploadAttachment = (file, attachmentName) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append('file', file, attachmentName);

      await axios.post(`${API_URL}api/files/attachment`, formData);
    } catch (e) {
      console.log(e);
    }
  };
};

//Функция добавления новой претензии
export const addClaim = async (fio, personal_account, text, attachment, email) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    console.log('user.js: ' + attachment);

    let date_add = new Date();
    let status = 'На рассмотрении Администратора';
    let note = '';

    //Отправка асинхронного POST-запроса на серверную часть

    /*eslint-disable no-unused-vars*/
    const response = await axios.post(`${API_URL}api/auth/addClaim`, {
      date_add,
      fio,
      personal_account,
      text,
      status,
      note,
      attachment,
      email,
    });
    /*eslint-enable no-unused-vars*/

    window.location.href = `${WWW_URL + 'claimView/' + response.data._id}`;
    alert('Ваша претензия зарегистрована!');
  } catch (e) {
    //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    alert(e.response.data.message);
  }
};

//Функция получения всех записей претензий
export const allClaims = filter => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      if (filter == '') {
        filter = 'Все претензии';
      }

      //Отправка асинхронного GET-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allClaims?filter=${filter}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });

      //Занесение полученного списка претензий в редюсер претензий
      dispatch(setAllClaims(response.data.claims));
    } catch (e) {
      alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};

//Функция обновления записи одной претензии
export const updateClaim = async (_id, note, status) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного PUT-запроса на серверную часть
    const response = await axios.put(`${API_URL}api/auth/updateClaim`, {
      _id,
      note,
      status,
    });

    alert(response.data.message); //Вывод уведомления с ответом от сервера об успешной регистрации
  } catch (e) {
    alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
  }
};

//Функция получения одной записи претензии
export const oneClaim = id => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного GET-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/claimView?_id=${id}`, {});

      //Занесение полученного списка претензий в редюсер претензий
      dispatch(setOneClaim(response.data.claim));
    } catch (e) {
      alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};
