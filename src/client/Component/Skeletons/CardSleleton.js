import React, {useState} from 'react'
import '../Skeletons/CardSleleton.scss'
import { Skeleton } from 'antd';


function CardSleleton({cardNo}) {
  const [renderCount, setRenderCount] = useState();
  return (
    <>
{Array.apply(null, { length: cardNo ? cardNo: 5 }).map((e, i) => (
     <div className='cardContiner' key={i}>
     <Skeleton active 
     avatar
     paragraph={{
       rows: 4,
     }}
   />
   </div>
))}



</>
  )
}

export default CardSleleton