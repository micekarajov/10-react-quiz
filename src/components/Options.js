function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;

    // console.log("Question", question);
    // console.log("Dispatch", dispatch);
    // console.log("Answer", answer);

    console.log(question.correctOption);

    //*
    return (
        <div className="options">
            {question.options.map((option, index) => (
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
