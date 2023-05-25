import {
  GridOff,
  Save,
  TableRows
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
// import CustomToolbar from "../CustomToolbar";

export default function GridTopBar({
  filter,
  setFilter,
  apiRef
}) {


  const handleExport= () => {
    const gridApi = apiRef.current;
    gridApi.exportDataAsCsv({ delimiter: ";", utf8WithBom: true });
  };
  const handleReset= () => {
    // const gridApi = apiRef.current;
    // gridApi.reset({ delimiter: ";", utf8WithBom: true })
    // apiRef.current.state({ delimiter: ";", utf8WithBom: true })
  };

  return (
    <div className="bg-success mt-3">
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
          {/* <Tooltip title="Only in Data 1">
            <IconButton onClick={() => setFilter("_onlyInDb1")}>
              <JoinLeft
                sx={{ color: filter === "_onlyInDb1" ? "yellow" : "white" }}
              />
            </IconButton>
          </Tooltip> */}
          <Tooltip title=" Not Matched ">
            <IconButton onClick={() => setFilter("different")}>
              <GridOff
                sx={{ color: filter === "different" ? "yellow" : "white" }}
              />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Only in Data 2">
            <IconButton onClick={() => setFilter("_onlyInDb2")}>
              <JoinRight
                sx={{ color: filter === "_onlyInDb2" ? "yellow" : "white" }}
              />
            </IconButton>
          </Tooltip> */}
        </div>
        <div className="d-flex align-items-center">
        <Tooltip title="Export in Excel">
                <IconButton  onClick={handleExport}>
                  <Save sx={{ color: "white" }} />
                </IconButton>
        </Tooltip>
        
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
    </div>
  );
}
