import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

export function PickerContainer({ date, handleChangePickedDate }) {
  return (
    <Container>
      {/* eslint-disable-next-line max-len */}
      <StyledDatePicker maxDate={new Date()} selected={date} onChange={(datePicked) => handleChangePickedDate(datePicked)} />
    </Container>
  );
}

const Container = styled.div`
  background: lightgrey;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  background: transparent;
`;
