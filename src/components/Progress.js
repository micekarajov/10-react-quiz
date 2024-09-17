function Progress({
    index,
    numQuestions,
    numDisplayedQuestions,
    points,
    maxPossiblePoints,
    maxPossiblePointsDifficultMode,
    questionCount,
}) {
    return (
        <header className="progress">
            <progress
                max={
                    numDisplayedQuestions
                        ? numDisplayedQuestions
                        : questionCount
                        ? questionCount
                        : numQuestions
                }
                value={index - 1}
            />

            <p>
                Question <strong>{index}</strong> /{" "}
                {numDisplayedQuestions
                    ? numDisplayedQuestions
                    : questionCount
                    ? questionCount
                    : numQuestions}
            </p>

            <p>
                <strong>{points}</strong> /{" "}
                {maxPossiblePointsDifficultMode
                    ? maxPossiblePointsDifficultMode
                    : maxPossiblePoints}
            </p>
        </header>
    );
}

export default Progress;
