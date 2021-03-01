import React, { useEffect, useState } from "react";
import * as authService from "../services/authService";
import Nav from "./Nav";
import { Page, Card, Frame, DataTable, Spinner } from "@shopify/polaris";

function Information() {
    const [rows, setRows] = useState([]);
    const [spinner, setSpinner] = useState(false);

    useEffect(async () => {
        setSpinner(true);
        const count = await authService.count();
        console.log("count", count);

        let Info = {
            Product: count.data.message.productCount,
            Collection: count.data.message.collectionCount,
            Customer: count.data.message.customerCount,
        };

        Object.keys(Info);
        Object.values(Info);
        const finalInfo = Object.entries(Info);
        setRows(finalInfo);
        if (count.status) {
            setSpinner(false);
        }
    }, []);

    // const rows = [
    //     ["Total Products", "875.00"],
    //     ["Total Customers", "230.00"],
    //     ["Total Collection", "445.00"],
    // ];
    return (
        <Frame>
            <Nav />
            <Page
                title="Total Count"
                breadcrumbs={[{ content: "Home", url: "/" }]}
            >
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
                            headings={["Type", "Count"]}
                            rows={rows}
                        />
                    )}
                </Card>
            </Page>
        </Frame>
    );
}

export default Information;
