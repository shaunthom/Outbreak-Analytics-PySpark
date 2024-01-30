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

export default Model;
