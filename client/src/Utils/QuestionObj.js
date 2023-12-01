class Question {
  static TYPES = [
    "multipleChoice",
    "freeResponse",
    "multiSelect",
    "codingQ",
    "dropDown"
  ];
  constructor(input = null) {
    this.type = "multipleChoice"; // Choose from types
    this.points = 0.0;
    this.prompt = ""; // The question
    this.promptImage = null; // Image with the prompt
    this.choices = []; // list of choices
    this.answers = []; // leave empty if FRQ
    if (input != null) {
      this.update(input);
    }
  }
  // update values based on existing object or json.
  update(input) {
    let cur;
    // Check if input is a JSON string or object.
    if (typeof input === "string" || input instanceof String) {
      try {
        cur = JSON.parse(input);
      } catch (e) {
        console.error("Invalid JSON string:", e);
        return; // Exit the function or handle the error appropriately
      }
    } else {
      cur = input;
    }
    if ("type" in cur) {
      for (let t of Question.TYPES) {
        // Corrected this line
        if (t === cur.type) {
          this.type = cur.type;
        }
      }
    }
    if ("points" in cur) {
      this.points = cur.points;
    }
    if ("prompt" in cur) {
      this.prompt = cur.prompt;
    }
    if ("promptImage" in cur) {
      this.promptImage = cur.promptImage;
    }
    if ("choices" in cur) {
      this.choices = cur.choices;
    }
    if ("answers" in cur) {
      this.answers = cur.answers;
    }
  }
  // function that adds new choice
  addChoice(choice, isTrue) {
    this.choices.push(choice);
    this.answers.push(isTrue);
  }
  //function that removes existing choice by index
  removeChoice(index) {
    if (index >= this.choices.length) {
      return false;
    }
    this.choices.splice(index, 1);
    this.answers.splice(index, 1);
    return true;
  }
  // Get AutoGraded score.
  getScore(response) {
    const n = Math.min(response.length, this.answers.length);
    var index = 0;
    var correct = 0;
    while (index < n) {
      if (response[index] == this.answers[index]) {
        correct++;
      }
      index++;
    }
    return (correct * this.points) / this.answers.length;
  }
}
export default Question;
