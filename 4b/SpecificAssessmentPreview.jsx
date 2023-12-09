
import React, { useEffect, useState } from "react";
import "./TeacherViewAssessments.css";
import "../client/src/Utils/requests.js";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../client/src/components/NavBar/NavBar";


//components
import AssignmentTitle from "./AssignmentTitle";
import PreviewAssessment from "./PreviewAssessment";
import DataVis from "./DataVisualization";
import ButtonSet from "../client/src/components/AssessPreview/ButtonSet";
import {
  getAssessments,
  getStudent,
  getAssessment,
} from "../client/src/Utils/requests";
import Assessment from "../client/src/Utils/AssessmentObj";
import message from "../client/src/components/Message";

function SpecificAssessmentPreview() {
  const [assessData, setAssessData] = React.useState(new Assessment());
  const [questions, setQuestions] = React.useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAssessment(id);
        return res.data;
      } catch {
        return { err: "Data fetch failed" };
      }
    };
    fetchData().then((res) => {
      if (res) {
        console.log(res);
        setAssessData(res);
      } else {
        message.error(res.err);
        const navigate = useNavigate();
        navigate("/PageNotFound");
      }
    });
  }, []);

  let arr = [];
  for (let i = 0; i < assessData.questions.length; i++) {
    arr.push(<Question question={assessData.questions[i]}></Question>);
  }

  return (
    <body className="background">
      <NavBar />
      <p1 className="blackText header bold noBottomBorder">
        Preview Assessment
      </p1>
      <p1 className="smallerText header">{assessData.name}</p1>
      <button></button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonSet id={id} />
      </div>
      <p2 className="tableMid alignLeft bold">
        Attempts: {assessData.attempts}, Points: {assessData.points}
      </p2>
      {arr}
      <div>
        <DataVis />
      </div>
    </body>
  );
}

function QuestionType({ question }) {
  if (question.type === "multipleChoice" || question.type === "multiSelect") {
    let arr = [];
    for (let i = 0; i < question.choices.length; i++) {
      arr.push(
        <p2 className="tableMid alignLeft bold" key={i}>
          {" "}
          {question.choices[i]}
        </p2>
      );
    }
    return (
      <div>
        <p2 className="tableMid alignLeft bold">Options: </p2>
        {arr}
      </div>
    );
  }
}

function Question({ question }) {
  console.log(question);
  return (
    <div>
      <p2 className="tableTop alignRight bold">{question.prompt} </p2>
      <p2 className="tableMid alignLeft bold">
        Number of points: {question.points}
      </p2>
      <p2 className="tableMid alignLeft bold">
        Type of question: {question.type}
      </p2>
      <QuestionType question={question}></QuestionType>
    </div>
  );
}



export default SpecificAssessmentPreview;
