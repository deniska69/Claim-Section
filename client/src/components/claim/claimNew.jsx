import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadAttachment } from '../../actions/user';
import Input from '../../utils/input/Input';
import TextArea from '../../utils/input/TextArea';
import { addClaim } from '../../actions/user';
import ReCAPTCHA from 'react-google-recaptcha';
const Uuid = require('uuid');

const ClaimNew = () => {
  const dispatch = useDispatch();

  //Переменные значения которых, мы получаем со страницы:
  const [fio, setFio] = useState(''); //Ф.И.О.
  const [personal_account, setPersonal_account] = useState(''); //Номер лицевого сч1та
  const [text, setText] = useState(''); //Текст претензии
  const [email, setEmail] = useState(''); //Email
  const [isCaptcha, setIsCaptcha] = useState(false); //Прошёл ли пользоваткель каптчу
  const [warning, setWarning] = useState(false); //Выводить ли уведомление
  const [warningText, setWarningText] = useState(''); //Выводить ли уведомление
  const [file, setFile] = useState(''); //Выводить ли уведомление

  //Переменная для хранения вложения
  //let file

  //Функция выбора файла и занесения его в переменную
  function changeHandler(e) {
    //file = e.target.files[0]

    setFile(e.target.files[0]);

    console.log(file);
  }

  //Функция регистрации претензии
  function registerClaim() {
    if (isCaptcha) {
      let attachmentName;

      //Если пользователь приложил файл
      /* eslint eqeqeq: 0 */
      if (file != null) {
        //Генерируем уникальное имя будущего файла
        attachmentName = Uuid.v4() + '.jpg';

        //Вызываем функцию для загрузки файла на сервер и передаём ей в параметры: (файл, сгенерированное имя)
        dispatch(uploadAttachment(file, attachmentName));
      } else {
        attachmentName = '';
      }

      //Проверяем, заполенны ли поля
      if (fio != '' && personal_account != '' && text != '') {
        console.log('claimNew.jsx: ' + attachmentName);

        //Вызываем функцию внесения претензии в базу данных, и передаём ей в параметры:(Ф.И.О., личный счёт, текст обращения, сгенерированное имя файла)
        addClaim(fio, personal_account, text, attachmentName, email);
      } else {
        setWarning(true);
        setWarningText('Заполненны не все поля!');
      }
    } else {
      setWarning(true);
      setWarningText('Необходимо подтвердить, что вы не робот!');
    }
  }

  //Функция прохождения каптчи
  function onChange(value) {
    setIsCaptcha(value);
    setWarning(false);

    console.log(file);
  }

  return (
    <div className="modal fade" id="claimModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Оставьте претензию
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Укажите ваше Ф.И.О.
                  </label>
                  <Input value={fio} setValue={setFio} type="text" className={'form-control'} />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Укажите ваш лицевой счёт
                  </label>
                  <Input value={personal_account} setValue={setPersonal_account} type="text" className={'form-control'} />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Укажите ваш Email
                    <br />
                    (На него будет отправлена ссылка на отчет по вашей претензии)
                  </label>
                  <Input value={email} setValue={setEmail} type="text" className={'form-control'} />
                </div>

                <div className="mb-3">
                  <p />
                  <label className="form-label">Загрузите изображение:</label>
                  <input accept="image/*" onChange={e => changeHandler(e)} type="file" className="form-control" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Введите, что вас интересует?
                  </label>
                  <TextArea value={text} setValue={setText} className={'form-control'} type="text" rows={4} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Подтвердите, что вы не робот:</label>
                  <ReCAPTCHA sitekey="6LdPDzcbAAAAANcZDHX87RWBn33WBO8sj336YQqL" onChange={onChange} />
                </div>

                {warning && (
                  <div className="mb-3">
                    <p className="text-danger">{warningText}</p>
                  </div>
                )}

                <div className="d-grid gap-2 d-md-blockr overflow-hidden">
                  <button className="btn btn-primary" type="submit" onClick={() => registerClaim()}>
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimNew;
