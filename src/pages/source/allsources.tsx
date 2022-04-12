import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/molecules/header";
import { get_AllSources } from "../../api/get";
import LoaderScreen from "../../components/molecules/LoaderScreen";
import { useHistory } from "react-router";
import PhysicalCard_large from "../../components/molecules/physicalCard_large";
import CreditCard from "../../components/molecules/credit_card";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import DeleteObject from "../../components/molecules/deleteObjects";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SetCustomer } from "../../store/Reducers/client";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background);
  min-height: 100vh;
  width: 100%;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--black);
  min-height: 100vh;
  width: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 100%;
  max-width: 1500px;
  margin-top: 20px;
  background: var(--white);
  border-radius: 93px;
  padding: 48px;
  gap: 20px;
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

const AllBankAccountsCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .heading {
    font-weight: 600;
    font-size: 28px;
    padding-right: 20px;
  }
`;
const AllCreditCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .heading {
    font-weight: 600;
    font-size: 28px;
    padding-right: 20px;
  }
`;
const MultipleCardsCarousel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
  gap: 30px;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  .hover {
    cursor: pointer;
  }
`;

const MultipleCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
  gap: 30px;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  .hover {
    cursor: pointer;
  }
`;

const Allsources = ({ match }: any) => {
  const [customerList, lang]: any = useSelector((state: RootState) => {
    return [state.customerList.customer, state.lang];
  });

  const history: any = useHistory();

  const [open, setOpen] = useState(false);
  const [allbankaccounts, setallbankaccounts]: any = useState([]);
  const [allcreditcards, setallcreditcards]: any = useState([]);
  const [current_cc, setcurrent_cc] = useState(0);
  const [current_bank, setcurrent_bank] = useState(0);
  const [source_details, setsource_details]: any = useState(null);
  const [selected_source, setselected_source] = useState("bank");
  const [flag, setFlag] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [no_source_flag, setno_source_flag] = useState(false);
  const [name, setName] = useState("Client Name");

  useEffect(() => {
    const genResult = async () => {
      const res = await get_AllSources(match.params.id);
      const bank: any = [];
      const cc: any = [];
      res.map((obj: any) => {
        if (obj.sourceType == "Bank") {
          bank.push(obj);
        }
        if (obj.sourceType == "cc") {
          cc.push(obj);
        }
      });
      setallbankaccounts(bank);
      setallcreditcards(cc);
      if (bank.length > 0) {
        console.log("details", bank[0]);
        setsource_details(bank[0]);
      } else {
        if (cc.length > 0) {
          console.log("details", bank[0]);
          setselected_source("cc");
          setsource_details(cc[0]);
        } else {
          setno_source_flag(true);
        }
      }
      setFlag(false);
    };

    genResult();
  }, [open]);

  useEffect(() => {
    if (history.location.state?.flag) {
      toast.success(history.location.state?.flag);
      let state = { ...history.location.state };
      delete state.flag;
      history.replace({ ...history.location, state });
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < customerList.length; i++) {
      if (customerList[i].ID === match.params.id) {
        setName(`${customerList[i].firstName} ${customerList[i].lastName}`);
        break;
      }
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {flag ? (
        <LoaderContainer>
          <LoaderScreen />
        </LoaderContainer>
      ) : (
        <Container>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
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
            <DeleteObject
              id={deleteId}
              parid={match.params.id}
              text={lang ? "למחוק את המקור הזה?" : "Delete this source ?"}
              type={"source"}
              handleClose={handleClose}
            />
          </Modal>
          <Header
            heading={name}
            subheading="@WW24"
            buttonText={lang ? "הוסף קובץ" : "Add a Source"}
            buttonHandler={() => {
              history.push(`/addsource/${match.params.id}`);
            }}
            extraButton={
              !no_source_flag
                ? lang
                  ? "ערוך מקור נתונים"
                  : "Edit source details"
                : null
            }
            extraButtonHandler={() => {
              history.push({
                pathname: `/editsource/${source_details.ID}`,
                state: {
                  source_details: source_details,
                  selected_source: selected_source,
                  clientId: match.params.id,
                },
              });
            }}
          />
          <SubContainer>
            <AllBankAccountsCards>
              <div className="heading">
                {lang ? "פרטי חשבון בנק" : "Bank account details"}
              </div>
              <MultipleCardsCarousel>
                {allbankaccounts
                  ? allbankaccounts.map((bank: any, key: any) => {
                      return (
                        <div
                          className="hover"
                          key={bank.ID}
                          onClick={() => {
                            setselected_source("bank");
                            setcurrent_bank(key);
                            setsource_details(bank);
                          }}
                        >
                          <PhysicalCard_large
                            details={bank}
                            theme={
                              current_bank == key && selected_source == "bank"
                                ? "dark"
                                : "light"
                            }
                            setDeleteId={setDeleteId}
                            handleOpen={handleOpen}
                          />
                        </div>
                      );
                    })
                  : null}
              </MultipleCardsCarousel>
            </AllBankAccountsCards>
            <AllCreditCards>
              <div className="heading">
                {lang ? "פרטי כרטיס" : "Card Details"}
              </div>
              <MultipleCards>
                {allcreditcards
                  ? allcreditcards.map((cc: any, key: any) => {
                      return (
                        <div
                          className="hover"
                          key={cc.ID}
                          onClick={() => {
                            setselected_source("cc");
                            setcurrent_cc(key);
                            setsource_details(cc);
                          }}
                        >
                          <CreditCard
                            size="large"
                            details={cc}
                            theme={
                              current_cc == key && selected_source == "cc"
                                ? "dark"
                                : "light"
                            }
                            setDeleteId={setDeleteId}
                            handleOpen={handleOpen}
                          />
                        </div>
                      );
                    })
                  : null}
              </MultipleCards>
            </AllCreditCards>
          </SubContainer>
        </Container>
      )}
    </>
  );
};

export default Allsources;
