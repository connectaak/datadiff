import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Button, IconButton, ListItemButton, Typography } from "@mui/material";
import { Add, Close } from "@mui/icons-material";

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
                background:
                  tabID === item?.id ? "blanchedalmond" : "rgb(189 255 209)",
                my: "5px",
                "&:hover": { background: "blanchedalmond" },
              }}
            >
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(item.id)}
                  >
                    <Close />
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
