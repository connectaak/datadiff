import { Add, Close } from "@mui/icons-material";
import { Button, IconButton, ListItemButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React from "react";

export default function TabsDrawer({
  handleTabsDrawerToggle,
  allTabs = [],
  setTabs,
  openTab,
  onDelete,
  onTabNameChange,
  tabID,
}) {
  return (
    <div>
      <Box
        onClick={handleTabsDrawerToggle}
        sx={{
          textAlign: "center",
          height: "92vh",
          overflowY: "auto",
          background: "#f4f4f4",
        }}
      >
        <Typography variant="h6" sx={{ my: 2 }}>
          All Tabs
        </Typography>
        <Divider />
        <List>
          {allTabs.map((item, i) => (
            <ListItemButton
              key={i}
              onClick={() => openTab(item.id)}
              sx={{
                background:"#1976D2",
                // background:"#2684FF",
                color:"white",
                my: "5px",
                "&:hover": { background: "#1976D2" },
              }}
            >
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(item.id)}
                  >
                    <Close sx={{color:"white"}} />
                  </IconButton>
                }
              >
                {item.title}
              </ListItem>
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <Box>
          <Button startIcon={<Add />} onClick={setTabs}>
            New Tab
          </Button>
        </Box>
      </Box>
    </div>
  );
}
