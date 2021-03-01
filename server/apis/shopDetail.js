const response = require("../response");
const API = require("../api");
const shopDetail = async (ctx) => {
    console.log("inside shop detail");

    const { shop, accessToken } = ctx.session;
    console.log("shop and accessToken", shop, accessToken);
    try {
        // call an api for shop detail
        const url = `https://${shop}/admin/api/2021-01/shop.json`;
        const data = await API.GET_API(url, accessToken);
        response(ctx, 200, data.shop);
    } catch (error) {
        console.log("error", error);
        response(ctx, 500, "Internal server Error");
    }
};
module.exports = { shopDetail };
