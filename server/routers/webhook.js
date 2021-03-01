const Router = require("koa-router");
const shopAPI = require("../apis/shop");
const { receiveWebhook } = require("@shopify/koa-shopify-webhooks");
const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET_KEY });

const router = new Router({
    prefix: "/hook",
});

//shopify webhook

router.post("/uninstalled", webhook, shopAPI.uninstalled);

module.exports = router.routes();
