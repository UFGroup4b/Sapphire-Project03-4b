import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import EditAssessmentButton from './EditAssessmentButton'
import AssignToClassroomButton from './AssignToClassroomButton'
import GradeButton from './GradeButton'
import ViewAll from './AssignToClassroomButton'



function ButtonSet ({id}) {
    console.log(id);
    return (
                <Link to = "/">
                    <EditAssessmentButton id = {id}/>po <AssignToClassroomButton/><GradeButton/>
                </Link>
    )
}

export default ButtonSet