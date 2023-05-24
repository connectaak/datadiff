const CustomCell = ({ value }) => {
  // Apply custom styles to the cell
  const cellStyle = {
  
    // border: '1px solid #ccc',
    // padding: '8px',
    // textAlign:"center",
    // width:"100%"
    // Add more custom styles as needed
  };

  return <div style={cellStyle}>{value}</div>;
};
export const DataFormatter = (data, dataTypes) => {
  if (data[0]?.rows?.length > 0) {
    // setLastRefreshed(new Date().toLocaleTimeString());
    let cols = data[0].rows?.map((col) => {
      return [
        {
          title: col?.columnName,
          field: col?.columnName,
          type: dataTypes[col?.dataType] || "text",
          sortable: false,
          minWidth:120
      }
      ];
    });
    let allCols = [];
    for (const col of cols) {
      allCols.push(col[0]);
    }
allCols.unshift({
  title:"status",
field:"status",
 type:"text",
  sortable: false, 
  minWidth:120
})
allCols.unshift({
  title:"id",
field:"id",
 type:"numeric",
  sortable: false, 
})
return{data,
  allCols}

  } else alert("No Columns Found");
};



