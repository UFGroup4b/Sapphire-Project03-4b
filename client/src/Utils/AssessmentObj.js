// Assessment Workspace Core
import React, { useState } from "react";
import ElapsedTime from "../../../4b/elapsedTime";
//import Submission from "../../../4b/submission";
import Question from "../Utils/QuestionObj";
class Assessment {
  // Construct with an existing object, json string, or nothing.
  constructor(input) {
    this.name = "New Assessment";
    this.attempts = 1;
    this.points = 0.0;
    this.questions = [];
    this.showGrades = false;
    // Set publish date to current date by default.
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 100); // Set 1000 years from now as default publish
    this.publishDate = currentDate.toJSON().slice(0, -1); // only show after this date/time
    this.openDate = currentDate.toJSON().slice(0, -1); // null indicates always open
    this.dueDate = currentDate.toJSON().slice(0, -1); // null indicates no deadline.
    this.timeLimit = 9999999; // Negatives indicate unlimited.
    if (input) {
      this.update(input);
    }
  }
  // load an existing object as an Assessment from JSON or object.
  update(input) {
    var cur;
    // Check if input is a jSON string or object.
    if (typeof input === "string" || input instanceof String) {
      cur = JSON.parse(input);
    } else {
      cur = input;
    }
    // Update anything that exists.
    if ("name" in cur) {
      this.name = cur.name;
    }
    if ("attempts" in cur) {
      this.attempts = cur.attempts;
    }
    if ("questions" in cur && cur.questions instanceof Array) {
      cur.points = 0;
      if (cur.questions.length > 0) {
        cur.questions.map((q) => {
          this.addQuestion(new Question(q));
        });
      }
    }
    if ("showGrades" in cur) {
      this.showGrades = cur.showGrades;
    }
    if ("publishDate" in cur) {
      if (
        typeof this.publishDate === "string" ||
        this.publishDate instanceof String
      ) {
        this.publishDate = cur.publishDate.replace("Z", "");
      } else {
        this.publishDate = cur.publishDate;
      }
    }
    if ("openDate" in cur) {
      if (
        typeof this.openDate === "string" ||
        this.openDate instanceof String
      ) {
        this.openDate = cur.openDate.replace("Z", "");
      } else {
        this.openDate = cur.openDate;
      }
    }
    if ("dueDate" in cur) {
      if (typeof this.dueDate === "string" || this.dueDate instanceof String) {
        this.dueDate = cur.dueDate.replace("Z", "");
      } else {
        this.dueDate = cur.dueDate;
      }
    }
    if ("timeLimit" in cur) {
      this.timeLimit = cur.timeLimit;
    }
  }

  isVisible() {
    // Indicate whether this assessment is visible to students.
    const curDate = new Date();
    return curDate.getTime() >= this.publishDate;
  }
  isOpen() {
    // Indicate whether students can take assessment or not.
    const curDate = new Date();
    return (
      (this.openDate == null || this.openDate <= curDate) &&
      (this.dueDate == null || this.dueDate >= curDate) &&
      (this.publishDate == null || this.publishDate <= curDate)
    );
  }
  save() {
    // TODO: Save this to the database as a new assessment.
    return false;
  }

  addQuestion(q) {
    // Add question to list.
    if (q instanceof Question) {
      this.questions.push(q);
      this.points += q.points;
      return true;
    }
    return false;
  }

  removeQuestion(index) {
    if (index >= this.questions.length) {
      return false;
    }
    this.points -= this.questions[index].points;
    this.choices.splice(index, 1);
    return true;
  }
}
export default Assessment;
