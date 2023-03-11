import React from "react";
import MaterialReactTable from "material-react-table";
import { IconButton, Tooltip } from "@mui/material";
import { ExportToCsv } from "export-to-csv";
import {
  FileDownload,
  GridOff,
  JoinLeft,
  JoinRight,
  TableRows,
} from "@mui/icons-material";
export default function CompareDataGrid({
  columns = [],
  data = [],
  setFilter,
  filter,
}) {
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
  const csvExporter = new ExportToCsv(csvOptions);
  const handleExportRows = (rows) => {
    let cols = columns.map((c) => c.header);
    let allRows = rows.map((row) => {
      let singleRow = {};
      for (const key of cols) {
        singleRow[key] = row.original[key];
      }
      return singleRow;
    });
    csvExporter.generateCsv(allRows);
  };
  return (
    <div className="my-3">
      <MaterialReactTable
        muiSearchTextFieldProps={{ sx: { background: "skyblue" } }}
        columns={columns}
        data={data}
        initialState={{ density: "compact" }}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enableRowSelection
        enableResizing
        enablePinning
        muiTableBodyCellProps={({ cell }) => {
          let col = cell.column.id;
          let row = cell.row.original;

          if (col[col?.length - 1] === "1") {
            if (row[col + "_different"] || row[col + "_onlyInDb1"])
              return {
                sx: {
                  background: "#bacfff",
                },
              };
            else if (row[col + "_nullInBoth"]) {
              return {
                sx: {
                  background: "#d1d1d1",
                  color: "black",
                },
              };
            }
          } else if (col[col?.length - 1] === "2") {
            if (row[col + "_different"] || row[col + "_onlyInDb2"])
              return {
                sx: {
                  background: "#bacfff",
                },
              };
            else if (row[col + "_nullInBoth"]) {
              return {
                sx: {
                  background: "#d1d1d1",
                  color: "black",
                },
              };
            }
          }
        }}
        muiTopToolbarProps={{
          sx: { color: "white", background: "#042f93" },
        }}
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Tooltip title=" All Rows">
                <IconButton
                  onClick={() => setFilter("")}
                  color={filter === "" ? "warning" : "info"}
                >
                  <TableRows
                    sx={{ color: filter === "" ? "orange" : "white" }}
                  />
                </IconButton>
              </Tooltip>{" "}
              <Tooltip title="Only in DB 1">
                <IconButton onClick={() => setFilter("_onlyInDb1")}>
                  <JoinLeft
                    sx={{ color: filter === "_onlyInDb1" ? "orange" : "white" }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title=" Not Matched ">
                <IconButton onClick={() => setFilter("_different")}>
                  <GridOff
                    sx={{ color: filter === "_different" ? "orange" : "white" }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Only in DB 2">
                <IconButton onClick={() => setFilter("_onlyInDb2")}>
                  <JoinRight
                    sx={{ color: filter === "_onlyInDb2" ? "orange" : "white" }}
                  />
                </IconButton>
              </Tooltip>
              {(table.getIsSomeRowsSelected() ||
                table.getIsAllRowsSelected()) && (
                <Tooltip title="Export as CSV">
                  <IconButton
                    onClick={() =>
                      handleExportRows(table.getSelectedRowModel().rows)
                    }
                    disabled={
                      !table.getIsSomeRowsSelected() &&
                      !table.getIsAllRowsSelected()
                    }
                  >
                    <FileDownload sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
