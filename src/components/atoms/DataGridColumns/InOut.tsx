import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const InOut = ({ params, handleOptionChange, InOut_Options }: any) => {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 140 }}>
        <Select
          value={params.value}
          onChange={(e) =>
            handleOptionChange(params.row, params.field, e.target.value)
          }
        >
          {InOut_Options.map((item: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default InOut;
