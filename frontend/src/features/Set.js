import React, { useState } from 'react'
import ReceivingGame from '../components/ReceivingGame'
import ServingGame from '../components/ServingGame'
import './Set.css'
import { useSet } from '../context/SetContext'

const Set = ({num}) => {
  const homeTeam = "FRVBC"
  const awayTeam = "OPPONENT"

  const {
    sets, 
    updateSet, 
    calculateUnforcedErrors, 
    calculateScores, 
    pointScoringEfficiency,
    sideoutEfficiency,
    pointRatio
  } = useSet()

  const set = sets[num - 1] || { players: [], opponents: [] };

  const unforcedErrors = calculateUnforcedErrors(set);
  const scores = calculateScores(set)
  const scoringEfficiency = pointScoringEfficiency(set)
  const sideoutPercentage = sideoutEfficiency(set)
  const pointRatios = pointRatio(set)


    const updateStat = (playerIndex, statName, value, isServe) => {
      const updatedPlayers = [...set.players];
      const targetStats = isServe ? 'serve' : 'receive';

      updatedPlayers[playerIndex] = {
          ...updatedPlayers[playerIndex],
          stats: {
              ...updatedPlayers[playerIndex].stats,
              [targetStats]: {
                  ...updatedPlayers[playerIndex].stats[targetStats],
                  [statName]: value
              }
          }
      };

      updateSet(num - 1, { ...set, players: updatedPlayers });
    };

    const updateOpponentStat = (opponentIndex, statName, value, isServe) => {
          const updatedOpponents = [...set.opponents];
          const targetStats = isServe ? 'serve' : 'receive';

          updatedOpponents[opponentIndex] = {
              ...updatedOpponents[opponentIndex],
              stats: {
                  ...updatedOpponents[opponentIndex].stats,
                  [targetStats]: {
                      ...updatedOpponents[opponentIndex].stats[targetStats],
                      [statName]: value
                  }
              }
          };
        updateSet(num - 1, { ...set, opponents: updatedOpponents });
    };

    return (
        <div className='set-main'>
          <div className='set-main-header'>
            Set {num}
          </div>
          <div className='set-container'>
            <div className='set-main-stats'>
              <div className='set-home'>
                <ServingGame team={homeTeam}players={set.players} updateStat={updateStat} />
                <ReceivingGame team={homeTeam} players={set.players} updateStat={updateStat} /> 
              </div>
              <div className='set-opponent'>
                <ServingGame team={awayTeam} players={set.opponents} updateStat={updateOpponentStat} />
                <ReceivingGame team={awayTeam} players={set.opponents} updateStat={updateOpponentStat} /> 
              </div>
            </div>
            <div className='set-side-stats'>
              <div className='set-side-div'>
                <p className='set-side-stat-name'>Unforced Errors</p>
                <div className='set-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{unforcedErrors.playerErrors}</div>
                </div>
                <div className='set-side-inner-div'>
                  <div>Opponent</div>
                  <div>{unforcedErrors.opponentErrors}</div>
                </div>
              </div>
              <div className='set-side-div'>
                <p className='set-side-stat-name'>Scores</p>
                <div className='set-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{scores.homeScore}</div>
                </div>
                <div className='set-side-inner-div'>
                  <div>Opponent</div>
                  <div>{scores.opponentScore}</div>
                </div>

              </div>

              <div className='set-side-div'>
                <p className='set-side-stat-name'>Scoring Efficiency</p>
                <div className='set-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{isNaN(scoringEfficiency.homeEfficiency) ? "n/a" : scoringEfficiency.homeEfficiency + "%"}</div>
                </div>
                <div className='set-side-inner-div'>
                  <div>Opponent</div>
                  <div>{isNaN(scoringEfficiency.opponentEfficiency) ? "n/a" : scoringEfficiency.opponentEfficiency + "%"}</div>
                </div>
              </div>
              <div className='set-side-div'>
                <p className='set-side-stat-name'>Sideout Percentage</p>
                <div className='set-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{isNaN(sideoutPercentage.homeSideoutEfficiency) ? "n/a" : sideoutPercentage.homeSideoutEfficiency + "%"}</div>
                </div>
                <div className='set-side-inner-div'>
                  <div>Opponent</div>
                  <div>{isNaN(sideoutPercentage.opponentSideoutEfficiency) ? "n/a" : sideoutPercentage.opponentSideoutEfficiency + "%"}</div>
                </div>
              </div>
              <div className='set-side-div'>
                <p className='set-side-stat-name'>Point Ratios</p>
                <div className='set-side-inner-div'>
                  <div>FRVBC</div>
                  <div>{isNaN(pointRatios.homePointRatio) ? "n/a" : pointRatios.homePointRatio + "to 1"}</div>
                </div>
                <div className='set-side-inner-div'>
                  <div>Opponent</div>
                  <div>{isNaN(pointRatios.opponentPointRatio) ? "n/a" : pointRatios.opponentPointRatio + "to 1"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Set;
