function Progress({
    index,
    numQuestions,
    points,
    maxPossiblePoints,
    answer,
    questionCount,
}) {
    return (
        <header className="progress">
            <progress
                max={questionCount ? questionCount : numQuestions}
                value={index - 1}
            />

            <p>
                Question <strong>{index}</strong> /{" "}
                {questionCount ? questionCount : numQuestions}
            </p>

            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    );
}

export default Progress;
