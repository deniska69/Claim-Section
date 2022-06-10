import React from 'react';
import './home.css';
import footer from '../../assets/img/footer.png';
import Header from './header';
import pertner1 from '../../assets/img/1.jpg';
import pertner2 from '../../assets/img/2.jpg';
import pertner3 from '../../assets/img/3.jpg';
import pertner4 from '../../assets/img/4.jpg';
import pertner5 from '../../assets/img/5.png';

const Partners = () => {
  return (
    <div className="container container_head shadow-lg">
      <Header />

      <div className="row clear">
        <div className="col about">
          <h3 className="cntzag">Партнёры</h3>

          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                {/* eslint-disable-next-line */}
                <img src={pertner1} className="partners_img" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p align="justify">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                {/* eslint-disable-next-line */}
                <img src={pertner2} className="partners_img" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p align="justify">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                {/* eslint-disable-next-line */}
                <img src={pertner3} className="partners_img" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p align="justify">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                {/* eslint-disable-next-line */}
                <img src={pertner4} className="partners_img" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p align="justify">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                {/* eslint-disable-next-line */}
                <img src={pertner5} className="partners_img" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p align="justify">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line */}
      <img src={footer} className=" img_head"></img>
    </div>
  );
};

export default Partners;
