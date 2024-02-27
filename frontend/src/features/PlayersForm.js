import React, { useState } from 'react';
import { useSet } from '../context/SetContext'

function PlayersForm() {
  const { sets, updatePlayerName } = useSet(); // Use the context hook
  const [newNames, setNewNames] = useState({});

  const uniquePlayers = Array.from(
    new Set(sets.flatMap((set) => set.players.map((player) => player.name)))
  );

  const handleNameChange = (playerName, e) => {
    setNewNames((prevNames) => ({ ...prevNames, [playerName]: e.target.value }));
  };

  const handleUpdateNames = () => {
    Object.keys(newNames).forEach((playerName) => {
      const updatedName = newNames[playerName];
      if (updatedName.trim() !== '') {
        uniquePlayers.forEach((uniquePlayer) => {
          if (uniquePlayer === playerName) {
            sets.forEach((set, setIndex) => {
              const playerIndex = set.players.findIndex((player) => player.name === playerName);
              if (playerIndex !== -1) {
                updatePlayerName(setIndex, playerIndex, updatedName);
              }
            });
          }
        });
      }
    });
    setNewNames({})
  };

  return (
    <div>
      <h2>Update Player Names</h2>
      <p><i>10 characters max</i></p>
      <form onSubmit={handleUpdateNames}>
      {uniquePlayers.map((playerName) => (
        <div key={playerName}>
          <span>{playerName}: </span>
          <input
            type="text"
            maxLength={10}
            value={newNames[playerName] || ''}
            onChange={(e) => handleNameChange(playerName, e)}
            placeholder="Enter new name"
          />
        </div>
      ))}
      <button onClick={handleUpdateNames}>Update</button>
      </form>
    </div>
  );
}

export default PlayersForm;