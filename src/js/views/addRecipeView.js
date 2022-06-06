import View from "./View.js";
import helpers from "../helpers.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _message = "Recipe was succesfully uploaded!";
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  constructor() {
    super();
    this._showWindow();
    this._closeWindow();
  }

  showWindow() {
    this._renderForm();
    helpers.showElement(this._overlay, this._window);
  }

  closeWindow() {
    helpers.hideElement(this._overlay, this._window);
  }

  _generateFormMarkup() {
    return `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input placeholder= "Pinapple Pizza" required name="title" type="text" />
          <label>URL</label>
          <input placeholder= "https://example.com" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input placeholder= "https://example.com" required name="image" type="text" />
          <label>Publisher</label>
          <input placeholder= "Omar Alhasan" required name="publisher" type="text" />
          <label>Prep time</label>
          <input placeholder="10 Minutes" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input placeholder="10 People" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>    
    `;
  }

  _renderForm() {
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", this._generateFormMarkup());
  }

  _showWindow() {
    this._btnOpen.addEventListener("click", this.showWindow.bind(this));
  }

  _closeWindow() {
    this._btnClose.addEventListener("click", this.closeWindow.bind(this));
    this._overlay.addEventListener("click", this.closeWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }
}

export default new AddRecipeView();
