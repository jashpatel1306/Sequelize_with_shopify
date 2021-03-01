import React, { useEffect, useState } from "react";
import * as authService from "../services/authService";
import Nav from "./Nav";
import { Page, DataTable, Card, Frame, Spinner } from "@shopify/polaris";

function Home() {
    const [row, setRow] = useState([]);
    const [spinner, setSpinner] = useState(false);

    try {
        useEffect(async () => {
            setSpinner(true);
            const shopDetail = await authService.shopDetail();

            let ans = shopDetail.data.message;
            let shop = {
                Name: ans.name,
                Email: ans.email,
                Phone: ans.phone ? ans.phone : "-",
                Domain: ans.domain,
                Country: ans.country_name,
                Province: ans.province,
                City: ans.city,
                ShopId: ans.id,
                Shop_owner: ans.shop_owner,
            };

            Object.keys(shop);
            Object.values(shop);
            const finalShop = Object.entries(shop);
            setRow(finalShop);
            if (shopDetail.status) {
                setSpinner(false);
            }
        }, []);
    } catch (error) {
        console.log("error", error);
    }

    // const rows = [
    //     ["Emerald Silk Gown", "$875.00"],
    //     ["Mauve Cashmere Scarf", "$230.00"],
    //     [
    //         "Navy Merino Wool Blazer with khaki chinos and yellow belt",
    //         "$445.00",
    //     ],
    // ];

    return (
        <Frame>
            <Nav />
            <Page title="Shop Information">
                <Card>
                    {spinner ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Spinner
                                accessibilityLabel="Spinner example"
                                size="large"
                            />
                        </div>
                    ) : (
                        <DataTable
                            columnContentTypes={["text", "text"]}
                            headings={["Shop Information", "Content"]}
                            rows={row}
                        />
                    )}
                </Card>
            </Page>
        </Frame>
    );
}

export default Home;
