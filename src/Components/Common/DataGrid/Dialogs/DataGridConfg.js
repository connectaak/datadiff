import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

export default function DataGridConfg({ open, setOpen, configs, setConfigs }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
       <Box display={'flex'}  alignItems={'center'}>
        <Box flex={'1'}>
           <DialogTitle>Datagrid Configurations</DialogTitle>
        </Box>
        
       </Box>
        <DialogContent>
          <Box display={'flex'} flexDirection='column'>
            <Box>
                <label>Different Data Color:</label>
                <input className="form-control" type={'color'} value={configs?.diffColor} onChange={(e) => setConfigs({...configs,diffColor:e.target.value})} />
            </Box>
            <Box>
                <label>Rows Per Page:</label>
                 <select  className="form-control" value={configs?.noOfRowsPerPage}  onChange={(e) => setConfigs({...configs,noOfRowsPerPage:e.target.value})}>
                    <option value={"20"}>20</option>
                    <option value={"50"}>50</option>
                    <option value={"100"}>100</option>
                    <option value={"200"}>200</option>
                    <option value={"500"}>500</option>
                 </select>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
