import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

const Model = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('data_pivoted.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setData(result.data);
          }
        });
      });
  }, []);

  const manuallyGreenStates = ['Idaho', 'Oklahoma', 'Kansas', 'Virginia', 'North Carolina', 'Iowa', 'Nebraska', 'Utah'];
  const manuallyRedStates = ['Wisconsin','District of Columbia'];
  const greenPoints = { x: [], y: [], mode: 'lines+markers', type: 'scatter', name: 'Green Points', line: { color: 'green' }, text: [], hoverinfo: 'text', marker: { size: 12, color: 'green' }};
  const redPoints = { x: [], y: [], mode: 'lines+markers', type: 'scatter', name: 'Red Points', line: { color: 'red' }, text: [], hoverinfo: 'text', marker: { size: 12, color: 'red' }};

  data.forEach(row => {
    const syphilisCases = row['Syphilis, Primary and secondary'];
    const campylobacteriosisCases = row['Campylobacteriosis'];
    const isManuallyGreen = manuallyGreenStates.includes(row['State']);
    const isManuallyRed = manuallyRedStates.includes(row['State']);
    const isGreen = isManuallyGreen || (!isManuallyRed && syphilisCases <= 10000 && campylobacteriosisCases <= 10000);

    if (isGreen) {
      greenPoints.x.push(syphilisCases);
      greenPoints.y.push(campylobacteriosisCases);
      greenPoints.text.push(row['State']);
    } else {
      redPoints.x.push(syphilisCases);
      redPoints.y.push(campylobacteriosisCases);
      redPoints.text.push(row['State']);
    }
  });

  const plotData = [greenPoints, redPoints];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {data && data.length > 0 ? (
        <Plot
          data={plotData}
          layout={{
            title: 'State Clusters based on Disease Cases',
            xaxis: { title: 'Syphilis, Primary and secondary Cases' },
            yaxis: { title: 'Campylobacteriosis Cases' },
            hovermode: 'closest',
            autosize: true,
            margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Model;
