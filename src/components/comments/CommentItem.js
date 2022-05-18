import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Text, Image, IconButton } from "../../elements";
import {
  _deleteCommentFX,
  _editCommentFX,
  _getCommentFX,
  _isEdit,
  _isRecommBox,
} from "../../redux/modules/comments";
import Permit from "../../shared/Permit";
import styled from "styled-components";
import RecommentItem from "../recomment/RecommentItem";
import RecommentWrite from "../recomment/RecommentWrite";
import { resetReComm, _getReCommentFX } from "../../redux/modules/recomments";
import { history } from "../../redux/configureStore";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const [newComm, setNewComm] = useState("");
  const [reComm, setReComm] = useState(false);

  const nickname = localStorage.getItem("nickname");
  const isLogin = useSelector((state) => state.user.isLogin);

  const recommentList = useSelector((state) => state.recomments.list);

  console.log(recommentList);
  console.log(props);

  const editToggle = (commentId) => {
    dispatch(_isEdit(commentId));
  };

  const recommToggle = (commentId) => {
    dispatch(_isRecommBox(commentId));
  };

  const editComm = (commentId) => {
    console.log("댓글 수정");
    dispatch(_editCommentFX(commentId, newComm));
    editToggle(commentId);
  };

  // React.useEffect(() => {
  //   dispatch(_getReCommentFX(props.commentId));
  // }, []);

  return (
    <>
      <Grid display="flex" flexDirection="column" margin="0 0 15px 0">
        <Grid display="flex" maxWidth="758px" width="100%">
          <Grid
            display="flex"
            alignItems="center"
            width="auto"
            margin="0 0 4px 0"
            _onClick={() => {
              history.push(`/mypage/${props?.user.userId}`);
            }}
            cursor="pointer"
          >
            <Image
              imageType="circle"
              size="40"
              src={props?.user?.profileUrl}
              margin="0 8px 0 0"
            ></Image>

            <Grid display="flex" flexDirection="column" width="auto">
              {props?.is_edit ? (
                <>
                  <EditInput
                    onChange={(e) => setNewComm(e.target.value)}
                    type="text"
                  ></EditInput>
                </>
              ) : (
                <>
                  <Text width="auto" size="16px" margin="0" bold>
                    {props?.user?.nickname}
                  </Text>
                  <Text width="auto" margin="0" size="16px">
                    {props?.content}
                  </Text>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>

        {props?.is_edit ? (
          <>
            <Grid margin="0 0 0 48px" display="flex" alignItems="center">
              <Text
                cursor="pointer"
                _onClick={() => {
                  editComm(props?.commentId);
                }}
                margin="0 16px 0 0"
                size="12px"
                bold
              >
                수정완료
              </Text>
              <IconButton
                cursor="pointer"
                color="gray"
                size="15"
                width="15px"
                height="18px"
                cancelRoundBlack
                _onClick={() => {
                  editToggle(props?.commentId);
                }}
                margin="0 16px 0 0"
              ></IconButton>
            </Grid>
          </>
        ) : (
          <Grid display="flex" margin="0 0 0 48px">
            <Text color="#818181" margin="0 16px 0 0" size="12px">
              {props?.createdAt}
            </Text>
            <Text
              hover="color:#68F99E; font-weight:900;"
              color="#818181"
              margin="0 16px 0 0"
              size="12px"
              cursor="pointer"
              _onClick={() => {
                recommToggle(props?.commentId);
              }}
            >
              답글보기
            </Text>
            <Permit>
              <Text
                hover="color:#68F99E; font-weight:900;"
                color="#818181"
                margin="0 16px 0 0"
                size="12px"
                cursor="pointer"
                _onClick={() => {
                  setReComm(!reComm);
                }}
              >
                답글달기
              </Text>
            </Permit>
            <Permit>
              {props?.user?.nickname === nickname ? (
                <>
                  <Text
                    hover="color:#68F99E; font-weight:900;"
                    cursor="pointer"
                    _onClick={() => {
                      editToggle(props?.commentId);
                    }}
                    margin="0 16px 0 0"
                    size="12px"
                    color="#818181"
                  >
                    수정하기
                  </Text>
                  <Text
                    hover="color:#68F99E; font-weight:900;"
                    cursor="pointer"
                    _onClick={() => {
                      dispatch(_deleteCommentFX(props?.commentId));
                    }}
                    margin="0 16px 0 0"
                    size="12px"
                    color="#818181"
                  >
                    삭제하기
                  </Text>
                </>
              ) : null}
            </Permit>
          </Grid>
        )}
      </Grid>
      {props.isRecomm
        ? recommentList?.map((e, idx) => {
            if (e === null) {
              return;
            }
            return props.commentId === e.commentId ? (
              <Fragment key={idx}>
                <Grid margin="0 0 12px 76px">
                  <RecommentItem commentId={props?.commentId} {...e} />
                </Grid>
              </Fragment>
            ) : null;
          })
        : null}

      {reComm ? (
        <RecommentWrite setReComm={setReComm} commentId={props?.commentId} />
      ) : null}
    </>
  );
};

const EditInput = styled.textarea`
  width: 400px;
  height: 100px;
  box-sizing: border-box;
  outline: none;
  resize: none;
  border: 1px solid #68f99e;
  :focus {
    border: 2px solid #68f99e;
  }
`;

export default CommentItem;
