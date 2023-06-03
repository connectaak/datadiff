import { Box, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TabsDrawer from "../Components/Comparisons/TabsDrawer";
import Layout from "../Components/Layout/Layout";
import './../App.css';
import Comparison from "./Comparison";
export default function Home() {
  const [comparisonType, setComparisonType] = useState("file");
  const [tabs, setTabs] = useState([
    {
      title: "New Tab: 1",
      id: 1,
    },
  ]);
  const [currentTab, setCurrentTab] = useState(1);
  const [tabData,setTabData]=useState([]);
  const [toggle,setToggle]=useState(true)
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
        setTabData(pevData=>pevData.filter((tab)=>tab.id!==id))
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
    <div className="App">
      <Layout
        setComparisonType={setComparisonType}
        tabs={tabs}
        openTab={handleOpenTab}
        setTabs={handleNewTab}
      >
          <Switch style={{position:"absolute", top:0}} checked={toggle}
  onChange={()=>setToggle((prev)=>!prev)}
 defaultChecked />
        <Box sx={{display:"flex"}}>
         {/* <Grid item lg={2} sx={{ display: { xs: "none", lg: "block" } }}> */}
       
            <TabsDrawer
              allTabs={tabs}
              tabID={currentTab}
              openTab={handleOpenTab}
              setTabs={handleNewTab}
              onDelete={handleTabDelete}
              onTabNameChange={handleTabNameChange}
              toggle={toggle}
            />
          {/* </Grid> */}
          <Box sx={{width:toggle?"80%":"100%"}}>
            {currentTab !== null && (
              <Comparison tabID={currentTab} tabData={tabData} setTabData={setTabData} comparisonType={comparisonType} />
            )}
          </Box>
        </Box>
      </Layout>
    </div>
  );
}
