import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Avatar, IconButton, ListItemAvatar, Tooltip } from "@mui/material";
import { Download, QueryBuilder, Upload } from "@mui/icons-material";
import { saveAs } from "file-saver";

export default function RecentQueryDialog({
  open,
  setOpen,
  queries = [],
  setQuery,
  setRecentQueries,
  recentQueries,
  type,
}) {
  const handleClose = (value) => {
    setOpen(false);
  };
  const handleQueryUpload = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      let data = event.target.result;
      let splitQueries = data?.split("\n");
      let allQueries = splitQueries.filter((q) => q);
      allQueries = allQueries?.map((qry) => {
        if (qry?.length > 0) return { qry: qry, source: "" };
      });
      if (allQueries?.length > 0 && type === "tbl1")
        setRecentQueries({ ...recentQueries, tbl1: allQueries });
      if (allQueries?.length > 0 && type === "tbl2")
        setRecentQueries({ ...recentQueries, tbl2: allQueries });
      e.target.value = null;
    });
    reader.readAsText(e.target.files[0]);
  };
  return (
    <div>
      <Dialog onClose={handleClose} open={open} sx={{ minWidth: "300px" }}>
        <DialogTitle>
          Recent Queries{" "}
          <Tooltip title="Download Queries">
            <IconButton
              color="success"
              onClick={() => {
                let qrs = queries?.map((qry) => qry?.qry + "\n");
                const blob = new Blob(qrs);
                saveAs(blob, "recentQueries.sql");
              }}
            >
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Upload Queries .sql">
            <IconButton
              color="error"
              aria-label="upload File"
              component="label"
            >
              <input
                hidden
                accept=".sql"
                type="file"
                onChange={handleQueryUpload}
              />
              <Upload />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {queries.map((query, i) => (
            <ListItem disableGutters key={i}>
              <ListItemButton
                onClick={() => {
                  setQuery(query);
                  setOpen(false);
                }}
                key={query}
              >
                <ListItemAvatar>
                  <Avatar>
                    <QueryBuilder />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={query?.qry} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
