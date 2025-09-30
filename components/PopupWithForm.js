import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupInputs = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};

    this._popupInputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        const values = this._getInputValues();
        evt.preventDefault();
        this._handleFormSubmit(values);
      });
  }
}
