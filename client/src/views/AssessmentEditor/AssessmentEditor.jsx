import Question from "../../utils/QuestionObj";
import React, { useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import "bootstrap/dist/css/bootstrap.css";

function AssessmentEditor({ data, setData, onSave }) {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

  const addOrUpdateQuestion = (question) => {
    let updatedQuestions = [...data.questions];
    let pts = data.points;
    if (currentQuestionIndex !== null) {
      pts -= updatedQuestions[currentQuestionIndex].points;
      updatedQuestions[currentQuestionIndex] = question;
    } else {
      updatedQuestions.push(question);
    }
    pts += question.points;

    setData({ ...data, questions: updatedQuestions, points: pts });
    setShowQuestionForm(false);
    setCurrentQuestionIndex(null);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = data.questions.filter((_, i) => i !== index);
    let pts = 0;
    for (let i = 0; i < updatedQuestions.length; i++) {
      pts += updatedQuestions[i].points;
    }
    setData({ ...data, questions: updatedQuestions, points: pts });
  };

  const editQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setShowQuestionForm(true);
  };
  return (
    <>
      {showQuestionForm && (
        <div
          style={{ display: "block", background: "rgba(50, 50, 50, 0.7)" }}
          className="modal show"
          tabindex="-1"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" role="document">
                <h5 className="modal-title" id="exampleModalLabel">
                  Question Editor
                </h5>
                <button
                  type="button"
                  style={{
                    transform: "translate(0%, 0%)",
                  }}
                  onClick={() => {
                    setCurrentQuestionIndex(null);
                    setShowQuestionForm(false);
                  }}
                  className="close btn"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <QuestionForm
                addOrUpdateQuestion={addOrUpdateQuestion}
                question={
                  currentQuestionIndex !== null
                    ? data.questions[currentQuestionIndex]
                    : new Question()
                }
                closeForm={() => {
                  setCurrentQuestionIndex(null);
                  setShowQuestionForm(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="group">
        <form className="group g-3">
          <div className="row">
            <div className="form-group">
              <label className="form-label">Assessment Name:&nbsp;</label>
              <input
                type="text"
                value={data.name || ""}
                className="form-control"
                placeholder="Enter Assessment Name Here"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                pattern="^[a-zA-Z0-9 _.\-]*$"
              />
            </div>
            <div className="col">
              <div className="form-group">
                <label className="form-label">Open Date: &nbsp;</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={data.openDate}
                  onChange={(e) => {
                    setData({ ...data, openDate: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="form-label">Due Date: &nbsp;</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={data.dueDate}
                  onChange={(e) => {
                    setData({ ...data, dueDate: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">{"Time Limit (Minutes): "}</label>

              <div className="col" style={{ paddingLeft: 4 }}>
                <input
                  type="number"
                  className="form-control"
                  value={data.timeLimit}
                  min="0"
                  max="20000000000"
                  onChange={(e) => {
                    setData({ ...data, timeLimit: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col">
              <label className="form-label">{"Attempts: "}</label>

              <div className="col" style={{ paddingLeft: 4 }}>
                <input
                  type="number"
                  className="form-control"
                  value={data.attempts}
                  min="1"
                  max="999"
                  onChange={(e) => {
                    setData({ ...data, attempts: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div>
              <label className="form-label">
                {"Mute Assessment Results?"}&nbsp;
              </label>

              <input
                type="checkbox"
                value={!data.showGrades}
                onChange={(e) => {
                  setData({ ...data, showGrades: !e.target.checked });
                }}
              />
            </div>
          </div>
        </form>
        <div>
          <main>
            <div className="group">
              <h1 style={{ marginBottom: 0 }}>
                Questions: {data.questions.length}
              </h1>
              <h3>Points: {data.points}</h3>

              <button
                className="btn btn-secondary"
                style={{ margin: "1rem", marginBottom: "0" }}
                onClick={() => {
                  setCurrentQuestionIndex(null);
                  setShowQuestionForm(true);
                }}
              >
                Add New Question
              </button>
              <div
                className="row justify-content-center"
                style={{ height: "70%", overflowY: "auto" }}
              >
                <div className="col-auto">
                  {/** Show questions here */}
                  <QuestionList
                    data={data.questions}
                    updateSelect={editQuestion} // Pass the index to editQuestion
                    onDelete={removeQuestion}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            // Don't publish
            onSave(data);
            // TODO: Navigate to previous page.
          }}
          style={{ transform: "translate(0%, 0%)" }}
        >
          Save and Finish Later
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            const curDate = new Date();
            const res = { ...data, publishDate: curDate.toJSON() };
            onSave(res);
          }}
          style={{ transform: "translate(0%, 0%)" }}
        >
          Save and Publish
        </button>
      </div>
    </>
  );
}

export default AssessmentEditor;
