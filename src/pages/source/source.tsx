import { useEffect, useState } from "react";
import { get_AllSources } from "../../api/get";
import NoSource from "./NoSource";
import Transactions from "./transactions";
import LoaderScreen from "../../components/molecules/LoaderScreen";

const Source = ({ match }: any) => {
  const [sources, setAllSources] = useState([]);
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    const genResult = async () => {
      const res = await get_AllSources(match.params.id);
      console.log(res);
      setAllSources(res);
      setFlag(false);
    };
    genResult();
  }, []);

  return (
    <>
      {flag ? (
        <LoaderScreen />
      ) : sources.length === 0 ? (
        <NoSource id={match.params.id} />
      ) : (
        <Transactions id={match.params.id} />
      )}
    </>
  );
};

export default Source;
