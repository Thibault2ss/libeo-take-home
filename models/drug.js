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
    this._benefit = value;
  }
}
