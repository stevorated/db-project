import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Alert } from 'reactstrap';
import { mapDispatchToProps, mapStateToProps } from '../store';
import { ChartContainer, PickerContainer } from '../components';

export const MainPage = ({
  current, fetchCurrentDispatch, isILS, toggleCurrency, size,
}) => {
  const [datePicked, setDatePicked] = useState(null);
  const [error, setError] = useState(false);
  const [warn, setWarn] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleChangePickedDate = (dateSelected) => {
    setWarn(false);
    setDatePicked(dateSelected);
    setStartDate(dateSelected);
  };

  useEffect(() => {
    if (!datePicked) {
      // return setDatePicked(dayjs().format('YYYY-MM-DD'));
      setDatePicked(`${dayjs()}(Israel Daylight Time)`);
      return;
    }

    if (dayjs(datePicked).isAfter(dayjs())) {
      setDatePicked(dayjs().format('YYYY-MM-DD'));
      setStartDate(new Date());
      setWarn(true);
      setError('error');
    }

    const formattedDate = dayjs(datePicked).format('YYYY-MM-DD');

    if (datePicked) setError(false);

    (async function fetchData() {
      let res = null;

      try {
        res = await fetch(`http://localhost:8081/get/${formattedDate}`);
        if (!res.ok) {
          setDatePicked(dayjs().format('YYYY-MM-DD'));
          setStartDate(new Date());
          setWarn(true);
          throw new Error(res.status);
        }
      } catch (err) {
        setError(res ? '' : 'Unknown Error, Please try again later');
      }
      if (res) {
        fetchCurrentDispatch((await res.json()));
      }
    }());
  }, [datePicked]);

  return (
    <div style={{ position: 'relative' }}>
      {warn && (
        <WarningAlert
          fade={false}
          color="danger"
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '10%',
            left: '10%',
            zIndex: 100000,
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
          }}
        >
          The Date Does Not Exist, Pick another one.
        </WarningAlert>
      )}
      <PickerContainer date={startDate} handleChangePickedDate={handleChangePickedDate} />
      {current.date
      && (

        <ChartContainer
          width={size.width || 600}
          current={current}
          date={datePicked}
          isILS={isILS}
          handleChangePickedDate={handleChangePickedDate}
          toggleCurrency={toggleCurrency}
        />
      )}
      {error ? (
        <Alert fade>{error}</Alert>
      ) : ''}

    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

const WarningAlert = styled(Alert)`
  position: absolute;
  bottom: 5%;
  right: 10%;
  left: 10%;
  z-index: 100000;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
`;
