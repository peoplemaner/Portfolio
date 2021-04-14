import React from "react";
import {Route, Switch} from "react-router-dom";

import Main from './pages/main';
import Clip from './pages/clip'
import Ranking from './pages/ranking'
import Mypage from './pages/mypage'


export default function Router() {
  return(
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/clip" component={Clip} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/mypage" component={Mypage} />
    </Switch>
  )
}