import React, { Component } from "react";
import Question from "../../utils/QuestionObj";
import "./QuestionFormStyles.css";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);
  }

  getInitialState = (props) => {
    return props.question
      ? { ...props.question }
      : {
          type: "multipleChoice",
          points: 0.0,
          prompt: "",
          promptImage: "",
          choices: [""],
          answers: [true],
        };
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (
      e.target.name == "type" &&
      (e.target.value == "freeResponse" || e.target.value == "codingQ")
    ) {
      this.setState({ choices: [], answers: [] });
    } else if (
      e.target.name == "type" &&
      (e.target.value === "multipleChoice" || e.target.value === "dropDown")
    ) {
      let updatedAnswers = [...this.state.answers];
      for (let i = 0; i < updatedAnswers.length; i++) {
        updatedAnswers[i] = false;
      }
      this.setState({ answers: updatedAnswers });
    } else if (e.target.name == "points") {
      this.setState({ points: parseInt(e.target.value) });
    }
  };

  handleChoiceChange = (index, value) => {
    let updatedAnswers = [...this.state.answers];
    if (
      (this.state.type === "multipleChoice" ||
        this.state.type === "dropDown") &&
      value == true
    ) {
      for (let i = 0; i < updatedAnswers.length; i++) {
        updatedAnswers[i] = false;
        if (i == index) {
          updatedAnswers[i] = true;
        }
      }
    } else {
      updatedAnswers[index] = value;
    }
    this.setState({ answers: updatedAnswers });
  };

  handleAddChoice = () => {
    this.setState((prevState) => ({
      choices: [...prevState.choices, ""],
      answers: [...prevState.answers, false],
    }));
  };
  handleRemoveChoice = (index) => {
    const choices = this.state.choices.filter((_, i) => i !== index);
    const answers = this.state.answers.filter((_, i) => i !== index);
    this.setState({ choices, answers });
  };

  handleSubmit = (e) => {
    const question = new Question(this.state);
    this.props.addOrUpdateQuestion(question);
    console.log(question);
    this.props.closeForm();
  };

  renderChoices = () => {
    return (
      <div>
        {this.state.choices.map((choice, index) => (
          <div key={index}>
            {(this.state.type === "multipleChoice" ||
              this.state.type === "dropDown") && (
              <input
                type="radio"
                name="correctChoice"
                checked={this.state.answers[index]}
                onChange={(e) =>
                  this.handleChoiceChange(index, e.target.checked)
                }
              />
            )}
            {this.state.type === "multiSelect" && (
              <input
                type="checkbox"
                checked={this.state.answers[index]}
                onChange={(e) =>
                  this.handleChoiceChange(index, e.target.checked)
                }
              />
            )}
            <input
              type="text"
              value={choice}
              onChange={(e) => {
                let updatedChoices = [...this.state.choices];
                updatedChoices[index] = e.target.value;
                this.setState({ choices: updatedChoices });
              }}
            />
            <button
              type="button"
              style={{ transform: "translate(0,0)" }}
              onClick={() => this.handleRemoveChoice(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          style={{ transform: "translate(0, 0)" }}
          onClick={this.handleAddChoice}
        >
          Add Choice
        </button>
      </div>
    );
  };

  render() {
    const { currentQuestionIndex, totalQuestions } = this.props;

    return (
      <div className="card" style={{ margin: 0 }}>
        <div className="card-body">
          <form onSubmit={this.handleSubmit} className="form">
            <div className="mb-3">
              <label htmlFor="questionType" className="form-label">
                Question Type:
              </label>
              <select
                id="questionType"
                name="type"
                value={this.state.type}
                onChange={this.handleChange}
                className="form-select"
              >
                {Question.TYPES.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="points" className="form-label">
                Points:
              </label>
              <input
                id="points"
                type="number"
                name="points"
                value={this.state.points}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="prompt" className="form-label">
                Prompt:
              </label>
              <input
                id="prompt"
                type="text"
                name="prompt"
                value={this.state.prompt}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="promptImage" className="form-label">
                Image URL (Optional):
              </label>
              <input
                id="promptImage"
                type="text"
                name="promptImage"
                value={this.state.promptImage}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>

            {!(
              this.state.type == "freeResponse" || this.state.type == "codingQ"
            ) && (
              <div className="mb-3">
                <label className="form-label">Choices:</label>
                {this.renderChoices()}
              </div>
            )}

            <button
              style={{ transform: "translate(0, 0)" }}
              onClick={() => {
                this.handleSubmit();
              }}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuestionForm;
