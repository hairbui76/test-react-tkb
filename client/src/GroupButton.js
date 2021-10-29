import "./css/GroupButton.css";

function GroupButton({ selectGroup1, selectGroup2 }) {
	return (
		<div id="left">
			<button id="btn-1" onClick={selectGroup1} style={{ zIndex: 1 }}>
				Group 1
			</button>
			<button id="btn-2" onClick={selectGroup2} style={{ zIndex: 1 }}>
				Group 2
			</button>
		</div>
	);
}

export default GroupButton;
