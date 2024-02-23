import React from 'react'
import './GameDisplay.css'

const ServingGameDisplay = ({stats}) => {

	function totalStats(stats){
		let totals = {
			ace: 0,
			block: 0,
			transitionKill: 0,
			serviceError: 0,
			attackError: 0,
			ballHandlingError: 0,
			miscError: 0
		}
		for(let p in stats){
			let serveStat = stats[p].serve
			totals.ace += serveStat.ace;
			totals.block += serveStat.block;
			totals.transitionKill += serveStat.transitionKill;
			totals.serviceError += serveStat.serviceError;
			totals.attackError += serveStat.attackError;
			totals.ballHandlingError += serveStat.ballHandlingError;
			totals.miscError += serveStat.miscError;
		}
		return totals;
	}

	let totalServeStats = totalStats(stats)

	console.log(totalServeStats)

  return (
    <div className='game-display-main'>
      <div className='game-display-container'>
      	<table className='game-display-table'> 
          <thead className='game-display-table-header'>
            <tr>
              <th colSpan={8}>Serving Game</th>
            </tr>
          </thead>
          <tbody className='game-display-table-body'>
            <tr className='game-display-table-body-headers'>
              <td className='game-display-table-body-pos'><b>Player</b></td>
              <td className='game-display-table-body-pos'><b>Ace</b></td>
              <td className='game-display-table-body-pos'><b>Block</b></td>
              <td className='game-display-table-body-pos'><b>Trans</b></td>
              <td className='game-display-table-body-neg'><b>SE</b></td>
              <td className='game-display-table-body-neg'><b>AE</b></td>
              <td className='game-display-table-body-neg'><b>BHE</b></td>
              <td className='game-display-table-body-neg'><b>Misc</b></td>
            </tr>
            {Object.keys(stats).map(name => (
              <tr key={name}>
                <td className='game-display-table-stat'>{name}</td>
                <td className='game-display-table-stat'>{stats[name].serve.ace} </td>
                <td className='game-display-table-stat'>{stats[name].serve.block}</td>
                <td className='game-display-table-stat'>{stats[name].serve.transitionKill}</td>
                <td className='game-display-table-stat game-display-table-body-neg'>{stats[name].serve.serviceError}</td>
                <td className='game-display-table-stat game-display-table-body-neg'>{stats[name].serve.attackError}</td>
                <td className='game-display-table-stat game-display-table-body-neg'>{stats[name].serve.ballHandlingError}</td>
                <td className='game-display-table-stat game-display-table-body-neg'>{stats[name].serve.miscError}</td>
              </tr>
            ))}
						<tr style={{backgroundColor: "lightcoral", fontWeight: "700"}}>
							<td>Total</td>
							{Object.entries(totalServeStats).map(([key, value]) => (
								<td key={key}>{value}</td>
							))}
						</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ServingGameDisplay