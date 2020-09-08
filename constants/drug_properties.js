import DrugProperties from "../models/drug_properties";
import drugTypes from "./drug_types";

const defaultProperties = new DrugProperties({
  expirationDecay: -1,
  benefitDecay: expiresIn => (expiresIn < 0 ? -2 : -1)
});

const herbalTea = new DrugProperties({
  expirationDecay: -1,
  benefitDecay: expiresIn => (expiresIn < 0 ? 2 : 1)
});

const fervex = new DrugProperties({
  expirationDecay: -1,
  benefitDecay: (expiresIn, currentBenefit) =>
    expiresIn < 0
      ? -currentBenefit
      : expiresIn <= 5
      ? 3
      : expiresIn <= 10
      ? 2
      : 1
});

const magicPill = new DrugProperties({
  expirationDecay: 0,
  benefitDecay: () => 0
});

const dafalgan = new DrugProperties({
  expirationDecay: -1,
  benefitDecay: expiresIn => 2 * (expiresIn < 0 ? -2 : -1)
});

export default {
  default: defaultProperties,
  [drugTypes.HERBAL_TEA]: herbalTea,
  [drugTypes.FERVEX]: fervex,
  [drugTypes.MAGIC_PILL]: magicPill,
  [drugTypes.DAFALGAN]: dafalgan
};
