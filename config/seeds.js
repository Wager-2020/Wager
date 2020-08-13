const Message = require("../models/Message");
const Wager = require("../models/Wager");
const User = require("../models/User");
const Bet = require("../models/Bet");
const mongoose = require("mongoose");
const faker = require("faker");
// const { getSportOdds } = require("../api_util/odds_api_util");

const NUM_USERS = 10;
const NUM_MESSAGES_PER_USER = 5;
const NUM_BETS_PER_USER = 5;
const AMOUNT_BET_RANGE = 100;
const NUM_WAGERS = 5;

const DEFAULT_PARAMS = {
  numBetsPerUser: NUM_BETS_PER_USER,
  numMessagesPerUser: NUM_MESSAGES_PER_USER,
  numUsers: NUM_USERS,
  amountBetRange: AMOUNT_BET_RANGE,
  numWagers: NUM_WAGERS,
};


//  { title, description, karma_points, due_date, wager_choices }
// const BASEBALL_API = getSportOdds("baseball_mlb");
const WAGERS = [
  // {
  //   title: BASEBALL_API[0].teams.join("vs");
  // }
  {
    title: "2020 Presidentail Election",
    description: "Joe Biden and Donald Trump will face off in the most highly contested election of our lifetimes  Choose your preferred canddiated.",
    due_date: "2020-12-31",
    wager_choices: [
      { option:"Joe Biden" , winner: true}, 
      { option:"Donald Trump" }
    ]
  },
  
  {
    title: "Daniel Cormier vs Stipe Miocic: UFC 252 Sat Aug 15th",
    description: "Choose between two of the greatest heavyweight champions of all time as they square off for a third time, the triology will be settled this Saturday.",
    due_date: "2020-08-15",
    wager_choices: [
      { option:"Daniel Cormier" }, 
      { option:"Stipe Miocic" }, 
    ]
  },
  
  {
    title: "NY Yankees vs Boston Red Sox",
    description: "The Yankees and Red Sox will be playing in NY August 15th",
    due_date: "2020-08-15",
    wager_choices: [
      { option: "NY Yankees" }, 
      { option: "Boston Red Sox" }, 
    ]
  },

  {
    title: "Atlanta Braves vs New York Yankees",
    description: "Atlanta heads to NY to face off against the bronx bombers",
    due_date: "2020-08-11",
    wager_choices: [
      { option:"Atlanta Braves" }, 
      { option: "New York Yankees", winner: true }
    ] 
  },
  
  {
    title: "Sean O'Malley vs Marlon Vera",
    description: "Undefeated Sean O'Malley (12-0-0) faces off against battle tested Marlon Vera (15-6-1)",
    due_date: "2020-08-11",
    wager_choices: [
      { option: "Sean O'Malley" },
      { option: "Marlon Vera" },
     ]
  },

  {
    title: "OKC Thunder vs LA Clippers",
    description: "The OKC Thunder will be heading to LA to face the Clippers this Friday",
    due_date: "2020-08-14",
    wager_choices: [{
        option: "OKC Thunder"
      },
      {
        option: "LA Clippers"
      },
    ]
  }
];

const reset = async () => {
  await Message.deleteMany({});
  await Wager.deleteMany({});
  await Bet.deleteMany({});
  // await User.deleteMany({});
}

const seed = async (params = DEFAULT_PARAMS) => {
  const { numMessagesPerUser, numUsers, numBetsPerUser, amountBetRange } = params;
  await reset();
  let wagers = await Wager.insertMany(WAGERS);
  let messages = [];
  let bets = [];
  let users = await User.find({});


  for (let i = 0; i < users.length; i++) {
    // const user = new User({
    //   handle: faker.internet.userName,
    //   email: faker.internet.email,
    //   password: "password"
    // });

    for (let msgIter = 0; msgIter < numMessagesPerUser; msgIter++) {
      const message = new Message({
        user: users[i]._id,
        body: faker.lorem.sentence(),
      });
      
      messages.push(message);
    }


    for (let betIter = 0; betIter < numBetsPerUser; betIter++) {
      const wagerIdx = Math.ceil(Math.random() * wagers.length * 2.0) % WAGERS.length;

      const randomWager = wagers[wagerIdx];
      const randomWagerId = randomWager._id
      const randomAmountBet = Math.random() * AMOUNT_BET_RANGE;
      
      const choices = randomWager.wager_choices;

      const numChoices = choices.length;
      const choiceIdx = Math.ceil(Math.random() * numChoices * 2.0) % numChoices;
      const randomChoice = choices[choiceIdx];
      
      const bet = new Bet({
        user: users[i]._id,
        wager: randomWagerId,
        amount_bet: randomAmountBet,
        option: randomChoice.option
      });

      bets.push(bet);
    } 
    
  }

  // await Message.insertMany(messages);
  // await Bet.insertMany(bets);
}

module.exports = {
  reset,
  seed,
}