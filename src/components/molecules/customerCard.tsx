import { Avatar } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SetCustomer } from "../../store/Reducers/client";
import { useDispatch } from "react-redux";

const MainContainer = styled("div")`
  padding: 24px;
  width: 388.32px;
  min-height: 131.11px;
  background: var(--white);
  box-shadow: 0px 4.00332px 4.00332px rgba(0, 0, 0, 0.25);
  border-radius: 31.5294px;
  display: flex;
  margin: 12px;
  transition: ease-in all 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  @media only screen and (max-width: 1600px) {
    width: 360px;
    min-height: 100px;
  }
  @media only screen and (max-width: 1500px) {
    width: 340px;
    min-height: 90px;
  }
  @media only screen and (max-width: 1420px) {
    width: 300px;
    min-height: 70px;
  }
`;

const SubContainer = styled("div")`
  display: flex;
  flex-direction: column;
  width: 76%;
  padding-left: 5px;
`;

const SubId = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-weight: 500;
  font-size: 12.6222px;
  color: var(--card-text);
`;

const SubName = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: var(--card-text);
  font-weight: 500;
  font-size: 25.2444px;
  @media only screen and (max-width: 1600px) {
    font-size: 22px;
  }
  @media only screen and (max-width: 1500px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 1420px) {
    font-size: 18px;
  }
`;

const SubHeader = styled("div")`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* flex-direction: column; */
`;

const SubNew = styled("div")`
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  padding: 5px 15px;
  background: #fda600;
  border-radius: 23px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: auto;
  color: var(--background);
`;
const SubNew1 = styled("div")`
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-decoration: underline;
`;

const SubJob = styled("div")`
  height: 22px;
  font-weight: 500;
  font-size: 12.6222px;
  color: var(--card-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const CustomerCard = ({ data, setClientDetailsId, handleOpen }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [allClients, lang]: any = useSelector((state: RootState) => {
    return [state.customerList.customer, state.lang];
  });

  const clickHandler: any = (id: any) => {
    if (data["new_Client"] === true) {
      const temp = {
        ...data,
      };
      let result = [];
      temp["new_Client"] = false;
      const t1: any = [...allClients];
      for (let i = 0; i < t1.length; i++) {
        if (t1[i].ID === temp.ID) {
          result.push(temp);
        } else {
          result.push(t1[i]);
        }
      }
      dispatch(SetCustomer(result));
    }
    history.push(`/source/${id}`);
  };

  return (
    <MainContainer
      onClick={() => {
        clickHandler(data.ID);
      }}
    >
      <AvatarContainer>
        <Avatar>
          <div>{data.firstName[0]}</div>
        </Avatar>
        {data["new_Client"] === true && <SubNew>{lang ? "חדש" : "new"}</SubNew>}
      </AvatarContainer>
      <SubContainer>
        <SubId>{data.eMail}</SubId>
        <SubName>
          {data.firstName} {data.lastName}
        </SubName>
        <SubNew1
          onClick={(e) => {
            setClientDetailsId(data.ID);
            handleOpen();
            e.stopPropagation();
          }}
        >
          {lang ? "פרטי לקוח" : "View Client Details"}
        </SubNew1>
      </SubContainer>
    </MainContainer>
  );
};

export default CustomerCard;
