import React, { useState } from 'react';

const App = () => {
  const [devUrl, setDevUrl] = useState('');
  const [prodUrl, setProdUrl] = useState('');
  const [devResponse, setDevResponse] = useState(null);
  const [prodResponse, setProdResponse] = useState(null);
  const [devButtonColor, setDevButtonColor] = useState('btn-primary'); // Initial color is blue
  const [prodButtonColor, setProdButtonColor] = useState('btn-primary'); // Initial color is blue


  const handleDevUrlChange = (e) => {
    setDevUrl(e.target.value);
  };

  const handleProdUrlChange = (e) => {
    setProdUrl(e.target.value);
  };

  const fetchData = async (url, setResponse,id) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResponse(data);
      // Set button color to green if response status is 200
      if(id === "dev"){setDevButtonColor('btn-success');} 
      if(id === "prod"){setProdButtonColor('btn-success');} 
      
    } catch (error) {
      console.error('Error fetching data:', error.message);
      //setDevButtonColor('btn-danger'); // Set button color to red if there's an error fetching data
      if(id === "dev"){setDevButtonColor('btn-danger');}
      if(id === "prod"){setProdButtonColor('btn-danger');}
    }
  };

  const compareResponses = () => {
    if (devResponse && prodResponse) {
      const areIdentical = JSON.stringify(devResponse) === JSON.stringify(prodResponse);
      alert(areIdentical ? 'API responses are identical' : 'API responses are different');
      setDevResponse("");
      setProdResponse("");
      setDevButtonColor('btn-primary'); // Reset button color to blue after comparing responses
      setProdButtonColor('btn-primary'); // Reset button color to blue after comparing responses
    } else {
      alert('Please fetch data from both URLs first');
      setDevButtonColor('btn-primary'); // Reset button color to blue after comparing responses
      setProdButtonColor('btn-primary'); // Reset button color to blue after comparing responses
    }
  };

  return (<><br />
    <div className='container'>
      <h1>Compare API Responses</h1><br>
      </br>
      <div>
        <div class="mb-10">
          <label htmlFor="devUrl" class="form-label">First API URL:</label>
          <input class="form-control" type="text" id="devUrl" value={devUrl} onChange={handleDevUrlChange}/>
          <br></br>
          <button type="button" className={`btn ${devButtonColor} btn-sm`} onClick={() => fetchData(devUrl, setDevResponse,"dev")}>Fetch Data</button>
        </div>
        <br />
        <div class="mb-10">
          <label htmlFor="prodUrl" class="form-label">Second API URL:</label>
          <input class="form-control" type="text" id="prodUrl" value={prodUrl} onChange={handleProdUrlChange} /><br></br>
          <button type="button" className={`btn ${prodButtonColor} btn-sm`}  onClick={() => fetchData(prodUrl, setProdResponse,"prod")}>Fetch Data</button>
        </div>
        <br>
    </br>

        <button type="button" class="btn btn-primary btn-sm " onClick={compareResponses}>Compare Responses</button>


        
        
      </div>
    </div>
   
    
  </>
  );
};

export default App;
