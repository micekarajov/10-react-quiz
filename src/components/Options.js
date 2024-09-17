//
function Options({
    question,
    displayedQuestion,
    questionCount,
    dispatch,
    answer,
    selectedDifficult,
}) {
    const hasAnswered = answer !== null;

    const questionCorrectOption =
        displayedQuestion || selectedDifficult
            ? displayedQuestion?.correctOption
            : question?.correctOption;

    const options =
        displayedQuestion || selectedDifficult
            ? displayedQuestion?.options
            : question?.options;

    //*
    return (
        <div className="options">
            {options.map((option, index) => (
                <button
                    className={`btn btn-option 
                    ${index === answer ? "answer" : ""}    
                    ${
                        hasAnswered
                            ? index === questionCorrectOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }
                    `}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() =>
                        dispatch({
                            type: "newAnswer",
                            payload: index,
                        })
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
export default Options;
