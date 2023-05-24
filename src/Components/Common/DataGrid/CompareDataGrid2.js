import { Box, Pagination, Typography } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import React, { useState } from "react";
import GridTopBar from "./GridTopBar";

export default function CompareDataGrid({
  columns,
  data,
  setFilter,
  filter,
  height,
  onExcelExport,
  isDBData = false,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const apiRef = useGridApiRef();

  let parsedData = data?.map((row, i) => {
    let singleRow = {};
    for (const col of columns) {
      singleRow[col?.title] = row[col?.title];
    }

    singleRow.id = i + 1;
    let hasMatched = false;
    const keys = Object.keys(row);
    for (const key of keys) {
      if (key.endsWith("_different")) {
        if (row[key] === true) {
          hasMatched = true;
          break;
        }
      }
    }
    if (hasMatched) {
      singleRow.status = "Not_Matched";
    } else {
      singleRow.status = "Matched";
    }
    return singleRow;
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedData = parsedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    title: "ComparisonRows",
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  return (
    <div style={{ height: 400, width: "100%", position: "relative" }}>
      <GridTopBar
        onExport={csvOptions}
        filter={filter}
        setFilter={setFilter}
        onExcelExport={onExcelExport}
        isDBData={isDBData}
        apiRef={apiRef}
      />
      {Object.keys(parsedData[0]).length === 1 ? (
        <Typography align="center">There is no different data</Typography>
      ) : (
        <>
          <DataGrid
            rows={paginatedData}
            columns={columns}
            minHeight={500}
            disableSelectionOnClick
            disableColumnMenu
            autoHeight
            columnBuffer={2}
            density="compact"
            showCellVerticalBorder
            apiRef={apiRef}
            showColumnVerticalBorder
            hideFooter
            sx={{
              "& .MuiDataGrid-cell": {
                border: 1,
                borderRight: 0,
                borderTop: 0,
              },
              "& .MuiDataGrid-columnHeaders": {
                border: 1,
                borderLeft: 1,
              },
              "& .MuiDataGrid-columnHeader": {
                borderRight: 1,
              },
              '& .row-db1-different': {
                backgroundColor: '#FFC7CE',
                color: '#9C0006',
                justifyContent: "flex-end"
              },
              '& .row-db2-different': {
                backgroundColor: '#FFC7CE',
                color: '#9C0006',
                justifyContent: "flex-start"
              },
              '& .row-db1-not-different': {
                backgroundColor: '#C6EFCE',
                color: '#006100',
                justifyContent: "flex-end"
              },
              '& .row-db2-not-different': {
                backgroundColor: '#C6EFCE',
                color: '#006100',
                justifyContent: "flex-start"
              },
              '& .row-null-in-both': {
                backgroundColor: 'green',
                color: '#1a3e72',
              },
            }}
            getCellClassName={(params) => {
              const col = params.field;
              const row = data.find((item) => item.id === params.id);
              if (row) {
                if (col.endsWith("_db1")) {
                  if (row[col + "_different"] || row[col + "_onlyInDb1"]) {
                    return "row-db1-different";
                  } else {
                    return "row-db1-not-different";
                  }
                } else if (col.endsWith("_db2")) {
                  if (row[col + "_different"] || row[col + "_onlyInDb2"]) {
                    return "row-db2-different";
                  } else {
                    return "row-db2-not-different";
                  }
                }
              }
              return "";
            }}
          />
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", mb:"20px", mt:"10px"}}>
          <div>
            Rows per page:{" "}
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <Pagination
            count={Math.ceil(parsedData.length / pageSize)}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            siblingCount={2}
            size="small"
            style={{ marginTop: 16 }}
          />
          </Box>
            
        
        </>
      )}
    </div>
  );
}
