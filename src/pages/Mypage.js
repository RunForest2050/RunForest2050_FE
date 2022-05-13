import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileDB, getMyRunningDB } from "../redux/modules/mypage";
import Profile from "../components/myPage/Profile";
import Schedule from "../components/myPage/Schedule";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import Group from "../components/myPage/Group";
import MyGroup from "../components/myPage/MyGroup";
import { Text, Grid } from "../elements";
import Tabs from "../components/myPage/Tabs";

const Mypage = () => {
  const dispatch = useDispatch();
  // const params = useParams();
  // console.log(params);
  // const userId = params.userId;
  // console.log(userId);
  const userId = localStorage.getItem("userId");

  const [complete, setComplete] = useState(true);
  const [myGroup, setMyGroup] = useState(false);

   useEffect(() => {
     dispatch(getProfileDB(userId));
   }, []);

  return (
    <Grid width="1200px" margin="auto">
      <Profile userId={userId} />
      <Schedule userId={userId} />
      
      <Tabs />

      {/* <Btn onClick={()=>{ 
            setComplete(true)
            setMyGroup(false)
            }}>
            참여완료 그룹러닝
        </Btn>
        <Btn onClick={()=>{ 
            setMyGroup(true)
            setComplete(false)
            dispatch(getMyRunningDB(userId));
            }}>
            내가만든 그룹러닝
        </Btn> 

      {complete === true ? <Group /> : null}

        { myGroup === true ? <MyGroup/> : null } */}
    </Grid>
  );
};

const Hr = styled.div`
  width: 1240px;
  height: 3px;
  background-color: #bbb;
`;

const Btn = styled.button`
  width: 184px;
  height: 40px;
  margin: 20px 20px 30px 0;
  padding-top: 1px;
  border-radius: 50px;
  border: none;
  background-color: #95fbc7;
  color: #030c37;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
export default Mypage;