import React from "react";
import _ from "lodash";
import { Pagination } from "@mui/material";
export default function MyPagination({
  itemsCount,
  pageSize,
  handleChange,
  currentPage,
}) {
  let pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  let pages = _.range(1, pagesCount + 1);
  return (
    <div className="d-flex flex-wrap p-2 text-white">
      <Pagination
        count={pages.length}
        variant="outlined"
        page={currentPage}
        sx={{ fill: "white" }}
        onChange={(event, val) => handleChange(val)}
        boundaryCount={3}
      />
    </div>
  );
}
