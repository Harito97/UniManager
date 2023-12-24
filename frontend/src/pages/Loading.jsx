import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <PacmanLoader/>
    </div>
    
  )
}

export default Loading