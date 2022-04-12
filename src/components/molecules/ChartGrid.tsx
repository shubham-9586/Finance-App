import React from "react";
import { DataGrid } from "@mui/x-data-grid";
const ChartGrid = ({ rows, columns }: any) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={8}
      rowsPerPageOptions={[5]}
      disableSelectionOnClick
    />
  );
};

export default ChartGrid;
