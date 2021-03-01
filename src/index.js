import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "@shopify/app-bridge-react";

import "@shopify/polaris/dist/styles.css";

import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

let config = null;

function setStorage() {
    let query = new URLSearchParams(window.location.search);

    let app_key = query.get("appKey");
    let shop = query.get("shop");
    let accessToken = query.get("accessToken");

    console.log("appkey/shop/accessToken", app_key, shop, accessToken);

    if (app_key && shop && accessToken) {
        let data = {
            app_key: app_key,
            shop: shop,
            accessToken: accessToken,
        };

        localStorage.setItem("userData", JSON.stringify(data));
        config = {
            apiKey: data.app_key,
            shopOrigin: data.shop,
        };
    }
}

let userData = localStorage.getItem("userData");
userData = JSON.parse(userData);
// added by parth
if (userData) {
    config = {
        apiKey: userData.app_key,
        shopOrigin: userData.shop,
    };
    console.log("config", config);
}
//
console.log("userData----------", userData);

setStorage();

let hostname = window.location.hostname;

ReactDOM.render(
    hostname === "localhost" ? (
        <>
            <React.StrictMode>
                <ReduxProvider store={store}>
                    <App />
                </ReduxProvider>
            </React.StrictMode>
        </>
    ) : config !== null ? (
        <Provider config={config}>
            <React.StrictMode>
                <ReduxProvider store={store}>
                    <App />
                </ReduxProvider>
            </React.StrictMode>
        </Provider>
    ) : (
        <div>Install app</div>
    ),
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
