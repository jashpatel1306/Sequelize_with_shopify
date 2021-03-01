let userDataLocal = localStorage.getItem("userData");
var userDataParse = JSON.parse(userDataLocal);
console.log("userDataLocal", userDataLocal);

let localData = {
    shop: "testforcustomapp.myshopify.com",
    accessToken: "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",
};

const userData = userDataLocal ? userDataParse : localData;
export default userData;
