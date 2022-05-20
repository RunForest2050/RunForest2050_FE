/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvaluationDB, evaluationDB, getRunningDB } from "../redux/modules/mypage";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Text, Grid } from "../elements";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";

import "../components/myPage/Evaluation.css";
import { Button } from "react-scroll";

const Evaluation = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:500px)",
  });

  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);
  const [emoji, setEmoji] = useState(true);
  const [evaluationCategory, setEvaluationCategory] = useState();
  const [point, setPoint]= useState(1); 

  const host = useSelector((state) => state.mypage.host);
  console.log(host);

  const userId = localStorage.getItem("userId");
  const groupId = host?.data?.hostUser?.groupId
  const hostId = host?.data?.hostUser?.user?.userId

  const mpoint = () => {
    if(emoji === true) {
      setPoint(-1);
    }else if(emoji === false){
      setPoint(1);
    }
  }

  const [likeCategory, setLikeCategory] = useState([
    "코스 맛집이에요",
    "안내사항이 명확해요",
    "응답이 빨라요",
    "사람들을 잘 이끌어줘요",
    "시간 약속을 잘 지켜요",     
  ]);

  const [category, setCategory] = useState([    
    "코스가 별로에요",
    "응답이 느려요",
    "사람들에게 불친절해요",
    "시간 약속을 어겼어요",
    "안내가 불확실해요",
  ]);
 

  const toggleModal = () => {
    setModal(!modal);
  };

  const change = () => {
    setEmoji(!emoji);
  }

  const choiceCategory = (idx) => {
    setEvaluationCategory(idx);
  };

  if (isMobile) {
    return (
      <Grid width="100%" justifyContent="center">
        <_Wrap>
          <Text bold size="19px" margin="100px 0 0 0">
            크루장 평가
          </Text>
          <_MyImage src={host?.data?.hostUser?.user?.profileUrl} />
          <Text bold size="19px">
            {host?.data?.hostUser?.user?.nickname}
          </Text>
          <Text size="16px" color="#858585" >
            {host?.data?.hostUser?.date} &nbsp;{" "}
            {host?.data?.hostUser?.standbyTime} 에 &nbsp;{" "}<br/>
            {host?.data?.hostUser?.title} 를 &nbsp;함께함
          </Text>
          <Text bold size="20px" margin="70px 0 0 0">
            {host?.data?.hostUser?.user?.nickname}님의 그룹 러닝은 어땠나요?
          </Text>
          
          {emoji ? (
            <>
              <_Btn>
                <Icon>
                  <img style={{ margin: "5px 0 0 0" }} src="https://ifh.cc/g/DPpn4L.png"/>
                  <Text bold size="16px">좋았어요!</Text>
                </Icon>
              </_Btn>

              <_Btn>
                <img style={{ margin: "5px 0 0 0" }} src="https://ifh.cc/g/a8rsZ8.png" onClick={() =>{change(); mpoint();}}/>
                <Text bold  size="16px">아쉬웠어요.</Text>
              </_Btn>
              <_Hr/>
            
              <Text bold size="19px" margin="35px 0 30px 0">
                {host?.data?.hostUser?.user?.nickname}님의 가장 좋았던 점을 선택해주세요!
              </Text>

              <Grid flexWrap="Wrap" width="100%" display="flex" justifyContent="center">                  
                {likeCategory.map((e, idx) => {
                  return (
                    <Fragment key={idx}>
                      <_LabelDistance>
                        <input
                          onClick={() => {
                            choiceCategory(idx+1); 
                            console.log(idx+1)
                          }}
                          type="radio"
                          name="likeCategory"
                          value={e}
                        >
                        </input>
                        <Text 
                        bold
                        >
                          {e}
                        </Text>
                      </_LabelDistance>
                    </Fragment>
                  );
                })}
              </Grid>
            </>
          )
          :
          (
            <>
              <_Btn>
                <Icon>
                <img style={{ margin: "5px 0 0 0" }} src="https://ifh.cc/g/cmv5yP.png" onClick={() =>{change(); mpoint();}}/>
                <Text bold size="16px">좋았어요!</Text>
                </Icon>
              </_Btn>

              <_Btn>
                <img style={{ margin: "5px 0 0 0" }} src="https://ifh.cc/g/Nz1wV8.png"/>
                <Text bold  size="16px">아쉬웠어요.</Text>
              </_Btn>
              <_Hr/>

              <Text bold size="19px" margin="35px 0 30px 0">
                {host?.data?.hostUser?.user?.nickname}님의 가장 아쉬웠던 점을 선택해주세요!
              </Text>

              <Grid flexWrap="Wrap" width="100%" display="flex" justifyContent="center">                  
                {category.map((e, idx) => {
                  return (
                    <Fragment key={idx}>
                      <_LabelDistance>
                        <input
                          onClick={() => {
                            choiceCategory(idx+6); 
                            console.log(idx+6)
                          }}
                          type="radio"
                          name="category"
                          value={e}
                        ></input>
                        <Text bold>{e}</Text>
                      </_LabelDistance>
                    </Fragment>
                  );
                })}
              </Grid>
            </>
          )} 
          <_EvaluationButton
            onClick={() => {
              toggleModal();
              dispatch(evaluationDB(groupId, hostId, point, evaluationCategory));
              dispatch(getRunningDB(userId));
              history.push(`/mypage/${userId}`);
            }}
            >
            평가완료
          </_EvaluationButton>
        </_Wrap>
        <CBtn onClick={()=> {
          history.push(`/mypage/${userId}`);
        }}
        >
          <AiOutlineClose size="22" color="#030c37"/>
        </CBtn>
      </Grid>
    );
  }

  return (
    <div>
      {modal && (
        <div>
          <Overlaye>
            <Wrap>
              <Text bold size="18px" marginTop>
                크루장 평가
              </Text>
              <MyImage src={host?.data?.hostUser?.user?.profileUrl} />
              <Text bold size="16px">
                {host?.data?.hostUser?.user?.nickname}
              </Text>

              <Text size="13px" color="#858585" margin=" -8px 0 0 0">
                {host?.data?.hostUser?.date} &nbsp;{" "}
                {host?.data?.hostUser?.standbyTime} 에 &nbsp;{" "}
                {host?.data?.hostUser?.title}를 &nbsp;함께함
              </Text>
              <Hr/>

              <Text bold size="20px">
                {host?.data?.hostUser?.user?.nickname}님의 그룹 러닝은 어땠나요?
              </Text>
                {emoji ? (
                  <>
                    <Btn>
                      <Icon>
                        <img style={{ margin: "5px 0 0 0" }} src="https://ifh.cc/g/DPpn4L.png"/>
                        <Text bold size="16px">좋았어요!</Text>
                      </Icon>
                    </Btn>

                    <Btn>
                      <img style={{ margin: "5px 0 0 0" }} src="https://ifh.cc/g/a8rsZ8.png" onClick={() =>{change(); mpoint();}}/>
                      <Text bold  size="16px">아쉬웠어요.</Text>
                    </Btn>
                    <Hr/>
                  
                    <Text bold size="20px" margin="35px 0 10px 0">
                      {host?.data?.hostUser?.user?.nickname}님의 가장 좋았던 점을 선택해주세요!
                    </Text>

                    <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">                  
                      {likeCategory.map((e, idx) => {
                        return (
                          <Fragment key={idx}>
                            <LabelDistance>
                              <input
                                onClick={() => {
                                  choiceCategory(idx+1); 
                                  console.log(idx+1)
                                }}
                                type="radio"
                                name="likeCategory"
                                value={e}
                              >
                              </input>
                              <Text 
                              bold
                              >
                                {e}
                              </Text>
                            </LabelDistance>
                          </Fragment>
                        );
                      })}
                    </Grid>
                  </>
                )
                :
                (
                  <>
                    <Btn>
                      <Icon>
                      <img style={{ margin: "5px 0 0 0" }} src="https://ifh.cc/g/cmv5yP.png" onClick={() =>{change(); mpoint();}}/>
                      <Text bold size="16px">좋았어요!</Text>
                      </Icon>
                    </Btn>

                    <Btn>
                      <img style={{ margin: "5px 0 0 0" }} src="https://ifh.cc/g/Nz1wV8.png"/>
                      <Text bold  size="16px">아쉬웠어요.</Text>
                    </Btn>
                    <Hr/>

                    <Text bold size="20px" margin="35px 0 10px 0">
                      {host?.data?.hostUser?.user?.nickname}님의 가장 아쉬웠던 점을 선택해주세요!
                    </Text>

                    <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">                  
                      {category.map((e, idx) => {
                        return (
                          <Fragment key={idx}>
                            <LabelDistance>
                              <input
                                onClick={() => {
                                  choiceCategory(idx+6); 
                                  console.log(idx+6)
                                }}
                                type="radio"
                                name="category"
                                value={e}
                              ></input>
                              <Text bold>{e}</Text>
                            </LabelDistance>
                          </Fragment>
                        );
                      })}
                    </Grid>
                  </>
                )} 
                <EvaluationButton
                  onClick={() => {
                    toggleModal();
                    dispatch(evaluationDB(groupId, hostId, point, evaluationCategory));
                    dispatch(getRunningDB(userId));
                    history.push(`/mypage/${userId}`);
                  }}
                  >
                  평가완료
                </EvaluationButton>

                <button className="_close-modal" onClick={()=> {
                  history.push(`/mypage/${userId}`);
                }}
                >
                  <AiOutlineClose size="22" color="#222"/>
                </button>
            </Wrap>
          </Overlaye>
        </div>
      )}
    </div>
  );
};

