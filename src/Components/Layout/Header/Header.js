import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
// import { Tooltip } from "@mui/material";
import {
  Menu,
} from "@mui/icons-material";
import TabsDrawer from "../../Comparisons/TabsDrawer";

const drawerWidth = 240;
const navItems = [];

function Header(props) {
  const { window,tabs,setTabs,openTab } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tabsDrawerOpen, setTabsDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleTabsDrawerToggle = () => {
    setTabsDrawerOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Menu /> DiffX
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" className="bg-green">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
           DiffX
          </Typography>
          {/* <Box  display={'flex'} justifyContent="end">
           <Box>
             <Tooltip title="View Tabs">
              <IconButton onClick={handleTabsDrawerToggle}  sx={{display:{lg:"none"}}}>
            <TableRows />
          </IconButton>
            </Tooltip>
            <Tooltip title="Compare From Files">
              <IconButton
                sx={{ color: "white" }}
                onClick={() => props.setComparisonType("file")}
              >
                <InsertDriveFile />
              </IconButton>
            </Tooltip>
            <Tooltip title="Compare From Text">
              <IconButton
                sx={{ color: "white" }}
                onClick={() => props.setComparisonType("text")}
              >
                <TextFields />
              </IconButton>
            </Tooltip>
            <Tooltip title="Compare From API">
              <IconButton
                sx={{ color: "white" }}
                onClick={() => props.setComparisonType("api")}
              >
                <Storage />
              </IconButton>
            </Tooltip>
           </Box>
          </Box> */}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{display:{md:"none",xs:"block"}}}>
        <Drawer
          container={container}
          variant="temporary"
          open={tabsDrawerOpen}
          onClose={handleTabsDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth + 50,
            },
          }}
        >
          <TabsDrawer allTabs={tabs} openTab={openTab} setTabs={setTabs}  />
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
