import React from 'react';
import './App.css';
import Form from './component/Form';
import Graph from './component/Graph';

function App() {
  return (
    <div className="App">
      <div className='container mx-auto max-w-6xl text-center drop-shadow-lg text-grey-800 '>
        <h1 className='text-4xl py-8 mb-10 bg-slate-800 text-white rounded'>Expense Tracker</h1>
        {/* grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Chart */}
          <Graph/> 
          {/* Form */}
          <Form/>
        </div>
      </div>
    </div>
  );
}

export default App;