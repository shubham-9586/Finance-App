import Header from "../../components/molecules/header";
import styled from "styled-components";
import { Ink } from "../../components/vectors";
import { useHistory } from "react-router";
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

const AddText = styled.div`
  font-weight: 500;
  font-size: 35.102px;
  text-align: center;
  color: var(--grid-text);
`;

const NoSource = ({ id }: any) => {
  const lang: any = useSelector((state: RootState) => {
    return state.lang;
  });
  const history = useHistory();
  return (
    <AddClientContainer>
      <Header
        heading={lang ? "פרטי פעולה" : "Transaction details"}
        subheading="@WW24"
        buttonText={lang ? "+ הוסף קובץ" : "+ Add a Source"}
        buttonHandler={() => {
          history.push(`/addsource/${id}`);
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <Ink color="var(--ink-icon)" width="272px" height="342px" />
      </div>
      <AddText>
        {lang
          ? "לא צירפת קובץ מידע. אנא הוסף קובץ"
          : "You haven't added any income source, add a source"}
      </AddText>
    </AddClientContainer>
  );
};

export default NoSource;
