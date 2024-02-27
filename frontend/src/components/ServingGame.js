import React from 'react'
import './SetGame.css'


const ServingGame = ({team, players, updateStat}) => {

    const statClick = (idx, statName, value, isIncrement) => {
        const newValue = isIncrement ? value + 1 : value - 1;
        updateStat(idx, statName, newValue, true);
    };

    return (
        <div>
            <table className='set-table'>
                <thead className='setgame-header'>
                    <tr>
                        <th colSpan={8}>
                            <b>{team} Serving Game</b>
                        </th>
                    </tr>
                </thead>
                <br></br>
                <tbody>
                <tr className='set-table-body-headers'>
                    <td className='set-table-body-pos'><b>Player</b></td>
                    <td className='set-table-body-pos'><b>Ace</b></td>
                    <td className='set-table-body-pos'><b>Block</b></td>
                    <td className='set-table-body-pos'><b>Trans</b></td>
                    <td className='set-table-body-neg'><b>SE</b></td>
                    <td className='set-table-body-neg'><b>AE</b></td>
                    <td className='set-table-body-neg'><b>BHE</b></td>
                    <td className='set-table-body-neg'><b>Misc</b></td>
                </tr>
                {players.map((player, idx) => (
                    <tr key={idx}>
                        <td className='set-table-player-name'>{player.name}</td>
                        <td className='set-btn-stat-container'>
                            <button className="set-btn" onClick={() => statClick(idx, 'ace', player.stats.serve.ace, false)}>-</button>
                            <span className='set-stat'>{player.stats.serve.ace}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'ace', player.stats.serve.ace, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container'>
                            <button className="set-btn" onClick={() => statClick(idx, 'block', player.stats.serve.block, false)}>-</button>
                            <span className='set-stat'>{player.stats.serve.block}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'block', player.stats.serve.block, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container'>
                            <button className="set-btn" onClick={() => statClick(idx, 'transitionKill', player.stats.serve.transitionKill, false)}>-</button>
                            <span className='set-stat'>{player.stats.serve.transitionKill}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'transitionKill', player.stats.serve.transitionKill, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container set-table-body-neg'>
                            <button className="set-btn" onClick={() => statClick(idx, 'serviceError', player.stats.serve.serviceError, false)}>-</button>
                            <span className='set-stat'>{player.stats.serve.serviceError}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'serviceError', player.stats.serve.serviceError, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container set-table-body-neg'>
                            <button className="set-btn" onClick={() => statClick(idx, 'attackError', player.stats.serve.attackError, false)}>-</button>
                            <span className='set-stat'>{player.stats.serve.attackError}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'attackError', player.stats.serve.attackError, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container set-table-body-neg'>
                            <button className="set-btn" onClick={() => statClick(idx, 'ballHandlingError', player.stats.serve.ballHandlingError, false)}>-</button>
                            <span className='set-stat'>{player.stats.serve.ballHandlingError}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'ballHandlingError', player.stats.serve.ballHandlingError, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container set-table-body-neg'>
                            <button className="set-btn" onClick={() => statClick(idx, 'miscError', player.stats.serve.miscError, false)}>-</button>
                            <span className='set-stat'>{player.stats.serve.miscError}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'miscError', player.stats.serve.miscError, true)}>+</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ServingGame

// table
// thead should 