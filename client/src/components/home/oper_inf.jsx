import React from 'react';
import './home.css';
import footer from '../../assets/img/footer.png';
import Header from './header';

const Oper_Info = () => {
  return (
    <div className="container container_head shadow-lg">
      <Header />

      <div className="row clear">
        <div className="col about">
          <h3 className="cntzag">Оперативная информация</h3>
          <p align="justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>

      {/* eslint-disable-next-line */}
      <img src={footer} className=" img_head"></img>
    </div>
  );
};

export default Oper_Info;
