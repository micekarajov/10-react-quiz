function StartScreen({ numQuestions, questionCount, dispatch }) {
    //
    const updateDisplayedQuestion = function (e) {
        const value = Math.max(
            1,
            Math.min(numQuestions, Number(e.target.value))
        );
        dispatch({
            type: "setQuestionsCount",
            payload: value,
        });
    };

    //*
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>

            <h3>{numQuestions} questions to test your React mastery</h3>

            <label htmlFor="questionCount">
                or choose how manu question you want to answer
            </label>
            <input
                id="questionCount"
                className="btn btn-ui btn-questions"
                type="number"
                placeholder="Number of questions"
                value={questionCount || ""}
                onChange={updateDisplayedQuestion}
            />

            <h5>
                {questionCount <= 1 && "(minimum question to choose is 1)"}
                {questionCount > numQuestions && (
                    <span>
                        There are only{" "}
                        <span className="textDecoration">{numQuestions}</span>{" "}
                        questions.
                    </span>
                )}
            </h5>

            <button
                className="btn-start btn-ui"
                onClick={() => dispatch({ type: "start" })}
            >
                Let's start !!!
            </button>
        </div>
    );
}

export default StartScreen;
