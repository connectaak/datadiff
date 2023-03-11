let DataFilter = (allRows, filter) => {
  return allRows.filter((row) => {
    let arrOfCols = Object.keys(row);
    let filterCols = arrOfCols.filter((col) => col.includes(filter));
    return filterCols.some((col) => row[col]);
  });
};

export { DataFilter };
