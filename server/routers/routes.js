const Router = require("koa-router");
// added by parth
const shopDetail = require("../apis/shopDetail");
const count = require("../apis/count");
//
const router = new Router({
    prefix: "/api",
});

router.get("/shopDetail", shopDetail.shopDetail);

router.get("/count", count.count);

module.exports = router.routes();
