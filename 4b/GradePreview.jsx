import React, { useState } from 'react';
import GradeList from "../4b/GradeList";
//import getGrades from "../client/src/util/request.js"
import './TeacherViewAssessments.css';
import NavBar from "../client/src/components/NavBar/NavBar";
import {useParams} from "react-router-dom"

// TODO get grade data from datebase
// Assessment identifier should be passed in from previous page
function GradePreview() {
  //const loc = useLocation(); // used for passing params through navagation
  const [filterText, setFilterText] = useState('');

  function filterUpdate(value) {
    //Set the state of the filter text to the value being passed in
    setFilterText(value);
  }
  const {assessID} = useParams(); // can pass assessment id, name, class id, etc
  const gradeData = [{ // delete this and replace with database call
        name:"Sample", 
        student: "Jim",
        score:99,
        grade: 99
    },
    {
        name:"Sample",
        student: "Jam",
        score:98,
        grade: 98
    },
    {
        name:"Sample",
        student: "Joe",
        score:100,
        grade: 100
    },

  ];
    console.log(gradeData)
  return (
    <main className="background">
      {/*add yellow back arrow*/}
      <div id="main-header">
        <br></br>{assessID}: Grades
      </div>
      <NavBar isMentor={true}/>
      
      <div className="projectText setFullMargins">
        <p>Put Assessment Graph Here</p> {/*Put Assessment Graph here */}
      </div>
      <div className="projectText">
        {/* TODO: Edit GradeList component to match neccessary grade.json formatting */}
        <GradeList data={gradeData} filterText={filterText} assessID={assessID}/>
      </div>
    </main>
  );
}

export default GradePreview;
