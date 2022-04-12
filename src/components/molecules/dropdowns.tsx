import styled from "styled-components";
import { Arrowup } from "../vectors";

const DropdownContainer = styled.div``;

const Label = styled.div``;

const DropdownHeader = styled.div``;

const DropdownList = styled.div``;

interface DropdownsProps {
  type: string;
  label: string;
}

const Dropdowns = ({ type, label }: DropdownsProps) => {
  if (type == "checklist") {
    return (
      <DropdownContainer>
        <Label>{label}</Label>
        <DropdownHeader>
          <div>
            <Arrowup />
          </div>
          <div></div>
        </DropdownHeader>
        <DropdownList></DropdownList>
      </DropdownContainer>
    );
  }
};

export default Dropdowns;
