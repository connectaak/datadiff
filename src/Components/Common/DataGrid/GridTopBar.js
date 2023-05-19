import {
  FileDownload,
  GridOff,
  JoinLeft,
  JoinRight,
  RotateLeftSharp,
  Save,
  Settings,
  TableRows,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

export default function GridTopBar({
  filter,
  setFilter,
  onExport,
  onOpenConfig,
  onExcelExport,
  resetFilterSortConfig,
  isDBData,
}) {
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
          <Tooltip title="Only in Data 1">
            <IconButton onClick={() => setFilter("_onlyInDb1")}>
              <JoinLeft
                sx={{ color: filter === "_onlyInDb1" ? "yellow" : "white" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title=" Not Matched ">
            <IconButton onClick={() => setFilter("different")}>
              <GridOff
                sx={{ color: filter === "different" ? "yellow" : "white" }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Only in Data 2">
            <IconButton onClick={() => setFilter("_onlyInDb2")}>
              <JoinRight
                sx={{ color: filter === "_onlyInDb2" ? "yellow" : "white" }}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className="d-flex align-items-center">
          <Tooltip title="Reset Grid">
            <IconButton onClick={resetFilterSortConfig}>
              <RotateLeftSharp sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Grid Configurations">
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
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
