import React from 'react'
import JournalForm from '../../JournalForm/JournalForm'

function Sidebar({children}) {
  return (
    <div className='p-8'>
     {children}
    </div>
  )
}

export default Sidebar
