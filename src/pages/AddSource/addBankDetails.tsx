import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Input from "../../components/atoms/input";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import SelectComponent from "../../components/atoms/select";
import { get_Dropdown } from "../../api/get";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const SubContainer1 = styled.div`
  padding: 120px;
  padding-top: 50px;
  padding-bottom: 0px;
  width: 1030px;
  min-height: 537px;
  background: var(--white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 93px;
`;
const SubContainer2 = styled.div`
  margin-top: 35px;
  margin-left: 42px;
`;
const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: 600;
  font-size: 28px;
  text-align: right;
  color: #343a40;
`;
const SubContainer11 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const SubContainerItem = styled.div`
  width: 100%;
  height: 303px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const CSVButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: inherit;
  width: 178px;
  height: 48px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 106px;
  font-weight: 500;
  font-size: 16px;
  color: var(--black);
  .plus {
    font-size: 26px;
    font-weight: 400;
    margin-right: 10px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const CSVUploadButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-weight: 400;
  color: var(--black);
  width: 30px;
  height: 30px;
  padding: 20px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    background: #eee;
  }
`;
const CSVButtonFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 9.2941px 17.5882px;
  width: fit-content;
  height: 48px;
  border: 1px solid #343a40;
  box-sizing: border-box;
  border-radius: 141.176px;
  margin: 10px;
`;
const CSVButtonFileText = styled.div`
  font-weight: 400;
  font-size: 14.9412px;
  color: #000000;
  margin-right: 5px;
`;
const CSVButtonFileSvg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    background-color: var(--lightgrey);
  }
`;
const CSVButtonFileFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const CSVButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const AddBankDetails = ({ sourceData, setSouceData }: any) => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });

  const inputFile: any = useRef(null);
  const [sourceName, setSouceName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [active, setActive] = useState("");
  const [fileName, setFileName] = useState([]);
  const [bank_list, setbank_list] = useState([]);
  const [base64File, setbase64File]: any = useState([]);

  const ActiveOptions = [
    { value: "Y", name: `${lang ? "כן" : "Yes"}` },
    { value: "N", name: `${lang ? "לא" : "No"}` },
  ];
  useEffect(() => {
    const getAllBanks = async () => {
      const res = await get_Dropdown("BANK");
      const arr: any = [];
      res.forEach((lov: any) => {
        const obj = {
          value: lov.LOV_CODE,
          name: lov.LOV_VAL,
        };
        arr.push(obj);
      });
      setbank_list(arr);
    };
    getAllBanks();
  }, []);

  useEffect(() => {
    let res = {
      ...sourceData,
      sourceType: "Bank",
      sourceName: sourceName,
      bankName: bankName,
      bankBranch: bankBranch,
      bankAccountNumber: bankAccountNumber,
      ACTIVE: active,
      sourceFileName: fileName,
      base64File: base64File,
    };
    setSouceData(res);
  }, [
    sourceName,
    bankName,
    bankBranch,
    bankAccountNumber,
    active,
    fileName,
    base64File,
  ]);

  const onButtonClick = () => {
    console.log("button");
    console.log(inputFile.current);
    inputFile.current.click();
  };

  const getBase641 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const fileHandler: any = async (e: any) => {
    let res: any = [...base64File];
    let res1: any = [...fileName];
    let flag = true;
    for (let i = 0; i < e.target.files.length; i++) {
      if (res1.includes(e.target.files[i].name)) {
        flag = false;
      }
    }
    if (flag) {
      for (let i = 0; i < e.target.files.length; i++) {
        let sar1: any = {};
        sar1.name = e.target.files[i].name;
        sar1.base64File = await getBase641(e.target.files[i]);
        res.push(sar1);
        res1.push(e.target.files[i].name);
      }
      console.log(res);
      setFileName(res1);
      setbase64File(res);
    } else {
      if (lang) {
        toast.warning("לא ניתן להעלות את אותו קובץ שוב");
      } else {
        toast.warning("Cannot Upload Same File Again");
      }
    }
  };

  const crossFileHandler: any = (file: any) => {
    let res: any = [];
    let res1: any = [];
    for (let i = 0; i < base64File.length; i++) {
      if (base64File[i].fileName === file) {
        continue;
      } else {
        res.push(base64File[i]);
      }
    }
    for (let i = 0; i < fileName.length; i++) {
      if (fileName[i] === file) {
        continue;
      } else {
        res1.push(fileName[i]);
      }
    }
    setFileName(res1);
    setbase64File(res);
  };

  return (
    <SubContainer1>
      <SubHeader>
        {lang ? "הקלד פרטי חשבון" : "Enter Account Details"}
      </SubHeader>
      <SubContainer11>
        <SubContainerItem>
          <div style={{ marginTop: "15px", width: 345 }}>
            <SelectComponent
              label={lang ? "פָּעִיל" : "Active"}
              labelforcss="Active"
              options={ActiveOptions}
              value={active}
              setvalue={setActive}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <Input
              type="text"
              label={lang ? "מספר חשבון" : "Account Number"}
              placeholder="SLA220154653"
              height={50}
              value={bankAccountNumber}
              setvalue={setBankAccountNumber}
            />
          </div>
        </SubContainerItem>
        <SubContainerItem>
          <div style={{ marginTop: "15px" }}>
            <Input
              type="text"
              label={lang ? "שם המקור" : "Source Name"}
              placeholder="My Main Bank"
              height={50}
              value={sourceName}
              setvalue={setSouceName}
            />
          </div>
          <div style={{ marginTop: "15px", width: 345, position: "relative" }}>
            <SelectComponent
              label={lang ? "שם בנק" : "Bank Name"}
              labelforcss="Bank Name"
              value={bankName}
              setvalue={setBankName}
              options={bank_list}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <Input
              type="text"
              label={lang ? "סניף" : "Bank Branch"}
              placeholder="IL950108000000090722422"
              height={50}
              value={bankBranch}
              setvalue={setBankBranch}
            />
          </div>
        </SubContainerItem>
      </SubContainer11>
      <SubContainer2>
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          id="file"
          ref={inputFile}
          onChange={fileHandler}
          hidden
          multiple
        />
        {fileName.length === 0 ? (
          <CSVButton onClick={onButtonClick}>
            <span>{`${lang ? "טען קובץ" : "Import"} XLS/XLSX`}</span>
          </CSVButton>
        ) : (
          <CSVButtonContainer>
            <CSVUploadButton onClick={onButtonClick}>
              <span>+</span>
            </CSVUploadButton>
            {fileName.map((data: any) => {
              return (
                <CSVButtonFile key={data.ID}>
                  <CSVButtonFileFlex>
                    <CSVButtonFileText>{data}</CSVButtonFileText>
                    <CSVButtonFileSvg
                      onClick={() => {
                        crossFileHandler(data);
                      }}
                    >
                      <CloseIcon />
                    </CSVButtonFileSvg>
                  </CSVButtonFileFlex>
                </CSVButtonFile>
              );
            })}
          </CSVButtonContainer>
        )}
      </SubContainer2>
    </SubContainer1>
  );
};

export default AddBankDetails;
