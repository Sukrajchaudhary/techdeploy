import { Loader } from 'lucide-react'
import React from 'react'

const Loadding = () => {
  return (
    <div className='grid place-items-center h-screen'>
     <Loader size={48} className='animate-spin' color="#163fe3" strokeWidth={1.75} />
    </div>
  )
}

export default Loadding
