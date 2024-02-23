// SetContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const SetContext = createContext();

export const SetProvider = ({ children }) => {
    const serveGame = {
        ace: 0,
        block: 0,
        transitionKill: 0,
        serviceError: 0,
        attackError: 0,
        ballHandlingError: 0,
        miscError: 0
    }
    const receiveGame = {
        firstServeKill: 0,
        rallyKill: 0,
        block: 0,
        attackError: 0,
        ballHandlingError: 0,
        miscError: 0
    }

    const defaultPlayers = [
        {name: 'Maci', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'Addie', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'Grace', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'Sam', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'Georgia', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'Karli', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'Kota', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'Mia', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'Kate', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
    ];

    const defaultOpponents = [
        {name: 'OH1', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'OH2', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'M1', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'M2', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'S', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'RS', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
        {name: 'L', stats: {serve: {...serveGame}, receive: {...receiveGame}}},
    ];

    // const [sets, setSets] = useState(Array.from({ length: 5 }, () => ({ players: defaultPlayers, opponents: defaultOpponents })));

    const initialSets = Array.from({ length: 3 }, () => ({ players: defaultPlayers, opponents: defaultOpponents }));

    const [sets, setSets] = useState(() => {
        const storedSets = localStorage.getItem('volleyballSets');
        return storedSets ? JSON.parse(storedSets) : initialSets;
    });

    const updateSet = (setIndex, updatedSet) => {
        setSets(prevSets => {
            const newSets = [...prevSets];
            newSets[setIndex] = updatedSet;
            return newSets;
        });
    };

    const initializeSet = (setIndex, players, opponents) => {
        setSets(prevSets => {
            const newSets = [...prevSets];
            newSets[setIndex] = { players, opponents };
            return newSets;
        });
    };

    useEffect(() => {
        localStorage.setItem('volleyballSets', JSON.stringify(sets));
    }, [sets]);

    const homeStatTotals = (set) => {
        return set.players.reduce((totals, player) => {
          const stat = player.stats;
          totals.serve.totalAces += stat.serve.ace;
          totals.serve.totalBlocks += stat.serve.block;
          totals.serve.totalTrans += stat.serve.transitionKill;
          totals.serve.totalSE += stat.serve.serviceError;
          totals.serve.totalAE += stat.serve.attackError;
          totals.serve.totalBHE += stat.serve.ballHandlingError;
          totals.serve.totalMiscErr += stat.serve.miscError;
          totals.receive.totalFSKs += stat.receive.firstServeKill;
          totals.receive.totalRKs += stat.receive.rallyKill;
          totals.receive.totalBlocks += stat.receive.block;
          totals.receive.totalAE += stat.receive.attackError;
          totals.receive.totalBHE += stat.receive.ballHandlingError;
          totals.receive.totalMiscErr += stat.receive.miscError;
          return totals;
        }, {
          serve: {
            totalAces: 0,
            totalBlocks: 0,
            totalTrans: 0,
            totalSE: 0,
            totalAE: 0,
            totalBHE: 0,
            totalMiscErr: 0,
          },
          receive: {
            totalFSKs: 0,
            totalRKs: 0,
            totalBlocks: 0,
            totalAE: 0,
            totalBHE: 0,
            totalMiscErr: 0,
          }
        });
      };

    const opponentStatTotals = (set) => {
        return set.opponents.reduce((totals, opponent) => {
          const stat = opponent.stats;
          totals.serve.totalAces += stat.serve.ace;
          totals.serve.totalBlocks += stat.serve.block;
          totals.serve.totalTrans += stat.serve.transitionKill;
          totals.serve.totalSE += stat.serve.serviceError;
          totals.serve.totalAE += stat.serve.attackError;
          totals.serve.totalBHE += stat.serve.ballHandlingError;
          totals.serve.totalMiscErr += stat.serve.miscError;
          totals.receive.totalFSKs += stat.receive.firstServeKill;
          totals.receive.totalRKs += stat.receive.rallyKill;
          totals.receive.totalBlocks += stat.receive.block;
          totals.receive.totalAE += stat.receive.attackError;
          totals.receive.totalBHE += stat.receive.ballHandlingError;
          totals.receive.totalMiscErr += stat.receive.miscError;
          return totals;
        }, {
            serve: {
                totalAces: 0,
                totalBlocks: 0,
                totalTrans: 0,
                totalSE: 0,
                totalAE: 0,
                totalBHE: 0,
                totalMiscErr: 0,
              },
              receive: {
                totalFSKs: 0,
                totalRKs: 0,
                totalBlocks: 0,
                totalAE: 0,
                totalBHE: 0,
                totalMiscErr: 0,
              }
        });
      };

    const calculateUnforcedErrors = (set) => {
        let playerErrors = 0;
        let opponentErrors = 0;
        set.players.forEach(player => {
            const stats = player.stats;
            playerErrors +=
                stats.serve.serviceError +
                stats.serve.attackError +
                stats.serve.ballHandlingError +
                stats.serve.miscError +
                stats.receive.attackError +
                stats.receive.ballHandlingError +
                stats.receive.miscError;
        });
        set.opponents.forEach(opponent => {
            const stats = opponent.stats;
            opponentErrors +=
                stats.serve.serviceError +
                stats.serve.attackError +
                stats.serve.ballHandlingError +
                stats.serve.miscError +
                stats.receive.attackError +
                stats.receive.ballHandlingError +
                stats.receive.miscError;
        });
        return {playerErrors, opponentErrors};
    };

    const calculateScores = (set) => {
        let homeScore = 0;
        let opponentScore = 0;
        set.players.forEach(player => {
            const stats = player.stats;
            homeScore +=
                stats.serve.ace + 
                stats.serve.block + 
                stats.serve.transitionKill +
                stats.receive.firstServeKill +
                stats.receive.rallyKill + 
                stats.receive.block
            opponentScore += 
                stats.serve.serviceError + 
                stats.serve.attackError +
                stats.serve.ballHandlingError +
                stats.serve.miscError +
                stats.receive.attackError +
                stats.receive.ballHandlingError +
                stats.receive.miscError;
        });
        set.opponents.forEach(opponent => {
            const stats = opponent.stats;
            opponentScore +=
                stats.serve.ace + 
                stats.serve.block + 
                stats.serve.transitionKill +
                stats.receive.firstServeKill +
                stats.receive.rallyKill + 
                stats.receive.block
            homeScore += 
                stats.serve.serviceError + 
                stats.serve.attackError +
                stats.serve.ballHandlingError +
                stats.serve.miscError +
                stats.receive.attackError +
                stats.receive.ballHandlingError +
                stats.receive.miscError;
        });
        return {homeScore, opponentScore};
    }

    const totalMatchScores = (sets) => {
        let totalHomeScore = 0;
        let totalOpponentScore = 0;
        sets.map(set => {
            totalHomeScore += calculateScores(set).homeScore;
            totalOpponentScore += calculateScores(set).opponentScore;
        })
        return {totalHomeScore: totalHomeScore, totalOpponentScore: totalOpponentScore}
    }

    const pointScoringEfficiency = (set) => {
        const home = homeStatTotals(set)
        const opponent = opponentStatTotals(set)
        let homeEfficiency = ((
            (home.serve.totalAces + home.serve.totalBlocks + home.serve.totalTrans + opponent.receive.totalAE + opponent.receive.totalBHE + opponent.receive.totalMiscErr) / 
            (Object.values(home.serve).reduce((acc, value) => acc + value, 0) + Object.values(opponent.receive).reduce((acc, value) => acc + value, 0))
            ) * 100).toFixed(0)
        let opponentEfficiency = ((
            (opponent.serve.totalAces + opponent.serve.totalBlocks + opponent.serve.totalTrans + home.receive.totalAE + home.receive.totalBHE + home.receive.totalMiscErr) / 
            (Object.values(opponent.serve).reduce((acc, value) => acc + value, 0) + Object.values(home.receive).reduce((acc, value) => acc + value, 0))
            ) * 100).toFixed(0)
        return {homeEfficiency, opponentEfficiency};
    }

    const sideoutEfficiency = (set) => {
        const home = homeStatTotals(set)
        const opponent = opponentStatTotals(set)
        let homeSideoutEfficiency = ((
            (home.receive.totalFSKs + home.receive.totalRKs + home.receive.totalBlocks + opponent.serve.totalAE + opponent.serve.totalBHE + opponent.serve.totalMiscErr) / 
            (opponent.serve.totalAces + opponent.serve.totalBlocks + opponent.serve.totalTrans + opponent.serve.totalAE + opponent.serve.totalBHE + opponent.serve.totalMiscErr + (Object.values(home.receive).reduce((acc, value) => acc + value, 0)))
            ) * 100).toFixed(0)
        let opponentSideoutEfficiency = ((
            (opponent.receive.totalFSKs + opponent.receive.totalRKs + opponent.receive.totalBlocks + home.serve.totalAE + home.serve.totalBHE + home.serve.totalMiscErr) / 
            (home.serve.totalAces + home.serve.totalBlocks + home.serve.totalTrans + home.serve.totalAE + home.serve.totalBHE + home.serve.totalMiscErr + (Object.values(opponent.receive).reduce((acc, value) => acc + value, 0)))
            ) * 100).toFixed(0)
        
        return {homeSideoutEfficiency, opponentSideoutEfficiency};
    }

    const pointRatio = (set) => {
        const home = homeStatTotals(set)
        const opponent = opponentStatTotals(set)
        let homePointRatio = (
            (home.serve.totalAces + home.serve.totalBlocks + home.serve.totalTrans + home.receive.totalFSKs + home.receive.totalRKs + home.receive.totalBlocks) / 
            (calculateUnforcedErrors(set).playerErrors)
        ).toFixed(2)
        let opponentPointRatio = (
            (opponent.serve.totalAces + opponent.serve.totalBlocks + opponent.serve.totalTrans + opponent.receive.totalFSKs + opponent.receive.totalRKs + opponent.receive.totalBlocks) / 
            (calculateUnforcedErrors(set).opponentErrors)
        ).toFixed(2)
        return {homePointRatio, opponentPointRatio}
    }    
    
    const calculatePositivePoints = (set) => {
        const calculatedPositivePlayerPoints = {};
        const calculatedPositiveOpponentPoints = {};

        set.players.forEach((player) => {
            let positivePoints = 0;
            let errors = 0;
            let stats = player.stats;
            positivePoints += 
                stats.serve.ace + 
                stats.serve.block + 
                stats.serve.transitionKill +
                stats.receive.firstServeKill +
                stats.receive.rallyKill + 
                stats.receive.block

            errors +=
                stats.serve.serviceError + 
                stats.serve.attackError +
                stats.serve.ballHandlingError +
                stats.serve.miscError +
                stats.receive.attackError +
                stats.receive.ballHandlingError +
                stats.receive.miscError;
                calculatedPositivePlayerPoints[player.name] = {
                points: positivePoints,
                errors: errors,
            };
        })
        set.opponents.forEach((opponent) => {
            let positivePoints = 0;
            let errors = 0;
            let stats = opponent.stats;
            positivePoints += 
                stats.serve.ace + 
                stats.serve.block + 
                stats.serve.transitionKill +
                stats.receive.firstServeKill +
                stats.receive.rallyKill + 
                stats.receive.block

            errors +=
                stats.serve.serviceError + 
                stats.serve.attackError +
                stats.serve.ballHandlingError +
                stats.serve.miscError +
                stats.receive.attackError +
                stats.receive.ballHandlingError +
                stats.receive.miscError;
                calculatedPositiveOpponentPoints[opponent.name] = {
                points: positivePoints,
                errors: errors,
            };
        })
        return {calculatedPositivePlayerPoints, calculatedPositiveOpponentPoints}
    }

    const accumulateStats = (sets) => {
        const accumulatedPlayerStats = {};
        const accumulatedOpponentStats = {};
        // Iterate over each set
        sets.forEach(set => {
            // Iterate over each player in the set
            set.players.forEach(player => {
                const playerName = player.name;

                // If the player is not already in the accumulatedPlayerStats object, initialize it
                if (!accumulatedPlayerStats[playerName]) {
                    accumulatedPlayerStats[playerName] = {
                        serve: { ...player.stats.serve },
                        receive: { ...player.stats.receive }
                    };
                } else {
                    // If the player is already in the accumulatedPlayerStats object, accumulate the stats
                    accumulatedPlayerStats[playerName].serve.ace += player.stats.serve.ace;
                    accumulatedPlayerStats[playerName].serve.block += player.stats.serve.block;
                    accumulatedPlayerStats[playerName].serve.transitionKill += player.stats.serve.transitionKill;
                    accumulatedPlayerStats[playerName].serve.serviceError += player.stats.serve.serviceError;
                    accumulatedPlayerStats[playerName].serve.attackError += player.stats.serve.attackError;
                    accumulatedPlayerStats[playerName].serve.ballHandlingError += player.stats.serve.ballHandlingError;
                    accumulatedPlayerStats[playerName].serve.miscError += player.stats.serve.miscError;

                    accumulatedPlayerStats[playerName].receive.firstServeKill += player.stats.receive.firstServeKill;
                    accumulatedPlayerStats[playerName].receive.rallyKill += player.stats.receive.rallyKill;
                    accumulatedPlayerStats[playerName].receive.block += player.stats.receive.block;
                    accumulatedPlayerStats[playerName].receive.attackError += player.stats.receive.attackError;
                    accumulatedPlayerStats[playerName].receive.ballHandlingError += player.stats.receive.ballHandlingError;
                    accumulatedPlayerStats[playerName].receive.miscError += player.stats.receive.miscError;
                }
            });
        });
        sets.forEach(set => {
            // Iterate over each player in the set
            set.opponents.forEach(opponent => {
                const opponentName = opponent.name;

                // If the player is not already in the accumulatedPlayerStats object, initialize it
                if (!accumulatedOpponentStats[opponentName]) {
                    accumulatedOpponentStats[opponentName] = {
                        serve: { ...opponent.stats.serve },
                        receive: { ...opponent.stats.receive }
                    };
                } else {
                    // If the opponent is already in the accumulatedopponentStats object, accumulate the stats
                    accumulatedOpponentStats[opponentName].serve.ace += opponent.stats.serve.ace;
                    accumulatedOpponentStats[opponentName].serve.block += opponent.stats.serve.block;
                    accumulatedOpponentStats[opponentName].serve.transitionKill += opponent.stats.serve.transitionKill;
                    accumulatedOpponentStats[opponentName].serve.serviceError += opponent.stats.serve.serviceError;
                    accumulatedOpponentStats[opponentName].serve.attackError += opponent.stats.serve.attackError;
                    accumulatedOpponentStats[opponentName].serve.ballHandlingError += opponent.stats.serve.ballHandlingError;
                    accumulatedOpponentStats[opponentName].serve.miscError += opponent.stats.serve.miscError;

                    accumulatedOpponentStats[opponentName].receive.firstServeKill += opponent.stats.receive.firstServeKill;
                    accumulatedOpponentStats[opponentName].receive.rallyKill += opponent.stats.receive.rallyKill;
                    accumulatedOpponentStats[opponentName].receive.block += opponent.stats.receive.block;
                    accumulatedOpponentStats[opponentName].receive.attackError += opponent.stats.receive.attackError;
                    accumulatedOpponentStats[opponentName].receive.ballHandlingError += opponent.stats.receive.ballHandlingError;
                    accumulatedOpponentStats[opponentName].receive.miscError += opponent.stats.receive.miscError;
                }
            });
        });

        return {accumulatedPlayerStats: accumulatedPlayerStats, accumulatedOpponentStats: accumulatedOpponentStats};
    };

    const matchSetTotals = (sets) => {
        const frvbcServingGame = {
            ace: {},
            block: {},
            trans: {},
            se: {},
            ae: {},
            bhe: {},
            misc: {}
          }
          const frvbcReceivingGame = {
            fsk: {},
            rk: {},
            block: {},
            ae: {},
            bhe: {},
            misc: {}
          }
          const opponentServingGame = {
            ace: {},
            block: {},
            trans: {},
            se: {},
            ae: {},
            bhe: {},
            misc: {}
          }
          const opponentReceivingGame = {
            fsk: {},
            rk: {},
            block: {},
            ae: {},
            bhe: {},
            misc: {}
          }
          sets.forEach((set, idx) => {
            const homeServe = homeStatTotals(set).serve
            const homeReceive = homeStatTotals(set).receive
            const opponentServe = opponentStatTotals(set).serve
            const opponentReceive = opponentStatTotals(set).receive
        
            // frvbcServingGame.ace["Set" + (idx+1)] = homeServe.totalAces
            frvbcServingGame.ace["Set" + (idx+1)] = homeServe.totalAces
            frvbcServingGame.block["Set" + (idx+1)] = homeServe.totalBlocks
            frvbcServingGame.trans["Set" + (idx+1)] = homeServe.totalTrans
            frvbcServingGame.se["Set" + (idx+1)] = homeServe.totalSE
            frvbcServingGame.ae["Set" + (idx+1)] = homeServe.totalAE
            frvbcServingGame.bhe["Set" + (idx+1)] = homeServe.totalBHE
            frvbcServingGame.misc["Set" + (idx+1)] = homeServe.totalMiscErr
            frvbcReceivingGame.fsk["Set" + (idx+1)] = homeReceive.totalFSKs
            frvbcReceivingGame.rk["Set" + (idx+1)] = homeReceive.totalRKs
            frvbcReceivingGame.block["Set" + (idx+1)] = homeReceive.totalBlocks
            frvbcReceivingGame.ae["Set" + (idx+1)] = homeReceive.totalAE
            frvbcReceivingGame.bhe["Set" + (idx+1)] = homeReceive.totalBHE
            frvbcReceivingGame.misc["Set" + (idx+1)] = homeReceive.totalMiscErr
        
            opponentServingGame.ace["Set" + (idx+1)] = opponentServe.totalAces
            opponentServingGame.block["Set" + (idx+1)] = opponentServe.totalBlocks
            opponentServingGame.trans["Set" + (idx+1)] = opponentServe.totalTrans
            opponentServingGame.se["Set" + (idx+1)] = opponentServe.totalSE
            opponentServingGame.ae["Set" + (idx+1)] = opponentServe.totalAE
            opponentServingGame.bhe["Set" + (idx+1)] = opponentServe.totalBHE
            opponentServingGame.misc["Set" + (idx+1)] = opponentServe.totalMiscErr
            opponentReceivingGame.fsk["Set" + (idx+1)] = opponentReceive.totalFSKs
            opponentReceivingGame.rk["Set" + (idx+1)] = opponentReceive.totalRKs
            opponentReceivingGame.block["Set" + (idx+1)] = opponentReceive.totalBlocks
            opponentReceivingGame.ae["Set" + (idx+1)] = opponentReceive.totalAE
            opponentReceivingGame.bhe["Set" + (idx+1)] = opponentReceive.totalBHE
            opponentReceivingGame.misc["Set" + (idx+1)] = opponentReceive.totalMiscErr
          })
        return {
            frvbcServingGame: frvbcServingGame, 
            frvbcReceivingGame: frvbcReceivingGame, 
            opponentServingGame: opponentServingGame, 
            opponentReceivingGame: opponentReceivingGame
        }
    }

    return (
        <SetContext.Provider value={{ 
            sets, 
            updateSet, 
            initializeSet, 
            homeStatTotals,
            opponentStatTotals,
            calculateUnforcedErrors, 
            calculateScores,
            totalMatchScores,
            pointScoringEfficiency,
            sideoutEfficiency,
            pointRatio,
            calculatePositivePoints,
            accumulateStats,
            matchSetTotals,
        }}>
            {children}
        </SetContext.Provider>
    );
};

export const useSet = () => useContext(SetContext);
