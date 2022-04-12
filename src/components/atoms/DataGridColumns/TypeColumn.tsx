import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import { CloseOutlined } from "@mui/icons-material";
import { create_Type } from "../../../api/create";
import { AddOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const SelectInput = styled.input`
  outline: none;
  border: none;
  height: 35px;
  width: 200px;
  padding: 0px 16px;
  padding-bottom: 0px;
`;

const AddButton = styled.button`
  margin-right: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 106px;
  padding: 5px 10px;
  font-size: 14px;
  outline: none;
  text-decoration: none;
  border: none;
  cursor: pointer;
  color: white;
  background-color: var(--login-button);
`;

const CrossButton = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
    background-color: #eee;
    border-radius: 50px;
  }
`;

const TypeColumn = ({
  params,
  handleOptionChange,
  dropdown_options,
  setdropdown_options,
  setflag,
  clientId,
}: any) => {
  const [value, setvalue]: any = useState(params.value);
  const [inputFlag, setInputFlag]: any = useState(false);
  const [typeValue, setTypeValue]: any = useState("");
  const [open, setOpen] = useState(false);

  const addTypeHandler = async () => {
    if (typeValue != "") {
      console.log("clientId", clientId, typeValue);
      const allTypes = await create_Type(clientId, typeValue);
      const arr: any = [];
      allTypes.forEach((lov: any) => {
        const obj = {
          value: lov.LOV_CODE,
          name: lov.LOV_VAL,
        };
        arr.push(obj);
      });
      setdropdown_options((prev: any) => {
        return {
          ...prev,
          type: arr,
        };
      });
      setInputFlag(false);
      setTypeValue("");
    } else {
      toast.warn("Type cannot be empty");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      addTypeHandler();
    }
    e.stopPropagation(); // Prevent option search when typing into the InputBase
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 140 }}>
        <Select
          open={open}
          value={value}
          onChange={(e) => {
            if (e.target.value !== "Add Type") {
              e.stopPropagation();
              handleOptionChange(params.row, params.field, e.target.value);
              setvalue(e.target.value);
              setflag((prev: any) => !prev);
            }
          }}
          onOpen={(e) => {
            setOpen(true);
          }}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        >
          {dropdown_options.type.map((item: any) => {
            return (
              <MenuItem
                key={item.value}
                value={item.value}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </MenuItem>
            );
          })}
          {!inputFlag ? (
            <MenuItem
              key="new"
              value="Add Type"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setInputFlag(true);
              }}
              className="flex"
            >
              <span>Add Type</span>
              <span style={{ display: "flex" }}>
                <AddOutlined />
              </span>
            </MenuItem>
          ) : (
            <InputContainer>
              <SelectInput
                type="text"
                placeholder="Type"
                value={typeValue}
                onChange={(e) => setTypeValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <CrossButton>
                <CloseOutlined onClick={() => setInputFlag(false)} />
              </CrossButton>
              <AddButton onClick={addTypeHandler}>Add</AddButton>
            </InputContainer>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default TypeColumn;
