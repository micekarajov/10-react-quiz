function Buttons({
    dispatch,
    answer,
    index,
    numQuestions,
    numDisplayedQuestions,
    questionCount,
    direction,
    userAnswers,
}) {
    const questionNumbers = numDisplayedQuestions
        ? numDisplayedQuestions
        : questionCount
        ? questionCount
        : numQuestions;

    const buttonText =
        direction === "next"
            ? index === questionNumbers - 1
                ? "Finish"
                : "Next"
            : "Back";

    function handleClick() {
        if (direction === "next") {
            if (index === questionNumbers - 1) {
                dispatch({ type: "finishQuestion" });
            } else {
                const nextAnswer = userAnswers[index + 1] || null;
                dispatch({ type: "nextQuestion", payload: nextAnswer });
            }
        } else if (direction === "back") {
            dispatch({ type: "previousQuestion", payload: -1 });
        }
    }

    if (direction === "next" && answer === null) return null;

    return (
        <button
            className={`btn btn-ui ${direction === "back" ? "btn-back" : ""}`}
            onClick={handleClick}
        >
            {buttonText}
        </button>
    );
}

export default Buttons;
