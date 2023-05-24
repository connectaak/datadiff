import {
  GridToolbarContainer
} from '@mui/x-data-grid';
import * as React from 'react';


export default function CustomToolbar({apiRef}) {
  // const apiRef = useGridApiRef();
  // const handleExport = () =>  apiRef.current.exportDataAsCsv({ delimiter: ";", utf8WithBom: true });
  return (
    <GridToolbarContainer>
     {/* <Box sx={{position:"absolute",background:"red",zIndex:1, top:0}}>
     <Tooltip title="Export in Excel">
              <IconButton  onClick={handleExport}>
                <Save sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
     </Box> */}
    </GridToolbarContainer>
  );
}