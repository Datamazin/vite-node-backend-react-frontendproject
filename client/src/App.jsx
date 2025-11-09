import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import axios from 'axios'; // Removed to use native fetch

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    try {
      // For local development, use Express server on port 8080
      // For production (Azure Static Web Apps), use Azure Functions at /api/fruits
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:8080/api'
        : '/api/fruits';
      
      console.log('Fetching from:', apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('Response received:', data);
      setArray(data.fruits);
      console.log('Fruits set:', data.fruits);
    } catch (error) {
      console.error('Error fetching fruits:', error);
      console.error('Error details:', error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p>Fetched Fruits:</p>
        <ul>
          {array.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