const MyImage = styled.img`
  height: 104px;
  width: 104px;
  margin: 17px 40px 0px 40px;
  border-radius: 50%;
`;

const _MyImage = styled.img`
  height: 140px;
  width: 140px;
  margin-top: 30px;
  border-radius: 50%;
  justify-content: center;
`;

const Icon = styled.div`
  margin-top: 10px;
  height: 80px;
  width: 80px; 
`;

const Hr = styled.div`
  width: 457px;
  height: 1px;
  margin: 30px 0 20px 20px;
  background-color: #ddd;
`;

const _Hr = styled.div`
  width: 100%;
  height: 1px;
  margin: 0px 0 40px 0;
  background-color: #ddd;
`;

const Btn = styled.button`
  border: none;
  height: 80px;
  width: 200px;
  margin: 0 0 20px 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
`;

const _Btn = styled.button`
  border: none;
  align-items: center;
  margin: 30px 30px;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
`;

const EvaluationButton = styled.button`
  border: none;
  height: 48px;
  width: 168px; 
  font-weight: bold; 
  margin: 24px 0 25px 10px;
  padding-top: 14px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #dedede;  
  :hover {
  color: #fff;
  background-color: #282932;
}
`;

const _EvaluationButton = styled.button`
  border: none;
  height: 48px;
  width: 168px; 
  font-weight: bold; 
  margin: 24px 0 100px 10px;
  padding-top: 14px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #dedede;  
  :hover {
  color: #fff;
  background-color: #282932;
}
`;

const Overlaye = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49, 49, 49, 0.8);
  z-index: 2;
`;

const Wrap = styled.div`
  z-index: 0;
  position: absolute;
  left: 35.3%;
  top: 103px;
  margin: 0;
  padding: 14px 28px;
  max-width: 664px;
  width: 500px;
 // height: 530px;
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  line-height: 1.4;
`;

const _Wrap = styled.div`
  text-align: center;
`;

const LabelDistance = styled.label`
  margin: -16px 0 0 28px; 
  input {
    display: none;
  }
  input + p {
    width: 440px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    cursor: pointer;
    box-sizing: border-box;
    border: solid 1px #b8b8b8;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #030c37;
  }
  `;

  const _LabelDistance = styled.label`
  margin: -16px 0 0 0; 
  input {
    display: none;
  }
  input + p {
    width: 320px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 80px;
    cursor: pointer;
    box-sizing: border-box;
    border: solid 1px #b8b8b8;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #030c37;
  }
  `;
  
 const CBtn = styled.div`
  margin: -1250px 0 0 87%;
`;

export default Evaluation;