import { Fragment, useState } from "react";
import styled from "styled-components";
import Button from "./components/atoms/button";
import Header from "./components/molecules/header";
import Input from "./components/atoms/input";
import CustomerCard from "./components/molecules/customerCard";
import { useDispatch } from "react-redux";
import { RemoveToken } from "./store/Reducers/Auth";
import Circle from "./components/atoms/circle";
import NewCustomer from "./components/molecules/newCustomer";
import SvgAnimate from "./components/vectors/Animate";
import PhysicalCard_small from "./components/molecules/physicalCard_small";
import PhysicalCard_large from "./components/molecules/physicalCard_large";
import BankaccountCard from "./components/molecules/credit_card";
import ClientDataGrid from "./components/molecules/clientDataGrid";

const HomeContainer = styled("div")`
  background-color: var(--black);
  min-height: 100vh;
  z-index: 100;
`;

const Test = () => {
  const [input, setinput] = useState("");
  console.log("hello in sde");

  const somefunc = () => {
    console.log("clicked");
  };

  return (
    <HomeContainer>
      {/* <Button
        title="Add new client"
        type="secondary"
        clickHandler={() => {}}
        padding="20px 20px"
      /> */}

      {/* <Button
        title="Add new client"
        type="secondary"
        clickHandler={() => {}}
    <Fragment>
      <Button
        title="Add new client"
        type="secondary"
        padding="30px 40px"
        clickHandler={somefunc}
      ></Button>
      <Header
        heading="Your clientele"
        subheading="13 new client"
        buttonText="+ Add New Client"
        buttonHandler={() => {
          return null;
        }}
      />
      <div style={{ width: 200 }}>
        <Input
          type="text"
          placeholder="Some Input"
          label="Input Field"
          value={input}
          setvalue={setinput}
          height={30}
        />
      </div> */}
      <div style={{ marginTop: 100 }}></div>
      <div style={{ marginLeft: 100 }}>
        <NewCustomer />
      </div>

      {/* <div style={{ marginLeft: 300, marginTop: 300 }}>
        <BankaccountCard theme="light" size="small" />
      </div>
      <div style={{ marginLeft: 300, marginTop: 300, paddingBottom: 300 }}>
        <BankaccountCard theme="dark" size="small" />
      </div> */}
      {/* <ClientDataGrid sources={"something"} /> */}
      <div
        style={{
          marginLeft: 300,
          marginTop: 300,
          paddingBottom: 300,
          display: "flex",
          gap: 20,
        }}
      >
        {/* <BankaccountCard theme="dark" size="small" /> */}
        {/* <BankaccountCard theme="dark" size="large" />
        <BankaccountCard theme="light" size="large" /> */}
      </div>
    </HomeContainer>
  );
};

export default Test;
