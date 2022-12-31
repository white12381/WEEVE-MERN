import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const DescriptionList = () => {
    const [Listarray, SetlistArray] = useState([]);
    const [listCategory,setListCategory] = useState([]);
function Description() {
  const [show, setShow] = useState(false);
  const[error,setError] = useState(false);
  const [errorHeading, seterrorHeading] = useState(false);
  const [singleList, setSingleList] = useState(undefined);
  const [descriptionCategory, setDescriptionCategory] = useState(undefined);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleList = () => {
    if(!singleList){
      setError(true);
    }
    if(descriptionCategory === undefined){
      seterrorHeading(true);
    }
if(singleList && descriptionCategory){
SetlistArray(arr => [...arr, singleList]);
setListCategory( arr => [...arr, descriptionCategory]);
setShow(false)
}
else{
  setError(false);
  seterrorHeading(false);
  console.log(descriptionCategory);
}
  }
const HandleListDropdown = (e) =>{
  if(e.target.value === "Select List Description Heading"){
    setDescriptionCategory(undefined);    
  }
  else {setDescriptionCategory(e.target.value)}}
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Launch to Enter Description List
      </Button>

      <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered id="contained-modal-title-vcenter" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Description List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Select aria-label="Default select example" onChange={HandleListDropdown} style={{borderColor: errorHeading ? "red" :"green"}} required>
      <option>Select List Description Heading</option>
      <option value="Key Features">KEY FEATURES</option>
      <option value="Functions">Functions</option>
      <option value="Input Ports">Input Ports</option>
      <option value='Additional Information'>Additional Information </option>
    </Form.Select>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description List</Form.Label>
              <Form.Control 
                type="text" onChange={(e) => setSingleList(e.target.value)}
                placeholder="Enter Description List" style={{borderColor: error ? "red" :"green"}}
                autoFocus required
              />
               <Form.Control.Feedback type="invalid">
            This is required
          </Form.Control.Feedback>

            </Form.Group>
             </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit" onClick={handleList}>
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
return {Description,Listarray,listCategory};
}
 
export default DescriptionList;