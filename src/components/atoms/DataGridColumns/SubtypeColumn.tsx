import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getSubtypeValuesForType } from "../../../api/get";

const SubtypeColumn = ({ params, handleOptionChange, flag, rows }: any) => {
  const [row, setrow]: any = useState(params.row);
  const [subtype_options, setsubtype_options]: any = useState([]);
  const [value, setvalue]: any = useState(params.value);

  useEffect(() => {
    const func = async () => {
      let type = null;
      if (rows.length > 0) {
        const filter = rows.filter((x: any) => x.ID === row.ID);
        type = filter[0].type;
        console.log("filter", type);
      } else if (row.type) {
        type = row.type;
        console.log("type", type);
      }
      if (type) {
        const SubtypesOptions: any = await getSubtypeValuesForType(type);
        console.log("all subtypes", SubtypesOptions);
        const SubtypesOptionsModified: any = SubtypesOptions.map((lov: any) => {
          return {
            value: lov.LOV_CODE,
            name: lov.LOV_VAL,
          };
        });
        setsubtype_options(SubtypesOptionsModified);
      }
    };

    func();
  }, [flag]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 140 }}>
        <Select
          value={value}
          onChange={(e) => {
            handleOptionChange(params.row, params.field, e.target.value);
            setvalue(e.target.value);
          }}
        >
          {subtype_options.map((item: any) => {
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

export default SubtypeColumn;
