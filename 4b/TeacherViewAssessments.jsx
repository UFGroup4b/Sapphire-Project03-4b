import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherViewAssessments.css";
import "../client/src/Utils/requests";
import NavBar from "../client/src/components/NavBar/NavBar";
import { getAssessments, createAssessment } from "../client/src/Utils/requests";
import message from "../client/src/components/Message";

function TeacherViewAssessments() {
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
    <main className="background">
      <div>
        <div id="main-header">
          {" "}
          <br></br>View Assessments
        </div>
        <NavBar />
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
          <button
            onClick={() => {
              // Make new assessment and navigate to it
              const makeAssessment = async () => {
                try {
                  const res = await createAssessment();
                  return res;
                } catch {
                  return { err: "Failed to create assessment" };
                }
              };
              makeAssessment().then((res) => {
                if (res.data) {
                  useNavigate("/teacher-assessments/editor/" + res.data.id);
                } else {
                  message.error(res.err);
                }
              });
              window.location.reload(false);
            }}
            className="alignRight button2"
          >
            Create New<br></br>Assignment
          </button>
          <p1 className="invisible">.</p1>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </main>
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
          <div className="tableMid">
            <div className="alignLeft bold">
              {directory.name} <br></br>{" "}
              <DisplayAssignStatus directory={directory} />
            </div>
            <button
              onClick={() => navigate("/assessment-preview/" + directory.id)}
              className="shortenTransform1 alignRight"
            >
              Preview
            </button>
            <button
              onClick={() =>
                navigate("/teacher-assessments/editor/" + directory.id)
              }
              className="shortenTransform2 alignRight"
            >
              Edit
            </button>
            <button
              onClick={() => navigate("/assessment-grade/" + directory.id)}
              className="shortenTransform3 alignRight"
            >
              Grade
            </button>
            <button
              onClick={() =>
                navigate("/teacher-assessments/display/" + directory.id)
              }
              className="shortenTransform3 alignRight"
            >
              Show test mode
            </button>
            <br></br>
          </div>
        ))}
      </div>
    );
  }
}

function DisplayAssignStatus({ directory }) {
  if (
    directory.openDate.substring(0, directory.openDate.indexOf("T")) > "3000"
  ) {
    return <div className="noBold"> Not yet assigned.</div>;
  } else {
    return (
      <div className="noBold">
        {" "}
        Assigned: <PrintDate directoryDate={directory.openDate} /> | Due:{" "}
        <PrintDate directoryDate={directory.dueDate} />
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

function PrintDate({ directoryDate }) {
  return directoryDate.substring(0, directoryDate.indexOf("T"));
}

export default TeacherViewAssessments;
