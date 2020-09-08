import DrugProperties from "../models/drug_properties";
import { InvalidArgumentException } from "../models/errors";

describe("DrugProperties", () => {
  it(`should throw error if try to instanciate a drug Property with bad arguments`, () => {
    let initDrug = () => new DrugProperties({});
    expect(() => initDrug()).toThrow(InvalidArgumentException);

    initDrug = () => {
      return new DrugProperties({
        expirationDecay: "1",
        benefitDecay: () => 0
      });
    };
    expect(() => initDrug()).toThrow(InvalidArgumentException);

    initDrug = () => {
      return new DrugProperties({
        expirationDecay: 0,
        benefitDecay: 1
      });
    };
    expect(() => initDrug()).toThrow(InvalidArgumentException);
  });
});
