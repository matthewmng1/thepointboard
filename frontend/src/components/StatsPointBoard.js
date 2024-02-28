import React from 'react'
import { useSet } from '../context/SetContext'
import './StatsPointBoard.css'

const StatsPointBoard = ({sets}) => {
	const { matchSetTotals, totalMatchScores } = useSet()

	const numOfSets = sets.length
	console.log(sets)
	console.log(numOfSets)

	function generateServingStats(sets, type){
		const servingStats = {
			aces: matchSetTotals(sets)[type].ace,
			blocks: matchSetTotals(sets)[type].block,
			trans: matchSetTotals(sets)[type].trans,
			serveErrors: matchSetTotals(sets)[type].se,
			attackErrors: matchSetTotals(sets)[type].ae,
			ballHandlingErrors: matchSetTotals(sets)[type].bhe,
			miscErrors: matchSetTotals(sets)[type].misc,
		};
	
		return servingStats;
	}

	function generateReceivingStats(sets, type){
		const servingStats = {
			firstServeKills: matchSetTotals(sets)[type].fsk,
			rallyKills: matchSetTotals(sets)[type].rk,
			blocks: matchSetTotals(sets)[type].block,
			attackErrors: matchSetTotals(sets)[type].ae,
			ballHandlingErrors: matchSetTotals(sets)[type].bhe,
			miscErrors: matchSetTotals(sets)[type].misc,
		};
	
		return servingStats;
	}

	const frServingGame = generateServingStats(sets, 'frvbcServingGame')
	const frReceivingGame = generateReceivingStats(sets, 'frvbcReceivingGame')
	const oppoServingGame = generateServingStats(sets, 'opponentServingGame')
	const oppoReceivingGame = generateReceivingStats(sets, 'opponentReceivingGame')

	function sumUpStats(stats){
    let total = 0;
    Object.keys(stats).forEach(key => {
      total += stats[key]
    })
    return total;
  }

  return (
    <div className='stats-pb-main'>
			<div className='stats-pb-container'>
				<p className='stats-pb-header'>Point Board</p>
				<div className='stats-pb-tables-main'>
					<table className='stats-pb-table'>
						<thead className='stats-pb-table-head'>
							<tr>
								<td className='stats-pb-table-title'>Serving Game</td>
								<td className='stats-pb-table-title' colSpan={numOfSets}>Aces</td>
								<td className='stats-pb-table-title' colSpan={numOfSets}>Blocks</td>
								<td className='stats-pb-table-title' colSpan={numOfSets}>Trans</td>
								<td className='stats-pb-table-title' colSpan={numOfSets}>SE</td>
								<td className='stats-pb-table-title' colSpan={numOfSets}>AE</td>
								<td className='stats-pb-table-title' colSpan={numOfSets}>BHE</td>
								<td className='stats-pb-table-title' colSpan={numOfSets}>Misc</td>
							</tr>
						</thead>
						<tbody className='stats-pb-table-body'>
							<tr>
                <td className='stats-pb-table-name'>FRVBC</td>
                {Object.keys(frServingGame).map(statName => (
                  Object.keys(frServingGame[statName]).map(statVal => (
                    <td 
											key={`${statName}-${statVal}`} 
											className={
												statName !== 'aces' && 
												statName !== 'blocks' && 
												statName !== 'trans' 
												? 'td-err' 
												: ''
											}>{frServingGame[statName][statVal]}
										</td>
                    )
                )))}
              </tr>
							<tr>
                <td className='stats-pb-table-name'>OPPONENT</td>
                {Object.keys(oppoServingGame).map(statName => (
                  Object.keys(oppoServingGame[statName]).map(statVal => (
                      <td 
												key={`${statName}-${statVal}`}
												className={
													statName !== 'aces' && 
													statName !== 'blocks' && 
													statName !== 'trans' 
													? 'td-err' 
													: ''
												}>
												{oppoServingGame[statName][statVal]}
											</td>
                    )
                )))}
              </tr>
              <tr>
                <td className='stats-pb-table-name'>FRVBC</td>
                {Object.keys(frServingGame).map(statName => (
                  <>
                    <td 
											colSpan={1}
											className={
												statName !== 'aces' && 
												statName !== 'blocks' && 
												statName !== 'trans' 
												? 'td-err' 
												: ''}>
											{isNaN(
												((sumUpStats(frServingGame[statName]) / totalMatchScores(sets).totalHomeScore) * 100).toFixed(0)) 
												? 
												0 
												: 
												((sumUpStats(frServingGame[statName]) / totalMatchScores(sets).totalHomeScore) * 100).toFixed(0) 
											}%</td>
                    <td 
											colSpan={2}
											className={
												statName !== 'aces' && 
												statName !== 'blocks' && 
												statName !== 'trans' 
												? 'td-err' 
												: ''
											}>
                      <i>Total:</i> {sumUpStats(frServingGame[statName]) || 0}
                    </td>
                  </>
                ))}
              </tr>
              <tr>
                <td className='stats-pb-table-name'>OPPONENT</td>
                {Object.keys(oppoServingGame).map(statName => (
                  <>
                    <td 
											colSpan={1}
											className={
												statName !== 'aces' && 
												statName !== 'blocks' && 
												statName !== 'trans' 
												? 'td-err' 
												: ''}>
											{isNaN(
												((sumUpStats(oppoServingGame[statName]) / totalMatchScores(sets).totalHomeScore) * 100).toFixed(0)) 
												? 
												0 
												: 
												((sumUpStats(oppoServingGame[statName]) / totalMatchScores(sets).totalHomeScore) * 100).toFixed(0) 
											}%
										</td>
                    <td 
											colSpan={2}
											className={
												statName !== 'aces' && 
												statName !== 'blocks' && 
												statName !== 'trans' 
												? 'td-err' 
												: ''}>
                      <i>Total:</i> {sumUpStats(oppoServingGame[statName]) || 0}
                    </td>
                  </>
                ))}
              </tr>
						</tbody>
					</table>
					<br></br>
					<table className='stats-pb-table'>
            <thead className='stats-pb-table-head'>
              <tr>
                <td className='stats-pb-table-title'>Receiving Game</td>
                <td className='stats-pb-table-title' colSpan={numOfSets}>FS Kills</td>
                <td className='stats-pb-table-title' colSpan={numOfSets}>R Kills</td>
                <td className='stats-pb-table-title' colSpan={numOfSets}>Blocks</td>
                <td className='stats-pb-table-title td-err' colSpan={numOfSets}>AE</td>
                <td className='stats-pb-table-title td-err' colSpan={numOfSets}>BHE</td>
                <td className='stats-pb-table-title td-err' colSpan={numOfSets}>Misc</td>
              </tr>
            </thead>
            <tbody className='stats-pb-table-body'>
              <tr>
                <td className='stats-pb-table-name'>FRVBC</td>
                {Object.keys(frReceivingGame).map(statName => (
                  Object.keys(frReceivingGame[statName]).map(statVal => (
                      <td 
												key={`${statName}-${statVal}`}
												className={
													statName === 'attackErrors' || 
													statName === 'ballHandlingErrors'|| 
													statName === 'miscErrors' 
													? 'td-err' 
													: ''
												}>
											{frReceivingGame[statName][statVal]}
										</td>
                    )
                )))}
              </tr>
              <tr>
                <td className='stats-pb-table-name'>OPPONENT</td>
                {Object.keys(oppoReceivingGame).map(statName => (
                  Object.keys(oppoReceivingGame[statName]).map(statVal => (
                      <td 
												key={`${statName}-${statVal}`} 
												className={
													statName === 'attackErrors' || 
													statName === 'ballHandlingErrors'|| 
													statName === 'miscErrors' 
													? 'td-err' 
													: ''}>
												{oppoReceivingGame[statName][statVal]}
											</td>
                    )
                )))}
              </tr>
              <tr>
                <td className='stats-pb-table-name'>FRVBC</td>
                {Object.keys(frReceivingGame).map(statName => (
                  <>
                    <td 
											colSpan={1}
											className={
												statName === 'attackErrors' || 
												statName === 'ballHandlingErrors'|| 
												statName === 'miscErrors' 
												? 'td-err' 
												: ''}>
												{isNaN(
													((sumUpStats(frReceivingGame[statName]) / totalMatchScores(sets).totalHomeScore) * 100).toFixed(0))
													? 
													0
													: 
													(((sumUpStats(frReceivingGame[statName]) / totalMatchScores(sets).totalHomeScore) * 100).toFixed(0))
												}%
											</td>
                    <td 
											colSpan={2}
											className={
												statName === 'attackErrors' || 
												statName === 'ballHandlingErrors'|| 
												statName === 'miscErrors' 
												? 'td-err' 
												: ''}>
                      <i>Total:</i> {sumUpStats(frReceivingGame[statName]) || 0}
                    </td>
                  </>
                ))}
              </tr>
              <tr>
                <td className='stats-pb-table-name'>OPPONENT</td>
                {Object.keys(oppoReceivingGame).map(statName => (
                  <>
                    <td 
											colSpan={1}
											className={
												statName === 'attackErrors' || 
												statName === 'ballHandlingErrors'|| 
												statName === 'miscErrors' 
												? 'td-err' 
												: ''}>
											{isNaN(
												((sumUpStats(oppoReceivingGame[statName]) / totalMatchScores(sets).totalHomeScore) * 100).toFixed(0))
												? 
												0 
												: 
												(((sumUpStats(oppoReceivingGame[statName]) / totalMatchScores(sets).totalHomeScore) * 100).toFixed(0))
											}%
										</td>
                    <td 
											colSpan={2}
											className={
												statName === 'attackErrors' || 
												statName === 'ballHandlingErrors'|| 
												statName === 'miscErrors' 
												? 'td-err' 
												: ''}>
                      <i>Total:</i> {sumUpStats(oppoReceivingGame[statName]) || 0}
                    </td>
                  </>
                ))}
              </tr>
            </tbody>
          </table>
				</div>
			</div>
		</div>
  )
}

export default StatsPointBoard
