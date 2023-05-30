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

  const [draggingL, setDraggingL] = useState(false);
  const [draggingR, setDraggingR] = useState(false);
 

  const handleDragEnter = (e,name) => {
    e.preventDefault();
    e.stopPropagation(); 
    if(name==="left"){
      setDraggingL(true);
    }else{
      setDraggingR(true);
    }
    
  };

  const handleDragLeave = (e,name) => {
    e.preventDefault();
    if(name==="left"){
      setDraggingL(false);
    }else{
      setDraggingR(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e,name) => {
    e.preventDefault();
    if(name==="left"){
      setDraggingL(false);
    }else{
      setDraggingR(false);
    }
    
  const droppedFiles = e.dataTransfer.files;
  const inputFile = droppedFiles[0];
 
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

      setRowsR(data);
      setNameR(inputFile.name);
      setUploadingR(true);
    }
  };
  reader.readAsText(inputFile);
  };
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
    const {data,
    allCols}=DataFormatter(result?.rows,dataTypes);

    setColumns(allCols)
    setCustomData(data)
    
  };

 useEffect(()=>{
 
  if (filter !== "") {
    let result = Comparator(rowsL, rowsR);
    const {data,
      allCols}=DataFormatter(result?.rows,dataTypes);
  
    DataFilter(data,setCustomData,allCols,setColumns, filter)
  };
 },[ filter])
  let allRows = RowFormatter(customData);


  return (
    <div>
      <Box display="flex"  justifyContent="space-between" alignItems="center">
          <Box>
          <Box sx={{background:draggingL&&"gray",width:{xs:'300px',sm:"300px",md:"400px"},height:"150px",border:"2px solid gray", borderStyle:"dashed", borderRadius:"10px" }} padding={"10px"} display="flex" alignItems={"center"} justifyContent={"center"}
                onDragEnter={(e)=>handleDragEnter(e,"left")}
                onDragLeave={(e)=>handleDragLeave(e,"left")}
                onDragOver={handleDragOver}
                onDrop={(e)=>handleDrop(e,"left")}
          
          >
            <Box display="flex" alignItems="center">
            {uploadingL ? (
        <Box>
          <Typography variant="body2" align={"center"}>Uploaded The First File  &nbsp;</Typography>
        </Box>
      ) : (
        <>
           <Typography variant="body2" align={"center"}>Upload your first file Or  &nbsp;</Typography>
          
        </>
     
      )}

              <label htmlFor="upload-file1">
                <input
                  style={{ display: "none" }}
                  name="left"
                  id="upload-file1"
                  type="file"
                  onChange={handleFileChange}
                />

                <Button
                   sx={{backgroundColor:"#1976d2"}}
                  variant="contained"
                  component="span"
                >
                  <FileUpload /> Browser
                </Button>
              </label>
            </Box>
          </Box>
          {uploadingL && (
            <Box mx={"5px"} display={"flex"} alignItems={"center"}>
              <Box>
                <CheckCircle color="success" />
              </Box>
              <Box mx={"5px"}>
                <Typography  variant="body2"> {nameL} File Uploaded....!</Typography>
              </Box>
            </Box>
          )}
         </Box>
        {/* play icon */}
        
              <IconButton
                size="large"
                sx={{
                  background: "#1976d2",
                  width:"fit-content",
                  color: "white",
                  "&:hover": {
                    md: {
                      backgroundColor: "#f7f3f3",
                      color: "#1976d2",
                    },
                    xs: {
                      backgroundColor: "#f7f3f3",
                      color: "#1976d2",
                    },
                  },
                }}
                onClick={handleCompare}
              >
                <PlayArrow
                  sx={{
                    "&:hover": {
                      md: {
                        color: "#1976d2",
                      },
                      xs: {
                        color: "#1976d2",
                      },
                    },
                  }}
                />
              </IconButton>
        

        {/* second file upload */}

         <Box>
            <Box sx={{background:draggingL&&"gray",width:{xs:'300px',sm:"300px",md:"400px"},height:"150px",border:"2px solid gray", borderStyle:"dashed", borderRadius:"10px" }} padding={"10px"} display="flex" alignItems={"center"} justifyContent={"center"}
              onDragOver={handleDragOver}
              onDragEnter={(e)=>handleDragEnter(e,"right")}
                onDragLeave={(e)=>handleDragLeave(e,"right")}
                
                onDrop={(e)=>handleDrop(e,"right")}>
              <Box display="flex" alignItems="center">
              {uploadingR ? (
        <Box>
          <Typography variant="body2" align={"center"}>Uploaded The Second File  &nbsp; </Typography>
        </Box>
      ) : (
        <>
           <Typography variant="body2" align={"center"}>Upload your second file Or  &nbsp;</Typography>
           
        </>
     
      )}
                <label htmlFor="upload-file2">
                  <input
                    style={{ display: "none" }}
                    name="right"
                    id="upload-file2"
                    type="file"
                    onChange={handleFileChange}
                  />

                  <Button
                   sx={{backgroundColor:"#1976d2"}}
                    variant="contained"
                    component="span"
                  >
                    <FileUpload /> Browser
                  </Button>
                </label>
              </Box>
            </Box>
            {uploadingR && (
            <Box mx={"5px"} display={"flex"} alignItems={"center"}>
              <Box>
                <CheckCircle color="success" />
              </Box>
              <Box mx={"5px"}>
                <Typography variant="body2"> {nameR} File Uploaded....!</Typography>
              </Box>
            </Box>
          )}
     </Box>
     
       
      </Box>
  
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
                />
              </>
            )}
          </Box>
        </Grid>
    </div>
  );
}
