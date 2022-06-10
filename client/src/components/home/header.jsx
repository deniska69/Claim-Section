import React from 'react';
import './home.css';
import head from '../../assets/img/head.png';

const Header = () => {
  return (
    <div>
      {/* eslint-disable-next-line */}
      <img src={head} className=" img_head"></img>

      <div className="row justify-content-center menu_home d-none d-xl-block">
        <div className="col-10">
          <ul className="list-inline menu_home">
            <li className="list-inline-item">
              {/* eslint-disable-next-line */}
              <a className="ac" href="/">
                Главная
              </a>
            </li>
            <li className="list-inline-item">
              {/* eslint-disable-next-line */}
              <a className="ac" href="/about">
                О компании
              </a>
            </li>
            <li className="list-inline-item">
              {/* eslint-disable-next-line */}
              <a className="ac" href="oper_inf">
                Оперативная информация
              </a>
            </li>
            <li className="list-inline-item">
              {/* eslint-disable-next-line */}
              <a className="ac" href="/purchases">
                Закупки
              </a>
            </li>

            <li className="list-inline-item">
              {/* eslint-disable-next-line */}
              <a className="ac" href="/partners">
                Партнеры
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="row menu_home d-xl-none ">
        <div className="col-10">
          <ul className="list-inline menu_home">
            <li>
              {/* eslint-disable-next-line */}
              <a className="ac" href="/">
                Главная
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a className="ac" href="/about">
                О компании
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a className="ac" href="oper_inf">
                Оперативная информация
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a className="ac" href="/purchases">
                Закупки
              </a>
            </li>

            <li>
              {/* eslint-disable-next-line */}
              <a className="ac" href="/partners">
                Партнеры
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
