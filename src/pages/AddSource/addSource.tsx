import React, { useState, useEffect } from "react";
import Header from "../../components/molecules/header";
import styled from "styled-components";
import AddBankDetails from "./addBankDetails";
import AddCreditCard from "./addCreditCard";
import { create_ClientSource } from "./../../api/create";
import { create_CSV } from "../../api/create";
import { useHistory } from "react-router";
import LoaderScreen from "../../components/molecules/LoaderScreen";
import { toast } from "react-toastify";
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
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1500px;
  min-height: 650px;
  background: var(--lightgrey);
  border-radius: 93px;
  margin: 39px;
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

const SubContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
`;

const SubContainerText = styled.div`
  font-weight: 600;
  font-size: 28px;
  color: var(--black);
  margin-top: 50px;
  margin-bottom: 34px;
`;

interface SubContainerBankTextProps {
  name: string;
  selected: string;
}

const SubContainerButtonText = styled.div<SubContainerBankTextProps>`
  font-weight: 500;
  font-size: 18px;
  padding: 24px 48px;
  width: 230px;
  text-align: center;
  background: ${(props) => {
    if (props.name == props.selected) {
      return "var(--cc-primary)";
    } else {
      return "var(--card-grey)";
    }
  }};
  color: ${(props) => {
    if (props.name == props.selected) {
      return "var(--cc-text)";
    } else {
      return "var(--black)";
    }
  }};
  border-radius: 106px;
  &:hover {
    cursor: pointer;
  }
`;

const Initial_State: any = {
  sourceType: "",
  sourceName: "",
  bankName: "",
  bankBranch: "",
  bankAccountNumber: "",
  ACTIVE: "",
  ccType: "",
  ccProvider: "",
  cc4digits: "",
  sourceCreditLimit: "",
  sourceFileName: [],
};

const AddSource = ({ match }: any) => {
  const history = useHistory();
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });
  const [sourceData, setSouceData]: any = useState(Initial_State);
  const [selected, setSelected]: any = useState("bank");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (history.location.state) {
      setSelected(history.location.state);
    }
  }, []);

  const submitHandler = async (e: any) => {
    let res1 = {
      ...sourceData,
    };
    if (selected == "bank") {
      console.log("inside");
      if (
        res1.sourceName == "" ||
        res1.bankName == "" ||
        res1.bankBranch == "" ||
        res1.ACTIVE == "" ||
        res1.bankAccountNumber == ""
      ) {
        if (lang) {
          toast.warning("אנא מלא את כל השדות הנדרשים");
        } else {
          toast.warning("Please Fill All Required Field");
        }
      } else {
        setFlag(true);
        delete res1.sourceFileName;
        delete res1.base64File;
        const res2 = await create_ClientSource(res1, match.params.id);
        let result = res2[res2.length - 1];
        for (let i = 0; i < sourceData.base64File.length; i++) {
          const res = await create_CSV(sourceData.base64File[i], result.ID);
        }
        setFlag(false);
        if (Array.isArray(res2)) {
          history.push({
            pathname: `/source/${match.params.id}`,
            state: {
              flag: `${lang ? "מקור בנק חדש נוסף" : "New Bank Source Added"}`,
            },
          });
        }
      }
    }
    if (selected == "cc") {
      if (
        res1.sourceName == "" ||
        res1.ccType == "" ||
        res1.ccProvider == "" ||
        res1.cc4digits == "" ||
        res1.ACTIVE == "" ||
        res1.sourceCreditLimit == ""
      ) {
        if (lang) {
          toast.warning("אנא מלא את כל השדות הנדרשים");
        } else {
          toast.warning("Please Fill All Required Field");
        }
      } else {
        setFlag(true);
        console.log("inside4");
        delete res1.sourceFileName;
        delete res1.base64File;
        const res2 = await create_ClientSource(res1, match.params.id);
        let result = res2[res2.length - 1];
        for (let i = 0; i < sourceData.base64File.length; i++) {
          const res = await create_CSV(sourceData.base64File[i], result.ID);
        }
        setFlag(false);
        if (Array.isArray(res2)) {
          history.push({
            pathname: `/source/${match.params.id}`,
            state: {
              flag: `${
                lang ? "נוסף כרטיס אשראי חדש" : "New Credit Card Added"
              }`,
            },
          });
        }
      }
    }
  };

  return (
    <>
      {flag ? (
        <LoaderScreen />
      ) : (
        <AddClientContainer>
          <Header
            heading={lang ? "הוסף מקור הכנסה" : "Add a new income source"}
            subheading="@WW24"
            buttonText={lang ? "שלח פרטי מקור" : "Submit source details"}
            buttonHandler={submitHandler}
          />
          <MainContainer>
            {selected === "bank" ? (
              <AddBankDetails
                sourceData={sourceData}
                setSouceData={setSouceData}
              />
            ) : (
              <AddCreditCard
                sourceData={sourceData}
                setSouceData={setSouceData}
              />
            )}
            <SubContainer>
              <SubContainerText>
                {lang ? "בחר סוג מקור" : "Select source type"}
              </SubContainerText>
              <div className="buttons">
                <SubContainerButtonText
                  name="bank"
                  selected={selected}
                  onClick={() => {
                    setSouceData(Initial_State);
                    setSelected("bank");
                  }}
                >
                  {lang ? "מספר חשבון" : "Bank Account"}
                </SubContainerButtonText>
                <SubContainerButtonText
                  name="cc"
                  selected={selected}
                  onClick={() => {
                    setSouceData(Initial_State);
                    setSelected("cc");
                  }}
                >
                  {lang ? "כרטיס אשראי" : "Credit Card"}
                </SubContainerButtonText>
              </div>
            </SubContainer>
          </MainContainer>
        </AddClientContainer>
      )}
    </>
  );
};

export default AddSource;
