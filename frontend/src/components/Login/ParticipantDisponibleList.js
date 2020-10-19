import {Form} from "react-bootstrap";
import React from "react";



function ParticipantDisponibleList (props) {

    const handleChange = event => {
        props.setID(event.target.value);
    }
    return (
        <Form.Control as="select" value={props.selectedValue} onChange={handleChange}>
            <option value='' disabled selected>{props.optionName}</option>
            {props.participantList.map((option, index) =>
                <option value={index} key={option.user_id}>
                    {option.nom} {option.prenom}
                </option>
            )}
        </Form.Control>
    );
}

export default ParticipantDisponibleList;