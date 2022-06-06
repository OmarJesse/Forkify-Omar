import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import helpers from "./helpers.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    //render results and pages
    controlPagination();
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage = 1) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  try {
    if (model.state.recipe.bookmarked) model.removeBookmark(model.state.recipe.id);
    else model.addBookmark(model.state.recipe);
    recipeView.update(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    bookmarksView.renderError();
  }
};

const controlRenderBookmark = function () {
  try {
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    bookmarksView.renderError();
  }
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    await helpers.wait(MODAL_CLOSE_SEC).then(() => addRecipeView.closeWindow());
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRenderBookmark(controlRenderBookmark);
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
