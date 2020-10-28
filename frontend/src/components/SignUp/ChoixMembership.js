import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ButtonPG from "../Buttons/ButtonPG/ButtonPG";
import './Signup.css';


function ChoixMembership(props) {

  const history = useHistory();

  const [item, setItem] = useState({ choixMembership: "" });
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
  function disableButton() {
    return (item.choixMembership)
  }

  return (
    <Form className="signup">
      <Form.Row>
        <Form.Group controlId={"choixMembership"} className="mt-3">
          <Form.Check
            name="temp"
            value="/inscription-benevole"
            type="radio"
            label="Devenir un bénévole"
            onChange={handleChange}
            checked={choixMembership === "/inscription-benevole"}
            className="p-5 sep"
            inline
          />
          <Form.Check
            name="temp"
            value="/inscription-membre"
            type="radio"
            label="Devenir un membre"
            onChange={handleChange}
            checked={choixMembership === "/inscription-membre"}
            className="p-5"
            inline
          />
        </Form.Group>
      </Form.Row>
      <Form.Row className="justify-content-md-center p-2">
        <ButtonPG
          className="btn-go"
          size="lg"
          disabled={!disableButton()}
          onClick={(e) => { history.push(choixMembership) }}
        >
          Go
        </ButtonPG>
      </Form.Row>
    </Form>
  )
}

export default ChoixMembership;