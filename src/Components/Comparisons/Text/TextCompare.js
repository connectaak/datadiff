import { Grid, Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { PlayArrow } from "@mui/icons-material";
import { Comparator } from "../../Common/Comparator";
import CompareDataGrid2 from "../../Common/DataGrid/CompareDataGrid2";
import { DataFormatter } from "../../Functions/DataFormatter";
import { RowFormatter } from "../../Functions/RowFormatter";
import { DataFilter } from "../../Functions/DataFilter";
export default function TextCompare({ tabID }) {
  const [rowsL, setRowsL] = useState([]);
  const [rowsR, setRowsR] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  let dataTypes = { string: "text", number: "numeric" };
  useEffect(() => {
    setColumns([]);
    setCustomData([]);
    setRowsL([]);
    setRowsR([]);
    setText1("");
    setText2("");
  }, [tabID]);
  const handleCompare = () => {
    let result = Comparator(rowsL, rowsR);
    DataFormatter(result?.rows, setCustomData, setColumns, dataTypes);
  };

  const [filter, setFilter] = useState("");

  let allRows = RowFormatter(customData);

  if (filter !== "") allRows = DataFilter(allRows, filter);

  return (
    <div>
      <Grid container display={"flex"} flexWrap="wrap" spacing={2}>
        <Grid md={6} xs={12} item>
          <Typography variant="h6">Textbox 1</Typography>
          <Box>
            <textarea
              className="form-control"
              rows={6}
              value={text1}
              onChange={(e) => {
                let value = e.target.value;
                setText1(value);
                Papa.parse(value, {
                  complete: (result) => {
                    const rows = result?.data;
                    const headers = rows[0];
                    const data = [];

                    for (let i = 1; i < rows.length; i++) {
                      const row = rows[i];
                      const obj = {};
                      for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = row[j];
                      }
                      data.push(obj);
                    }
                    setRowsL(data);
                  },
                });
              }}
            />
          </Box>
        </Grid>{" "}
        <Grid md={6} xs={12} item>
          <Typography variant="h6">Textbox 2</Typography>

          <Box>
            <textarea
              className="form-control"
              rows={6}
              value={text2}
              onChange={(e) => {
                let value = e.target.value;
                setText2(value);
                if (value)
                  Papa.parse(value, {
                    complete: (result) => {
                      const rows = result?.data;
                      const headers = rows[0];
                      const data = [];

                      for (let i = 1; i < rows.length; i++) {
                        const row = rows[i];
                        const obj = {};
                        for (let j = 0; j < headers.length; j++) {
                          obj[headers[j]] = row[j];
                        }
                        data.push(obj);
                      }
                      setRowsR(data);
                    },
                  });
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} position="relative">
          <Box display={"flex"} justifyContent="center">
            <Box
              sx={{
                position: { md: "absolute" },
                top: {
                  md: "-35px",
                },
              }}
            >
              <IconButton
                size="large"
                sx={{
                  background: "#198754",
                  color: "white",
                  "&:hover": {
                    md: {
                      backgroundColor: "#f7f3f3",
                      color: "#198754",
                    },
                    xs: {
                      backgroundColor: "#198754",
                      color: "#f7f3f3",
                    },
                  },
                }}
                onClick={handleCompare}
              >
                <PlayArrow
                  sx={{
                    "&:hover": {
                      md: {
                        color: "#198754",
                      },
                      xs: {
                        color: "#f7f3f3",
                      },
                    },
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} padding="20px">
          <Box>
            {customData.length > 0 && (
              <>
                <CompareDataGrid2
                  columns={columns}
                  data={allRows}
                  setFilter={setFilter}
                  filter={filter}
                  // onExcelExport={onExcelExport}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
