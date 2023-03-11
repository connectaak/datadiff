import { PlayArrow } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CompareDataGrid2 from "../../Common/DataGrid/CompareDataGrid2";
import { DataFilter } from "../../Functions/DataFilter";
import { DataFormatter } from "../../Functions/DataFormatter";
import { RowFormatter } from "../../Functions/RowFormatter";
import LoadingOverlay from "../../Utils/LoadingOverlay";
import RecentQueryDialog from "./Dialogs/RecentQueryDialog";
import QueryEditor from "./QueryEditor";

export default function DBCompare({ tabID }) {
  const [queries, setQueries] = useState({
    db1SqlQuery: "",
    db2SqlQuery: "",
    db1Source: "DB1",
    db2Source: "DB1",
  });
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const [dbs, setDBs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [recentQueries, setRecentQueries] = useState({
    tbl1: [],
    tbl2: [],
  });
  const [openQueriesDialog, setOpenQueriesDialog] = useState({
    tbl1QueryDialog: false,
    tbl2QueryDialog: false,
  });
  let dataTypes = { DATE: "date", VARCHAR: "text", INT: "numeric" };
  useEffect(() => {
    sessionStorage.clear();
    setRecentQueries({
      tbl1: [],
      tbl2: [],
    });

    setQueries({
      db1SqlQuery: "",
      db2SqlQuery: "",
      db1Source: "DB1",
      db2Source: "DB1",
    });

    setData([]);
    setColumns([]);
  }, []);

  useEffect(() => {
    let databases = sessionStorage.getItem("dbs_" + tabID);
    let recentQueries = sessionStorage.getItem("recentQueries_" + tabID);
    let gridData = sessionStorage.getItem("data_" + tabID) || [];
    let gridColumns = sessionStorage.getItem("columns_" + tabID) || [];
    let qrys = sessionStorage.getItem("queries_" + tabID);

    if (recentQueries && recentQueries?.length > 0)
      setRecentQueries(JSON.parse(recentQueries));
    else
      setRecentQueries({
        tbl1: [],
        tbl2: [],
      });

    if (qrys && qrys?.length > 0) setQueries(JSON.parse(qrys));
    else
      setQueries({
        db1SqlQuery: "",
        db2SqlQuery: "",
        db1Source: "DB1",
        db2Source: "DB1",
      });

    if (gridData && gridData?.length > 0) setData(JSON.parse(gridData));
    else setData([]);
    if (gridColumns && gridColumns?.length > 0)
      setColumns(JSON.parse(gridColumns));
    else setColumns([]);

    if (databases && databases?.length > 0) setDBs(JSON.parse(databases));
    else
      setDBs([
        { label: "Database 1", value: "DB1" },
        { label: "Database 2", value: "DB2" },
      ]);
  }, [tabID]);

  let handleQueryExecution = () => {
    setLoading(true);
    if (queries.db1SqlQuery === "" || queries.db2SqlQuery === "") {
      alert("Please Enter 2 Queries to execute");
      return;
    } else if (queries.db1Source === "" || queries.db2Source === "") {
      alert("Please Select Data Sources ");
      return;
    }
    let tbl1RecentQueries = recentQueries.tbl1;
    if (!tbl1RecentQueries.some((qry) => qry?.qry === queries.db1SqlQuery))
      tbl1RecentQueries.push({
        qry: queries.db1SqlQuery,
        source: queries.db1Source,
      });

    let tbl2RecentQueries = recentQueries.tbl2;
    if (!tbl2RecentQueries.some((qry) => qry?.qry === queries.db2SqlQuery))
      tbl2RecentQueries.push({
        qry: queries.db2SqlQuery,
        source: queries.db2Source,
      });
    setRecentQueries({
      ...recentQueries,
      tbl1: tbl1RecentQueries,
      tbl2: tbl2RecentQueries,
    });
    sessionStorage.setItem("queries_" + tabID, JSON.stringify(queries));
    axios
      .post("http://localhost:8080/compare/datagrid/row", queries)
      .then((response) => {
        if (response.data.rows.length > 0) {
          let data = response.data.rows;
          DataFormatter(data, setData, setColumns, dataTypes);
          setLastRefreshed(new Date().toLocaleTimeString());
        } else alert("No Data Found");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire("Error!", err.message, "error");
      });
  };

  let onExcelExport = () => {
    setLoading(true);
    axios
      .post("http://localhost:8080/compare/datagrid/excel/download", queries, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          new Date().toDateString().replace(" ", "-") +
            "-data-compare-report.xlsx"
        );
        document.body.appendChild(link);
        link.click();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire("Error!", err.message, "error");
      });
  };
  let allRows = RowFormatter(data);

  if (filter !== "") allRows = DataFilter(allRows, filter);
  useEffect(() => {
    if (dbs.length > 0)
      sessionStorage.setItem("dbs_" + tabID, JSON.stringify(dbs));
  }, [dbs]);
  useEffect(() => {
    if (recentQueries.tbl1.length > 0 || recentQueries.tbl2.length > 0)
      sessionStorage.setItem(
        "recentQueries_" + tabID,
        JSON.stringify(recentQueries)
      );
  }, [recentQueries]);
  return (
    <>
      {loading && <LoadingOverlay />}
      <Box padding={"10px"}>
        <Box my={"10px"}>
          <Typography textAlign={"center"} variant="h6">
            {"Tab No. " + tabID}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <QueryEditor
              title={"Table 1 Query"}
              query={queries.db1SqlQuery}
              db={queries.db1Source}
              setDB={(db) => setQueries({ ...queries, db1Source: db })}
              setQuery={(qry) => setQueries({ ...queries, db1SqlQuery: qry })}
              dbs={dbs}
              setDBs={setDBs}
              onRecentQueriesOpen={() =>
                setOpenQueriesDialog({
                  ...openQueriesDialog,
                  tbl1QueryDialog: true,
                })
              }
            />{" "}
          </Grid>
          <Grid item md={6} xs={12}>
            <QueryEditor
              title={"Table 2 Query"}
              query={queries.db2SqlQuery}
              setQuery={(qry) => setQueries({ ...queries, db2SqlQuery: qry })}
              db={queries.db2Source}
              setDB={(db) => setQueries({ ...queries, db2Source: db })}
              dbs={dbs}
              setDBs={setDBs}
              onRecentQueriesOpen={() =>
                setOpenQueriesDialog({
                  ...openQueriesDialog,
                  tbl2QueryDialog: true,
                })
              }
            />
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
                  onClick={handleQueryExecution}
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
        </Grid>
        <Grid container>
          {data?.length > 0 && (
            <>
              {" "}
              <Grid item xs={12}>
                <Box
                  bgcolor={"ButtonFace"}
                  padding="10px"
                  display={"flex"}
                  alignItems="center"
                >
                  <Box flex={1}>
                    <Box display={"flex"}>
                      <Box>
                        <Typography fontWeight={"bold"}>
                          Total Data Count Query 1:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography> {data?.length}</Typography>
                      </Box>
                    </Box>
                  </Box>{" "}
                  <Box>
                    <Box display={"flex"}>
                      <Box>
                        <Typography fontWeight={"bold"}>
                          Total Data Count Query 2:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography> {data?.length}</Typography>
                      </Box>
                      {lastRefreshed && (
                        <>
                          <Box ml="10px">
                            <Typography fontWeight={"bold"}>
                              Last Refreshed:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography> {lastRefreshed} </Typography>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
        <Box display={"flex"} flexDirection={"column"}>
          {data.length > 0 && (
            <>
              <CompareDataGrid2
                columns={columns}
                data={allRows}
                setFilter={setFilter}
                filter={filter}
                isDBData={true}
                onExcelExport={onExcelExport}
              />
            </>
          )}
        </Box>
        <RecentQueryDialog
          open={openQueriesDialog.tbl1QueryDialog}
          type="tbl1"
          recentQueries={recentQueries}
          queries={recentQueries.tbl1}
          setRecentQueries={setRecentQueries}
          setOpen={(val) =>
            setOpenQueriesDialog({
              ...openQueriesDialog,
              tbl1QueryDialog: false,
            })
          }
          setQuery={(qry) =>
            setQueries({
              ...queries,
              db1SqlQuery: qry?.qry,
              db1Source: qry?.source,
            })
          }
        />
        <RecentQueryDialog
          recentQueries={recentQueries}
          type="tbl2"
          open={openQueriesDialog.tbl2QueryDialog}
          setRecentQueries={setRecentQueries}
          queries={recentQueries.tbl2}
          setOpen={(val) =>
            setOpenQueriesDialog({
              ...openQueriesDialog,
              tbl2QueryDialog: false,
            })
          }
          setQuery={(qry) =>
            setQueries({
              ...queries,
              db2SqlQuery: qry?.qry,
              db2Source: qry?.source,
            })
          }
        />
      </Box>
    </>
  );
}
