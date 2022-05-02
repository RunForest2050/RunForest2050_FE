import React from 'react';
import styled from "styled-components";

const Make = () => {
    return (
        <div>
            <Btn>내가 만든 그룹 러닝</Btn>
        </div>
    );
};

const Btn = styled.button`
  width: 150px;
  height: 40px;
  border: transparent;
  background-color: transparent;
  :hover{
     width: 150px;
     height: 40px;
     border-radius: 5px;
     background-color: black;
     color: white;
  }
`;

export default Make;