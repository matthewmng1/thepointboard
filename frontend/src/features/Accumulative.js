// Accumulative.js
import React from 'react';
import ReceivingGameDisplay from '../components/ReceivingGameDisplay';
import ServingGameDisplay from '../components/ServingGameDisplay';
import { useSet } from '../context/SetContext';
import './Accumulative.css'

const Accumulative = () => {
    const { 
        sets, 
        calculateScores, 
        sideoutEfficiency, 
        calculateUnforcedErrors, 
        accumulateStats 
    } = useSet();

    const accumulatedPlayerStats = accumulateStats(sets).accumulatedPlayerStats
    const accumulatedOpponentStats = accumulateStats(sets).accumulatedOpponentStats

    console.log(accumulatedPlayerStats)
    return (
        <div className='accumulative-main'>
            <div className='accumulative-container'>
                <p className='accumulative-header'>Accumulative</p>
                <div className='accumulative-display-container'>
                    <div className='accumulative-team-statistics'>
                        <div className='accumulative-home-display'>
                            <p className='accumulative-team-name'>FRVBC</p>
                            <div className='accumulative-team-display'>
                                <ServingGameDisplay stats={accumulatedPlayerStats} />
                                <ReceivingGameDisplay stats={accumulatedPlayerStats} />
                            </div>
                        </div>
                        
                        <div className='accumulative-game-statistics'>
                            {sets.map((set, index) => (
                                <React.Fragment key={index}>     
                            <table className='accumulative-game-stat-table'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Scrs</th>
                                        <th>SO %</th>
                                        <th>Errs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    <tr>
                                        <td className='acc-stat-table-name' rowSpan={2}>Set {index + 1}</td>
                                        <td className='acc-stat-table-name'>FRVBC</td>
                                        <td className='acc-side-stat-td'>{calculateScores(set).homeScore}</td>
                                        <td className='acc-side-stat-td'>{isNaN(sideoutEfficiency(set).homeSideoutEfficiency) ? 0 : sideoutEfficiency(set).homeSideoutEfficiency}%</td>
                                        <td className='acc-side-stat-td errs'>{calculateUnforcedErrors(set).playerErrors}</td>
                                    </tr>
                                    <tr>
                                        <td className='acc-stat-table-name'>Opponent</td>
                                        <td className='acc-side-stat-td'>{calculateScores(set).opponentScore}</td>
                                        <td className='acc-side-stat-td'>{isNaN(sideoutEfficiency(set).opponentSideoutEfficiency) ? 0 : sideoutEfficiency(set).opponentSideoutEfficiency}%</td>
                                        <td className='acc-side-stat-td errs'>{calculateUnforcedErrors(set).opponentErrors}</td>
                                    </tr>
                                    <br></br>
                                </tbody>
                            </table>
                            </React.Fragment>
                            ))}
                        </div>
                        <div className='accumulative-opponent-display'>
                            <p className='accumulative-team-name'>Opponent</p>
                            <div className='accumulative-team-display'>
                                <ServingGameDisplay stats={accumulatedOpponentStats} />
                                <ReceivingGameDisplay stats={accumulatedOpponentStats} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accumulative;
