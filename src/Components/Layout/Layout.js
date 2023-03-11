import { Box } from "@mui/material";
import React from "react";
import Header from "./Header/Header";

export default function Layout({ children, setComparisonType, tabs,setTabs,openTab }) {
  return (
    <div>
      <Box>
        <Header setComparisonType={setComparisonType}  tabs={tabs} setTabs={setTabs} openTab={openTab} />
      </Box>
      <Box mt={"70px"}>{children}</Box>
    </div>
  );
}
