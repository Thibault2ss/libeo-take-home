export default class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  /**
   * Daily update to pharmacy's drugs characteristics
   * @param drugProperties: decay properties of all non-default drugs in store.
   */
  updateBenefitValue(drugProperties) {
    this.drugs.forEach(drug => {
      const properties = drugProperties[drug.name] || drugProperties.default;
      drug.expiresIn += properties.expirationDecay;
      drug.benefit += properties.benefitDecay(drug.expiresIn, drug.benefit);
    });
    return this.drugs;
  }
}
