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

gambling api
data on [sports] event outcomes

sports
politics

https://betdata.io/about
https://docs.smarkets.com/#/sessions
https://the-odds-api.com/liveapi/guides/v3/#overview
https://www.betfair.com.au/hub/us-election-odds/ 
https://rapidapi.com/therundown/api/therundown

https://oddsapi.io/

1. Initial odds are decided when wager is created

  OPTION A (Have the user decide)
  OPTION B (Pull initial odds from API)

2. Initial total bets on a SINGLE OPTION is calculated by
    multiplying probability of it occuring by total_karma for the wager. 

    EXAMPLE: 
    1. We arbitrarily set `total_karma` (starting karma) for a wager equal to
    1000. If there are TWO options for said wager and they each have odds of 50% and 50% respectively, the `total_bets` for each option become 500 and 500 when the wager is initialized. (1000 * 50% = 500).

    2. When a user bets on the first option for 100 karma, the `total_karma` for the wager increases by 100 to 1100 (1000 + 100 = 1100), and the `total_bets` for the first option increases to 600 (500 + 100 = 600). 

    3. Because there's now 1100 karma in the "pool" for the wager, 600 karma bet on option 1 and 500 bet on option 2, the `probability` of each `wager_choices` subdocument change as follows...
      probability Option 1: 600 / 1100  = 54.5454% (.545454)
      probability Option 2: 500 / 1100 = 45.4545% (.454545)


### STEPS TO IMPLEMENT ROLLING ODDS

1. Make sure wagers are initialized with the same n-thousand points under `karma_points`.

2. Add a `total_karma_per_choice` to the schema of the `wager_choices` subdocument

3. Make sure `wager_choices` are initialized with `total_karma_per_choice` set to their  respective wager's `karma_points * probability` (i.e. a share of the  `karma_points` of the wager proportional to the `probability` of that choice).

4. In `routes/api/bets.js`, make it so that whenever a user places a bet for     `amount_bet = n`, the `karma_points` and `total_karma_per_choice` of the parent wager and `wager_choices` subdocument respectively are also incremented by n (i.e. `wager.karma_points += n`, `wager_choice.total_karma_per_choice += n`). 

5. Additionally, make sure that all of the probabilities of the `wager_choices` subdocuments within that respective wager are recalculated, such that 
`wager_choice.probability = wager_choice.total_karma_per_choice / wager.total_karma`.

6. At this point, odds can be said to be "rolling" because they change as users make bets. I'm open to other methods of implementation. Specifically, I think we could forget about keeping track of `karma_points` (i.e. the initial n-thousand karma + all the other bets placed on it) by just summing the `total_karma_per_choice` for each of the respective `wager_choices`. I think this feature is important because (1) as it stands, we aren't really doing much with odds, and this is kind of just a neat show-off feature that seperates it from a CRUD app slightly, (2) it will make it so when user's generate personal bets, there's infrastructure in place for keeping track of their wagers' odds over time, (3) it allows us to generate our own data, rather than relying soley on the external API. 