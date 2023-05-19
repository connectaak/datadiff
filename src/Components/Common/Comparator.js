const Comparator = (data1, data2) => {
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
  return { columnNames, rows };
};
export { Comparator };

