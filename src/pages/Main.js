import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Banner from "../components/main/Banner";
import MGroupRunning from "../components/main/MGroupRunning";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";

const Main = () => {
  const dispatch = useDispatch();

  const from = localStorage.getItem("from");
  console.log(from);

  if (from) {
    return history.replace(from);
  }

  return (
    <div>
      <Banner />
      <MGroupRunning />
    </div>
  );
};

export default Main;
