import { InvalidArgumentException } from "./errors";

export default class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue(drugProperties) {
    if (!drugProperties)
      throw new InvalidArgumentException(
        "updateBenefitValue needs drug properties"
      );
    if (!drugProperties.default)
      throw new InvalidArgumentException(
        "Drug Properties need a 'default' property"
      );
    this.drugs.forEach(drug => {
      const properties = drugProperties[drug.name] || drugProperties.default;
      drug.expiresIn += properties.expirationDecay;
      drug.benefit += properties.benefitDecay(drug.expiresIn, drug.benefit);
    });
    return this.drugs;
  }
}
