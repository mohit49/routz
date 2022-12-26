import React from 'react'
import Button from 'react-bootstrap/Button';
import { Result } from 'antd';
function ResultGrid({status,title,subTitle}) {

  return (
    <Result
    status={status}
    title={title}
    subTitle={subTitle}
    extra={[
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  />
  )
}

export default ResultGrid