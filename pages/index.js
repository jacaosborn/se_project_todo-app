import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCount = new TodoCounter(initialTodos, ".counter__text");
function handleCheck(completed) {
  todoCount.updateCompleted(completed);
}
function handleDelete(completed) {
  if (completed) {
    todoCount.updateCompleted(false);
  }
  todoCount.updateTotal(false);
}
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const nameInput = values.name;
    const dateInput = values.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const todo = generateTodo({
      id,
      name: nameInput,
      date: dateInput,
      completed: false,
    });
    section.addItem(todo);

    addTodoPopup.close();
    todoValidator.resetValidation();
    todoCount.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

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

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();
