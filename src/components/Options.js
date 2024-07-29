function Options({
    question,
    displayedQuestions,
    questionCount,
    dispatch,
    answer,
}) {
    const hasAnswered = answer !== null;
    const options = questionCount
        ? displayedQuestions.options
        : question.options;
    // console.log("Question", question);
    // console.log("Dispatch", dispatch);
    // console.log("Answer", answer);

    //*
    return (
        <div className="options">
            {options.map((option, index) => (
                <button
                    className={`btn btn-option 
                    ${index === answer ? "answer" : ""}    
                    ${
                        hasAnswered && index === question.correctOption
                            ? "correct"
                            : "wrong"
                    }`}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() =>
                        dispatch({ type: "newAnswer", payload: index })
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
export default Options;
