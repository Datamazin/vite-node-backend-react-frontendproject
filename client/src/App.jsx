import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import PlayerCard from './components/PlayerCard';

function App() {
  const [count, setCount] = useState(0)
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]); // State for vegetables API data
  const [playerData, setPlayerData] = useState(null);
  const playerId = 667472; // Example: Dane Myers

  const fetchAPIs = async () => {
    try {
      const [apiRes, fruitsRes, vegetablesRes, playerStatsRes] = await axios.all([
  axios.get('http://localhost:8080/api'),
  axios.get('http://localhost:8080/api/fruits'),
  axios.get('http://localhost:8080/api/vegetables'),
  axios.get('http://localhost:8080/api/player/667472')
]);
console.log('fruitsRes.data:', fruitsRes.data); // <-- Add this line
setFruits(fruitsRes.data && fruitsRes.data.fruits ? fruitsRes.data.fruits : []);
setVegetables(vegetablesRes.data && vegetablesRes.data.vegetables ? vegetablesRes.data.vegetables : []);
setPlayerStats(Array.isArray(playerStatsRes.data) ? playerStatsRes.data : [playerStatsRes.data]);
    } catch (error) {
      console.error('Error fetching APIs:', error);
    }
  };

  // Optionally, you can parameterize the player ID here
  // const playerId = 667472; // Replace with actual player ID or make this dynamic

  useEffect(() => {
    fetchAPIs();
  }, []); // Add dependency array and close useEffect

  useEffect(() => {
  axios.get('http://localhost:8080/api/vegetables')
    .then(response => console.log('Vegetables:', response.data))
    .catch(error => console.error('Vegetables fetch error:', error));
}, []);

  // Fetch player data using the player ID
  useEffect(() => {
    axios.get(`http://localhost:8080/api/player/${playerId}`)
      .then(res => setPlayerData(res.data))
      .catch(err => console.error(err));
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
          {fruits.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
        <ul>
          {vegetables.map((veggie, index) => (
            <li key={index}>{veggie}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Player Stats</h1>
        <PlayerCard data={playerData} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
export default App;