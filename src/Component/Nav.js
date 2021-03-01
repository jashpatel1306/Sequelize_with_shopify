import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Card,
    Button,
    ButtonGroup,
    Frame,
    Modal,
    TextContainer,
} from "@shopify/polaris";

function Nav() {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <div>
            <Card>
                <div
                    style={{
                        justifyContent: "space-between",
                        display: "flex",
                        padding: "10px",
                    }}
                >
                    <ButtonGroup>
                        <Button
                            outline
                            onClick={() => {
                                history.push("/");
                            }}
                        >
                            Shop Info
                        </Button>
                        <Button
                            outline
                            onClick={() => {
                                history.push("/information");
                            }}
                        >
                            Total Count
                        </Button>
                    </ButtonGroup>
                </div>
            </Card>
        </div>
    );
}

export default Nav;
