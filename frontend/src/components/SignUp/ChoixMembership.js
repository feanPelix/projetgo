import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {Link} from "react-feather";

function ChoixMembership(props) {

    const history = useHistory();

    const [item, setItem] = useState({ choixMembership: "", another: "another" });
    const { choixMembership } = item;

    const handleChange = e => {
        e.persist();

        setItem(prevState => ({
            ...prevState,
            choixMembership: e.target.value
        }));

        //props.choix(e.target.value);
    };

    //check if null/empty/etc
    function disableButton(){
        return (item.choixMembership)
    }

    return (
        <div style={{backgroundColor: '#138499'}}>
            <Container fluid>
                <Form>
                    <Row>
                        <Form.Group controlId={"choixMembership"}>
                            <Col>
                                <Form.Check
                                    name="temp"
                                    value="1"
                                    type="radio"
                                    label="Devenir un bénévole"
                                    onChange={handleChange}
                                    checked={choixMembership === "1"}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    name="temp"
                                    value="2"
                                    type="radio"
                                    label="Devenir un membre"
                                    onChange={handleChange}
                                    checked={choixMembership === "2"}
                                />
                            </Col>
                        </Form.Group>
                        <Link to={"/inscription/form"}>
                            <Button variant="warning" className="mb" disabled={!disableButton}>
                                Go
                            </Button>
                        </Link>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default ChoixMembership;