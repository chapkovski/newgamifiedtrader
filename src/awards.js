const awards = [
  {
    name: "bronze",
    lock: true,
    locked: require("@/assets/bronze_locked.png"),
    unlocked: require("@/assets/bronze.png"),
    message: "Level up! Doing well 👍",
    gif: require("@/assets/bronze.gif"),
  },

  {
    name: "silver",
    lock: true,
    locked: require("@/assets/silver_locked.png"),
    unlocked: require("@/assets/silver.png"),
    message: "You belong on the trading floor! 📈",
    gif: require("@/assets/silver.gif"),
  },
  {
    name: "gold",
    lock: true,
    locked: require("@/assets/gold_locked.png"),
    unlocked: require("@/assets/gold.png"),
    message: "You are the money maker! 💰",
    gif: require("@/assets/gold.gif"),
  },

  {
    name: "platinum",
    lock: true,
    locked: require("@/assets/platinum_locked.png"),
    unlocked: require("@/assets/platinum.png"),
    message: "You are definitely going places! 👐",
    gif: require("@/assets/platinum.gif"),
  },
  {
    name: "diamond",
    lock: true,
    locked: require("@/assets/diamond_locked.png"),
    unlocked: require("@/assets/diamond.png"),
    message: "The Wolf of Wall Street  ☝️",
    gif: require("@/assets/diamond.gif"),
  },
];
export default awards;
