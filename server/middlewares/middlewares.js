let error = require('../apis/errors');
// const Shop = require("../models/shop");
const Shop = require("../db/shop.model");

module.exports = {

    checkUser: async (ctx, next) => {

        console.log("in checkUser");

        try {

            let { shop, api_key } = ctx.request.body;

            console.log(shop, api_key, process.env.REACT_APP_SHOPIFY_API_KEY);

            if (!shop || !api_key || api_key !== process.env.REACT_APP_SHOPIFY_API_KEY) {
                return ctx.body = error.errors.UNAUTHORIZED;
            }

            /*
             * bussiness logic
             */

            const shopData = await Shop.findOne({ shop }).select(["shop", "appstatus"]);

            if (shopData && shopData.appstatus === "installed") {

                await next();

            } else {

                return ctx.body = error.errors.UNAUTHORIZED;

            }

        } catch (error) {
            console.log("error", error);
            return ctx.body = error.errors.SERVER_ERROR;
        }
    }
}

