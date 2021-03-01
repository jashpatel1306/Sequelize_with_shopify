const API = require("../api");
const response = require("../response");


const count = async (ctx) => {
    const { shop, accessToken } = ctx.session;

    try {
        // call api for product count
        const urlForProductCount = `https://${shop}/admin/api/2021-01/products/count.json`;
        const productCount = await API.GET_API(urlForProductCount, accessToken);

        // call api for customer count
        const urlForCustomerCount = `https://${shop}/admin/api/2021-01/customers/count.json`;
        const customerCount = await API.GET_API(
            urlForCustomerCount,
            accessToken
        );

        // call api for custom collection count
        const urlForCustomCollectionCount = `https://${shop}/admin/api/2021-01/custom_collections/count.json`;
        const customCollectionCount = await API.GET_API(
            urlForCustomCollectionCount,
            accessToken
        );

        // call api for smart collection count
        const urlForSmartCollectionCount = `https://${shop}/admin/api/2021-01/smart_collections/count.json`;
        const smartCollectionCount = await API.GET_API(
            urlForSmartCollectionCount,
            accessToken
        );

        const data = {
            productCount: productCount.count,
            customerCount: customerCount.count,
            collectionCount:
                customCollectionCount.count + smartCollectionCount.count,
        };
        // response
        response(ctx, 200, data);
    } catch (error) {
        console.log("error", error);
        response(ctx, 500, "Internal server Error");
    }
};
module.exports = { count };
