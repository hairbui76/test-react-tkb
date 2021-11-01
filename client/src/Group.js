import { useState, useLayoutEffect, useRef, useEffect } from "react";
import TaskTable from "./TaskTable";
import Footer from "./Footer";
import RightMenu from "./RightMenu";
import UndoRedoHandler from "./UndoRedoHandler";
import { $, $$ } from "./index";

function Group(props) {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [currentData, setCurrentData] = useState([]);
	const [undoRedoSignal, setUndoRedoSignal] = useState(false);
	const optionLists = useRef([]);
	const isUndoRedo = useRef(false);
	const undoRedoHandler = useRef(new UndoRedoHandler([]));
	useEffect(() => {
		let boxList = [...$$(".task-each")];
		for (let i = 0; i < currentData.length; i++) {
			if (tasks.includes(currentData[i].content) || !currentData[i].content) {
				if (currentData[i].content)
					boxList[i].lastChild.style.display = "block";
				else boxList[i].lastChild.style.display = "none";
				boxList[i].firstChild.data = currentData[i].content;
				boxList[i].style.color = currentData[i].color;
				boxList[i].style.backgroundColor = currentData[i].background;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tasks, currentData]);
	useEffect(() => {
		if (!isUndoRedo.current) {
			undoRedoHandler.current.insert({
				currentData: currentData,
				currentTasks: tasks,
			});
			optionLists.current = tasks;
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
		setCurrentData(
			[...$$(".task-each")].map((cell) => {
				return {
					content: cell.innerText,
					color: cell.style.color,
					background: cell.style.backgroundColor,
				};
			})
		);
	}, [props.stateShowGroup, props.datum]);
	useEffect(() => {
		[...$$("li")].forEach((option) => {
			if (!tasks.includes(option.innerText)) {
				option.remove();
			}
		});
		if ($(".task")) {
			let taskBox = [...$$(".task")];
			let totalHeight =
				$("#footer").offsetHeight + $("#create-task").offsetHeight;
			for (let i = 0; i < taskBox.length; ++i) {
				totalHeight += taskBox[i].offsetHeight;
				if (totalHeight > $("#task-container").offsetHeight)
					$("#task-container").style.overflowY = "scroll";
			}
		}
	}, [tasks]);
	const handleCurrentData = () => {
		setCurrentData(
			[...$$(".task-each")].map((cell) => {
				return {
					content: cell.innerText,
					color: cell.style.color,
					background: cell.style.backgroundColor,
				};
			})
		);
	};
	return (
		<>
			<TaskTable
				state={props.stateShowGroup}
				datum={props.datum}
				tasks={tasks}
				currentData={currentData}
				setCurrentData={setCurrentData}
				optionLists={optionLists}
				handleCurrentData={handleCurrentData}
				undoRedoHandler={undoRedoHandler}
			/>
			<RightMenu
				datum={props.datum}
				tasks={tasks}
				setTasks={setTasks}
				task={task}
				setTask={setTask}
				handleCurrentData={handleCurrentData}
				undoRedoHandler={undoRedoHandler}
			/>
			<Footer
				setStateSaveData={props.setStateSaveData}
				stateSaveData={props.stateSaveData}
				currentGroup={props.currentGroup}
				setTasks={setTasks}
				setTask={setTask}
				setCurrentData={setCurrentData}
				undoRedoHandler={undoRedoHandler}
				datum={props.datum}
				isUndoRedo={isUndoRedo}
				setUndoRedoSignal={setUndoRedoSignal}
				undoRedoSignal={undoRedoSignal}
				optionLists={optionLists}
			/>
		</>
	);
}

export default Group;
