import {
  GridOff,
  Save,
  TableRows
} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import * as XLSX from 'xlsx';

export default function GridTopBar({
  filter,
  setFilter,
  apiRef
}) {
  const [filterValue,setFilterValue]=useState("")

  const handleQuickFilterChange = (event) => {
    const value = event.target.value;
    apiRef.current.setQuickFilterValues(value);
    setFilterValue(value)
  };
  const handleExportCsv= () => {
    if (apiRef && apiRef.current) {
      apiRef.current.exportDataAsCsv(); 
     }
  };
  const convertCSVtoExcel = (csvData) => {
    const csvArray = csvData.split('\n').map(row => row.split(','));
    const worksheet = XLSX.utils.aoa_to_sheet(csvArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'converted_excel_file.xlsx');
  };
  
  const handleExportExcel= () => {
    if (apiRef && apiRef.current) {
     
const csvData=apiRef.current.getDataAsCsv();
console.log(csvData,"csv Data")
if(csvData){
convertCSVtoExcel(csvData);
}
} 
  };
  // const handleReset= () => {
    // const gridApi = apiRef.current;
    // gridApi.reset({ delimiter: ";", utf8WithBom: true })
    // apiRef.current.state({ delimiter: ";", utf8WithBom: true })
  // };



  
  return (
    <Box sx={{background:"#1976d2"}} className=" mt-3">
      <div className="d-flex ">
        <div style={{ display: "flex", gap: "0.5rem", flex: "1" }}>
          <Tooltip title=" All Rows">
            <IconButton
              onClick={() => setFilter("all")}
              color={filter === "" ? "warning" : "info"}
            >
              <TableRows sx={{ color: filter === "all" ? "yellow" : "white" }} />
            </IconButton>
          </Tooltip>{" "}
         
          <Tooltip title=" Not Matched ">
            <IconButton onClick={() => setFilter("different")}>
              <GridOff
                sx={{ color: filter === "different" ? "yellow" : "white" }}
              />
            </IconButton>
          </Tooltip>
         
        </div>
        <div className="d-flex align-items-center">
        <Tooltip title="Export in CSV">
                <IconButton  onClick={handleExportCsv}>
                  <Save sx={{ color: "white" }} />
                </IconButton>
        </Tooltip>
        <Tooltip title="Export in Excel">
                <IconButton  onClick={handleExportExcel}>
                  <Save sx={{ color: "white" }} />
                </IconButton>
        </Tooltip>
        <Box sx={{padding:"5px"}}>
        <TextField
        sx={{background:"white",margin:"0 5px", borderRadius:"5px"}}
        id="outlined-basic" 
        value={filterValue}
        type="search" 
        onChange={handleQuickFilterChange}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        />
        
        </Box>
          {/* <Tooltip title="Reset Grid">
            <IconButton onClick={handleReset}>
              <RotateLeftSharp sx={{ color: "white" }} />
            </IconButton>
          </Tooltip> */}
         {/*  <Tooltip title="Grid Configurations">
            <IconButton onClick={() => onOpenConfig()}>
              <Settings sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          {isDBData && (
            <Tooltip title="Export in Excel">
              <IconButton onClick={() => onExcelExport()}>
                <Save sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Export as CSV">
            <IconButton onClick={() => onExport()}>
              <FileDownload sx={{ color: "white" }} />
            </IconButton>
          </Tooltip> */}
        </div>
      </div>
    </Box>
  );
}
