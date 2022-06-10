import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './css/mycss.css';
import Header from "./header/Header";
import RightBlock from "./right_block/RightBlock";
import './right_block/right_block.css';
import Footer from "./footer/Footer";

function App() {

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <div className="col rightBlock">
            <Header />
            <RightBlock />
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;