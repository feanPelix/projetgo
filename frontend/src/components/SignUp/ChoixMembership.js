import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";


function ChoixMembership(props) {

    const history = useHistory();

    const [item, setItem] = useState({ choixMembership: ""});
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
                                    value="/inscription/benevole"
                                    type="radio"
                                    label="Devenir un bénévole"
                                    onChange={handleChange}
                                    checked={choixMembership === "/inscription/benevole"}
                                />
                            </Col>
                            <Col>
                                <Form.Check
                                    name="temp"
                                    value="/inscription/membre"
                                    type="radio"
                                    label="Devenir un membre"
                                    onChange={handleChange}
                                    checked={choixMembership === "/inscription/membre"}
                                />
                            </Col>
                        </Form.Group>

                        <Button variant="warning" className="mb" disabled={!disableButton()} onClick={(e)=>{history.push(choixMembership)}}>
                            Go
                        </Button>

                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default ChoixMembership;