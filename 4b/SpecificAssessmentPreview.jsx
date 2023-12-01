
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

const test = {
  id: 4,
  assessment_id: null,
  attempts: 12,
  points: 9,
  questions: [
    {
      type: "multipleChoice",
      points: 1,
      prompt: "What is the name of this class?",
      promptImage: "",
      choices: [
        "FishSticks",
        "Dogs are Nice",
        "Frizzle  (correct)",
        "Owl Fishing",
      ],
      answers: [false, false, true, false],
    },
    {
      type: "multiSelect",
      points: 1,
      prompt: "Choose any phases with an O in them.",
      promptImage: "",
      choices: [
        "FishSticks",
        "Dogs are Nice (also green)",
        "Potions (correct)",
        "Owl Fishing (should be green)",
      ],
      answers: [false, true, true, true],
    },
    {
      type: "multipleChoice",
      points: 3,
      prompt: "How many points is this question?",
      promptImage: "",
      choices: ["FishSticks", "Dogs are Nice", "3", "Owl Fishing"],
      answers: [false, false, true, false],
    },
    {
      type: "multipleChoice",
      points: 1,
      prompt: "How many attempts does this have?",
      promptImage: "",
      choices: ["FishSticks", "Dogs are Nice", "12  (correct)", "Owl Fishing"],
      answers: [false, false, true, false],
    },
    {
      type: "multipleChoice",
      points: 3,
      prompt: "What is the id of this assessment? (look at the url)",
      promptImage: "",
      choices: ["FishSticks", "Dogs are Nice", "4 (correct)", "Owl Fishing"],
      answers: [false, false, true, false],
    },
  ],
  showGrades: false,
  publishDate: "2023-11-17T17:00:00.000Z",
  openDate: "2023-11-17T17:00:00.000Z",
  dueDate: "2024-03-06T17:00:00.000Z",
  timeLimit: 45,
  published_at: "2023-11-18T20:27:37.032Z",
  created_at: "2023-11-18T20:26:11.032Z",
  updated_at: "2023-11-18T20:28:57.445Z",
  name: "Frizzle Test 1",
  classrooms: [
    {
      id: 10,
      name: "Miss Frizzle's 5th Grade Class",
      school: null,
      code: "1994",
      grade: 4,
      created_at: "2023-10-19T20:15:45.146Z",
      updated_at: "2023-10-19T20:15:45.153Z",
      authorized_workspace: null,
    },
  ],
};

function SpecificAssessmentPreview() {
  const [assessData, setAssessData] = React.useState(new Assessment());
  const [questions, setQuestions] = React.useState({});
  const { id } = useParams();

  useEffect(() => {
    //setAssessData(test); //DELETE THIS IF SETASSESSDATA(RES) IS WORKING
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
        setAssessData(res); //     UNCOMMENT THIS TO TEST WITH DB
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
