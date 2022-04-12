import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getTransactionDetails, get_AllSources } from "./../../api/get";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import styled from "styled-components";
import LoaderScreen from "../../components/molecules/LoaderScreen";
import Header from "../../components/molecules/header";
import Chart from "../Chart/chart";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AddClientContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--background);
  width: 100%;
  min-height: 100vh;
`;

const NoTransactions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 93px;
  border: 2px solid var(--logout-icon);
  background-color: var(--background);
  .text {
    font-weight: 500;
    font-size: 35.102px;
    text-align: center;
    color: var(--grid-text);
  }
`;
const DataGrid1 = styled.div`
  margin-top: 50px;
  height: 637px;
  max-width: 1500px;
  width: 100%;
  border-bottom-left-radius: 800px;
  border-top-left-radius: 800px;
  @media only screen and (max-width: 1600px) {
    max-width: 1400px;
    min-height: 650px;
  }

  @media only screen and (max-width: 1500px) {
    max-width: 1300px;
    min-height: 600px;
  }

  @media only screen and (max-width: 1400px) {
    max-width: 1200px;
    min-height: 550px;
  }
`;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const AllTransaction = ({ match }: any) => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });
  const history: any = useHistory();
  const [allTransactions, setallTransactions] = useState([]);
  const [rows, setrows] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [flag, setFlag] = useState(true);
  const [state, setstate] = useState(true);

  useEffect(() => {
    const getAll: any = async () => {
      const client_id = match.params.id;
      const res = await get_AllSources(client_id);
      // const res = history.location.state.sources_list;
      console.log("res", res);
      let temp: any = [];
      for (let i = 0; i < res.length; i++) {
        let res1 = await getTransactionDetails(res[i].ID);
        for (let j = 0; j < res1.length; j++) {
          delete res1[j].ID;
          res1[j].source = res[i].sourceName;
        }
        temp = [...temp, ...res1];
      }
      if (temp.length == 0) {
        setFlag(false);
      } else {
        const obj = temp[0];
        const columns_arr: any = [];
        columns_arr.push({
          field: "source",
          headerName: "source",
          width: 150,
        });
        Object.keys(obj).map((key) => {
          const col = {
            field: key,
            headerName: key,
            width: 200,
          };
          columns_arr.push(col);
        });
        const rows_arr: any = [];
        temp.map((obj: any, index: any) => {
          const new_obj = { id: index, ...obj };
          rows_arr.push(new_obj);
        });
        setcolumns(columns_arr);
        setrows(rows_arr);
        setallTransactions(temp);
        setFlag(false);
      }
    };

    getAll();
  }, []);

  if (state) {
    return (
      <>
        {flag ? (
          <LoaderScreen />
        ) : (
          <AddClientContainer>
            {allTransactions.length === 0 ? (
              <Header
                heading={lang ? "ריכוז פעולות" : "Unified transactions"}
                subheading="@WW24"
                buttonText={lang ? "צפיה בגראפים" : "View Charts"}
                buttonHandler={() => {
                  setstate((prev) => !prev);
                }}
                hidden
              />
            ) : (
              <Header
                heading={lang ? "ריכוז פעולות" : "Unified transactions"}
                subheading="@WW24"
                buttonText={lang ? "צפיה בגראפים" : "View Charts"}
                buttonHandler={() => {
                  setstate((prev) => !prev);
                }}
              />
            )}

            <DataGrid1>
              <div
                style={{
                  height: "100%",
                  background:
                    allTransactions.length === 0
                      ? "var(--white)"
                      : "var(--white)",
                  borderRadius: 93,
                }}
              >
                {allTransactions.length != 0 ? (
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    disableSelectionOnClick
                    components={{
                      Toolbar: CustomToolbar,
                    }}
                  />
                ) : (
                  <NoTransactions>
                    <div className="text">
                      {lang ? "אין עסקאות זמינות" : "No transactions available"}
                    </div>
                  </NoTransactions>
                )}
              </div>
            </DataGrid1>
          </AddClientContainer>
        )}
      </>
    );
  }
  return (
    <Chart setstate={setstate} client_id={history.location.state.client_id} />
  );
};

export default AllTransaction;
