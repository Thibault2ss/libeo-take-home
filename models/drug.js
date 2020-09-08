import { InvalidArgumentException } from "./errors";

export const MIN_DRUG_BENEFIT = 0;
export const MAX_DRUG_BENEFIT = 50;

export default class Drug {
  constructor(name, expiresIn, benefit) {
    this._name = name;
    this._expiresIn = expiresIn;
    this._benefit = benefit;
  }

  get name() {
    return this._name;
  }

  get expiresIn() {
    return this._expiresIn;
  }

  set expiresIn(value) {
    this._expiresIn = value;
  }

  get benefit() {
    return this._benefit;
  }

  set benefit(value) {
    if (!Number.isInteger(value))
      throw new InvalidArgumentException("benefit arg requires a number");

    this._benefit = Math.max(
      MIN_DRUG_BENEFIT,
      Math.min(MAX_DRUG_BENEFIT, value)
    );
  }
}
