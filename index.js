import { Drug, Pharmacy } from "./pharmacy";
import drugTypes from "./constants/drug_types";

import fs from "fs";

const drugs = [
  new Drug(drugTypes.DOLIPRANE, 20, 30),
  new Drug(drugTypes.HERBAL_TEA, 10, 5),
  new Drug(drugTypes.FERVEX, 5, 40),
  new Drug(drugTypes.MAGIC_PILL, 15, 40),
  new Drug(drugTypes.DAFALGAN, 15, 20)
];
const trial = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.stringify(trial.updateBenefitValue()));
}

/* eslint-disable no-console */
fs.writeFile("output.txt", log, err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
