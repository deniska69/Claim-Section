import React, { useState } from 'react';
import Input from '../../utils/input/Input';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/user';

const Authorization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="modal fade" id="enterCabinetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Вход в личный кабинет
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email-адрес
              </label>
              <Input className="form-control" value={email} setValue={setEmail} type="text" placeholder="Введите email..." />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Пароль
              </label>
              <Input className="form-control" value={password} setValue={setPassword} type="password" placeholder="Введите пароль..." />
            </div>
            <div className="d-grid gap-2 d-md-blockr overflow-hidden">
              <button className="btn btn-primary" type="button" id="button_auth" onClick={() => dispatch(login(email, password))} data-bs-dismiss="modal">
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
