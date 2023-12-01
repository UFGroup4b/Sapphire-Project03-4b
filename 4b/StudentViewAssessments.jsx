import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentViewAssessments.css";
import "../client/src/Utils/requests";
import NavBar from "../client/src/components/NavBar/NavBar";
import { getAssessments, getStudent } from "../client/src/Utils/requests";
import message from "../client/src/components/Message";

function StudentViewAssessments() {
  const [assessmentList, setAssessmentList] = React.useState({});
  let [sortingStyle, setSortingStyle] = React.useState("ID");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAssessments();
        return res.data;
      } catch {
        return { err: "Data fetch failed" };
      }
    };
    fetchData().then((res) => {
      if (res) {
        setAssessmentList(res); //Whatever the react state for the assessment is.
      } else {
        message.error(res.err);
        const navigate = useNavigate();
        navigate("/PageNotFound");
      }
    });
  }, []);
  return (
    <body className="background">
      <NavBar />
      <p1 className="blackText header bold noBottomBorder"> Student Name</p1>
      <p1 className="smallerText header">
        {" "}
        Number Assessments Completed: {" "}
        <CalculateCompletedAssessments assessmentList={assessmentList} />/
        {assessmentList.length}
        <br></br>
        Current Grade: <CalculateGrade assessmentList={assessmentList} />%
      </p1>
      <button
        onClick={() => setSortingStyle("Name")}
        className="alignRight button3"
      >
        Sort by Name
      </button>
      <button
        onClick={() => setSortingStyle("Date")}
        className="alignRight button3"
      >
        Sort by Date
      </button>
      <button
        onClick={() => setSortingStyle("ID")}
        className="alignRight button3"
      >
        Sort by ID
      </button>
      <div className="projectText">
        <p1 className="tableTop bold">
          Assessments:
          <p1 className="alignRight noBold">Sorting by: {sortingStyle}</p1>
        </p1>
        <PrintMiddleEntries
          assessmentList={assessmentList}
          sortingStyle={sortingStyle}
        />
        <p1 className="invisible">.</p1>
        <br></br>
      </div>
    </body>
  );
}

function PrintMiddleEntries(props) {
  const navigate = useNavigate();
  if (
    props.assessmentList !== undefined &&
    Array.isArray(props.assessmentList)
  ) {
    if (props.sortingStyle === "Name") {
      props.assessmentList.sort(CompareByName);
    } else if (props.sortingStyle === "Date") {
      props.assessmentList.sort(CompareByDate);
    } else {
      props.assessmentList.sort(CompareByID);
    }
    return (
      <div>
        {props.assessmentList.map((directory) => (
          <div
            className="tableMid tableHover"
            onClick={() => {
              confirm("This goes to the assessment page for the student :)");
              //navigate("")
            }}
          >
            <p2 className="alignLeft bold">{directory.name}</p2>
            <p3>
              <br></br>Due: <PrintDate directoryDate={directory.dueDate} /> |
              Attempts Remaining: <PrintAttemptsMade directory={directory} />/
              {directory.attempts} | <PrintIfGraded directory={directory} />/
              {directory.points} Points
            </p3>
          </div>
        ))}
      </div>
    );
  }
}

function CompareByID(first, second) {
  return first.id - second.id;
}
function CompareByName(first, second) {
  return first.name.localeCompare(second.name);
}

function CompareByDate(first, second) {
  return first.dueDate.localeCompare(second.dueDate);
}

function PrintAttemptsMade({ directory }) {
  let numAttempts = 0;
  let numAttemptsMade = 0;
  if (directory.attempts !== undefined) {
    numAttempts = directory.attempts;
  }
  if (directory.attemptsMade !== undefined) {
    numAttemptsMade = directory.attemptsMade;
  }
  return numAttempts - numAttemptsMade;
}

function PrintIfGraded(directory) {
  if (directory.showGrades === true) {
    return directory.grade;
  } else {
    return "-";
  }
}

function PrintDate({ directoryDate }) {
  return directoryDate.substring(0, directoryDate.indexOf("T"));
}

function CalculateGrade(assessmentList) {
  let gradeTotal = 0;
  let gradesExist = false;
  let size = 0;
  if (Array.isArray(assessmentList.assessmentList)) {
    size = assessmentList.assessmentList.length;
  }
  for (let i = 0; i < size; i++) {
    if (
      assessmentList.assessmentList.at(i) !== undefined &&
      assessmentList.assessmentList.at(i).showGrades &&
      assessmentList.assessmentList.at(i).grade !== undefined
    ) {
      let thisGrade = assessmentList.assessmentList.at(i).grade;
      gradeTotal = gradeTotal + thisGrade;
      gradesExist = true;
    }
  }
  if (gradesExist) {
    return gradeTotal / size;
  } else {
    return "-";
  }
}

function CalculateCompletedAssessments(assessmentList) {
  let size = 0;
  let completedAssessments = 0;
  if (Array.isArray(assessmentList.assessmentList)) {
    size = assessmentList.assessmentList.length;
  }
  for (let i = 0; i < size; i++) {
    if (
      assessmentList.assessmentList.at(i) !== undefined &&
      assessmentList.assessmentList.at(i).attemptsMade !== undefined
    ) {
      if (assessmentList.assessmentList.at(i).attemptsMade !== 0) {
        completedAssessments = completedAssessments + 1;
      }
    }
  }
  return completedAssessments;
}

export default StudentViewAssessments;
