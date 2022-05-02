import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Text, Grid } from "../elements";
import { IconButton } from "../elements";
import { getGroupDB } from "../redux/modules/feed";
import { filterActions } from "../redux/modules/filter";

const GroupFilter = () => {
  const dispatch = useDispatch();
  const filterArea = useSelector((state) => state.filter.area);
  console.log(filterArea);

  const choiceFilter = (e) => {
    dispatch(filterActions.setFilterArea(e));
  };

  const getFilter = () => {
    dispatch(getGroupDB());
  };

  const [area, setArea] = useState([
    "전국",
    "서울특별시",
    "경기도",
    "인천광역시",
    "강원도",
    "경기도",
    "충청남도 / 충청북도 / 세종특별자치시 / 대전광역시",
    "경상북도 / 대구광역시",
    "경상남도 / 부산광역시 / 울산광역시",
    "전라남도 / 전라북도 / 광주광역시",
    "제주특별자치시",
  ]);

  const [time, setTime] = useState([
    "모든 시간대",
    "00:00 ~ 04:00",
    "04:00 ~ 08:00",
    "08:00 ~ 12:00",
    "12:00 ~ 16:00",
    "16:00 ~ 20:00",
    "20:00 ~ 24:00",
  ]);

  const [distance, setDistance] = useState([
    "전체",
    "5km 미만",
    "5km 이상 10km 미만",
    "10km 이상 15km 미만",
    "15km 이상",
  ]);

  return (
    <>
      <Grid
        display="flex"
        maxWidth="1360px"
        width="100%"
        maxHeight="366px"
        height="100%"
        margin="32px auto 0 auto"
      >
        <Grid>
          <AreaTitle>
            <Text size="18px" bold>
              러닝지역
            </Text>
          </AreaTitle>
          <AreaContents>
            {area.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Text
                    _onClick={() => {
                      choiceFilter(e);
                    }}
                    margin="19px 0 14px 41px"
                    bold
                    cursor="pointer"
                  >
                    {e}
                  </Text>
                </Fragment>
              );
            })}
          </AreaContents>
        </Grid>

        <Grid>
          <TimeTitle>
            <Text size="18px" bold>
              러닝시간대
            </Text>
          </TimeTitle>
          <TimeContents>
            {time.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Text margin="19px 0 14px 41px" bold>
                    {e}
                  </Text>
                </Fragment>
              );
            })}
          </TimeContents>
        </Grid>

        <Grid>
          <DistanceTitle>
            <Text size="18px" bold>
              러닝지역
            </Text>
          </DistanceTitle>
          <DistanceContents>
            {distance.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Text margin="12px 0 12px 41px" bold>
                    {e}
                  </Text>
                </Fragment>
              );
            })}
          </DistanceContents>
        </Grid>
      </Grid>
      <Grid
        display="flex"
        maxWidth="1360px"
        width="100%"
        height="82px"
        margin="0 auto"
        border="1px solid #000000"
        alignItems="center"
        justifyContent="right"
        padding="24px"
        borderRadius="0px 0px 3px 3px"
      >
        <SearchBtn
          onClick={() => {
            getFilter();
          }}
        >
          검색하기
        </SearchBtn>
      </Grid>
      <Hr></Hr>
    </>
  );
};

const AreaTitle = styled.div`
  width: 453px;
  height: 56px;
  border: 1px solid #000000;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 3px 0px 0px 0px;
  border-bottom: none;
`;

const AreaContents = styled.div`
  width: 453px;
  height: 228px;
  background: #ffffff;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 24px;
  box-sizing: border-box;
  overflow: auto;
  padding: 0;
  border-bottom: none;
`;

const TimeTitle = styled.div`
  width: 453px;
  height: 56px;
  border: 1px solid #000000;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  border-left: none;
  border-right: none;
  border-bottom: none;
`;

const TimeContents = styled.div`
  width: 453px;
  height: 228px;
  background: #ffffff;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 24px;
  box-sizing: border-box;
  overflow: auto;
  padding: 0;
  border-left: none;
  border-right: none;
  border-bottom: none;
`;

const DistanceTitle = styled.div`
  width: 453px;
  height: 56px;
  border: 1px solid #000000;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 0px 3px 0px 0px;
  border-bottom: none;
`;

const DistanceContents = styled.div`
  width: 453px;
  height: 228px;
  background: #ffffff;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 24px;
  box-sizing: border-box;
  overflow: auto;
  padding: 0;
  border-bottom: none;
`;

const SearchBtn = styled.button`
  background: #000000;
  border-radius: 3px;
  width: 157px;
  height: 50px;
  color: white;
  font-size: 18px;
  line-height: 25px;
  border: none;
  cursor: pointer;
`;

const Hr = styled.hr`
  width: 1360px;
  height: 0px;
  border: 1px solid #969696;
  margin: 40px auto 28px auto;
`;
export default GroupFilter;