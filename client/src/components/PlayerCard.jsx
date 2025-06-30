import React from 'react';
import './PlayerCard.css';


const PlayerCard = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  return (
    <div className="player-card">
      <h2>{data.name}</h2>
      <p><strong>Team:</strong> {data.team}</p>
      <p><strong>Season:</strong> {data.season}</p>
      <p><strong>Games:</strong> {data.gamesPlayed}</p>
      <p><strong>AB:</strong> {data.atBats} | <strong>Hits:</strong> {data.hits}</p>
      <p><strong>HR:</strong> {data.homeRuns} | <strong>RBI:</strong> {data.rbi}</p>
      <p><strong>AVG:</strong> {data.avg} | <strong>OBP:</strong> {data.obp}</p>
      <p><strong>SLG:</strong> {data.slg} | <strong>OPS:</strong> {data.ops}</p>
    </div>
  );
};

export default PlayerCard;
// Note: This component expects `data` to be an object with player stats.

