import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";
import { textRenderer } from "handsontable/renderers";
import React, { useRef, useState } from "react";
import { Paginate } from "../../Pagination/Paginate";
import MyPagination from "../../Pagination/Pagination";
import DataGridConfg from "./Dialogs/DataGridConfg";
import GridTopBar from "./GridTopBar";

registerAllModules();
export default function CompareDataGrid2({
  columns,
  data,
  setFilter,
  filter,
  height,
  onExcelExport,
  isDBData = false,
}) {
  let hotTableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  let parsedData = data?.map((row, i) => {
    let singleRow = [];
    for (const col of columns) {
      singleRow.push(row[col.title]);
    }
    return singleRow;
  });
  // bdffd1
  const [openConfgis, setOpenConfig] = useState(false);
  const [configurations, setConfigurations] = useState({
    diffColor: "#ebf5b7",
    noOfRowsPerPage: 20,
  });
  function RowRenderer(instance, td, row, col, prop, value, cellProperties) {
    textRenderer.apply(this, arguments);
    const rowData = instance.getSourceDataAtRow(row);
    const columnSettings = instance.getSettings().columns[col];
    if (columnSettings?.title[columnSettings?.title?.length - 1] == 1)
      td.style.textAlign = "end";
    else if (columnSettings?.title[columnSettings?.title?.length - 1] == 2)
      td.style.textAlign = "left";

    if (rowData) {
      let row = data?.filter((row) => row?.rowNo === rowData[0])[0];

      if (columnSettings?.title[columnSettings?.title?.length - 1] === "1") {
        if (
          row[columnSettings?.title + "_different"] ||
          row[columnSettings?.title + "_onlyInDb1"]
        )
          td.style.background = configurations.diffColor;
        else if (row[columnSettings?.title + "_nullInBoth"]) {
          td.style.background = "#d1d1d1";
        }
      } else if (
        columnSettings?.title[columnSettings?.title?.length - 1] === "2"
      ) {
        if (
          row[columnSettings?.title + "_different"] ||
          row[columnSettings?.title + "_onlyInDb2"]
        )
          td.style.background = configurations.diffColor;
        else if (row[columnSettings?.title + "_nullInBoth"]) {
          td.style.background = "#d1d1d1";
        }
      }
    }
    td.style.borderBottom = "1px solid #4a4a4a";
    td.style.borderRight = "1px solid #4a4a4a";

    td.innerText = value;
  }
  
  let exportCSV = () => {
    const hotInstance = hotTableRef.current.hotInstance;
    hotInstance.getPlugin("exportFile").downloadFile("csv", {
      bom: true,
      columnDelimiter: ",",
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: "csv",
      filename: "compare-data",
      mimeType: "text/csv",
      rowDelimiter: "\r\n",
      rowHeaders: true,
    });
  };

  let items = Paginate(parsedData, currentPage, configurations.noOfRowsPerPage);

  const resetFilterSortConfig = () => {
    if (hotTableRef.current) {
      hotTableRef.current.hotInstance.loadData(items);
      hotTableRef.current.hotInstance.updateSettings({
        columns: columns,
      });
    }
  };
  return (
    <div>
      <GridTopBar
        onExport={exportCSV}
        filter={filter}
        setFilter={setFilter}
        onOpenConfig={() => setOpenConfig(true)}
        onExcelExport={onExcelExport}
        isDBData={isDBData}
        resetFilterSortConfig={resetFilterSortConfig}
      />
      <HotTable
        ref={hotTableRef}
        data={items}
        allowRemoveColumn={true}
        stretchH="all"
        columns={columns}
        height={height ? height : "48vh"}
        rowHeights="25px"
        customBorders={true}
        dropdownMenu={true}
        columnSorting={true}
        // multiColumnSorting={true}
        manualColumnMove
        filters={true}
        manualRowMove={true}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        cells={function (row, col) {
          const cellProperties = {};
          cellProperties.renderer = RowRenderer;
          cellProperties.editor = "text";
          cellProperties.readOnly = false;
          return cellProperties;
        }}
      />
      {parsedData.length > 0 && (
        <MyPagination
          currentPage={currentPage}
          itemsCount={parsedData.length}
          pageSize={configurations.noOfRowsPerPage}
          handleChange={(val) => setCurrentPage(val)}
        />
      )}
      <DataGridConfg
        open={openConfgis}
        setOpen={setOpenConfig}
        configs={configurations}
        setConfigs={setConfigurations}
      />
    </div>
  );
}
