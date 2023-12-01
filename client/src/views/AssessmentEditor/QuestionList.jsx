function QuestionList({ data, updateSelect, onDelete }) {
  //Display each question
  const qList = data.map((qs, index) => {
    return (
      <tr className="row" key={index}>
        <td>
          {/* TODO: Add question display component to include necessary props */}{" "}
          <p>
            {`${index + 1} `}: {`${qs.prompt}`}
            <br />
            type: {`${qs.type} `}| Points: {`${qs.points} `}
          </p>
          <button onClick={() => updateSelect(index)}>Edit</button>
          <button
            style={{ marginLeft: "3%" }}
            onClick={() => {
              const res = confirm("Permanently delete this question?");
              if (res) {
                // IF we delete,
                onDelete(index);
              }
            }}
          >
            Delete Question
          </button>
          <ul>
            {qs.choices.map((choice, index) => {
              return (
                <li
                  key={index}
                  style={{
                    backgroundColor: qs.answers[index] ? "green" : "red",
                  }}
                >
                  {choice}
                </li>
              );
            })}
          </ul>
        </td>
      </tr>
    );
  });

  return (
    <table
      className="table table-hover table-bordered"
      style={{ border: "1px solid black" }}
    >
      <tbody>{qList}</tbody>
    </table>
  );
}

export default QuestionList;
