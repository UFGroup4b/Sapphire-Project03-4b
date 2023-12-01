import React, { Component } from "react";
import "./QuestionFormStyles.css";
import "bootstrap/dist/css/bootstrap.css";

class DisplayQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: {},
    };
  }

  handleChange = (question, value) => {
    this.setState((prevState) => ({
      responses: {
        ...prevState.responses,
        [question]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    const { assessment } = this.props;
    const { responses } = this.state;
    const questions = assessment.questions;

    e.preventDefault();
    const allAnswered = questions.every((question) =>
      responses.hasOwnProperty(question.prompt)
    );
    if (allAnswered) {
      console.log(this.state.responses);
      // Call database here
      this.setState({ responses: {} });
    } else {
      alert("Please answer all questions.");
    }
  };

  renderQuestions = () => {
    const { assessment } = this.props;
    const { responses } = this.state;
    const questions = assessment.questions;

    return questions.map((question, index) => {
      const questionNumber = index + 1;
      switch (question.type) {
        case "multipleChoice":
          return (
            <div className="form-section" key={question.prompt}>
              <span>
                <strong> {questionNumber}. </strong>
                {question.prompt}
              </span>
              <ul>
                {question.choices.map((choice, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="radio"
                        value={choice}
                        checked={responses[question.prompt] === choice}
                        onChange={() =>
                          this.handleChange(question.prompt, choice)
                        }
                      />
                      {choice}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );
        case "multiSelect":
          return (
            <div className="form-section" key={question.prompt}>
              <span>
                <strong> {questionNumber}. </strong>
                {question.prompt}
              </span>
              <ul>
                {question.choices.map((choice, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="checkbox"
                        value={choice}
                        checked={responses[question.prompt]?.includes(choice)}
                        onChange={() =>
                          this.handleChange(question.prompt, choice)
                        }
                      />
                      {choice}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          );

        case "dropDown":
          return (
            <div className="form-section" key={question.prompt}>
              <span>
                <strong> {questionNumber}. </strong>
                {question.prompt}
              </span>
              <div>
                <select
                  value={responses[question.prompt] || " "}
                  onChange={(e) =>
                    this.handleChange(question.prompt, e.target.value)
                  }
                >
                  <option value="">Choose</option>
                  {question.choices.map((choice, index) => (
                    <option key={index} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        case "freeResponse":
          return (
            <div className="form-section space-between" key={question.prompt}>
              <span>
                <strong> {questionNumber}. </strong>
                {question.prompt}
              </span>
              <div className="space-between">
                <textarea
                  value={responses[question.prompt] || " "}
                  onChange={(e) =>
                    this.handleChange(question.prompt, e.target.value)
                  }
                />
              </div>
            </div>
          );
      }
    });
  };

  render() {
    return (
      <div className="tableMid" style={{ border: 0 }}>
        <form
          onSubmit={(e) => this.handleSubmit(e)}
          className="flex-container flex-column"
        >
          <div className="form-section">
            {this.renderQuestions()}
            <button type="button" onClick={(e) => this.handleSubmit(e)}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DisplayQuestion;
