import axios from "axios";

var host = window.location.origin;

var baseUrl = host + "/api";

var tempURL = "https://f24c7d46b1e9.ngrok.io/api";
var url = host.includes("localhost") ? tempURL : baseUrl;

const BaseService = axios.create({
    baseURL: url,
});
export default BaseService;
