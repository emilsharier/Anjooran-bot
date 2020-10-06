const mongoUtil = require("../DB/db");
const uniqid = require("uniqid");

const db = mongoUtil.getDB();

const add = async (link, message) => {
  try {
    // console.log(`msg : ${link}`);
    // console.log(`args : ${message}`);
    const obj = {
      id: uniqid(),
      link: link,
      message: message,
    };
    console.log("adding");
    await db.collection("Messages").insertOne(obj);
  } catch (ex) {}
};

module.exports = { add };
