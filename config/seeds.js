const Message = require("../models/Message");
const Wager = require("../models/Wager");
const User = require("../models/User");
const Bet = require("../models/Bet");
const mongoose = require("mongoose");
const faker = require("faker");

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
const WAGERS = [
  {
    title: "Rain in Botswana",
    description: "There will be more than 100 inches of rain this month in Botswana.",
    karma_points: 5000,
    due_date: "2020-12-31",
    wager_choices: ["Yay", "Nay"]
  },
  
  {
    title: "Sparrow Flight Velocity",
    description: "What is the flight velocity of a sparrow?",
    karma_points: 3000,
    due_date: "2020-12-31",
    wager_choices: ["Over 10 m/s", "Under 10 m/s", "African or European"]
  },
  
  {
    title: "Sports: OH YEAH",
    description: "Who will win at ball sport?",
    karma_points: 10000,
    due_date: "2020-12-31",
    wager_choices: ["That team I like", "That team I don't like", "What is ball?"]
  },

  {
    title: "Politics: EKH",
    description: "Who will win at election?",
    karma_points: 15000,
    due_date: "2020-12-31",
    wager_choices: ["The elephant person", "The ass"]
  },
  
  {
    title: "Peter Sucks Eggs",
    description: "How many eggs can Peter suck?",
    karma_points: 15000,
    due_date: "2020-12-31",
    wager_choices: ["So many", "A lot", "Too many to count"]
  },
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


  for (let i = 0; i < numUsers; i++) {
    // const user = new User({
    //   handle: faker.internet.userName,
    //   email: faker.internet.email,
    //   password: "password"
    // });

    for (let msgIter = 0; msgIter < numMessagesPerUser; msgIter++) {
      const message = new Message({
        user: "5f329e875b2e14b5eb00c459",
        body: faker.lorem.sentence(),
      });
      
      messages.push(message);
    }


    for (let betIter = 0; betIter < numBetsPerUser; betIter++) {
      const wagerIdx = Math.ceil(Math.random() * wagers.length * 2.0) % WAGERS.length;

      const randomWager = wagers[wagerIdx];
      const randomWagerId = randomWager._id
      const randomAmountBet = Math.random() * AMOUNT_BET_RANGE;
      
      const options = randomWager.wager_choices;

      const numOptions = options.length;
      const optionIdx = Math.ceil(Math.random() * numOptions * 2.0) % numOptions;
      const randomOption = options[optionIdx];
      
      const bet = new Bet({
        wager: randomWagerId,
        amount_bet: randomAmountBet,
        option: randomOption
      });

      bets.push(bet);
    } 
    
  }

  await Message.insertMany(messages);
  await Bet.insertMany(bets);
}

module.exports = {
  reset,
  seed
}