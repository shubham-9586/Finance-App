import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/molecules/header";
import CustomerCard from "../../components/molecules/customerCard";
import { get_AllClients } from "../../api/get";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SvgSearch from "../../components/vectors/Search";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { SetCustomer } from "../../store/Reducers/client";
import Logout from "../../components/atoms/logOutButton";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import ClientDetails from "../../components/molecules/clientDetails";

const AddClientContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: var(--background);
  width: 100%;
  min-height: 100vh;
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  width: 80%;
  max-width: 1500px;
  height: 110px;
  border-bottom: 1px solid #adb5bd;
`;
const SubHeader1 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubHeaderInput = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  width: 483px;
  height: 67px;
  margin-left: 40px;
  border: 2px solid var(--subheader-color);
  box-sizing: border-box;
  border-radius: 51px;
  font-weight: 500;
  font-size: 18px;
  color: var(--subheader-color);
  text-align: right;
  padding: 16px;
  padding-right: 65px;
  outline: none;
  ::placeholder {
    color: var(--subheader-color);
  }
`;

const InputContainer = styled.div`
  position: relative;
  div {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding-right: 40px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 1500px;
  padding: 22px;
`;

const LoadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vh;
`;

const Home = () => {
  const dispatch = useDispatch();
  const [token, customerList, lang]: any = useSelector((state: RootState) => {
    return [state.isAuth.isAuth, state.customerList.customer, state.lang];
  });

  const history = useHistory();
  const [allClients, setAllClients] = useState([]);
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState(true);
  const [clientDetails, setClientDetails] = useState(null);
  const [clientDetailsId, setClientDetailsId] = useState(null);
  const [currentClientId, setcurrentClientId] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (id: any) => {
    setcurrentClientId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);

  useEffect(() => {
    const genResult = async () => {
      const res = await get_AllClients(token);
      setAllClients(res);
      dispatch(SetCustomer(res));
      setFlag(false);
    };
    if (customerList?.length === 0) genResult();
    else {
      setAllClients(customerList);
      setFlag(false);
    }
  }, []);

  useEffect(() => {
    if (search === "") {
      setAllClients(customerList);
      return;
    }

    let sar: any = [];
    const search1 = search.toLowerCase();
    for (let i = 0; i < customerList.length; i++) {
      let str = customerList[i].firstName.toLowerCase();
      let str1 = customerList[i].lastName.toLowerCase();
      if (str.includes(search1) || str1.includes(search1)) {
        sar.push(customerList[i]);
      }
    }
    setAllClients(sar);
  }, [search]);

  useEffect(() => {
    if (clientDetailsId === null) return;
    for (let i = 0; i < customerList.length; i++) {
      if (customerList[i].ID === clientDetailsId) {
        setClientDetails(customerList[i]);
      }
    }
  }, [clientDetailsId]);

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      console.log("window.location.href", window.location.href);
      if (!window.location.href.includes("source")) {
        window.history.pushState(null, document.title, window.location.href);
      }
    });
  }, []);

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
        onClose={handleClose}
      >
        <ClientDetails
          clientDetails={clientDetails}
          handleClose={handleClose}
          currentClientId={currentClientId}
        />
      </Modal>
      <Header
        heading={lang ? "רשימת לקוחות" : "Your clientele"}
        subheading={`${allClients ? allClients.length : 0} ${
          lang ? "לקוחות פעילים" : "active clients"
        }`}
        buttonText={lang ? "+ הוסף לקוח חדש" : "+ Add New Client"}
        buttonHandler={() => history.push("/addclient")}
      />
      <SubHeader>
        <SubHeader1>
          <Logout />
          <InputContainer>
            <SubHeaderInput
              placeholder={lang ? "חיפוש" : "Search...."}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div>
              <SvgSearch color="var(--subheader-color)" />
            </div>
          </InputContainer>
        </SubHeader1>
      </SubHeader>
      {flag ? (
        <LoadContainer>
          <CircularProgress
            color="inherit"
            style={{ color: "black" }}
            size={50}
          />
        </LoadContainer>
      ) : (
        <CardContainer>
          {allClients?.map((data: any) => {
            return (
              <CustomerCard
                data={data}
                key={data.ID}
                setClientDetailsId={setClientDetailsId}
                handleOpen={() => handleOpen(data.ID)}
              />
            );
          })}
        </CardContainer>
      )}
    </AddClientContainer>
  );
};

export default Home;
