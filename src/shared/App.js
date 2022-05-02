import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Header from "../components/Header";
import Intro from "../pages/Intro";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import CourseFeed from "../pages/CourseFeed";
import GroupFeed from "../pages/GroupFeed";
import GroupUpload from "../pages/GroupUpload";
import GroupDetail from "../pages/GroupDetail";

function App() {
  return (
    <React.Fragment>
      <Header></Header>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/mypage" exact component={Mypage} />
        <Route path="/coursefeed" exact component={CourseFeed} />
        <Route path="/groupfeed" exact component={GroupFeed} />
        <Route path="/groupupload" exact component={GroupUpload} />
        <Route path="/groupdetail/:groupId" exact component={GroupDetail} />
      </ConnectedRouter>
    </React.Fragment>
  );
}
export default App;
