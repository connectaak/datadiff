import {
  AccessTimeFilled,
  CleaningServices,
  Settings,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import DatabaseConfigs from "./DatabaseConfigs";

export default function TopBar({
  db,
  setDB,
  title = "Database Table Comparison",
  setQuery,
  dbs,
  setDBs,
  onRecentQueriesOpen,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <Box bgcolor={"#e7ebf0"} padding="0px 5px">
        <Box display={"flex"}>
          <Box flex={"1"}>
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box>
            <Box display={"flex"}>
              <Box>
                <Tooltip title="Recent Queries">
                  <IconButton
                    className="text-danger"
                    onClick={() => onRecentQueriesOpen()}
                  >
                    <AccessTimeFilled />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Database  Configs">
                  <IconButton
                    className="text-success"
                    onClick={() => setOpen(true)}
                  >
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <select
                  className="form-control"
                  style={{ marginTop: "1px" }}
                  value={db}
                  onChange={(e) => setDB(e.target.value)}
                >
                  <option value={""}>Select DB</option>
                  {dbs.map((db) => (
                    <option key={db.value} value={db.value}>
                      {db.label}
                    </option>
                  ))}
                </select>
              </Box>
              <Box>
                <Tooltip title="Clear All">
                  <IconButton
                    sx={{ color: "gray" }}
                    onClick={() => {
                      setDB(" ");
                      setQuery("");
                    }}
                  >
                    <CleaningServices />
                  </IconButton>
                </Tooltip>
              </Box>
              {/* <Box>
                <Tooltip title="Copy to Clipboard">
                  <IconButton
                    sx={{ color: "gray" }}
                    onClick={() =>
                      navigator.clipboard.writeText(apiConfigs.queryL)
                    }
                  >
                    <AssignmentSharp />
                  </IconButton>
                </Tooltip>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <DatabaseConfigs
        dbs={dbs}
        setDBs={setDBs}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}
