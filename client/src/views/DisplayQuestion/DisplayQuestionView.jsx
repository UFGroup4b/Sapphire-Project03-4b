import React, { useEffect, useState } from "react";
import { message } from "antd";

import NavBar from "../../components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import DisplayQuestion from "./DisplayQuestion";
import Assessment from "../../Utils/AssessmentObj";
import { getAssessment } from "../../Utils/requests";

export default function DisplayQuestionView() {
  const [assessment, setAssessment] = useState(new Assessment());
  const [responses, setResponses] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    sessionStorage.setItem("assessmentId", id);
    const fetchData = async () => {
      try {
        const res = await getAssessment(id);
        return res;
      } catch {
        return { err: "Data fetch failed" };
      }
    };
    fetchData().then((res) => {
      if (res.data) {
        setAssessment(
          new Assessment({
            ...res.data,
            dueDate: res.data.dueDate,
            openDate: res.data.openDate,
            publishDate: res.data.publishDate,
          })
        );
      } else {
        message.error(res.err);
        setAssessment({
          name: "Assessment Not Found",
        });
      }
    });
  }, [id]);

  const handleViewAssessments = () => {
    navigate(`/teacher-assessments`);
  };

  return (
    <div className="container nav-padding">
      <div id="main-header">{assessment.name}</div>
      <NavBar />
      <div id="classrooms-container">
        <DisplayQuestion assessment={assessment} responses={setResponses} />
        <button
          onClick={() => {
            const res = confirm("Leave assessment?");
            if (res) {
              navigate("/teacher-assessments");
            }
          }}
        >
          Leave
        </button>
      </div>
    </div>
  );
}
