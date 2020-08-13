const SORT_BY_EARNINGS = "SORT_BY_EARNINGS";
const SORT_BY_NUM_WINS = "SORT_BY_NUM_WINS";
const SORT_BY_NUM_LOSSES = "SORT_BY_NUM_LOSSES";
const SORT_BY_NUM_BETS_PLACED = "SORT_BY_NUM_BETS_PLACED";

const sortUsersByEarnings = (users) => {
  return users.sort((userA, userB) => {
    return userB.totalEarnings - userA.totalEarnings;
  });
}

const sortUsersByNumWins = (users) => {
  return users.sort((userA, userB) => {
    return userB.numWins - userA.numWins;
  });
}
const sortUsersByNumBetsPlaced = (users) => {
  return users.sort((userA, userB) => {
    const numA = userA.numWins + userA.numLosses + userA.numPending;
    const numB = userB.numWins + userB.numLosses + userB.numPending;
    return numB - numA;
  });
}
const sortUsersByNumLosses = (users) => {
  return users.sort((userA, userB) => {
    return userB.numLosses - userA.numLosses;
  });
}



const sortUsers = (users, sortMethod = SORT_BY_EARNINGS) => {
  switch (sortMethod) {
    case SORT_BY_EARNINGS:
      return sortUsersByEarnings(users);
    case SORT_BY_NUM_WINS:
      return sortUsersByNumWins(users);
    case SORT_BY_NUM_LOSSES:
      return sortUsersByNumLosses(users);
    case SORT_BY_NUM_BETS_PLACED:
      return sortUsersByNumBetsPlaced(users);
    default:
      return sortUsersByEarnings(users);
  }
}

module.exports = {
  sortUsers,
  SORT_BY_EARNINGS: SORT_BY_EARNINGS,
  SORT_BY_NUM_WINS: SORT_BY_NUM_WINS,
  SORT_BY_NUM_LOSSES: SORT_BY_NUM_LOSSES,
  SORT_BY_NUM_BETS_PLACED: SORT_BY_NUM_BETS_PLACED
}