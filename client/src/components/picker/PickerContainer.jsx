import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

export function PickerContainer({ date, handleChangePickedDate }) {
  return (
    <Container>
      {/* eslint-disable-next-line max-len */}
      <StyledDatePicker selected={date} onChange={(datePicked) => handleChangePickedDate(datePicked)} />
    </Container>
  );
}

const Container = styled.div`
  background: lightgrey;  
  //margin-bottom: 10vw;
  
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;
