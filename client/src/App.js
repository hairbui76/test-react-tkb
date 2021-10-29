import { useState, useEffect } from "react";
import "./css/App.css";
import Group from "./Group";
import GroupButton from "./GroupButton";

function App() {
	const [showGroup1, setShowGroup1] = useState(true);
	const [showGroup2, setShowGroup2] = useState(false);
	const [stateSaveData, setStateSaveData] = useState(false);
	const [currentGroup, setCurrentGroup] = useState(1);
	const [data, setData] = useState({
		group1: [],
		group2: [],
	});
	useEffect(() => {
		const fetchData = async () => {
			const response1 = await fetch("/group1");
			const response2 = await fetch("/group2");
			const data1 = await response1.json();
			const data2 = await response2.json();
			setData({ group1: data1, group2: data2 });
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div id="container">
			{showGroup1 && (
				<Group
					datum={data.group1}
					stateShowGroup={showGroup1}
					stateSaveData={stateSaveData}
					setStateSaveData={setStateSaveData}
					currentGroup={currentGroup}
					setCurrentGroup={setCurrentGroup}
				/>
			)}
			{showGroup2 && (
				<Group
					datum={data.group2}
					stateShowGroup={showGroup2}
					stateSaveData={stateSaveData}
					setStateSaveData={setStateSaveData}
					currentGroup={currentGroup}
					setCurrentGroup={setCurrentGroup}
				/>
			)}
			<GroupButton
				selectGroup1={() => {
					if (!showGroup1) {
						setShowGroup1(true);
						setShowGroup2(false);
						setCurrentGroup(1);
					}
				}}
				selectGroup2={() => {
					if (!showGroup2) {
						setShowGroup2(true);
						setShowGroup1(false);
						setCurrentGroup(2);
					}
				}}
			/>
		</div>
	);
}
export default App;
