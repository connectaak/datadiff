import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import * as React from 'react';


export default function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}