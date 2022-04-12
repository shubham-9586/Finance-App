import styled from "styled-components";
import Circle from "../atoms/circle";
import SvgVisa from "../vectors/Visa";
import SvgCopy from "../vectors/Copy";
import SvgDelete from "../vectors/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState, useEffect } from "react";
interface ContainerProps {
  theme: string;
}

interface ImageContainerProps {
  theme: string;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 24.2169px;
  width: 300px;
  height: 77px;
  box-shadow: inset 3.01531px 5.02551px 4.02041px rgba(0, 0, 0, 0.25);

  background: ${(props) => {
    if (props.theme == "light") {
      return "var(--card-grey)";
    }
    if (props.theme == "dark") {
      return "var(--cc-small-primary)";
    }
  }};

  color: ${(props) => {
    if (props.theme == "light") {
      return "var(--black)";
    }
    if (props.theme == "dark") {
      return "var(--white)";
    }
  }};

  transform: ${(props) => {
    if (props.theme == "light") {
      return "scale(0.8)";
    }
    if (props.theme == "dark") {
      return "none";
    }
  }};

  transition: all 0.3s ease-in;
  .price {
    font-size: 20px;
    transform: translateX(8px);
  }
  .divider {
    border: 1px solid #e5e5e5;
    width: 30px;
    height: 1px;
    transform: rotate(90deg);
    color: ${(props) => {
      if (props.theme == "light") {
        return "var(--black)";
      }
      if (props.theme == "dark") {
        return "var(--white)";
      }
    }};
  }
  .account-number {
    color: ${(props) => {
      if (props.theme == "light") {
        return "var(--black)";
      }
      if (props.theme == "dark") {
        return "var(--cc-small-account-text)";
      }
    }};
    font-size: 16px;
    transform: translateX(-8px);
  }
`;

const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) => {
    if (props.theme == "light") {
      return "var(--black)";
    }
    if (props.theme == "dark") {
      return "var(--white)";
    }
  }};
  transition: all 0.3s ease-in;
  .image {
    font-weight: 500;
  }
  .text {
    font-weight: 600;
    font-size: 14px;
  }
`;

export const CircleContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: 25px;
  .dark {
    position: absolute;
    transform: translate(-60%, -20%);
  }
  .light {
    transform: translate(-40%, -60%);
    box-shadow: 0px 4.56px 4.56px rgba(0, 0, 0, 0.25);
    border-radius: 27px;
    z-index: 5;
  }
  .light1 {
    transform: translate(-30%, -30%);
    box-shadow: 0px 4.56px 4.56px rgba(0, 0, 0, 0.25);
    border-radius: 27px;
    z-index: 5;
  }
  .dark1 {
    position: absolute;
    transform: translate(-40%, 50%);
  }
`;

// styles for size == "large"
interface LargeContainerProps {
  theme: string;
}

const LargeContainer = styled.div<LargeContainerProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 300px;
  background: ${(props) => {
    if (props.theme == "dark") {
      return "var(--cc-primary)";
    }
    if (props.theme == "light") {
      return "var(--card-grey)";
    }
  }};
  color: ${(props) => {
    if (props.theme == "dark") {
      return "var(--cc-text)";
    }
    if (props.theme == "light") {
      return "var(--black)";
    }
  }};
  transition: all 0.3s ease-in;
  box-shadow: inset 3.01531px 5.02551px 4.02041px rgba(0, 0, 0, 0.25);
  border-radius: 24.2169px;
  padding: 16px;
  .card-holder-name {
    text-align: right;
    font-weight: 600;
    font-size: 16px;
  }
`;

const ImageContainer1 = styled(ImageContainer)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  .text {
    transform: translateY(-20%);
  }
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: right;
  margin-top: 24px;
  .account-balance {
    .balance {
      font-size: 12px;
      font-weight: 500;
    }
    .number {
      font-weight: 600;
      font-size: 20px;
      text-align: left;
      transform: translateY(-10%);
    }
  }

  .account-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  .number-and-icon {
    display: flex;
    gap: 12px;
    .copy-icon {
      svg {
        vertical-align: middle;
      }
    }
  }
  .date {
    font-weight: 500;
    font-size: 12px;
  }
`;

const DeleteIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 10px;
  top: 10px;
  z-index: 9;
`;

interface BankaccountCardProps {
  selected?: string;
  theme: string;
  size: string;
  details: any;
  setDeleteId?: any;
  handleOpen?: any;
}

const CreditCard = ({
  theme,
  size,
  details,
  setDeleteId,
  handleOpen,
}: BankaccountCardProps) => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });
  const [date, setdate] = useState(null);

  useEffect(() => {
    const arr = details.CREATED.split("-");
    if (arr.length > 2) {
      const arr1 = arr[2].split(" ");
      const date: any = `${arr[1]}/${arr1[0]}`;
      console.log("date", date);
      setdate(date);
    }
  }, []);

  if (size == "large") {
    return (
      <LargeContainer theme={theme}>
        <DeleteIcon
          onClick={() => {
            setDeleteId(details.ID);
            handleOpen();
          }}
        >
          <SvgDelete
            color={
              theme == "dark" ? "var(--icon-select)" : "var(--header-text)"
            }
            width={20}
            height={20}
          />
        </DeleteIcon>
        <CircleContainer theme={theme}>
          <div className="dark1">
            <Circle color="dark" size="small" />
          </div>
          <div className="light1">
            <Circle theme={theme} color="light" size="small" />
          </div>
        </CircleContainer>
        <ImageContainer1 theme={theme}>
          <div className={theme == "dark" ? "white image" : "black image"}>
            {details.ccProvider}
          </div>
          <div className="text">{lang ? "כרטיס אשראי" : "Credit Card"}</div>
        </ImageContainer1>
        <div className="card-holder-name">{details.sourceName}</div>
        <CardDetails theme={theme}>
          <div className="account-balance">
            <div className="balance" style={{ opacity: 0 }}>
              {lang ? `יתרה בש"ח` : "Balance"}
            </div>
            <div className="number" style={{ opacity: 0 }}>
              xxx
            </div>
          </div>
          <div className="account-details">
            <div className="number-and-icon">
              <div className="copy-icon">
                <SvgCopy color={theme == "dark" ? "white" : "black"} />
              </div>
              <div className="account-number">{details.cc4digits}</div>
            </div>
            <div className="date">{date}</div>
          </div>
        </CardDetails>
      </LargeContainer>
    );
  }

  return (
    <Container theme={theme}>
      <CircleContainer>
        <div className="dark">
          <Circle theme={theme} color="dark" size="verysmall" />
        </div>
        <div className="light">
          <Circle theme={theme} color="light" size="verysmall" />
        </div>
      </CircleContainer>
      <div className="price">xxx</div>
      <div className="divider"></div>
      <div className="account-number">{details.cc4digits}</div>
      <ImageContainer1 theme={theme}>
        <div className={theme == "dark" ? "white image" : "black image"}>
          {details.ccProvider}
        </div>
        <div className="text">{lang ? "כרטיס אשראי" : "Credit Card"}</div>
      </ImageContainer1>
    </Container>
  );
};

export default CreditCard;
