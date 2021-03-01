require("isomorphic-fetch");
const cors = require("@koa/cors");
const dotenv = require("dotenv");
dotenv.config();
const Koa = require("koa");
const session = require("koa-session");
const port = parseInt(process.env.PORT) || 4000;
const bodyParser = require("koa-bodyparser");
const connectDB = require("./server/db/connect");
const { verifyRequest } = require("@shopify/koa-shopify-auth");
const serve = require("koa-static");
const server = new Koa();
server.use(bodyParser());
const path = require("path");
let apiroutes = require("./server/routers/routes");
const installRouter = require("./server/routers/install");
const Router = require("koa-router");
server.use(cors());
const send = require("koa-send");
const hookRouters = require("./server/routers/webhook");

server.keys = [process.env.SHOPIFY_API_SECRET_KEY];

server.use(hookRouters);

server
    .use(session({ sameSite: "none", secure: true }, server))
    .use(installRouter)
    .use(verifyRequest());

const pathDir = path.join(__dirname, "build");
server.use(serve(pathDir));

server.use(apiroutes);

const router = new Router();

router.get("(.*)", async (ctx, next) => {
    await send(ctx, "/index.html", { root: path.join(__dirname, "/build") });
});
server.use(router.routes());

server.listen(port, () => {
    console.log("Server Is Running", port);
});

// try {
//     connectDB.connect((error) => {
//         if (error) throw error;
//         console.log("Successfully connected to the database.");
//     });
// } catch (error) {
//     console.log("error", error);
//     return error;
// }
// module.exports = connection;
