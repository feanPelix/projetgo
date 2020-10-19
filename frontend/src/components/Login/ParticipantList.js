import {ListGroup} from "react-bootstrap";
import React from "react";
import ButtonPG from "../Buttons/ButtonPG/ButtonPG";



const ParticipantList = (props)=>(
    <ListGroup>
        {props.participantList.map((participant) =>
            <ListGroup.Item key={participant.user_id}>
                {participant.nom} {participant.prenom} { ' ' }
                <ButtonPG onClick={()=>props.supprimerParticipant(participant.user_id)} className="mb-2" variant="teal">-</ButtonPG>
            </ListGroup.Item>
        )}
    </ListGroup>
);

export default ParticipantList