import Drug, { MAX_DRUG_BENEFIT, MIN_DRUG_BENEFIT } from "../models/drug";
import { InvalidArgumentException } from "../models/errors";

describe("Drug", () => {
  let drug;

  beforeEach(() => {
    drug = new Drug("test", 2, 3);
  });

  it(`should not have a benefit lower than ${MIN_DRUG_BENEFIT}`, () => {
    drug.benefit = MIN_DRUG_BENEFIT - 1;
    expect(drug.benefit).toEqual(MIN_DRUG_BENEFIT);
  });

  it(`should not have a benefit higher than ${MAX_DRUG_BENEFIT}`, () => {
    drug.benefit = MAX_DRUG_BENEFIT + 1;
    expect(drug.benefit).toEqual(MAX_DRUG_BENEFIT);
  });

  it(`should throw error if try to set benefit to non-integer`, () => {
    const setFloatBenefit = drug => {
      drug.benefit = 1.2;
    };
    expect(() => setFloatBenefit(drug)).toThrow(InvalidArgumentException);
  });
});
