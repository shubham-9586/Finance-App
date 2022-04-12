import React from "react";
import styled from "styled-components";
import { Divider } from "@mui/material";
import Circle from "../atoms/circle";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useHistory } from "react-router";
import EditIcon from "@mui/icons-material/Edit";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 1062px;
  height: 483px;
  background: var(--white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 27px;
`;

const LeftContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubLeftContainer = styled.div`
  width: 70%;
`;

const SubLeftContainer1 = styled.div`
  width: 70%;
`;

const RightContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CenterContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SubContainerHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-weight: 600;
  font-size: 18px;
  color: #999999;
  margin-bottom: 25px;
`;

const SubContainerItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const SubContainerItem1 = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #343a40;
`;

const SubContainerItem2 = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #343a40;
`;

const Header = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 35px;
  .client-name {
    font-weight: 500;
    font-size: 35px;
    color: #000000;
  }
  .edit-icon {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const CircleContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: 25px;
  .light {
    transform: translate(-60%, -60%);
    border-radius: 27px;
    z-index: 5;
  }
`;

const DeleteIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 18px;
  top: 18px;
  cursor: pointer;
  z-index: 9;
`;

const ClientDetails = ({
  clientDetails,
  handleClose,
  currentClientId,
}: any) => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });
  const history = useHistory();

  return (
    <Container>
      <CircleContainer>
        <div className="light">
          <Circle color="light" size="large" />
        </div>
      </CircleContainer>
      <DeleteIcon
        onClick={() => {
          handleClose();
        }}
      >
        <CloseIcon width={50} height={50} />
      </DeleteIcon>
      <LeftContainer>
        <SubLeftContainer>
          <SubContainerHeader>
            {lang ? "מידע פיננסי" : "Financial details"}
          </SubContainerHeader>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.CSN}</SubContainerItem2>
            <SubContainerItem1>{lang ? `ת"ז` : "CSN"}</SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.netWorth}</SubContainerItem2>
            <SubContainerItem1>
              {lang ? "(₪) שווי נטו" : "(₪) Net worth"}
            </SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>
              {clientDetails.processStartDate}
            </SubContainerItem2>
            <SubContainerItem1>
              {lang ? "מתאריך" : "Process start"}
            </SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>
              {clientDetails.processEndDate}
            </SubContainerItem2>
            <SubContainerItem1>
              {lang ? "עד תאריך" : "Process end"}
            </SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>
              {clientDetails.additionalAnnIncome}
            </SubContainerItem2>
            <SubContainerItem1>
              {lang ? "(₪) הכנסה שנתית נוספת" : "Additional annual income"}
            </SubContainerItem1>
          </SubContainerItem>
        </SubLeftContainer>
      </LeftContainer>
      <CenterContainer>
        <Divider orientation="vertical" />
      </CenterContainer>
      <RightContainer>
        <Header>
          <div
            onClick={(e: any) => {
              history.push(`/editclient/${currentClientId}`);
              e.stopPropagation();
            }}
            className="edit-icon"
          >
            <EditIcon />
          </div>
          <div className="client-name">
            {clientDetails.firstName} {clientDetails.lastName}
          </div>
        </Header>
        <SubLeftContainer1>
          <SubContainerHeader>
            {lang ? "מידע אישי" : "Personal details"}
          </SubContainerHeader>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.city}</SubContainerItem2>
            <SubContainerItem1>{lang ? "עיר" : "City"}</SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.eMail}</SubContainerItem2>
            <SubContainerItem1>{lang ? "מייל" : "Email"}</SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.gender}</SubContainerItem2>
            <SubContainerItem1>{lang ? "מין" : "Gender"}</SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.DOB}</SubContainerItem2>
            <SubContainerItem1>
              {lang ? "תאריך לידה" : "Date of birth"}
            </SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.status}</SubContainerItem2>
            <SubContainerItem1>
              {lang ? "מצב משפחתי" : "Marriage status"}
            </SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.children}</SubContainerItem2>
            <SubContainerItem1>
              {lang ? "מספר ילדים" : "No. of children"}
            </SubContainerItem1>
          </SubContainerItem>
          <SubContainerItem>
            <SubContainerItem2>{clientDetails.mobile}</SubContainerItem2>
            <SubContainerItem1>
              {lang ? "טלפון סלולרי" : "Mobile Number"}
            </SubContainerItem1>
          </SubContainerItem>
        </SubLeftContainer1>
      </RightContainer>
    </Container>
  );
};

export default ClientDetails;
