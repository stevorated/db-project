import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { mapDispatchToProps, mapStateToProps } from '../store';
import { ChartContainer, PickerContainer } from '../components';

export const MainPage = ({ current, fetchCurrentDispatch, isILS }) => {
  const [datePicked, setDatePicked] = useState(null);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleChangePickedDate = (dateSelected) => {
    setDatePicked(dateSelected);
    setStartDate(dateSelected);
  };

  useEffect(() => {
    if (!datePicked) {
      return;
    }

    setError(false);

    (async function fetchData() {
      let res = null;
      try {
        res = await fetch(`http://localhost:8081/get/${dayjs(datePicked).format('YYYY-MM-DD')}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      } catch (err) {
        setError(true);
      }
      if (res) {
        fetchCurrentDispatch((await res.json()));
      }
    }());
  }, [datePicked]);

  return (
    <>
      {error ? (<div style={{ background: 'red', color: 'white', width: '100%' }}>Error</div>) : ''}
      <PickerContainer date={startDate} handleChangePickedDate={handleChangePickedDate} />
      {current.date && <ChartContainer current={current} date={datePicked} isILS={isILS} />}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
