import React, { useState, Fragment, useEffect } from "react";
import { Grid, Text } from "../../elements";
import styled from "styled-components";

const ThemeFilter = (props) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  useEffect(() => {
    props?.setFilterTheme(checkedInputs);
  }, [checkedInputs]);

  console.log(checkedInputs);

  const [theme, setTheme] = useState([
    "전체",
    "도시",
    "공원",
    "트랙",
    "강변",
    "해변",
    "산",
  ]);

  const choiceTheme = (e, idx) => {
    if (e.target.checked) {
      setCheckedInputs([...checkedInputs, theme[idx]]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== theme[idx]));
    }
  };

  return (
    <Grid display="flex" alignItems="center" width="100%" margin="0 auto">
      <Text size="16px" bold margin="0 16px 0 0">
        러닝 테마
      </Text>

      {theme.map((e, idx) => {
        return (
          <Fragment key={idx}>
            <Label
              onChange={(e) => {
                choiceTheme(e, idx);
              }}
              checked={checkedInputs.includes(idx)}
            >
              <input type="checkbox" name={e} value={idx} />
              <Text>{e}</Text>
            </Label>
          </Fragment>
        );
      })}
    </Grid>
  );
};

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    width: auto;
    padding: 8px 19px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    border: solid 1px #f0f0f0;
    background-color: #f0f0f0;
    cursor: pointer;
    box-sizing: border-box;
    color: #000;
  }
  input:checked + p {
    border: solid 1px #030c37;
    background-color: #030c37;
    color: #68f99e;
    font-weight: 500;
  }
  margin: 0 12px 0 0;
`;
export default ThemeFilter;
