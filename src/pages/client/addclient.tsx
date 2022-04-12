import { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/atoms/input";
import SelectComponent from "../../components/atoms/select";
import Header from "../../components/molecules/header";
import { create_Client } from "../../api/create";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Modal from "@mui/material/Modal";
import NewCustomer from "../../components/molecules/newCustomer";
import Backdrop from "@mui/material/Backdrop";
import { SetCustomer } from "../../store/Reducers/client";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import validator from "validator";
import { get_Dropdown } from "../../api/get";

const AddClientContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  background-color: var(--background);
  width: 100%;
  min-height: 100vh;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 65px;
  background-color: var(--white);
  width: 1500px;
  max-width: 1500px;
  position: relative;
  border-radius: 93px;
  padding-bottom: 120px;
  @media only screen and (max-width: 1600px) {
    max-width: 1400px;
  }
  @media only screen and (max-width: 1500px) {
    max-width: 1300px;
  }
  @media only screen and (max-width: 1400px) {
    max-width: 1200px;
  }
`;

const PersonalDetails = styled.div`
  width: 50%;
  padding-right: 75px;
`;

const FinancialDetails = styled.div`
  width: 50%;
  padding-left: 75px;
`;

const PHeading = styled.div`
  margin-top: 42px;
  font-size: 28px;
  font-weight: 600;
  color: var(--black);
  text-align: right;
  margin-bottom: 80px;
`;
const FHeading = styled(PHeading)``;

const InputContainerLeft = styled.div`
  width: 258px;
  justify-self: end;
  @media only screen and (max-width: 1600px) {
    max-width: 230px;
  }

  @media only screen and (max-width: 1500px) {
    max-width: 210px;
  }

  @media only screen and (max-width: 1400px) {
    max-width: 200px;
  }
`;

const InputContainerRight = styled.div`
  width: 258px;
  justify-self: end;
  @media only screen and (max-width: 1600px) {
    max-width: 230px;
  }

  @media only screen and (max-width: 1500px) {
    max-width: 210px;
  }

  @media only screen and (max-width: 1400px) {
    max-width: 200px;
  }
`;

const PInputFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 63px;
  justify-items: end;
`;
const FInputFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 63px;
  justify-items: start;
`;

const Divider = styled.div`
  position: absolute;
  height: 1px;
  top: 50%;
  left: 50%;
  width: 531px;
  transform: translate(-50%, -50%) rotate(90deg);
  background-color: var(--grey);
`;

const dropdown_name_arr = ["GENDER", "CITY", "STATUS"];

const AddClient = () => {
  const dispatch = useDispatch();
  const [token, allClients, lang]: any = useSelector((state: RootState) => {
    return [state.isAuth.isAuth, state.customerList.customer, state.lang];
  });

  const Marriage_Option = [
    { value: "single", name: `${lang ? "יחיד" : "Single"}` },
    { value: "married", name: `${lang ? "נָשׂוּי" : "Married"}` },
    { value: "widow", name: `${lang ? "אַלמָנָה" : "Widow"}` },
    { value: "divorced", name: `${lang ? "גרושה" : "Divorced"}` },
  ];

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [marriage_status, setmarriage_status] = useState("single");
  const [dob, setdob] = useState("");
  const [noc, setnoc] = useState("");
  const [annual_income, setannual_income] = useState("");
  const [networth, setnetworth] = useState("");
  const [csn, setcsn] = useState("");
  const [psd, setpsd] = useState("");
  const [ped, setped] = useState("");
  const [gender, setgender] = useState("");
  const [city, setcity] = useState("");
  const [status, setstatus] = useState("");
  const [dropdown_options, setdropdown_options] = useState({
    city: [],
    gender: [],
    status: [],
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const getDropdownValues = async () => {
      dropdown_name_arr.forEach(async (name) => {
        const res = await get_Dropdown(name);
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
            [name.toLowerCase()]: arr,
          };
        });
      });
    };
    getDropdownValues();
  }, []);

  const SubmitData = async () => {
    const data: any = {
      firstName: firstname,
      lastName: lastname,
      DOB: dob,
      mobile: mobile,
      marriageStatus: marriage_status,
      eMail: email,
      Children: noc,
      CSN: csn,
      additionalAnnIncome: annual_income,
      city: city,
      status: status,
      gender: gender,
      netWorth: networth,
      processStartData: psd,
      processEndDate: ped,
    };

    const arr = Object.keys(data);
    for (let i = 0; i < arr.length; i++) {
      if (data[arr[i]] === "") {
        if (lang) {
          toast.warning("נא למלא את כל הפרטים");
        } else {
          toast.warning("Please Fill all the Details");
        }
        return;
      }
    }
    console.log(data);
    if (!validator.isEmail(data.eMail)) {
      if (lang) {
        toast.warning(`אנא מלא דוא"ל נכון`);
      } else {
        toast.warning("Please Fill Correct Email");
      }
      return;
    }
    const temp1 = String(mobile);
    if (temp1.length != 10 || temp1[0] != "0" || temp1[1] != "5") {
      if (lang) {
        toast.warning("נא למלא מספר נייד נכון");
      } else {
        toast.warning("Please Fill Correct Mobile Number");
      }
      return;
    }
    const res = await create_Client(data, token);
    const res1 = res[res.length - 1];
    console.log(res1, allClients);
    res1.new_Client = true;
    const new_res = [res1, ...allClients];
    dispatch(SetCustomer(new_res));
    handleOpen();
  };

  return (
    <AddClientContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NewCustomer firstname={firstname} lastname={lastname} />
      </Modal>
      <Header
        heading={lang ? "פרטי לקוח" : "Clientele details"}
        subheading="Add new"
        buttonText={lang ? "שלח נתונים" : "Submit data"}
        buttonHandler={SubmitData}
      />

      <Details>
        <PersonalDetails>
          <PHeading>{lang ? "פרטים אישיים" : "Personal Details"}</PHeading>
          <PInputFields>
            <InputContainerLeft>
              <Input
                type="text"
                label={lang ? "שם פרטי" : "First Name"}
                placeholder="Kristin"
                height={56}
                value={firstname}
                setvalue={setfirstname}
              />
            </InputContainerLeft>
            <InputContainerLeft>
              <Input
                type="text"
                label={lang ? "שם משפחה" : "Last Name"}
                placeholder="Watson"
                height={56}
                value={lastname}
                setvalue={setlastname}
              />
            </InputContainerLeft>
            <SelectComponent
              label={lang ? "מין" : "Gender"}
              value={gender}
              setvalue={setgender}
              options={dropdown_options.gender}
            />
            <InputContainerLeft>
              <Input
                type="date"
                label={lang ? "תאריך לידה" : "Date of birth"}
                placeholder="04/12/1989"
                height={56}
                value={dob}
                setvalue={setdob}
              />
            </InputContainerLeft>
            <InputContainerLeft>
              <Input
                type="email"
                label={lang ? "מייל" : "Email"}
                placeholder="test1.pikel@gmail.com"
                height={56}
                value={email}
                setvalue={setemail}
              />
            </InputContainerLeft>
            <InputContainerLeft>
              <Input
                type="text"
                label={lang ? "טלפון סלולרי" : "Mobile Number"}
                placeholder="0543451311"
                height={56}
                value={mobile}
                setvalue={setmobile}
              />
            </InputContainerLeft>
            <SelectComponent
              label={lang ? "עיר" : "City"}
              value={city}
              setvalue={setcity}
              options={dropdown_options.city}
            />
            <SelectComponent
              label={lang ? "סטָטוּס" : "Status"}
              value={status}
              setvalue={setstatus}
              options={dropdown_options.status}
            />
            <InputContainerLeft>
              <Input
                type="text"
                label={lang ? `ת"ז` : "CSN"}
                placeholder="031734399"
                height={56}
                value={csn}
                setvalue={setcsn}
              />
            </InputContainerLeft>

            <InputContainerLeft>
              <Input
                type="text"
                label={lang ? "מספר ילדים" : "Number of children"}
                placeholder="03"
                height={56}
                value={noc}
                setvalue={setnoc}
              />
            </InputContainerLeft>
          </PInputFields>
        </PersonalDetails>
        <Divider />
        <FinancialDetails>
          <FHeading> {lang ? "מידע פיננסי" : "Financial details"}</FHeading>
          <FInputFields>
            <InputContainerRight>
              <Input
                type="text"
                label={lang ? "(₪) שווי נטו" : "(₪) Net worth"}
                placeholder="13000"
                height={56}
                value={networth}
                setvalue={setnetworth}
              />
            </InputContainerRight>
            <InputContainerRight>
              <SelectComponent
                label={lang ? "מצב משפחתי" : "Marriage status"}
                value={marriage_status}
                setvalue={setmarriage_status}
                options={Marriage_Option}
              />
            </InputContainerRight>
            <InputContainerRight>
              <Input
                type="date"
                label={lang ? "עד תאריך" : "Process End Date"}
                placeholder="04/12/1989"
                height={56}
                value={ped}
                setvalue={setped}
              />
            </InputContainerRight>
            <InputContainerRight>
              <Input
                type="date"
                label={lang ? "מתאריך" : "Process Start Date"}
                placeholder="04/12/1989"
                height={56}
                value={psd}
                setvalue={setpsd}
              />
            </InputContainerRight>
            <InputContainerRight>
              <Input
                type="text"
                label={
                  lang
                    ? "(₪) הכנסה שנתית נוספת"
                    : "(₪) Additional annual income"
                }
                placeholder="5000"
                height={56}
                value={annual_income}
                setvalue={setannual_income}
              />
            </InputContainerRight>
          </FInputFields>
        </FinancialDetails>
      </Details>
    </AddClientContainer>
  );
};

export default AddClient;
