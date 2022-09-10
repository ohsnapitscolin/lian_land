export const Season = {
  Spring: "spring",
  Summer: "summer",
  Fall: "fall",
  Winter: "winter",
};

export const TimeOfDay = {
  Morning: "morning",
  Day: "day",
  Evening: "evening",
  Night: "night",
};

export const BackgroundGradient = {
  [TimeOfDay.Morning]: {
    [Season.Spring]: [
      [251, 244, 162],
      [193, 199, 134],
    ],
    [Season.Summer]: [
      [243, 243, 213],
      [197, 150, 131],
    ],
    [Season.Fall]: [
      [243, 243, 213],
      [204, 134, 93],
    ],
    [Season.Winter]: [
      [191, 225, 212],
      [49, 134, 156],
    ],
  },
  [TimeOfDay.Day]: {
    [Season.Spring]: [
      [249, 241, 160],
      [243, 243, 213],
    ],
    [Season.Summer]: [
      [223, 198, 195],
      [243, 243, 213],
    ],
    [Season.Fall]: [
      [214, 160, 138],
      [243, 243, 213],
    ],
    [Season.Winter]: [
      [107, 190, 193],
      [243, 243, 213],
    ],
  },
  [TimeOfDay.Evening]: {
    [Season.Spring]: [
      [151, 155, 83],
      [179, 221, 198],
    ],
    [Season.Summer]: [
      [215, 169, 150],
      [179, 221, 198],
    ],
    [Season.Fall]: [
      [208, 144, 107],
      [179, 221, 198],
    ],
    [Season.Winter]: [
      [144, 143, 190],
      [160, 209, 212],
    ],
  },
  [TimeOfDay.Night]: {
    [Season.Spring]: [
      [0, 0, 0],
      [141, 141, 139],
    ],
    [Season.Summer]: [
      [0, 0, 0],
      [152, 128, 127],
    ],
    [Season.Fall]: [
      [0, 0, 0],
      [147, 122, 108],
    ],
    [Season.Winter]: [
      [0, 0, 0],
      [141, 141, 139],
    ],
  },
};

export const TideGradient = {
  [TimeOfDay.Morning]: {
    [Season.Spring]: [
      [1, 29, 65],
      [7, 141, 184],
      [249, 249, 203],
    ],
    [Season.Summer]: [
      [1, 29, 65],
      [7, 141, 184],
      [249, 249, 203],
    ],
    [Season.Fall]: [
      [1, 29, 65],
      [7, 141, 184],
      [249, 249, 203],
    ],
    [Season.Winter]: [
      [1, 29, 65],
      [7, 141, 184],
      [249, 249, 203],
    ],
  },
  [TimeOfDay.Day]: {
    [Season.Spring]: [
      [1, 29, 65],
      [7, 141, 184],
      [249, 226, 226],
    ],
    [Season.Summer]: [
      [1, 29, 65],
      [7, 141, 184],
      [204, 251, 229],
    ],
    [Season.Fall]: [
      [1, 29, 65],
      [7, 141, 184],
      [247, 242, 179],
    ],
    [Season.Winter]: [
      [1, 29, 65],
      [7, 141, 184],
      [255, 255, 255],
    ],
  },
  [TimeOfDay.Evening]: {
    [Season.Spring]: [
      [1, 29, 65],
      [1, 83, 115],
      [164, 196, 185],
    ],
    [Season.Summer]: [
      [1, 29, 65],
      [1, 83, 115],
      [164, 196, 185],
    ],
    [Season.Fall]: [
      [1, 29, 65],
      [1, 83, 115],
      [164, 196, 185],
    ],
    [Season.Winter]: [
      [1, 29, 65],
      [1, 83, 115],
      [164, 196, 185],
    ],
  },
  [TimeOfDay.Night]: {
    [Season.Spring]: [
      [1, 29, 65],
      [1, 83, 115],
      [155, 155, 113],
    ],
    [Season.Summer]: [
      [1, 29, 65],
      [1, 83, 115],
      [200, 166, 166],
    ],
    [Season.Fall]: [
      [1, 29, 65],
      [1, 83, 115],
      [134, 96, 88],
    ],
    [Season.Winter]: [
      [1, 29, 65],
      [1, 83, 115],
      [149, 130, 174],
    ],
  },
};
