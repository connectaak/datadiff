let DataFilter = (customData,setCustomData,columns,setColumns, filter) => {
  console.log(customData,"customData")
 const data= customData.map(item=>{

 item.rows= item.rows.map(item=>item.different)
 return item
 })
 console.log(data,"editedcustomData")
};

export { DataFilter };
// let DataFilter = (allRows, filter) => {
//   return allRows.filter((row) => {
//     let arrOfCols = Object.keys(row);
//     let filterCols = arrOfCols.filter((col) => col.includes(filter));
//     return filterCols.some((col) => row[col]);
//   });
// };

// export { DataFilter };
