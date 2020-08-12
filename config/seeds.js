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
    due_date: "2020-12-31",
    wager_choices: [
      { option:"Yay" , winner: true}, 
      { option:"Nay" }
    ]
  },
  
  {
    title: "Sparrow Flight Velocity",
    description: "What is the flight velocity of a sparrow?",
    due_date: "2000-05-31",
    wager_choices: [
      { option:"Over 10 m/s", winner: true }, 
      { option:"Under 10 m/s" }, 
      { option:"African or European" }
    ]
  },
  
  {
    title: "Sports: OH YEAH",
    description: "Who will win at ball sport?",
    due_date: "2001-11-31",
    wager_choices: [
      { option: "That team I like" }, 
      { option: "That team I don't like", winner: true }, 
      { option: "What is ball?" }
    ]
  },

  {
    title: "Politics: EKH",
    description: "Who will win at election?",
    due_date: "2030-06-31",
    wager_choices: [
      { option:"The elephant person" }, 
      { option: "The ass", winner: true }
    ] 
  },
  
  {
    title: "Peter Sucks Eggs",
    description: "How many eggs can Peter suck?",
    due_date: "1990-12-01",
    wager_choices: [
      { option: "So many" },
      { option: "Too many to count", winner: true },
     ]
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
  let users = await User.find();


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

  await Message.insertMany(messages);
  await Bet.insertMany(bets);
}

module.exports = {
  reset,
  seed,
}