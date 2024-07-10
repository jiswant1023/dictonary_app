import React,{ useState } from 'react'

import './App.css'
import AddPerson from './components/AddPerson/AddPerson';
import RetrieveInfo from './components/RetrieveInfo/RetrieveInfo';

function App() {
  const [activeTab, setActiveTab] = useState('addPerson');

  return (
    <div className="App">
      <div className="tabs">
        <button onClick={() => setActiveTab('addPerson')}>Add New Person</button>
        <button onClick={() => setActiveTab('retrieveInfo')}>Retrieve Information</button>
      </div>
      {activeTab === 'addPerson' && <AddPerson/>}
      {activeTab === 'retrieveInfo' && <RetrieveInfo/>}
    </div>
  )
}

export default App
