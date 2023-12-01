import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


const doThing = () => {

}

const EditAssessmentButton = () => {
    return (
                <Link to = "/">
                    <button onSubmit = {doThing}>Edit</button>
                </Link>
    )
}




export default EditAssessmentButton