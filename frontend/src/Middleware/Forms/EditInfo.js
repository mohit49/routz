import React, {useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import GetLocation from '../GetLocation';
function EditInfo() {
    const getLocation = GetLocation()
    const [loading, setLoading] = useState();
    const [authToken, setAuthToken] = useState();
    const [geolocation, setGeolocation] = useState(true);
    const [position, setPosition] = useState();
const checkGeolocation =  () =>{
     if(!geolocation) {
       
    setGeolocation(true)
    } else {
        setLoading(true)
        getLocation()
        .then((position) => {
            setLoading(false)
            setPosition(position)
        })
        .catch((err) => {
          
        });
        setGeolocation(false)
    }

}

   





  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBikeName">
        <Form.Label>Bike Name</Form.Label>
        <Form.Control type="text" placeholder="Bike Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDistabceCoverd">
      <Form.Label>Distance Covered</Form.Label>
        <Form.Control type="text" placeholder="Distance Coverd" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCity">
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Use Current Location"
        onChange={checkGeolocation}
      />
</Form.Group>
      {geolocation && 
      <Form.Group className="mb-3" controlId="formBasicCity">
      <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="State" />
      </Form.Group>
   }
     {!geolocation && 
    
     <Form.Group className="mb-3" controlId="formBikeName">
        <Form.Label>Current Location  {loading && <Spinner style={{color: "#0d6efd"}} as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"/> }</Form.Label>
       
        {!loading && <Form.Control type="text" value={`${position?.city} , ${position?.state}, ${position?.country}`} placeholder="Fetching Location..." /> }
      </Form.Group>
}

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default EditInfo