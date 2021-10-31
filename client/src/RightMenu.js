import { useState, useEffect } from "react";
import "./css/RightMenu.css";
import logoDeleteTask from "./svg/times-circle-regular.svg";
import { $, $$ } from "./index";

function RightMenu(props) {
	const [newClassForIsEmpty, setNewClassForIsEmpty] = useState("");
	const [newClassForIsCreated, setNewClassForIsCreated] = useState("");
	useEffect(() => {
		[...$$("li")].forEach((option) => {
			if (!props.tasks.includes(option.innerText)) {
				option.remove();
			}
		});
	}, [props.tasks]);
	useEffect(() => {
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
	}, [props.tasks]);
	const handleCreateTaskByEnter = (e) => {
		if (e.key === "Enter") handleCreateTask();
	};
	const handleCreateTask = () => {
		if (props.task === "") {
			setNewClassForIsEmpty("show-empty");
			setNewClassForIsCreated("");
		} else if (props.tasks.includes(props.task)) {
			setNewClassForIsCreated("show-created");
			setNewClassForIsEmpty("");
		} else {
			setNewClassForIsEmpty("");
			setNewClassForIsCreated("");
			props.setTasks((prev) => [...prev, props.task]);
			props.setTask("");
		}
	};
	const handleDeleteTask = (e) => {
		let removeContent = e.target.previousElementSibling.innerText;
		[...$$(".task-each")].forEach((cell) => {
			if (cell.innerText === removeContent) {
				cell.firstChild.data = "";
				cell.lastChild.style.display = "none";
			}
		});
		// array splice is not working?
		props.setTasks((prev) => prev.filter((check) => check !== removeContent));
	};
	return (
		<div id="right-menu">
			<div id="task-container">
				<fieldset id="create-task">
					<legend>Create task:</legend>
					<div id="task-box">
						<input
							type="text"
							placeholder="Type any task here"
							onChange={(e) => props.setTask(e.target.value)}
							onKeyUp={handleCreateTaskByEnter}
							value={props.task}
						/>
						<button id="create-btn" onClick={handleCreateTask}>
							Create
						</button>
					</div>
					<p id="is-empty" className={newClassForIsEmpty}>
						<small>Empty input!</small>
					</p>
					<p id="is-created" className={newClassForIsCreated}>
						<small>Task has already been created!</small>
					</p>
				</fieldset>
				{props.tasks.map((task, index) => {
					return (
						<div className="task" key={index}>
							<div className="content">{task}</div>
							<img
								alt="logo-delete-task"
								src={logoDeleteTask}
								className="close"
								onClick={handleDeleteTask}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default RightMenu;
