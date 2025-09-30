class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._todos = todos;
    this._element = document.querySelector(selector); // select the appropriate element
    this._completed = this._todos.filter((todo) => todo.completed).length; // number of completed todos
    this._total = this._todos.length; // the total number of todos
    console.log(this._todos, this._element, this._completed, this._total);
    this._updateText();
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
  updateCompleted = (increment) => {
    if (increment) {
      this._completed++;
    } else {
      this._completed--;
    }
    // if increment is true, add 1 to this._completed. Otherwise,
    // subtract 1. In either case, call the method to update
    // the text content.
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.
  updateTotal = (increment) => {
    if (increment) {
      this._total++;
    } else {
      this._total--;
    }
    // if increment is true, add 1 to this._total. Otherwise,
    // subtract 1. In either case, call the method to update the
    // text content.
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    // Sets the text content of corresponding text element.
    // Call this in the constructor, and whenever the counts get updated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
