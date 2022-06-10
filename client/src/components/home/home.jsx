import React from 'react';
import './home.css';
import footer from '../../assets/img/footer.png';
import slide1 from '../../assets/img/slide1.jpg';
import slide2 from '../../assets/img/slide2.jpg';
import slide3 from '../../assets/img/slide3.jpg';
import Header from './header';

const Cabinet = () => {
  return (
    <div className="body1">
      {/* Десктоп */}
      <div className="container container_head shadow-lg d-none d-xl-block">
        <Header />

        <div className="row clear">
          <div className="col clear">
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  {/* eslint-disable-next-line */}
                  <img src={slide1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  {/* eslint-disable-next-line */}
                  <img src={slide2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  {/* eslint-disable-next-line */}
                  <img src={slide3} className="d-block w-100" alt="..." />
                </div>
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Предыдущий</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Следующий</span>
              </button>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line */}
        <img src={footer} className=" img_head"></img>
      </div>

      {/* Мобильные устройства */}
      <div className="d-xl-none ">
        <Header />

        <div className="row clear">
          <div className="col clear">
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  {/* eslint-disable-next-line */}
                  <img src={slide1} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  {/* eslint-disable-next-line */}
                  <img src={slide2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  {/* eslint-disable-next-line */}
                  <img src={slide3} className="d-block w-100" alt="..." />
                </div>
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Предыдущий</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Следующий</span>
              </button>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line */}
        <img src={footer} className=" img_head"></img>
      </div>
    </div>
  );
};

export default Cabinet;
