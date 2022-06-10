import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import TextArea from '../../utils/input/TextArea';
import { updateClaim } from '../../actions/user';

const ClaimEdit = props => {
  let idClaim = props._id;
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    setStatus(props.status);
    setNote(props.note);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idClaim]);

  function changeHandlerStatus(e) {
    setStatus(e.target.value);
  }

  function voidUpdateClaim() {
    updateClaim(idClaim, note, status);
  }

  return (
    <div className="modal fade" id="claimModalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Статус претензии: {props.status}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <div className="container no_padding">
              <div className="row">
                <div className="col-sm">
                  {/* eslint-disable-next-line */}
                  <img
                    src={props.attachment ? `${API_URL + '\\attachments\\' + props.attachment}` : props.attachmentDefault}
                    alt=""
                    id="attachment_img_modal"
                    className="rounded"
                  />
                </div>

                <div className="col-sm">
                  <dl className="row">
                    <dt className="col-sm-4">Автор:</dt>
                    <dd className="col-sm-8">{props.fio}</dd>
                    <dt className="col-sm-4">Лицевой счёт:</dt>
                    <dd className="col-sm-8">{props.personal_account}</dd>
                    <dt className="col-sm-4">Дата обращения:</dt>
                    <dd className="col-sm-8">{new Date(props.date_add).toLocaleDateString()}</dd>
                    <dt className="col-sm-4">Email:</dt>
                    <dd className="col-sm-8">{props.email}</dd>
                    <dt className="col-sm-4">Текст обращения:</dt>
                  </dl>
                  <p>{props.text}</p>

                  <hr />

                  <label className="form-label">
                    <b>Ответ на претензию:</b>
                  </label>
                  <TextArea value={note} setValue={setNote} className={'form-control'} type="text" rows={3} />
                  <br />

                  <label className="form-label">
                    <b>Статус:</b>
                  </label>
                  <select className="form-select" value={status} onChange={e => changeHandlerStatus(e)}>
                    <option value="На рассмотрении Администратора">На рассмотрении Администратора</option>
                    <option value="Зарегистрировано">Зарегистрировано</option>
                    <option value="На рассмотрении">На рассмотрении</option>
                    <option value="На выполнении">На выполнении</option>
                    <option value="Выполнено">Выполнено</option>
                    <option value="Не выполнено">Не выполнено</option>
                    <option value="Отказ">Отказ</option>
                    <option value="Спам">Спам</option>
                  </select>
                  <br />

                  <button className="btn btn-success" type="button" onClick={() => voidUpdateClaim()}>
                    Сохранить
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

export default ClaimEdit;
