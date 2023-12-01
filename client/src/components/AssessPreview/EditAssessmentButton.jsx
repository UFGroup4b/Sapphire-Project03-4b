import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const doThing = () => {};
function EditAssessmentButton({ id }) {
  const act = <Link to="/teacher-assessments/editor/"></Link>; //does ":" stay?

  return (
    <Link to={"/teacher-assessments/editor/" + id}>
      <button onSubmit={doThing}>Edit</button>
    </Link>
  );
}

export default EditAssessmentButton;
