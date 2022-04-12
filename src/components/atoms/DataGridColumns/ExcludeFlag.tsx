import { Checkbox } from "@mui/material";

const ExcludeFlag = ({ params, handleCheckboxChange }: any) => {
  return (
    <Checkbox
      checked={params.value == "Y" ? true : false}
      onChange={(e) => {
        console.log("clicked");
        handleCheckboxChange(params.row, params.field, e.target.checked);
      }}
    />
  );
};

export default ExcludeFlag;
