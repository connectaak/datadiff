export const DataFormatter = (data, dataTypes) => {
  if (data[0]?.rows?.length > 0) {
    // setLastRefreshed(new Date().toLocaleTimeString());
    let cols = data[0].rows?.map((col) => {
      return [
        {
          title: col?.columnName,
          type: dataTypes[col?.dataType] || "text",
        },
      ];
    });
    let allCols = [
      {
        title: "rowNo",
        type: "numeric",
      },
    ];
    for (const col of cols) {
      allCols.push(col[0]);
    }

return{data,
  allCols}

  } else alert("No Columns Found");
};



