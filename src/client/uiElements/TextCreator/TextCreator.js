import React, {useState,useEffect} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Input, Upload } from "antd";
function TextCreator() {
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
  
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
    const handleAddClick = () => {
        setInputList([...inputList, { firstName: "", lastName: "" }]);
      };
  return (
   <>
    {inputList.map((x, i) => {
        return (
          <div className="box">
            <Form.Group className="mb-3" >
            <Form.Label>Sub Heading : </Form.Label>
            <Input
              name="firstName"
              placeholder="Enter First Name"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
            />
            <br/>
             <Form.Label>Discription : </Form.Label>
              <Form.Control
                    as="textarea"
              className="ml10"
              name="lastName"
              placeholder="Enter Last Name"
              value={x.lastName}
              rows={3}
              
              onChange={e => handleInputChange(e, i)}
            />
            </Form.Group>
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
      </>
   

  )
}

export default TextCreator