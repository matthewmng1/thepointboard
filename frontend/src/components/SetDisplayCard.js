import React from 'react'
import './SetGame.css'


const SetDisplayCard = ({team, players}) => {

    return (
        <div className='set-display-main'>
            <div className='set-display-container'>
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
                        <td><b>Player</b></td>
                        <td><b>Ace</b></td>
                        <td><b>Block</b></td>
                        <td><b>Trans</b></td>
                        <td><b>SE</b></td>
                        <td><b>AE</b></td>
                        <td><b>BHE</b></td>
                        <td><b>Misc</b></td>
                    </tr>
                    {players.map((player, idx) => (
                        <tr key={idx}>
                            <td className='set-table-player-name'>{player.name}</td>
                            <td className='set-btn-stat-container set-table-body-pos'>
                                <span className='set-stat'>{player.stats.serve.ace}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-pos'>
                                <span className='set-stat'>{player.stats.serve.block}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-pos'>
                                <span className='set-stat'>{player.stats.serve.transitionKill}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-neg'>
                                <span className='set-stat'>{player.stats.serve.serviceError}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-neg'>
                                <span className='set-stat'>{player.stats.serve.attackError}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-neg'>
                                <span className='set-stat'>{player.stats.serve.ballHandlingError}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-neg'>
                                <span className='set-stat'>{player.stats.serve.miscError}</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                
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
                        <td><b>RK</b></td>
                        <td><b>Block</b></td>
                        <td ><b>AE</b></td>
                        <td ><b>BHE</b></td>
                        <td ><b>Misc</b></td>
                    </tr>
                    {players.map((player, idx) => (
                        <tr key={idx}>
                            <td className='set-table-player-name'>{player.name}</td>
                            <td className='set-btn-stat-container set-table-body-pos'>
                                <span className='set-stat'>{player.stats.receive.firstServeKill}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-pos'>
                                <span className='set-stat'>{player.stats.receive.rallyKill}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-pos'>
                                <span className='set-stat'>{player.stats.receive.block}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-neg'>
                                <span className='set-stat'>{player.stats.receive.attackError}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-neg'>
                                <span className='set-stat'>{player.stats.receive.ballHandlingError}</span>
                            </td>
                            <td className='set-btn-stat-container set-table-body-neg'>
                                <span className='set-stat'>{player.stats.receive.miscError}</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SetDisplayCard

// table
// thead should 