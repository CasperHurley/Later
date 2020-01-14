import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [allResources, setAllResources] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("");
  useEffect(() => {
    axios.get("/api/resources").then(response => {
      setAllResources(response.data.data);
    })
  }, [])
  const openResourceInNewTab = (url) => {
    window.open(url, "_blank"); 
  }

  console.log(allResources)

  return (
    <div className="App">
      {
        allResources.map((resource, index) => {
          return (
            <div key={index}>
              <div onClick={() => openResourceInNewTab(resource.link)}>{resource.name}</div>
              <p>{resource.note}</p>
              <div>
                {
                  resource.tags.map((tag, index) => {
                    return (
                      <div key={index}>{tag}</div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
