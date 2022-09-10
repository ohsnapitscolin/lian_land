import React from "react";
import Machine from "./tides/machine";

import { TimeOfDay, Season } from "../constants/tides";

const CustomHero = () => {
  return <Machine timeOfDay={TimeOfDay.Evening} season={Season.Spring} />;
};

export default CustomHero;
