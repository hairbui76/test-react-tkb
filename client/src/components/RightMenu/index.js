import { useState, forwardRef } from "react";
import "./RightMenu.css";

function RightMenu({ groupContext, replaceItem, setData }, ref) {
	const [newClassForIsEmpty, setNewClassForIsEmpty] = useState("");
	const [newClassForIsCreated, setNewClassForIsCreated] = useState("");
	const handleCreateTaskByEnter = (element) => {
		if (element.key === "Enter") handleCreateTask();
	};
	const handleCreateTask = () => {
		if (groupContext.task === "") {
			setNewClassForIsEmpty("show-empty");
			setNewClassForIsCreated("");
		} else if (groupContext.tasks.includes(groupContext.task)) {
			setNewClassForIsCreated("show-created");
			setNewClassForIsEmpty("");
		} else {
			setNewClassForIsEmpty("");
			setNewClassForIsCreated("");
			groupContext.setTasks((prev) => [...prev, groupContext.task]);
			groupContext.setTask("");
		}
	};
	const handleDeleteTask = (content, id) => {
		setData((prev) => {
			let newData = [...prev];
			newData.forEach((data) => {
				if (content === data.task) {
					let newCell = Object.assign({}, data, {
						task: "",
						background: "",
						color: "",
					});
					newData = replaceItem(newData, newCell, data.index);
				}
			});
			return newData;
		});
		groupContext.setTasks((prev) => {
			let newTasks = [...prev];
			newTasks.splice(id, 1);
			return newTasks;
		});
	};
	return (
		<div id="right-menu" ref={groupContext.refRightMenu}>
			<div
				id="task-container"
				ref={groupContext.refTaskContainer}
				style={{
					height: groupContext.taskContainerHeight,
					overFlowY:
						groupContext.totalTasksHeight > groupContext.taskContainerHeight
							? "scroll"
							: "none",
				}}>
				<div id="create-task" ref={groupContext.refCreateTask}>
					<p style={{ margin: "5px 0", fontWeight: "500", color: "#484848" }}>
						Create task:
					</p>
					<div id="task-box">
						<input
							id="input-task"
							type="text"
							placeholder="Type any task here"
							onChange={(element) => groupContext.setTask(element.target.value)}
							onKeyUp={handleCreateTaskByEnter}
							value={groupContext.task}
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
				</div>
				{groupContext.tasks.map((task, index) => {
					return (
						<div
							className="task"
							key={index}
							ref={(element) => {
								if (
									!groupContext.refTasks.current.find(
										(task) => task === element
									) &&
									element
								) {
									groupContext.refTasks.current.push(element);
								}
							}}>
							<div className="content">{task}</div>

							<i
								className="close fas fa-times-circle"
								onClick={() => handleDeleteTask(task, index)}></i>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default forwardRef(RightMenu);