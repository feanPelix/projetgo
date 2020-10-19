import React, { useState } from "react";
import {Modal, Button} from "react-bootstrap";
import ButtonPG from "../Buttons/ButtonPG/ButtonPG";

function EditProjects(props){
    const [show, setShow] = useState(false);
    const [newContent, setNewContent] = useState(props.content);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateContent = async (e)=> {
        e.preventDefault();
        try {
            props.setContent(newContent);
            handleClose();
        } catch (e){
            console.error(e.message);
        }
    };

    return (
        <>
            <ButtonPG variant="teal" size="xs" onClick={handleShow}>
                +
            </ButtonPG>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                  <input type="text" className="form-control" value={newContent} onChange={e=>setNewContent(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <ButtonPG variant="teal" onClick={e => updateContent(e)}>
                        Save Changes
                    </ButtonPG>
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default EditProjects