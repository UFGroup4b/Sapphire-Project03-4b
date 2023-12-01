import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


const doThing = () => {
    
}

const TimeOpenButton = () => {
    return (
                <Link to = "/">
                    <button onSubmit = {doThing}>Change Time Open</button>
                </Link>
    )
}




export default TimeOpenButton