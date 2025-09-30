import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/ToDoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
// const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

const todosList = document.querySelector(".todos__list");
const todoCount = new TodoCounter(initialTodos, ".counter__text");
function handleCheck(completed) {
  todoCount.updateCompleted(completed);
}
function handleDelete(completed) {
  if (completed) {
    todoCount.updateCompleted(false);
  }
  todoCount.updateTotal();
}
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    console.log("submit");

    const nameInput = values.name;
    const dateInput = values.date;
    console.log(nameInput, dateInput);

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    // const values = { name, date, id, completed: false };
    const todo = generateTodo(values);
    section.addItem(todo);
    //todosList.append(todo); //used addItem() instead -line above^
    // closeModal(addTodoPopupEl);
    addTodoPopup.close();
    todoValidator.resetValidation();
    todoCount.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

// The logic in this function should all be handled in the Todo class.
const generateTodo = (todoData) => {
  const todo = new Todo(todoData, `#todo-template`, handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },

  containerSelector: ".todos__list",
});
section.renderItems();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
//   modal.keyDownHandler = escapeKeyHandler(modal);
//   window.addEventListener("keydown", modal.keyDownHandler);
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
//   window.removeEventListener("keydown", modal.keyDownHandler);
// };

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   closeModal(addTodoPopupEl);
// });

// function escapeKeyHandler(modalToClose) {
//   return function (evt) {
//     if (evt.key === "Escape") {
//       closeModal(modalToClose);
//     }
//   };
// }

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();

//   const values = { name, date, id, completed: false };
//   const todo = generateTodo(values);
//   section.addItem(todo);
//   todosList.append(todo); //use addItem() instead
//   // closeModal(addTodoPopupEl);
//   todoValidator.resetValidation();
// });

const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();
