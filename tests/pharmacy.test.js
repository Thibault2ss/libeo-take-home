import Pharmacy from "../models/pharmacy";
import Drug, { MIN_DRUG_BENEFIT, MAX_DRUG_BENEFIT } from "../models/drug";
import drugTypes from "../constants/drug_types";
import drugProperties from "../constants/drug_properties";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn of 1", () => {
    const drugs = [new Drug("test", 2, 3)];
    const pharmacy = new Pharmacy(drugs);
    pharmacy.updateBenefitValue(drugProperties);
    const expected = [new Drug("test", 1, 2)];
    expect(pharmacy.drugs).toEqual(expected);
  });

  it(`should decrease expiresIn, and decrease benefit until reaches minimum of ${MIN_DRUG_BENEFIT}`, () => {
    const drugs = [new Drug("test", MIN_DRUG_BENEFIT, MIN_DRUG_BENEFIT)];
    const pharmacy = new Pharmacy(drugs);
    for (let i = 0; i < MIN_DRUG_BENEFIT + 1; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    const expected = [new Drug("test", -1, MIN_DRUG_BENEFIT)];
    expect(pharmacy.drugs).toEqual(expected);
  });

  it(`should decrease expiresIn, and increase benefit until reaches maximum of ${MAX_DRUG_BENEFIT}`, () => {
    const drugs = [new Drug(drugTypes.HERBAL_TEA, MAX_DRUG_BENEFIT, 0)];
    const pharmacy = new Pharmacy(drugs);
    for (let i = 0; i < MAX_DRUG_BENEFIT + 1; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    const expected = [new Drug(drugTypes.HERBAL_TEA, -1, MAX_DRUG_BENEFIT)];
    expect(pharmacy.drugs).toEqual(expected);
  });

  it("should decrease twice after expiration", () => {
    const drugs = [new Drug("test", 1, 10)];
    const pharmacy = new Pharmacy(drugs);
    const iterations = 2;
    for (let i = 0; i < iterations; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    const expected = [new Drug("test", -1, 7)];
    expect(pharmacy.drugs).toEqual(expected);
  });

  it("Herbal Tea Drug benefit should increase of 1, then 2 after expiration", () => {
    const drugs = [new Drug(drugTypes.HERBAL_TEA, 1, 10)];
    const pharmacy = new Pharmacy(drugs);
    pharmacy.updateBenefitValue(drugProperties);
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.HERBAL_TEA, 0, 11)]);
    pharmacy.updateBenefitValue(drugProperties);
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.HERBAL_TEA, -1, 13)]);
  });

  it("Magic Pill should never decay nor age", () => {
    const drugs = [new Drug(drugTypes.MAGIC_PILL, 1, 10)];
    const pharmacy = new Pharmacy(drugs);
    pharmacy.updateBenefitValue(drugProperties);
    const iterations = 30;
    for (let i = 0; i < iterations; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    const expected = [new Drug(drugTypes.MAGIC_PILL, 1, 10)];
    expect(pharmacy.drugs).toEqual(expected);
  });

  it("Fervex increases benefit by 1, then 2 (10 day before expires), by 3 (5 days before expires), then drops to 0 forever", () => {
    const drugs = [new Drug(drugTypes.FERVEX, 12, 0)];
    const pharmacy = new Pharmacy(drugs);
    pharmacy.updateBenefitValue(drugProperties);
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.FERVEX, 11, 1)]);
    for (let i = 0; i < 5; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.FERVEX, 6, 11)]);
    for (let i = 5; i < 11; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.FERVEX, 0, 29)]);
    pharmacy.updateBenefitValue(drugProperties);
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.FERVEX, -1, 0)]);
    for (let i = 0; i < 5; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.FERVEX, -6, 0)]);
  });

  it("Dafalgan degrades in Benefit twice as fast as normal drugs", () => {
    const drugs = [new Drug(drugTypes.DAFALGAN, 2, 20)];
    const pharmacy = new Pharmacy(drugs);
    for (let i = 0; i < 2; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.DAFALGAN, 0, 16)]);
    for (let i = 0; i < 2; i++) {
      pharmacy.updateBenefitValue(drugProperties);
    }
    expect(pharmacy.drugs).toEqual([new Drug(drugTypes.DAFALGAN, -2, 8)]);
  });
});
