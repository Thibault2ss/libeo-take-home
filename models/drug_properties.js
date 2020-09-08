export default class DrugProperties {
  /**
   * @param expirationDecay: number of days added to the 'expiresIn' after 1 day
   * @param benefitDecay: function taking @param expiresIn, @param currentBenefit to @returns number
   * of benefits added to the drug benefits after 1 day
   */
  constructor({ expirationDecay, benefitDecay }) {
    this._expirationDecay = expirationDecay;
    this._benefitDecay = benefitDecay;
  }

  get expirationDecay() {
    return this._expirationDecay;
  }

  get benefitDecay() {
    return this._benefitDecay;
  }
}
