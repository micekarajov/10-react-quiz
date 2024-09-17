function BackButton({ dispatch }) {
    return (
        <button
            className="btn-back btn-ui"
            onClick={() => dispatch({ type: "previousQuestion", payload: -1 })}
        >
            Back
        </button>
    );
}

export default BackButton;
