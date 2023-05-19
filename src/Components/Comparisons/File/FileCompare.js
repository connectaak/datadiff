import { CheckCircle, FileUpload, PlayArrow } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Comparator } from "../../Common/Comparator";
import CompareDataGrid2 from "../../Common/DataGrid/CompareDataGrid2";
import { DataFilter } from "../../Functions/DataFilter";
import { DataFormatter } from "../../Functions/DataFormatter";
import { RowFormatter } from "../../Functions/RowFormatter";

export default function FileCompare({ tabID }) {
  const [rowsL, setRowsL] = useState([]);
  const [rowsR, setRowsR] = useState([]);
  const [customData, setCustomData] = useState([]);
  const [columns, setColumns] = useState([]);

  const [nameL, setNameL] = useState(false);
  const [nameR, setNameR] = useState(false);

  const [uploadingL, setUploadingL] = useState(false);
  const [uploadingR, setUploadingR] = useState(false);

  const [filter, setFilter] = useState("");

  const allowedExtensions = ["csv"];

  useEffect(() => {
    setColumns([]);
    setCustomData([]);
    setRowsL([]);
    setRowsR([]);
    setNameL(false);
    setNameR(false);
    setUploadingL(false);
    setUploadingR(false);
  }, [tabID]);

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const name = e.target.name;
      console.log(name);
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        Swal.fire(
          "Error!",
          "Mismatch File Type. Please upload .csv File only",
          "error"
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        console.log(csv.data);
        if (name === "left") {
          const rows = csv?.data;
          const headers = Object.keys(rows[0]);
          const data = [];

          for (const element of rows) {
            const row = Object.values(element);
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = row[j];
            }
            data.push(obj);
          }
          console.log(data);
          setRowsL(data);
          setNameL(inputFile.name);
          setUploadingL(true);
        } else if (name === "right") {
          const rows = csv?.data;
          const headers = Object.keys(rows[0]);
          const data = [];

          for (const element of rows) {
            const row = Object.values(element);
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = row[j];
            }
            data.push(obj);
          }
          console.log(data);

          setRowsR(data);
          setNameR(inputFile.name);
          setUploadingR(true);
        }
      };
      reader.readAsText(inputFile);
    }
  };
  let dataTypes = { string: "text", number: "numeric" };

  const handleCompare = () => {
    let result = Comparator(rowsL, rowsR);
    DataFormatter(result?.rows, setCustomData, setColumns, dataTypes);
  };

  if (filter !== "") DataFilter(customData,setCustomData,columns,setColumns, filter);
  let allRows = RowFormatter(customData);

  

  return (
    <div>
      <Grid container display={"flex"} flexWrap="wrap">
        <Grid md={6} xs={12} item>
          <Box padding={"10px"} display="flex" alignItems={"center"}>
            <Box>
              <label htmlFor="upload-file1">
                <input
                  style={{ display: "none" }}
                  name="left"
                  id="upload-file1"
                  type="file"
                  onChange={handleFileChange}
                />

                <Button
                  className="bg-dark"
                  variant="contained"
                  component="span"
                >
                  <FileUpload /> Upload First .CSV File
                </Button>
              </label>
            </Box>
          </Box>
          {uploadingL && (
            <Box mx={"5px"} display={"flex"} alignItems={"end"}>
              <Box>
                <CheckCircle color="success" />
              </Box>
              <Box mx={"5px"}>
                <Typography> {nameL} File Uploaded....!</Typography>
              </Box>
            </Box>
          )}
        </Grid>{" "}
        <Grid md={6} xs={12} item display={"flex"} justifyContent="end">
          <Box>
            <Box padding={"10px"} display="flex" alignItems={"center"}>
              <Box>
                <label htmlFor="upload-file2">
                  <input
                    style={{ display: "none" }}
                    name="right"
                    id="upload-file2"
                    type="file"
                    onChange={handleFileChange}
                  />

                  <Button
                    className="bg-dark"
                    variant="contained"
                    component="span"
                  >
                    <FileUpload /> Upload Second .CSV File
                  </Button>
                </label>
              </Box>
            </Box>
            {uploadingR && (
              <Box mx={"5px"} display={"flex"} alignItems={"end"}>
                <Box>
                  <CheckCircle color="success" />
                </Box>
                <Box mx={"5px"}>
                  <Typography> {nameR} File Uploaded....!</Typography>
                </Box>
              </Box>
            )}
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
                  height="70vh"
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
