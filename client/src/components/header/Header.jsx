import React from 'react';
import './header.css';
import key from './key.svg';
import pencil from './pencil.svg';
import Authorization from '../login/login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';
import ClaimNew from '../claim/claimNew';

const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.user.isAuth);
  const currentUser = useSelector(state => state.user.currentUser);
  const name = currentUser.name;

  return (
    <div>
      {/* Десктоп */}
      <div className="container-fluid d-none d-xl-block" id="header">
        <div className="row">
          {/* Модальное окно: вход в личный кабинет */}
          <div className="col-lg-2 offset-lg-2" id="nawbar_items">
            {/* Блок отрисовывающийся, когда пользователь авторизован */}

            {/* eslint-disable-next-line */}
            {isAuth && (
              <a href="#" id="nawbar_items_a" data-bs-toggle="dropdown" aria-expanded="false">
                {name}
              </a>
            )}

            {isAuth && (
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="/">
                    Главная
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/cabinet">
                    Управление претензиями
                  </a>
                </li>
                {/* eslint-disable-next-line */}
                <li>
                  <a className="dropdown-item" href="" onClick={() => dispatch(logout())}>
                    Выход
                  </a>
                </li>
              </ul>
            )}

            {/* Блок отрисовывающийся, когда пользователь не авторизован */}

            {/* eslint-disable-next-line */}
            {!isAuth && <img src={key} id="nawbar_items_icons" />}

            {/* eslint-disable-next-line */}
            {!isAuth && (
              <a href="#" data-bs-toggle="modal" data-bs-target="#enterCabinetModal" id="nawbar_items_a">
                Личный кабинет
              </a>
            )}
          </div>

          {/* Модальное окно: форма обратной свзяи */}
          <div className="col-lg-3 offset-lg-5" id="nawbar_items">
            {/* eslint-disable-next-line */}
            <img src={pencil} id="nawbar_items_icons" />
            {/* eslint-disable-next-line */}
            <a href="#" data-bs-toggle="modal" data-bs-target="#claimModal" id="nawbar_items_a">
              Оставьте претензию
            </a>
          </div>
        </div>
      </div>

      {/* Мобильные устройства */}
      <div className="d-xl-none ">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-light  p-4">
            {/* Блок отрисовывающийся, когда пользователь авторизован */}
            {isAuth && (
              <ul className="navbar-nav">
                {/* eslint-disable-next-line */}
                <a className="nav-link" aria-current="page" href="/cabinet">
                  Управление претензиями
                </a>
                {/* eslint-disable-next-line */}
                <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#claimModal">
                  Оставьте претензию
                </a>
                {/* eslint-disable-next-line */}
                <a className="nav-link" href="" onClick={() => dispatch(logout())}>
                  Выход
                </a>
              </ul>
            )}

            {/* Блок отрисовывающийся, когда пользователь не авторизован */}
            {!isAuth && (
              <ul className="navbar-nav">
                {/* eslint-disable-next-line */}
                <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#enterCabinetModal">
                  Личный кабинет
                </a>
                {/* eslint-disable-next-line */}
                <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#claimModal">
                  Оставьте претензию
                </a>
              </ul>
            )}
          </div>
        </div>
        <nav className="navbar navbar-light  bg-light ">
          <div className="container-fluid">
            <div className="col">
              <a className="navbar-brand mb-0 h1 nav_brand" href="/home">
                ООО "Организация"
              </a>
            </div>
            <div className="col">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Окно авторизации */}
      {!isAuth && <Authorization />}

      {/* Окно подачи претензии */}
      <ClaimNew />
    </div>
  );
};

export default Header;
