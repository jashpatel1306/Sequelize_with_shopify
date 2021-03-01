import BaseService from "./baseService";
import userData from "../staticenv";

export function shopDetail() {
    console.log("userData-----------------------", userData);

    return BaseService.get("/shopDetail", {
        headers: {
            shop: userData.shop,
            accesstoken: userData.accessToken,
        },
    });
}

export function count() {
    return BaseService.get("/count", {
        headers: {
            shop: userData.shop,
            accesstoken: userData.accessToken,
        },
    });
}
