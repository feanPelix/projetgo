import React, { useState, useEffect} from "react";
import {Modal, Button} from "react-bootstrap";

function EditProjects(props){
    const [show, setShow] = useState(false);
    const [newContent, setNewContent] = useState(props.content);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateContent = async (e)=>{
        e.preventDefault();
        try{
            props.setContent(newContent);
        }catch (e){
            console.error(e.message);
        }
    }
    return (
        <>
            <Button variant="primary" className="btn btn-info btn-circle btn-sm" style={{visibility:props.stateVisibility}} onClick={handleShow}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Body><input type="text" className="form-control" value={newContent} onChange={e=>setNewContent(e.target.value)}/></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e=> updateContent(e)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

};

export default EditProjects