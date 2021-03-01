const Shop = require("../db/shop.model");

module.exports = {

    uninstalled: async (ctx, next) => {

        let { request } = ctx;

        console.log('uninstalled', request.header["x-shopify-shop-domain"]);

        let shopDomain = request.header["x-shopify-shop-domain"];

        try {

            if (shopDomain != '' && shopDomain != undefined) {

                await Shop.findOneAndUpdate(
                    { shop: shopDomain },
                    { appstatus: "uninstalled" },
                    { new: true }
                );
                return ctx.status = 200;
            }
            else {
                return ctx.status = 200;
            }
        }
        catch (e) {
            return ctx.status = 200;
        }

    },

    shopUpdate: async (ctx, next) => {

        console.log('In shopUpdate webhhok---');

        let { phone, country_code, country_name, email, customer_email, money_format, currency, timezone, domain, zip, city, shop_owner } = ctx.request.body;

        let shopDomain = domain;

        console.log('shopUpdate', shopDomain);

        try {

            if (shopDomain != '' && shopDomain != undefined) {

                const shopifyData = {
                    phone,
                    country_code,
                    country_name,
                    email,
                    customer_email,
                    money_format,
                    currency,
                    timezone,
                    zip,
                    city,
                    shop_owner
                }

                await Shop.findOneAndUpdate(
                    { shop: shopDomain },
                    shopifyData,
                    { new: true }
                );

                return ctx.status = 200;
            }
            else {
                return ctx.status = 200;
            }
        }
        catch (e) {
            return ctx.status = 200;
        }

    }
}