import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../actions/user';
import { useEffect } from 'react';
import Cabinet from '../cabinet/cabinet';
import ClaimView from '../claim/claimView';
import Home from '../home/home';
import About from '../home/about';
import Oper_Info from '../home/oper_inf';
import Purchases from '../home/purchases';
import Partners from '../home/partners';

function RightBlock() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <div className="container-fluid" id="content">
      <div className="row" id="contentRow">
        <BrowserRouter>
          {isAuth && (
            <Switch>
              <Route path="/cabinet" component={Cabinet} />
            </Switch>
          )}

          <Switch>
            <Route path="/claimView/:idClaim" component={ClaimView} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/oper_inf" component={Oper_Info} />
            <Route path="/purchases" component={Purchases} />
            <Route path="/partners" component={Partners} />
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default RightBlock;
