import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Test from "./test";
import AddClient from "./pages/client/addclient";
import Source from "./pages/source/source";
import AddSource from "./pages/AddSource/addSource";
import NotFound from "./pages/PageNotFound/notFound";
import Transaction from "./pages/allTransactions/alltransactions";
import Allsources from "./pages/source/allsources";
import EditSource from "./pages/editSource/editsource";
import EditClient from "./pages/client/editclient";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Chart from "./pages/Chart/chart";

const Router = () => {
  const user: any = useSelector((state: RootState) => state.isAuth?.isAuth);
  const token = localStorage.getItem("token");
  useEffect(() => {
    window.onhashchange = function () {
      //@ts-ignore
      if (window.innerDocClick) {
        //Your own in-page mechanism triggered the hash change
      } else {
        //Browser back button was clicked
        console.log("backbutton triggered");
      }
    };
  }, []);
  if (token) {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/addclient" component={AddClient} />
        <Route exact path="/editclient/:id" component={EditClient} />
        <Route exact path="/source/:id" component={Source} />
        <Route exact path="/addsource/:id" component={AddSource} />
        <Route exact path="/transactions/:id" component={Transaction} />
        <Route exact path="/allsources/:id" component={Allsources} />
        <Route exact path="/statistics/:id" component={Chart} />
        <Route exact path="/editsource/:id" component={EditSource} />
        <Route component={NotFound} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Router;
