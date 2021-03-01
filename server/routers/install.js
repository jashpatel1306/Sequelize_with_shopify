const { default: shopifyAuth } = require("@shopify/koa-shopify-auth");
let scopes = ["read_products", "read_customers"];
const { registerWebhook } = require("@shopify/koa-shopify-webhooks");
const shopModel = require("../db/shop.model");
const error = require("../apis/errors");
const axios = require("axios");
const response = require("../response");
const sequelize = require("../db/connect");

const {
    SHOPIFY_API_SECRET_KEY,
    REACT_APP_SHOPIFY_API_KEY,
    HOST_NAME,
    accessMode: ofline,
} = process.env;

module.exports = shopifyAuth({
    apiKey: REACT_APP_SHOPIFY_API_KEY,
    secret: SHOPIFY_API_SECRET_KEY,
    scopes,

    async afterAuth(ctx) {
        console.log("inside afetr auth");

        const { shop, accessToken } = ctx.session;

        console.log("shop and accesstoken are", shop, accessToken);

        //--------------------------------------------------------------------------------------------------
        // uninstalled webhook

        const registration = await registerWebhook({
            address: `${HOST_NAME}/hook/uninstalled`,
            topic: "APP_UNINSTALLED",
            accessToken,
            shop,
            apiVersion: process.env.SHOPIFY_API_VERSION,
        });

        if (registration.success) {
            console.log("Successfully registered webhook!");
        } else {
            console.log("Failed to register webhook", registration.result);
        }

        if (accessToken != "" && accessToken != undefined) {
            try {
                const accessShopUrl = `https://${shop}/admin/shop.json`;

                // set header
                const request_headers = {
                    "X-Shopify-Access-Token": accessToken,
                };

                const resShop = await axios({
                    url: accessShopUrl,
                    method: "GET",
                    responseType: "json",
                    headers: request_headers,
                });

                const responseShop =
                    resShop && resShop.data && resShop.data.shop;

                if (!responseShop)
                    return response(500, ctx, "response data is missing");

                const shopifyData = {
                    shop: shop,
                    accessToken,
                };
                // sql

                if (
                    ctx.session.shop &&
                    ctx.session.shop !== "" &&
                    ctx.session.accessToken &&
                    ctx.session.accessToken !== ""
                ) {
                    const shopData = await sequelize.shop.findOne({
                        where: {
                            shop: ctx.session.shop,
                            accessToken: ctx.session.accessToken,
                        },
                    });

                    console.log("shopdata is ------", shopData);

                    if (shopData) {
                        if (shopData.accessToken !== accessToken) {
                            await shopModel.update(
                                { shop: shop },
                                {
                                    where: {
                                        shop: ctx.session.shop,
                                        accessToken: ctx.session.accessToken,
                                    },
                                }
                            );
                        }
                    } else {
                        const data = await sequelize.shop.create({
                            shop: shop,
                            accessToken: accessToken,
                        });

                        console.log("data is created-------------------", data);
                    }
                } else {
                    return response(
                        ctx,
                        500,
                        "Please provide all mandatory values"
                    );
                }
            } catch (e) {
                console.log("error:", e);
                return response(ctx, 500, "Internal server errror");
            }

            ctx.redirect(
                `/?shop=${shop}&appKey=${REACT_APP_SHOPIFY_API_KEY}&accessToken=${accessToken}`
            );
        } else {
            ctx.body = { error: "AccessToken not found !" };
        }
    },
});
