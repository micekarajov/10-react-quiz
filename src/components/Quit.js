function Quit({ dispatch }) {
    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "restart" })}
        >
            Quit
        </button>
    );
}

export default Quit;
