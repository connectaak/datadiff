import Handsontable from "handsontable";
import Papa from "papaparse";
import React, { useState } from "react";

export default function CompareData() {
  const [comparisonResult, setComparisonResult] = useState(null);
  // Parse input CSV data into arrays of objects
  const csv1 = "a,b,c\n1,2,3\n4,5,6";
  const csv2 = "a,b,c\n1,2,4\n4,5,6";
  const data1 = Papa.parse(csv1, { header: true }).data;
  const data2 = Papa.parse(csv2, { header: true }).data;
  const compareData = () => {
    if (data1.length === 0 || data2.length === 0) {
      alert("Please provide both sets of data");
      return;
    }

    const columnNames = [];
    const rows = [];

    // Create an array of column names
    Object.keys(data1[0]).forEach((columnName) => {
      columnNames.push(`${columnName}_db1`);
      columnNames.push(`${columnName}_db2`);
    });

    // Compare the two arrays of objects
    for (let i = 0; i < data1.length; i++) {
      const row = { rows: [], different: false };
      for (const [columnName, columnValue] of Object.entries(data1[i])) {
        const column2Value = data2[i][columnName];
        const dataType = typeof columnValue;

        // Compare column values and log differences
        const different = columnValue !== column2Value;
        row.rows.push({
          rowNo: i + 1,
          colNo: columnNames.indexOf(`${columnName}_db1`) + 1,
          columnName: `${columnName}_db1`,
          columnValue,
          dataType,
          comments: null,
          error: different,
          nullInBoth: false,
          onlyInDb1: false,
          different,
          onlyInDb2: false,
        });
        row.rows.push({
          rowNo: i + 1,
          colNo: columnNames.indexOf(`${columnName}_db2`) + 1,
          columnName: `${columnName}_db2`,
          columnValue: column2Value,
          dataType,
          comments: null,
          error: different,
          nullInBoth: false,
          onlyInDb1: false,
          different,
          onlyInDb2: false,
        });
        row.different = row.different || different;
      }
      rows.push(row);
    }

    // Set the comparison result
    setComparisonResult({ columnNames, rows });
  };
  compareData();
  const renderTable = () => {
    if (comparisonResult === null) {
      return null;
    }

    const hotData = [];
    comparisonResult.rows.forEach((row) => {
      row.rows.forEach((cell) => {
        if (hotData[cell.rowNo - 1] === undefined) {
          hotData[cell.rowNo - 1] = [];
        }
        hotData[cell.rowNo - 1][cell.colNo - 1] = cell.columnValue;
      });
    });

    const hotSettings = {
      data: hotData,
      colHeaders: comparisonResult.columnNames,
      rowHeaders: true,
      cells: (row, col, prop) => {
        const cell = comparisonResult.rows[row].rows[col / 2];
        const className = cell.different ? "different" : "";
        const bg = cell.different ? "yellow" : "white";
        return { className, readOnly: true, renderer: "text", bg };
      },
    };

    return <Handsontable id="dataTable" settings={hotSettings} />;
  };

  return (
    <div>
      <div></div>
    </div>
  );
}
