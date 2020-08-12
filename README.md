# Wager

Our super sick README...Until it is complete, it shall contain this photo of a baby hippo.

![babyhippo](https://i.pinimg.com/originals/be/12/3b/be123b5eb809680ed59a9e7123b93daa.jpg)

* How to deliver and calculate stats for data visualization
  * Add extra columns in a mongoose request
  * Count total bets where amount_won > 0 and divide by total bets 
    (i.e. win-rate)
  * Calculate a summation of all amount_won for a given user
    (i.e. lifetime earnings)
* External APIs working
* Rolling Odds
* Groups

selectUserStats(userId, state) {
  const user = state.entities.users[userId];
  const wagers = state.entities.wagers;
  let numWins = 0;
  let numLosses = 0;
  Object.values(user.bets).forEach(bet => {
    let wager = wagers[bet.wager];
    if (wager.expired && (bet.amount_won > 0)) {
      numWins++;
    } else if (wage.expired && (bet.amount_won === 0)) {
      numLosses++;
    }
  });
  return { numWins, 
          numLosses, 
          winRatio: numWins/(numWins + numLosses),
          lifeTimeEarnings: 
          numPendingBets: user.bets.length - (numWins + numLosses)
          };
}