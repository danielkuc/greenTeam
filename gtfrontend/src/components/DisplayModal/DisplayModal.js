import React from 'react'
import MODAL from './DisplayModal.styled';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DisplayModal = ({body, redirect,url , state, setState, success, buttonValue}) => {
  const handleClick = () => {
    setState(false);
  }

  return (
    <MODAL 
    show={state}
    centered
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header>
      <Modal.Title>
        {success}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <p>
      {body}
    </p>
    </Modal.Body>
    <Modal.Footer >
      {
        redirect ? 
        (
          <Link to={url} className="mx-auto">
            <Button variant="warning" >{buttonValue}</Button>
         </Link>   
        ) : 
        (
          <Button onClick={handleClick} variant="warning" >{buttonValue}</Button>
        )
      }    
    </Modal.Footer>
  </MODAL>
)

}

export default DisplayModal;
