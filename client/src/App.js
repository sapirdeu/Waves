import React, {useEffect} from 'react';
import axios from 'axios';


function App() {
  useEffect(() => {
    axios.get('/api/product/brands').then(response=>{
      console.log(response)
    })
  }, []);

  return (
    <div className="App">
      my app
    </div>
  );
}

export default App;
