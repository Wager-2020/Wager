const express = require("express");
const router = express.Router();
const validateWager = require("../../validation/wager");
const Wager = require("../../models/Wager");
const mongoose = require("mongoose");
const merge = require("lodash").merge; 

/**
 * POST a message /messages
 * GET n messages /messages
 * POST a message in a group /messages/groups/:group_id
 * GET n messages from a group /messages/groups/:group_d
 */