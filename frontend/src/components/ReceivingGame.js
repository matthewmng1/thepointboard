import React from 'react'
import './SetGame.css'

const ReceivingGame = ({team, players, updateStat}) => {
    
    const statClick = (idx, statName, value, isIncrement) => {
        if (!isIncrement && value === 0) {
            return;
        }
        const newValue = isIncrement ? value + 1 : value - 1;
        updateStat(idx, statName, newValue, false);
    };

    return (
        <div>
            <table className='set-table'>
                <thead className='setgame-header'>
                    <tr>
                        <th colSpan={8}>
                            <b>{team} Receiving Game</b>
                        </th>
                    </tr>
                </thead>
                <br></br>
                <tbody>
                <tr className='set-table-body-headers'>
                    <td><b>Player</b></td>
                    <td><b>FSK</b></td>
                    <td><b>R. Kill</b></td>
                    <td><b>Block</b></td>
                    <td className='set-table-body-neg'><b>AE</b></td>
                    <td className='set-table-body-neg'><b>BHE</b></td>
                    <td className='set-table-body-neg'><b>Misc</b></td>
                </tr>
                {players.map((player, idx) => (
                    <tr key={idx}>
                        <td className='set-table-player-name'>{player.name}</td>
                        <td className='set-btn-stat-container'>
                            <button className="set-btn" onClick={() => statClick(idx, 'firstServeKill', player.stats.receive.firstServeKill, false)}>-</button>
                            <span className='set-stat'>{player.stats.receive.firstServeKill}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'firstServeKill', player.stats.receive.firstServeKill, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container'>
                            <button className="set-btn" onClick={() => statClick(idx, 'rallyKill', player.stats.receive.rallyKill, false)}>-</button>
                            <span className='set-stat'>{player.stats.receive.rallyKill}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'rallyKill', player.stats.receive.rallyKill, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container'>
                            <button className="set-btn" onClick={() => statClick(idx, 'block', player.stats.receive.block, false)}>-</button>
                            <span className='set-stat'>{player.stats.receive.block}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'block', player.stats.receive.block, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container set-table-body-neg'>
                            <button className="set-btn" onClick={() => statClick(idx, 'attackError', player.stats.receive.attackError, false)}>-</button>
                            <span className='set-stat'>{player.stats.receive.attackError}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'attackError', player.stats.receive.attackError, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container set-table-body-neg'>
                            <button className="set-btn" onClick={() => statClick(idx, 'ballHandlingError', player.stats.receive.ballHandlingError, false)}>-</button>
                            <span className='set-stat'>{player.stats.receive.ballHandlingError}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'ballHandlingError', player.stats.receive.ballHandlingError, true)}>+</button>
                        </td>
                        <td className='set-btn-stat-container set-table-body-neg'>
                            <button className="set-btn" onClick={() => statClick(idx, 'miscError', player.stats.receive.miscError, false)}>-</button>
                            <span className='set-stat'>{player.stats.receive.miscError}</span>
                            <button className="set-btn" onClick={() => statClick(idx, 'miscError', player.stats.receive.miscError, true)}>+</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReceivingGame