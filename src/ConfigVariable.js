
//Authentication data for APIs
export default function getConfigData() {

    let host = null;

    if (typeof window !== 'undefined') {

        host = window.location.hostname;

    }

    const shop = localStorage.getItem('shopData') ?? null;
    const api_key = process.env.REACT_APP_SHOPIFY_API_KEY;
    const config_data = { shop, api_key }

    return host !== "localhost" ? config_data : { shop: "", api_key:"" };

}

