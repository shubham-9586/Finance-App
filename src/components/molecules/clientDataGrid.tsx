import { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getTransactionDetails, getType, get_Dropdown } from "../../api/get";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { updateTransaction } from "../../api/update";
import { create_Transaction } from "../../api/create";
import { delete_Transaction } from "../../api/delete";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SubtypeColumn from "../atoms/DataGridColumns/SubtypeColumn";
import TypeColumn from "../atoms/DataGridColumns/TypeColumn";
import ExcludeFlag from "../atoms/DataGridColumns/ExcludeFlag";
import InOut from "../atoms/DataGridColumns/InOut";

import MainDateRangePicker from "./MainDateRangePicker";

interface ClientDataGridProps {
  clientId: any;
  source_id: any;
}

const NoTransactions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 93px;
  border: 2px solid var(--ink-icon);
  background-color: var(--background);
  .text {
    font-weight: 500;
    font-size: 35.102px;
    text-align: center;
    color: var(--ink-icon);
  }
`;

const AddTransactionButton = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50px;
  z-index: 2;
  color: var(--grid-text);
  height: 40px;
  width: 40px;
  &:hover {
    cursor: pointer;
  }
  svg {
    font-size: 40px;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const DeleteTransactionButton = styled.div`
  position: absolute;
  bottom: 20px;
  left: 110px;
  z-index: 2;
  color: var(--grid-text);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  &:hover {
    cursor: pointer;
  }
  svg {
    font-size: 40px;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const FilterDateButton = styled.div`
  position: absolute;
  bottom: 6px;
  left: 170px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
`;
const DateButton = styled.button`
  position: absolute;
  bottom: 14px;
  left: 500px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 150px;
  cursor: pointer;
`;
const DateButton1 = styled.button`
  position: absolute;
  bottom: 20px;
  left: 120px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 150px;
  cursor: pointer;
`;
const InOut_Options = [
  { value: "in", name: "In" },
  { value: "out", name: "Out" },
];

const ClientDataGrid = ({ clientId, source_id }: ClientDataGridProps) => {
  const lang = useSelector((state: RootState) => state.lang);
  const [value, setValue]: any = useState([null, null]);
  const [hideDateFilter, setHideDateFilter]: any = useState(false);
  const [rows, setrows]: any = useState([]);
  const [rowsCopy, setRowCopy]: any = useState([]);
  const [columns, setcolumns] = useState([]);
  const [transactions, settransactions]: any = useState(null);
  const [loader, setloader] = useState(true);
  const [selected, setselected]: any = useState(null);
  const [flag, setflag] = useState(false);
  const [dropdown_options, setdropdown_options] = useState({
    type: [],
    subtype: [],
  });

  useEffect(() => {
    let n = value.length;
    if (value[n - 1] === null) return;
    let start = new Date(value[0]);
    let end = new Date(value[n - 1]);
    let res = [];
    for (let i = 0; i < rowsCopy.length; i++) {
      let check = new Date(rowsCopy[i].CREATED);
      if (start <= check && end >= check) {
        res.push(rowsCopy[i]);
      }
    }
    setrows(res);
    setHideDateFilter(true);
  }, [value]);
  useEffect(() => {
    const getDropdownValues = async () => {
      const res = await getType(clientId);
      const arr: any = [];
      res.forEach((lov: any) => {
        const obj = {
          value: lov.LOV_CODE,
          name: lov.LOV_VAL,
        };
        arr.push(obj);
      });

      setdropdown_options((prev) => {
        return {
          ...prev,
          type: arr,
        };
      });
    };

    getDropdownValues();
  }, []);

  useEffect(() => {
    const genResults = async () => {
      try {
        const res = await getTransactionDetails(source_id);
        if (res.length == 0) {
          setloader(false);
          settransactions(false);
        } else {
          settransactions(true);
          const obj = res[0];
          const columns_arr: any = [];
          Object.keys(obj).map((key) => {
            let f = true;
            const col = {
              field: key,
              width: 150,
              editable: true,
            };
            if (key == "date") {
              const new_col = {
                field: key,
                width: 150,
                editable: false,
                renderCell: (params: any) => {
                  const newDateArr = params.value.split("-");

                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 16,
                      }}
                    >
                      {`${newDateArr[2]}/${newDateArr[1]}/${newDateArr[0]}`}
                    </div>
                  );
                },
              };
              columns_arr.push(new_col);
              f = false;
            }

            if (key == "amount") {
              const new_col = {
                field: key,
                width: 150,
                editable: true,
                renderCell: (params: any) => {
                  const number = parseFloat(params.value);
                  const finalNumber = number.toLocaleString("he", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "ILS",
                  });
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 16,
                      }}
                    >
                      {finalNumber}
                    </div>
                  );
                },
              };
              columns_arr.push(new_col);
              f = false;
            }
            if (key == "finalAmount") {
              const new_col = {
                field: key,
                width: 150,
                editable: true,
                renderCell: (params: any) => {
                  const row = params.row;
                  const number =
                    parseFloat(row.amount) / parseFloat(row.multiPlyer);

                  const finalNumber = number.toLocaleString("he", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "ILS",
                  });

                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 16,
                      }}
                    >
                      {finalNumber}
                    </div>
                  );
                },
              };
              columns_arr.push(new_col);
              f = false;
            }
            if (key == "type") {
              const new_col = {
                field: key,
                width: 150,
                editable: true,
                renderCell: (params: any) => {
                  return (
                    <TypeColumn
                      params={params}
                      handleOptionChange={handleOptionChange}
                      dropdown_options={dropdown_options}
                      setdropdown_options={setdropdown_options}
                      setflag={setflag}
                      clientId={clientId}
                    />
                  );
                },
              };
              columns_arr.push(new_col);
              f = false;
            }
            if (key == "subType") {
              const new_col = {
                field: key,
                width: 150,
                editable: true,
                renderCell: (params: any) => {
                  return (
                    <SubtypeColumn
                      params={params}
                      handleOptionChange={handleOptionChange}
                      flag={flag}
                      rows={rows}
                    />
                  );
                },
              };
              columns_arr.push(new_col);
              f = false;
            }
            if (key == "excludeFlg") {
              const new_col = {
                field: key,
                headerName: key,
                width: 150,
                editable: false,
                renderCell: (params: any) => {
                  return (
                    <ExcludeFlag
                      params={params}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  );
                },
              };
              columns_arr.push(new_col);
              f = false;
            }
            if (key == "inOut") {
              const new_col = {
                field: key,
                headerName: key,
                width: 150,
                editable: false,
                renderCell: (params: any) => {
                  return (
                    <InOut
                      params={params}
                      handleOptionChange={handleOptionChange}
                      InOut_Options={InOut_Options}
                    />
                  );
                },
              };
              columns_arr.push(new_col);
              f = false;
            }
            if (key == "CREATED" || key == "ID" || key == "sourceId") f = false;
            if (f) columns_arr.push(col);
          });
          const rows_arr: any = [];
          res.map((obj: any, index: any) => {
            const new_obj = { id: index, ...obj };
            rows_arr.push(new_obj);
          });
          setcolumns(columns_arr);
          setrows(rows_arr);
          setRowCopy(rows_arr);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (source_id) {
      genResults();
    } else {
      setloader(false);
    }
  }, [source_id, flag, dropdown_options]);

  useEffect(() => {
    if (dropdown_options.type.length > 0) {
      setTimeout(() => setloader(false), 1000);
    }
  }, [dropdown_options]);

  useEffect(() => {
    if (!rows.length && transactions) {
      settransactions(false);
    }
    if (rows.length > 0 && !transactions) {
      settransactions(true);
    }
  }, [rows]);

  const addTransaction = async () => {
    setloader(true);
    const data = {
      name: "",
      date: "",
      inOut: "",
      type: "",
      subType: "",
      description: " Desc",
      notes: "",
      exludeFlg: "N",
      descOverride: "",
      multiplyer: "1",
      amount: "",
      finalAmount: "",
    };
    const date = new Date();
    const mod_data = {
      ...data,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    };
    const res = await create_Transaction(mod_data, source_id);
    console.log("row created", res);
    setrows(res);
    setRowCopy(res);
    toast.success(lang ? "נוצרה עסקה חדשה" : "New Transaction Created");
    setloader(false);
  };

  const handleCheckboxChange = async (
    row: any,
    field: any,
    checked: boolean
  ) => {
    let val: any = null;
    if (checked) {
      val = "Y";
    } else val = "N";

    console.log("clicked row", row);
    setrows((prev: any) => {
      let val: any = null;
      if (checked) {
        val = "Y";
      } else val = "N";
      const new_obj = {
        ...row,
        [field]: val,
      };
      const filteredRows: any = prev.map((obj: any) => {
        const updatedObj: any = { ...obj };
        if (obj.ID === row.ID) {
          updatedObj[field] = val;
        }
        return updatedObj;
      });

      return filteredRows;
    });
    setRowCopy((prev: any) => {
      let val: any = null;
      if (checked) {
        val = "Y";
      } else val = "N";
      const new_obj = {
        ...row,
        [field]: val,
      };
      const filteredRows: any = prev.map((obj: any) => {
        const updatedObj: any = { ...obj };
        if (obj.ID === row.ID) {
          updatedObj[field] = val;
        }
        return updatedObj;
      });

      return filteredRows;
    });
    const new_obj = {
      ...row,
      [field]: val,
    };
    const res = await updateTransaction(new_obj);
    console.log("response", res);
  };

  const handleOptionChange = async (row: any, field: any, val: any) => {
    console.log("clicked row", row);
    setrows((prev: any) => {
      console.log("prevrows", prev);
      const filteredRows: any = prev.map((obj: any) => {
        const updatedObj: any = { ...obj };
        if (obj.ID === row.ID) {
          updatedObj[field] = val;
        }
        return updatedObj;
      });

      return filteredRows;
    });

    setRowCopy((prev: any) => {
      console.log("prevcopyrows", prev);
      const filteredRows: any = prev.map((obj: any) => {
        const updatedObj: any = { ...obj };
        if (obj.ID === row.ID) {
          updatedObj[field] = val;
        }
        return updatedObj;
      });

      return filteredRows;
    });
    const new_obj = {
      ...row,
      [field]: val,
    };
    const res = await updateTransaction(new_obj);
  };

  const handleChangeRow = async (obj: any, event: any) => {
    const row = obj.row;
    const value = obj.value;
    const field = obj.field;
    const new_obj = {
      ...row,
      [field]: value,
    };
    delete new_obj.CREATED;
    const res = await updateTransaction(new_obj);
  };

  const handleChangeRow1 = async (row: any) => {
    const id = row.id;
    const value = row.value;
    const row_data: any = rows.filter((x: any) => x.ID == id);
    const new_obj = {
      ...row_data[0],
      [row.field]: value,
    };
    console.log("row");
    delete new_obj.CREATED;
    const res = await updateTransaction(new_obj);
  };

  const deleteSelected = async () => {
    setloader(true);
    if (selected) {
      selected.forEach(async (id: any) => {
        const res = await delete_Transaction(id, source_id);
        setrows(res);
        setRowCopy(res);
      });
      toast.success(
        lang ? "העסקה שנבחרה נמחקה" : "Selected Transaction Deleted"
      );
      setloader(false);
    } else {
      toast.warning(
        lang
          ? "אנא בחר את העסקה למחיקה"
          : "Please Select the Transaction to Delete"
      );
      setloader(false);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        background: !transactions ? "var(--white)" : "var(--white)",
        borderRadius: 93,
      }}
    >
      {loader ? (
        <NoTransactions>
          <CircularProgress
            color="inherit"
            style={{ color: "var(--ink-icon)" }}
            size={70}
          />
        </NoTransactions>
      ) : transactions ? (
        <Fragment>
          <Fragment>
            <AddTransactionButton onClick={addTransaction}>
              <AddCircleIcon />
            </AddTransactionButton>
            <DeleteTransactionButton onClick={deleteSelected}>
              <DeleteIcon />
            </DeleteTransactionButton>
            <FilterDateButton>
              <MainDateRangePicker value={value} setValue={setValue} />
            </FilterDateButton>
            {hideDateFilter && (
              <DateButton
                onClick={() => {
                  setrows(rowsCopy);
                  setHideDateFilter(false);
                  setValue([null, null]);
                }}
              >
                Remove Date Filter
              </DateButton>
            )}
          </Fragment>
          <DataGrid
            rows={rows}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            onCellEditCommit={(v, e: any) => {
              if (e.key == "Enter") {
                handleChangeRow1(v);
              } else {
                handleChangeRow(v, e);
              }
            }}
            onSelectionModelChange={(e) => setselected(e)}
          />
        </Fragment>
      ) : (
        <NoTransactions>
          {rowsCopy.length > 0 ? (
            <div className="text">
              {lang
                ? "אין עסקאות זמינות עבור משבצת זמן זו"
                : "No transactions available for this Time Slot"}
            </div>
          ) : (
            <div className="text">
              {lang ? "אין עסקאות זמינות" : "No transactions available"}
            </div>
          )}

          <AddTransactionButton onClick={addTransaction}>
            <AddCircleIcon />
          </AddTransactionButton>
          {hideDateFilter && (
            <DateButton1
              onClick={() => {
                setrows(rowsCopy);
                setHideDateFilter(false);
                setValue([null, null]);
              }}
            >
              {lang ? "הסר מסנן תאריך" : "Remove Date Filter"}
            </DateButton1>
          )}
        </NoTransactions>
      )}
    </div>
  );
};

export default ClientDataGrid;
