let RowFormatter = (data) => {

  let allRows = [];
  for (const row of data) {
    let singleRow = {};
    for (const col of row?.rows) {
      let col1 = col?.columnName;
      let col2 = col?.columnName;
      singleRow["id"] = col?.id;
      // singleRow["rowNo"] = col?.rowNo;
      singleRow[col1] = col?.columnValue;
      singleRow[col2] = col?.columnValue;
      singleRow[col1 + "_different"] = col?.different;
      singleRow[col1 + "_onlyInDb2"] = col?.onlyInDb2;
      singleRow[col1 + "_nullInBoth"] = col?.nullInBoth;
      singleRow[col1 + "_onlyInDb1"] = col?.onlyInDb1;
      singleRow[col2 + "_different"] = col?.different;
      singleRow[col2 + "_onlyInDb2"] = col?.onlyInDb2;
      singleRow[col2 + "_nullInBoth"] = col?.nullInBoth;
      singleRow[col2 + "_onlyInDb1"] = col?.onlyInDb1;
      singleRow[col1 + "_comments"] = col?.comments;
      singleRow[col2 + "_error"] = col?.error;
    }
    allRows.push(singleRow);
  }

  return allRows;
};

export { RowFormatter };

