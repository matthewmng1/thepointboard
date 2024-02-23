import React from 'react'
import './GameDisplay.css'


const ReceivingGameDisplay = ({stats}) => {
	function totalStats(stats){
		let totals = {
			firstServeKill: 0,
			rallyKill: 0,
			block: 0,
			attackError: 0,
			ballHandlingError: 0,
			miscError: 0
		}
		for(let p in stats){
			let serveStat = stats[p].serve
			totals.firstServeKill += serveStat.firstServeKill;
			totals.rallyKill += serveStat.rallyKill;
			totals.block += serveStat.block;
			totals.attackError += serveStat.attackError;
			totals.ballHandlingError += serveStat.ballHandlingError;
			totals.miscError += serveStat.miscError;
		}
		return totals;
	}

	let totalReceiveStats = totalStats(stats)

    
  return (
    <div className='game-display-main'>
      <div className='game-display-container'>
        <table className='game-display-table'>
          <thead className='game-display-header'>
            <tr>
              <th colSpan={7}>Receiving Game</th>
            </tr>
        	</thead>
        	<tbody className='game-display-table-body'>
            <tr className='game-display-table-body-headers'>
              <td className='game-display-table-body-pos'><b>Player</b></td>
              <td className='game-display-table-body-pos'><b>FSK</b></td>
              <td className='game-display-table-body-pos'><b>R. Kill</b></td>
              <td className='game-display-table-body-pos'><b>Block</b></td>
              <td className='game-display-table-body-neg'><b>SE</b></td>
              <td className='game-display-table-body-neg'><b>BHE</b></td>
              <td className='game-display-table-body-neg'><b>Misc</b></td>
            </tr>
            {Object.keys(stats).map(name => (
              <tr key={name}>
                <td className='game-display-table-stat'>{name}</td>
                <td className='game-display-table-stat'>{stats[name].receive.firstServeKill} </td>
                <td className='game-display-table-stat'>{stats[name].receive.rallyKill}</td>
                <td className='game-display-table-stat'>{stats[name].receive.block}</td>
                <td className='game-display-table-stat game-display-table-body-neg'>{stats[name].receive.attackError}</td>
                <td className='game-display-table-stat game-display-table-body-neg'>{stats[name].receive.ballHandlingError}</td>
                <td className='game-display-table-stat game-display-table-body-neg'>{stats[name].receive.miscError}</td>
              </tr>
            ))}
						<tr style={{backgroundColor: "lightcoral", fontWeight: "700"}}>
							<td>Total</td>
							{Object.entries(totalReceiveStats).map(([key, value]) => (
								<td key={key}>{value || 0}</td>
							))}
						</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReceivingGameDisplay