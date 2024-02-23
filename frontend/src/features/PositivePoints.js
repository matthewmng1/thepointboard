import React from 'react';
import { useSet } from '../context/SetContext';
import './PositivePoints.css'

const PositivePoints = () => {
  const { sets, calculatePositivePoints } = useSet();
  const totalPlayerPoints = {};
  const totalPlayerErrors = {};
  const totalOpponentPoints = {};
  const totalOpponentErrors = {};

	sets.forEach((set, index) => {
    const positivePlayerPointsData = calculatePositivePoints(set).calculatedPositivePlayerPoints;

    for (const player in positivePlayerPointsData) {
      if (!totalPlayerPoints[player]) {
        totalPlayerPoints[player] = 0;
      }
			if(!totalPlayerErrors[player]){
				totalPlayerErrors[player] = 0;
			}
      totalPlayerPoints[player] += positivePlayerPointsData[player].points;
      totalPlayerErrors[player] += positivePlayerPointsData[player].errors;
    }
  });

  sets.forEach((set, index) => {
    const positiveOpponentPointsData = calculatePositivePoints(set).calculatedPositiveOpponentPoints;

    for (const opponent in positiveOpponentPointsData) {
        if(!totalOpponentPoints[opponent]){
          totalOpponentPoints[opponent] = 0;
        }
				if(!totalOpponentErrors[opponent]){
					totalOpponentErrors[opponent] = 0;
				}
      totalOpponentPoints[opponent] += positiveOpponentPointsData[opponent].points;
      totalOpponentErrors[opponent] += positiveOpponentPointsData[opponent].errors;
    }

    });

	function totalSums(set){
		let playerTotals = {
			pts: 0,
			errs: 0,
		}
		let opponentTotals = {
			pts: 0,
			errs: 0,
		}
		let playerStats = calculatePositivePoints(set).calculatedPositivePlayerPoints
		for(let player in playerStats){
			playerTotals.pts += playerStats[player].points
			playerTotals.errs += playerStats[player].errors
		}
		let opponentStats = calculatePositivePoints(set).calculatedPositiveOpponentPoints
		for(let opponent in opponentStats){
			opponentTotals.pts += opponentStats[opponent].points
			opponentTotals.errs += opponentStats[opponent].errors
		}
		return {playerTotals: playerTotals, opponentTotals: opponentTotals}
	}


	function totalPointsAndErrors(data){
		let sum = 0;
		for(let player in data){
			sum += data[player]
		}
		return sum;
	}


    return (
      <div className='positive-points-main'>
				<p className='positive-points-header'>Positive Points</p>
        <div className='positive-points-container'>
            {/* Players Table */}
            <table className='positive-points-table'>
              <thead>
							<tr>
								<th className='positive-points-team' colSpan={9}>FRVBC</th>
							</tr>
                <tr>
                  {/* creates the first column for name. Loops over sets and for each set, creates a new column that has 2 columns with the heading set # */}
                  <td style={{minWidth: "95px"}}></td>
                  {sets.map((set, index) => (
                    <React.Fragment key={index}>
                      <td colSpan="2"><b>Set {index + 1}</b></td>
                    </React.Fragment>
          	      ))}
                {/* extra column space holders */}
                {/* adds the last two columns as the total points and total errors */}
                <td rowSpan={2} className='pp-header-td'><b>Total Points</b></td>
                <td rowSpan={2} className='pp-header-td td-errs'><b>Total Errors</b></td>
                {/* since there are 5 sets, then there should be a total of 13 columns */}

              	</tr>
              	<tr>
                  {/* leaves the first col empty in the second row
                      for each set (5 total), creates new column headers with Points and Errors
                  */}
                  <td className='pp-header-td'><b>Name</b></td>
                  {sets.map((set, index) => (
                    <React.Fragment key={index}>
                      <td className='pp-header-td'><b>Points</b></td>
                      <td className='pp-header-td td-errs'><b>Errors</b></td>
                    </React.Fragment>
        	        ))}
                  
              	</tr>
          		</thead>
          		<tbody>
                {/* access the first set in sets to get the player names
                    sets the player names to the key and the <td>
                */}
                {sets[0].players.map((player) => (
                   <tr key={player.name}>
                     <td>{player.name}</td>
                      {/* iterates through sets and gets the positive point data from each set */}
                    	{sets.map((set, index) => {
												const positivePlayerPointsData = calculatePositivePoints(set).calculatedPositivePlayerPoints;
													return (
													// returns a fragment that access the positivepointsplayerdata which is an object
													// if the name is found, then display the points and errors of that player of that set
													<React.Fragment key={index}>
														{positivePlayerPointsData[player.name] ? 
														(
															<>
																<td>{positivePlayerPointsData[player.name].points}</td>
																<td className='td-errs'>{positivePlayerPointsData[player.name].errors}</td>
															</>
														) : 
														(
															<td colSpan="2">N/A</td>
														)}
													</React.Fragment>
													);
                  		})}
											{/* uses the function at the top of the doc to calculate the total player points and errors across all sets */}
											<td>{totalPlayerPoints[player.name]}</td>
											<td className='td-errs'>{totalPlayerErrors[player.name]}</td>
                		</tr>
                	))}
									<tr style={{backgroundColor: "lightcoral", fontWeight: "700"}}>
										<td>Total</td>
										{sets.map((set, index) => {
											const setTotalPoints = totalSums(set).playerTotals.pts;
											const setTotalErrors = totalSums(set).playerTotals.errs;
											return (
												<React.Fragment key={index}>
													<td>{setTotalPoints}</td>
													<td>{setTotalErrors}</td>
												</React.Fragment>
											);
										})}
										<td>{totalPointsAndErrors(totalPlayerPoints)}</td>
										<td>{totalPointsAndErrors(totalPlayerErrors)}</td>
									</tr>
            	</tbody>
        		</table>

                <br></br>






            {/* Opponents Table */}
            <table className='positive-points-table'>
						<thead>
							<tr>
								<th className='positive-points-team' colSpan={9}>Opponent</th>
							</tr>
                <tr>
                  {/* creates the first column for name. Loops over sets and for each set, creates a new column that has 2 columns with the heading set # */}
                  <td style={{minWidth: "95px"}}></td>
                  {sets.map((set, index) => (
                    <React.Fragment key={index}>
                      <td colSpan="2"><b>Set {index + 1}</b></td>
                    </React.Fragment>
          	      ))}
                {/* extra column space holders */}
                {/* adds the last two columns as the total points and total errors */}
                <td rowSpan={2} className='pp-header-td'><b>Total Points</b></td>
                <td rowSpan={2} className='pp-header-td td-errs'><b>Total Errors</b></td>
                {/* since there are 5 sets, then there should be a total of 13 columns */}

              	</tr>
              	<tr>
                  {/* leaves the first col empty in the second row
                      for each set (5 total), creates new column headers with Points and Errors
                  */}
                  <td className='pp-header-td'><b>Name</b></td>
                  {sets.map((set, index) => (
                    <React.Fragment key={index}>
                      <td className='pp-header-td'><b>Points</b></td>
                      <td className='pp-header-td td-errs'><b>Errors</b></td>
                    </React.Fragment>
        	        ))}
                  
              	</tr>
          		</thead>
              <tbody>
              	{sets[1].opponents.map((opponent) => (
              	  <tr key={opponent.name}>
              	    <td>{opponent.name}</td>
              	    {sets.map((set, index) => {
              	      const positivePointsData = calculatePositivePoints(set).calculatedPositiveOpponentPoints;
              	        return (
              	          <React.Fragment key={index}>
              	            {positivePointsData[opponent.name] ? 
														(
              	              <>
              	                <td>{positivePointsData[opponent.name].points}</td>
              	                <td className='td-errs'>{positivePointsData[opponent.name].errors}</td>
              	              </>
              	            ) : 
														(
              	              <td colSpan="2">N/A</td>
              	            )}
              	          </React.Fragment>
              	        );
              	    })}
              	    <td>{totalOpponentPoints[opponent.name]}</td>
              	    <td className='td-errs'>{totalOpponentErrors[opponent.name]}</td>
              	  </tr>
              	))}
								<tr style={{backgroundColor: "lightcoral", fontWeight: "700"}}>
										<td>Total</td>
										{sets.map((set, index) => {
											const setTotalPoints = totalSums(set).opponentTotals.pts;
											const setTotalErrors = totalSums(set).opponentTotals.errs;
											return (
												<React.Fragment key={index}>
													<td>{setTotalPoints}</td>
													<td>{setTotalErrors}</td>
												</React.Fragment>
											);
										})}
										<td>{totalPointsAndErrors(totalOpponentPoints)}</td>
										<td>{totalPointsAndErrors(totalOpponentErrors)}</td>
									</tr>
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default PositivePoints;