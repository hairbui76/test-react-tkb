import "./css/GroupButton.css";

function GroupButton({ selectGroup1, selectGroup2, currentGroup }) {
	return (
		<div id="left">
			<p style={{ margin: 0, fontSize: "1.2rem" }}>
				Current:{" "}
				<strong style={{ color: "red" }}>
					{currentGroup === 1 ? "Group 1" : "Group 2"}
				</strong>
			</p>
			<div id="button-group">
				<button
					id="btn-1"
					onClick={selectGroup1}
					style={{ zIndex: 1, opacity: currentGroup === 1 ? "0.5" : "1" }}
					disabled={currentGroup === 1}>
					Group 1
				</button>
				<button
					id="btn-2"
					onClick={selectGroup2}
					style={{ zIndex: 1, opacity: currentGroup === 2 ? "0.5" : "1" }}
					disabled={currentGroup === 2}>
					Group 2
				</button>
			</div>
		</div>
	);
}

export default GroupButton;
