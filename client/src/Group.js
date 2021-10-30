import { useState, useLayoutEffect } from "react";
import TaskTable from "./TaskTable";
import Footer from "./Footer";
import RightMenu from "./RightMenu";

function Group(props) {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	useLayoutEffect(() => {
		setTasks([
			...new Set(
				props.datum.map((data) => {
					return data.task;
				})
			),
		]);
	}, [props.stateShowGroup, props.datum]);
	return (
		<>
			<TaskTable
				state={props.stateShowGroup}
				datum={props.datum}
				tasks={tasks}
			/>
			<RightMenu
				stateSaveData={props.stateSaveData}
				setStateSaveData={props.setStateSaveData}
				datum={props.datum}
				tasks={tasks}
				setTasks={setTasks}
				task={task}
				setTask={setTask}
			/>
			<Footer
				setStateSaveData={props.setStateSaveData}
				stateSaveData={props.stateSaveData}
				currentGroup={props.currentGroup}
			/>
		</>
	);
}

export default Group;
