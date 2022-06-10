import React, { useEffect } from 'react';
import './claimView.css';
import { useDispatch, useSelector } from 'react-redux';
import { oneClaim } from '../../actions/user';
import attachmentDefault from '../../assets/img/attachment.png';
import { API_URL } from '../../config';
import { WWW_URL } from '../../config';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Cabinet = props => {
  const dispatch = useDispatch();
  const id = props.match.params.idClaim;

  //Вызов функции для получения одной записи претензии из базы данных
  useEffect(() => {
    dispatch(oneClaim(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Заносим в переменную данные записи претензии из редюсера
  const claim = useSelector(state => state.claim.oneClaim);

  const link = `${WWW_URL + `claimView/` + claim._id}`;

  const imageClaim = claim.attachment ? `${API_URL + '\\attachments\\' + claim.attachment}` : attachmentDefault;

  return (
    <div className="row justify-content-center row1">
      <div className="card" id="card_view">
        <h5 className="card-header">Отслеживание выполнения претензии №: {claim._id}</h5>

        <div className="card-body">
          <div className="container no_padding">
            <div className="row">
              <div className="col">
                {/* eslint-disable-next-line */}
                <img src={imageClaim} alt="" id="attachment_img_view" className="rounded" />
              </div>

              <div className="col">
                <h5 className="modal-title" id="exampleModalLabel">
                  Статус претензии: {claim.status}
                </h5>
                <br />

                <dl className="row">
                  <dt className="col-sm-6">Автор:</dt>
                  <dd className="col-sm-6">{claim.fio}</dd>
                  <dt className="col-sm-6">Лицевой счёт:</dt>
                  <dd className="col-sm-6">{claim.personal_account}</dd>
                  <dt className="col-sm-6">Дата обращения:</dt>
                  <dd className="col-sm-6">{new Date(claim.date_add).toLocaleDateString()}</dd>
                  <dt className="col-sm-6">Текст обращения:</dt>
                </dl>
                <p>{claim.text}</p>

                <hr />

                <label className="form-label">
                  <b>Ответ на претензию</b>
                </label>
                <p>{claim.note ? claim.note : 'Ответ на претензию отсутствует, ожидайте.'}</p>

                <CopyToClipboard text={link} onCopy={() => alert('Ссылка скопирована.')}>
                  <button className="btn btn-primary btn-sm" type="button">
                    Скопирововать ссылку на отчёт
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cabinet;
