import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const OverVeiwList = () => {
    const [OverViewUL, SetverveiwArray] = useState([]);
function OverVeiw() {
  const [show, setShow] = useState(false);
const[error,setError] = useState(false);
  const [singleList, setSingleList] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleList = () => {
if(singleList){
SetverveiwArray(arr => [...arr, singleList]);
setShow(false)
}
else{
  setError(true);
}
  }

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Launch to Enter OverVeiw List
      </Button>

      <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered id="contained-modal-title-vcenter" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>OverVeiw List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>OverVeiw List</Form.Label>
              <Form.Control
                type="text" onChange={(e) => setSingleList(e.target.value)}
                placeholder="Enter OverVeiw List" style={{borderColor: error ? "red" :"green"}} 
                autoFocus required
              />
            </Form.Group>
             </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleList}>
            Add List
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
return {OverVeiw,OverViewUL};
}
 
export default OverVeiwList;