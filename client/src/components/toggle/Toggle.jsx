import Switch from 'react-switch';
import React from 'react';
import { FaShekelSign, FaDollarSign } from 'react-icons/fa';
import styled from 'styled-components';

export const Toggle = ({ isILS, handleChangeSetIls }) => (
  <ToggleContainer>
    <span>
      <FaDollarSign fontSize="40px" />
    </span>
    <Switch
      uncheckedIcon={false}
      checkedIcon={false}
      onColor="#D4D4D4"
      offColor="#5C5C5C"
      onChange={() => handleChangeSetIls()}
      checked={isILS}
    />
    <span>
      <FaShekelSign fontSize="40px" />
    </span>
  </ToggleContainer>
);

const ToggleContainer = styled.div`
  display: flex;
  min-width: 200px;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 20px;
  flex: 1.5;
`;
