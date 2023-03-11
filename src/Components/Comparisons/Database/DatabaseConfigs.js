import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function DatabaseConfigs({ open, setOpen, dbs, setDBs }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
       <Box display={'flex'}  alignItems={'center'}>
        <Box flex={'1'}>
           <DialogTitle>Database Configurations</DialogTitle>
        </Box>
        <Box>
          <IconButton onClick={() => setDBs([...dbs,{label:"Database "+(dbs.length + 1),value:"DB"+ (dbs.length + 1)}])} > <Add /> </IconButton>
        </Box>
       </Box>
        <DialogContent>
          {dbs?.map((db, i) => (
            <TextField
              key={i}
              margin="dense"
              label={"Database " + (i + 1)}
              value={db.label}
              onChange={(e) => {
                let allDbs = [...dbs];
                let index = allDbs.findIndex((d) => d.label === db.label);

                allDbs[index].label = e.target.value;
                setDBs(allDbs);
              }}
              fullWidth
              variant="standard"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
