import React, { useState} from "react";
import {Modal, Button} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import moment from "moment";

function ModifierDate(props){
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateDate = async (e) => {
        e.preventDefault();
        try {
            props.setDate(moment(date).format("YYYY-MM-DD"));
            handleClose();
        } catch (e) {
            console.error(e.message);
        }
    }

    return(
        <>
            <Button className="btn-sm mt-2 btn-info ml-3" style={{ borderRadius:"50%"}} onClick={handleShow}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header">
                    <h5 className="modal-title">Modifier date</h5>
                    <button type="button" onClick={handleClose} className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label">Choisir la date:</label><br/>
                            <DatePicker dateFormat="MM-dd-yyyy" selected={date} onChange={date => setDate(date)}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={e=> updateDate(e)}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}




export default ModifierDate;