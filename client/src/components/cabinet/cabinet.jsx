import React, { useEffect, useState } from 'react';
import './cabinet.css';
import { useDispatch, useSelector } from 'react-redux';
import { allClaims } from '../../actions/user';
import attachmentDefault from '../../assets/img/attachment.png';
import { API_URL } from '../../config';
import ClaimEdit from '../claim/claimEdit';

const Cabinet = () => {
  const dispatch = useDispatch();

  //Вызов функции для получения всех записей претензий из базы данных
  useEffect(() => {
    dispatch(allClaims(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listClaims = useSelector(state => state.claim.listClaims); //Заносим в переменную все записи претензий из редюсера

  //Промежуточные переменные для передачи в модальное окно редактирования претензии
  const [propsID, setPropsID] = useState('');
  const [propsDate_Add, setPropsDate_Add] = useState('');
  const [propsFIO, setPropsFIO] = useState('');
  const [propsPersonal_Account, setPropsPersonal_Account] = useState('');
  const [propsText, setPropsText] = useState('');
  const [propsStatus, setPropsStatus] = useState('');
  const [propsNote, setPropsNote] = useState('');
  const [propsAttachment, setPropsAttachment] = useState('');
  const [propsAttachmentDefault, setPropsAttachmentDefault] = useState('');
  const [email, setEmail] = useState(''); //Email

  function showModalClaimEdit(_id, date_add, fio, personal_account, text, status, note, attachment, email) {
    setPropsID(_id);
    setPropsDate_Add(date_add);
    setPropsFIO(fio);
    setPropsPersonal_Account(personal_account);
    setPropsText(text);
    setPropsStatus(status);
    setPropsNote(note);
    setPropsAttachment(attachment);
    setPropsAttachmentDefault(attachmentDefault);
    setEmail(email);
  }

  function changeFilter(e) {
    dispatch(allClaims(e.target.value));
  }

  return (
    <div>
      {/* Декстоп */}
      <div className="card d-none d-xl-block" id="card_cabinet">
        <div className="card-body">
          <div className="mb-3 row">
            <div className="col-sm-1">
              <label className="col-form-label">Фильтр</label>
            </div>

            <div className="col-sm-3">
              <select className="form-select" onChange={e => changeFilter(e)}>
                <option value="Все претензии">Все претензии</option>
                <option value="На рассмотрении Администратора">На рассмотрении Администратора</option>
                <option value="Зарегистрировано">Зарегистрировано</option>
                <option value="На рассмотрении">На рассмотрении</option>
                <option value="На выполнении">На выполнении</option>
                <option value="Выполнено">Выполнено</option>
                <option value="Не выполнено">Не выполнено</option>
                <option value="Отказ">Отказ</option>
                <option value="Спам">Спам</option>
              </select>
            </div>
          </div>

          <div className="row">
            {listClaims.map(({ _id, date_add, fio, personal_account, text, status, note, attachment, email }) => (
              <div key={_id.toString()} className="col-sm-4 card_otstup">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      {/* eslint-disable-next-line */}
                      <img src={attachment ? `${API_URL + '\\attachments\\' + attachment}` : attachmentDefault} alt={_id.toString()} id="attachment_img" />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Статус: {status}</h5>
                        <p>{text.slice(0, 70) + '...'}</p>
                        {/* <p className="card-text"><small className="text-muted">{fio}, {new Date(date_add).toLocaleDateString()}, Л/С: {personal_account}</small></p> */}
                        <button
                          className="btn btn-primary btn-sm"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#claimModalEdit"
                          onClick={() => showModalClaimEdit(_id, date_add, fio, personal_account, text, status, note, attachment, email)}>
                          Редактировать
                        </button>
                        {/* eslint-disable-next-line */}
                        <a className="btn btn-primary btn-sm" href={'/claimView/' + _id} id="ahrefCabinet" target="_blank">
                          Ссылка
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Мобильные устройства */}
      <div className="row d-xl-none">
        <div className="mb-3 row">
          <div className="col-sm-1">
            <label className="col-form-label">Фильтр</label>
          </div>

          <div className="col-sm-3">
            <select className="form-select" onChange={e => changeFilter(e)}>
              <option value="Все претензии">Все претензии</option>
              <option value="На рассмотрении Администратора">На рассмотрении Администратора</option>
              <option value="Зарегистрировано">Зарегистрировано</option>
              <option value="На рассмотрении">На рассмотрении</option>
              <option value="На выполнении">На выполнении</option>
              <option value="Выполнено">Выполнено</option>
              <option value="Не выполнено">Не выполнено</option>
              <option value="Отказ">Отказ</option>
              <option value="Спам">Спам</option>
            </select>
          </div>
        </div>

        {listClaims.map(({ _id, date_add, fio, personal_account, text, status, note, attachment, email }) => (
          <div key={_id.toString()} className="col-sm-4 card_otstup">
            <div className="card mb-3">
              <div className="row g-0">
                {/* <div className="col-md-4">
                                    eslint-disable-next-line
                                    <img src={attachment ? `${API_URL + '\\attachments\\' + attachment}` : attachmentDefault} alt={_id.toString()} id="attachment_img" />
                                </div> */}

                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Статус: {status}</h5>
                    <p>{text.slice(0, 70) + '...'}</p>
                    {/* <p className="card-text"><small className="text-muted">{fio}, {new Date(date_add).toLocaleDateString()}, Л/С: {personal_account}</small></p> */}
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#claimModalEdit"
                      onClick={() => showModalClaimEdit(_id, date_add, fio, personal_account, text, status, note, attachment, email)}>
                      Редактировать
                    </button>
                    {/* eslint-disable-next-line */}
                    <a className="btn btn-primary btn-sm" href={'/claimView/' + _id} id="ahrefCabinet" target="_blank">
                      Ссылка
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ClaimEdit
        _id={propsID}
        date_add={propsDate_Add}
        fio={propsFIO}
        personal_account={propsPersonal_Account}
        text={propsText}
        status={propsStatus}
        note={propsNote}
        attachment={propsAttachment}
        attachmentDefault={propsAttachmentDefault}
        email={email}
      />
    </div>
  );
};

export default Cabinet;
