let DataFilter = (customData,setCustomData,columns,setColumns, filter) => {

  const filteredData = customData.map(item => {
    const filteredRows = item.rows.filter(row => {
      switch (filter) {
        case "all":
          return row;
        case "different":
          return row.different;
        default:
          return row;
      }
    });
    return { ...item, rows: filteredRows };
  });

  const columnNames = filteredData.flatMap((item) =>
  item.rows.map((row) => ({ title: row.columnName, type: 'text' }))
);
const uniqueArray = Array.from(new Set(columnNames.map(obj => obj.title)))
  .map(title => columnNames.find(obj => obj.title === title));
uniqueArray.unshift({title: 'rowNo', type: 'numeric'})
setCustomData(filteredData)

switch (filter) {
  case "all":
    return setColumns(columns);
  case "different":
    return setColumns(uniqueArray);
  default:
    return setColumns(columns);
}

};
export { DataFilter };


