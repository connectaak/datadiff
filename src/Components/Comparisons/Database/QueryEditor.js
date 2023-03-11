import React from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";
import TopBar from "./TopBar";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
export default function QueryEditor({
  query,
  setQuery,
  title,
  db,
  setDB,
  dbs,
  setDBs,
  onRecentQueriesOpen,
}) {
  return (
    <div className="outer-shadow">
      <TopBar
        title={title}
        db={db}
        setDB={setDB}
        setQuery={setQuery}
        dbs={dbs}
        setDBs={setDBs}
        onRecentQueriesOpen={onRecentQueriesOpen}
      />
      <ReactCodeMirror
        value={query}
        height="150px"
        theme={dracula}
        placeholder="Type Your SQL Query Here...!"
        extensions={[sql()]}
        onChange={(val, vp) => setQuery(val)}
      />
    </div>
  );
}
