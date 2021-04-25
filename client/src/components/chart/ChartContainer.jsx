import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import { Spinner } from 'reactstrap';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {
  FaShekelSign, FaDollarSign, FaArrowCircleRight, FaArrowCircleLeft,
} from 'react-icons/fa';

import { media, sizes } from '../styled';
import { minMax } from '../../helpers';

export const ChartContainer = ({
  current, date, isILS, toggleCurrency, handleChangePickedDate, width,
}) => {
  const currencyIconStyle = { fontSize: '24px' };
  const data = isILS ? current.ILS : current.USD;
  const [minVal] = minMax(data.map((item) => item.value));
  useEffect(() => {

  }, [width]);
  return (
    <Card className={date ? '' : 'hide'}>
      {current.ILS && (
        <Chart
          width={width < sizes.tablet ? '350px' : '700px'}
          loader={<Spinner size="large" />}
          height="380px"
          chartType="ColumnChart"
          data={[['rate', 'price'], ...data.map((item) => Object.values(item))]}
          options={{
            title: date.toString(),
            titleTextStyle: {
              fontSize: width < sizes.tablet ? 12 : 13,
              bold: false,
              italic: true,
            },
            chartArea: { width: '50%' },
            bars: 'vertical',
            legend: { position: 'none' },
            hAxis: {

              minValue: minVal * 0.8,
            },
            vAxis: {

              title: 'Rates',
            },
          }}
        />
      )}

      <CurrencyBtnContainer onClick={() => toggleCurrency()}>
        {isILS ? <FaShekelSign style={currencyIconStyle} />
          : <FaDollarSign style={currencyIconStyle} />}
      </CurrencyBtnContainer>

      <NavigateBtnContainer
        top={230}
        topMobile={60}
        onClick={() => {
          handleChangePickedDate(dayjs(date).add(-1, 'day').toDate());
        }}
      >

        <FaArrowCircleLeft />
      </NavigateBtnContainer>

      <NavigateBtnContainer
        top={290}
        topMobile={80}
        onClick={() => {
          if (dayjs(date).add(1, 'day').isBefore(dayjs())) {
            handleChangePickedDate(dayjs(date).add(1, 'day').toDate());
          }
        }}
      >
        <FaArrowCircleRight />
      </NavigateBtnContainer>
    </Card>
  );
};

const NavigateBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${(props) => props.top}px;
    right: 25px;
    background: #D3D3D3;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    transition: all 0.1s linear;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    &:hover {
      background: #c8bbbb;
      cursor: pointer;
    }
    &:active {
      background: #a78282;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    ${media.desktop`
    bottom: unset;
    right: 20px;
    top: ${(props) => props.topMobile}%;
    width: 30px;
    height: 30px;
  `}
                      `;

const CurrencyBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 25px;
    background: #D3D3D3;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    transition: all 0.1s linear;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    &:hover {
      background: #c8bbbb;
      cursor: pointer;
    }
    &:active {
      background: #a28a8a;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    ${media.desktop`
    bottom: unset;
    right: 20px;
    top: 10%;
    width: 50px;
    height: 50px;
  `}

`;

const Card = styled.div`
  position: relative;
  //max-width: 600px;
  min-width: 400px;
  //width: 80vw;
  max-height: 380px;
  display:flex;
  padding: 100px 0;
  align-items:center;
  justify-content:center;
  margin-top: 40px;
  background: rgba(255, 255, 255);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
`;
