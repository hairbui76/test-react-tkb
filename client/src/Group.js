import { useState, useLayoutEffect, useRef, useEffect } from "react";
import TaskTable from "./TaskTable";
import Footer from "./Footer";
import RightMenu from "./RightMenu";
import UndoRedoHandler from "./UndoRedoHandler";
import { $$ } from "./index";

function Group(props) {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [currentData, setCurrentData] = useState([]);
	const isUndoRedo = useRef(false);
	const undoRedoHandler = useRef(new UndoRedoHandler([]));
	useLayoutEffect(() => {
		let boxList = [...$$(".task-each")];
		for (let i = 0; i < currentData.length; i++) {
			if (currentData[i].content) boxList[i].lastChild.style.display = "block";
			else boxList[i].lastChild.style.display = "none";
			boxList[i].firstChild.data = currentData[i].content;
			boxList[i].style.color = currentData[i].color;
			boxList[i].style.backgroundColor = currentData[i].background;
		}
	}, [currentData]);
	useEffect(() => {
		if (!isUndoRedo.current) {
			undoRedoHandler.current.insert({
				currentData: currentData,
				currentTasks: tasks,
			});
			console.log(undoRedoHandler.current);
		} else isUndoRedo.current = false;
	}, [tasks, currentData]);
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
				currentData={currentData}
				setCurrentData={setCurrentData}
				undoRedoHandler={undoRedoHandler.current}
			/>
			<RightMenu
				stateSaveData={props.stateSaveData}
				setStateSaveData={props.setStateSaveData}
				datum={props.datum}
				tasks={tasks}
				setTasks={setTasks}
				task={task}
				setTask={setTask}
				currentData={currentData}
			/>
			<Footer
				setStateSaveData={props.setStateSaveData}
				stateSaveData={props.stateSaveData}
				currentGroup={props.currentGroup}
				setTasks={setTasks}
				setTask={setTask}
				currentData={currentData}
				setCurrentData={setCurrentData}
				undoRedoHandler={undoRedoHandler.current}
				datum={props.datum}
				isUndoRedo={isUndoRedo}
			/>
		</>
	);
}

export default Group;
