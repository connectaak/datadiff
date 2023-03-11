import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import TabsDrawer from "../Components/Comparisons/TabsDrawer";
import Comparison from "./Comparison";
import Swal from "sweetalert2";

export default function Home() {
  const [comparisonType, setComparisonType] = useState("api");
  const [tabs, setTabs] = useState([
    {
      title: "New Tab: 1",
      id: 1,
    },
  ]);
  const [currentTab, setCurrentTab] = useState(1);
  let handleOpenTab = (id) => setCurrentTab(id);
  let handleNewTab = () => {
    setTabs([
      ...tabs,
      {
        title: "New Tab: " + (tabs[tabs?.length - 1]?.id + 1 || 1),
        id: tabs[tabs?.length - 1]?.id + 1 || 1,
      },
    ]);
  };
  let handleTabDelete = (id) => {
    sessionStorage.removeItem("data_" + id);
    sessionStorage.removeItem("columns_" + id);
    sessionStorage.removeItem("dbs_" + id);
    sessionStorage.removeItem("queries_" + id);
    sessionStorage.removeItem("recentQueries_" + id);

    Swal.fire({
      title: "Do you want to close the tab ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setTabs(tabs.filter((tab) => tab.id !== id));
        if (id === currentTab) setCurrentTab(null);
      }
    });
  };
  let handleTabNameChange = (e, item) => {
    let tabsCopy = [...tabs];
    let index = tabs.findIndex((tab) => tab.id === item.id);
    tabsCopy[index].title = e.target.value;
    setTabs(tabsCopy);
  };

  useEffect(() => {
    sessionStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    let tbs = sessionStorage.getItem("tabs");

    if (tbs && tbs.length > 0) setTabs(JSON.parse(tbs));
  }, []);

  return (
    <>
      <Layout
        setComparisonType={setComparisonType}
        tabs={tabs}
        openTab={handleOpenTab}
        setTabs={handleNewTab}
      >
        <Grid container spacing={1}>
          <Grid item lg={2} sx={{ display: { xs: "none", lg: "block" } }}>
            <TabsDrawer
              allTabs={tabs}
              tabID={currentTab}
              openTab={handleOpenTab}
              setTabs={handleNewTab}
              onDelete={handleTabDelete}
              onTabNameChange={handleTabNameChange}
            />
          </Grid>
          <Grid item lg={10} xs={12}>
            {currentTab !== null && (
              <Comparison tabID={currentTab} comparisonType={comparisonType} />
            )}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
