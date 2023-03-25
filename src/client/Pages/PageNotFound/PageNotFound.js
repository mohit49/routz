import React from 'react'
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "../PageNotFound/PageNotFound.scss";
function PageNotFound() {
  return (
    <Container>
    <div className='page-not-found'>
        <h1>Page Not Found</h1>
        <p>Uh oh, we can’t seem to find the page you’re looking for. Try going back to the previous page or see our Help Center for more information</p>
        <Link to="/">
        <Button variant="primary">Go to Home Page</Button>
        </Link>
    </div>
    </Container>
  )
}

export default PageNotFound