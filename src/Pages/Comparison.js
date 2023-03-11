import React from "react";
import DBCompare from "../Components/Comparisons/Database/DBCompare";
import FileCompare from "../Components/Comparisons/File/FileCompare";
import TextCompare from "../Components/Comparisons/Text/TextCompare";

export default function Comparison({ tabID, comparisonType = "api" }) {
  return (
    <>
      {comparisonType === "api" && <DBCompare tabID={tabID} />}{" "}
      {comparisonType === "file" && <FileCompare tabID={tabID} />}{" "}
      {comparisonType === "text" && <TextCompare tabID={tabID} />}{" "}
    </>
  );
}
