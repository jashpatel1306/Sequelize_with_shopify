const axios = require("axios");

const url = (shop) => {
    return `https://${shop}/admin/api/2021-01/graphql.json`;
};

const GET_API = (url, accessToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const answer = await axios({
                url,
                method: "GET",
                headers: {
                    "X-Shopify-Access-Token": accessToken,
                },
                responseType: "json",
            });

            resolve(answer.data);
        } catch (error) {
            console.log("error", error);
            reject(error);
        }
    });
};
    
const POST_API = (url, accessToken, data) => {
    console.log(url);
    console.log(accessToken);

    return new Promise(async (resolve, reject) => {
        try {
            const answer = await axios({
                url,
                method: "POST",
                headers: {
                    "X-Shopify-Access-Token": accessToken,
                    "Content-Type": "application/json",
                },
                responseType: "json",
                data,
            });

            console.log("answer.data----------------", answer.data);

            resolve(answer.data);
        } catch (error) {
            console.log("error in post api of GraphQl------", error);
            reject(error);
        }
    });
};

const DELETE_API = (url, accessToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const answer = await axios({
                method: "DELETE",
                url,
                headers: {
                    "X-Shopify-Access-Token": accessToken,
                    "Content-Type": "application/json",
                },
                responseType: "json",
            });
            resolve(answer.data);
        } catch (error) {
            console.log("error", error);
            reject(error);
        }
    });
};

const PUT_API = (url, accessToken, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const answer = await axios({
                method: "PUT",
                url,
                headers: {
                    "X-Shopify-Access-Token": accessToken,
                    "Content-Type": "application/json",
                },
                responseType: "json",
                data: updatedData,
            });
            resolve(answer.data);
        } catch (error) {
            console.log("error", error);
            reject(error);
        }
    });
};

module.exports = {
    GET_API,
    POST_API,
    DELETE_API,
    PUT_API,
    url,
};
