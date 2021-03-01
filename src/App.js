import "./App.css";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Home from "./Component/Home";
import Information from "./Component/Information";

function AdapterLink({ url, ...rest }) {
    return <Link to={url} {...rest} />;
}

function App() {
    return (
        <div>
            <AppProvider i18n={en} linkComponent={AdapterLink}>
                <BrowserRouter>
                    <MyRouter />
                </BrowserRouter>
            </AppProvider>
        </div>
    );
}

function MyRouter() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/information">
                <Information />
            </Route>
        </Switch>
    );
}

export default App;
