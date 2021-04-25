import React from 'react';
import Chart from 'react-google-charts';
import styled from 'styled-components';

export const ChartContainer = ({ current, date, isILS }) => {
  const data = isILS ? current.ILS : current.USD;
  const text = isILS ? 'Values is ILS' : 'Values is USD';

  return (
    <Card className={date ? '' : 'hide'}>
      {current.ILS && (

        <Chart
          width="400px"
          height="300px"
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[['x', 'price'], ...data.map((item) => Object.values(item))]}
          options={{
            title: text,
            // series: { targetAxisIndex: -1 },
            // hAxis: { minValue: 0 },
            chartArea: { width: '50%' },
            // hAxis: {
            //   title: 'Total Population',
            //   minValue: 0,
            // },
            bars: 'vertical',
            vAxis: {
              minValue: 0,
              title: 'Rates',
            },
          }}
        />
      )}
    </Card>
  );
};

const Card = styled.div`
  max-width: 400px;
  width: 80vw;
  max-height: 400px;
  display:flex;
  justify-content:center;
  margin-top: 40px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
`;
