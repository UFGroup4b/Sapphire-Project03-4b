import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

async function gAssessments() {
    try {
        const assessData = await getAssessments.data;
        console.log(assessData);
        return assessData;
      } catch {
        console.log('failed');
        return { err: "Data fetch failed" };
      }}

const doThing = () => {
    gAssessments();
}

const GradeButton = () => {
    return (             
                    <button onSubmit = {doThing}>Grade</button>
                
    )
}




export default GradeButton;