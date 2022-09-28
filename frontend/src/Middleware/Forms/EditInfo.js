import React, {useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
function EditInfo() {
    const [authToken, setAuthToken] = useState();
    useEffect(()=>{

    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
        headers: {
            "Accept": "application/json",
      "api-token": "AuXnFjES43NqbdODZoc1anLtpO9op_9HsA7hqU56HJoxlbbNrMsUAzmsp6cqoZ0HhWQ",
      "user-email": "mohitanim@gmail.com"
        }
       }).then((response) => {
        setAuthToken(response.data.auth_token)
      });
},[]);

useEffect(()=>{
    axios.get('https://www.universal-tutorial.com/api/states/India', {
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Accept": "application/json"
        }
       }).then((response) => {
        setAuthToken(response.data.auth_token)
      });
})

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
      <Form.Label>Location</Form.Label>
        <Form.Control type="text" placeholder="State" />
      </Form.Group>
   
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