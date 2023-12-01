import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


const doThing = () => {
    
}

const GradeButton = () => {
    return (
                <Link to = "/">
                    <button onSubmit = {doThing}>Grade</button>
                </Link>
    )
}




export default GradeButton