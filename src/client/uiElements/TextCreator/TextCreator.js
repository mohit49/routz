import React, {useState,useEffect} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../TextCreator/TextCreator.scss";
import { Input, Upload } from "antd";
function TextCreator({setEventDiscription}) {
    const [inputList, setInputList] = useState([{ heading: "", discription: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
      setEventDiscription(list)
    };
  
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
    const handleAddClick = () => {
        setInputList([...inputList, { heading: "", discription: "" }]);
      };
  return (
   <>
    {inputList.map((x, i) => {
        return (
          <div key={i} className="box">
            <Form.Group className="mb-3 form-box" >
            <Form.Label>Sub Heading : </Form.Label>
            <Input
              name="heading"
              placeholder="Enter First Name"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
            />
          
             <Form.Label className='discription'>Discription : </Form.Label>
              <Form.Control
                    as="textarea"
              className="ml10"
              name="discription"
              placeholder="Enter Last Name"
              value={x.lastName}
              rows={3}
              
              onChange={e => handleInputChange(e, i)}
            />
            </Form.Group>
            <div className="btn-box">
            {inputList.length - 1 === i && <Button variant="warning" onClick={handleAddClick}>Add Row</Button>}
              {inputList.length !== 1 &&  <Button variant="danger" 
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</Button>}
           
            </div>
          </div>
        );
      })}
       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
      </>
   

  )
}

export default TextCreator