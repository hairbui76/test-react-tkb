import "./css/Footer.css";
import { useEffect } from "react";
import { $, $$ } from "./index";
import html2canvas from "html2canvas";

function Footer(props) {
	useEffect(() => {
		props.setCurrentData(
			[...$$(".task-each")].map((cell) => {
				return {
					content: cell.innerText,
					color: cell.style.color,
					background: cell.style.backgroundColor,
				};
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.datum]);
	useEffect(() => {
		const footer = $("#footer");
		const taskContainer = $("#task-container");
		const body = $("body");
		const createTask = $("#create-task");
		footer.style.width = footer.firstChild.offsetWidth + "px";
		footer.style.height = footer.firstChild.offsetHeight + "px";
		taskContainer.style.height =
			body.offsetHeight -
			footer.offsetHeight -
			createTask.offsetHeight +
			40 +
			"px";
	}, []);
	useEffect(() => {
		document.addEventListener("keydown", handleUndoRedoUseKeyboard);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleShowCreateMenu = () => {
		$("#right-menu").style.display =
			$("#right-menu").style.display === "none" ? "block" : "none";
	};
	const handleSaveData = () => {
		const taskEach = [...$$(".task-each")];
		let arr = [];
		for (let i = 0; i < taskEach.length; ++i) {
			if (taskEach[i].innerText) {
				arr.push({
					task: taskEach[i].innerText,
					index: i,
					background: taskEach[i].style.backgroundColor,
					color: taskEach[i].style.color,
					updateAt: Date(),
				});
			}
		}
		sendData(arr);
	};
	const sendData = (arr) => {
		if (props.currentGroup === 1) {
			fetch("/group1", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(arr),
			}).catch((err) => console.log(err));
		} else {
			fetch("/group2", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(arr),
			})
				.then(() => {
					alert("Saving successfully!");
				})
				.catch((err) => console.log(err));
		}
		console.log("Saved!");
		props.setStateSaveData(!props.stateSaveData);
	};
	const handleDownloadTable = () => {
		html2canvas($("table")).then((canvas) => {
			let a = document.createElement("a");
			document.body.appendChild(a);
			a.download = "TKB.png";
			a.href = canvas.toDataURL();
			a.target = "_blank";
			a.click();
		});
	};
	const handleRestoreColor = () => {
		[...$$(".task-each")].forEach((cell) => {
			cell.style.backgroundColor = "";
			cell.style.color = "";
		});
	};
	const handleResetAll = () => {
		$("#default").click();
		[...$$(".task-each")].forEach((cell) => {
			cell.firstChild.data = "";
			cell.lastChild.style.display = "none";
		});
		props.setTasks([]);
		props.setTask("");
		// cannot use this line while keeping sth in the input field?
		// [...$$(".close")].forEach((btn) => {
		// 	btn.click();
		// });
	};
	const handleUndoRedoState = (state) => {
		if (state) {
			props.isUndoRedo.current = true;
			props.setCurrentData(state.currentData);
			props.setTasks(state.currentTasks);
		}
	};
	const handleUndo = () => {
		let state = props.undoRedoHandler.getPrevState();
		handleUndoRedoState(state);
	};
	const handleRedo = () => {
		let state = props.undoRedoHandler.getNextState();
		handleUndoRedoState(state);
	};
	const handleUndoRedoUseKeyboard = (e) => {
		if (e.ctrlKey) {
			if (e.key === "z") handleUndo();
			if (e.key === "y") handleRedo();
		}
	};
	return (
		<>
			<div id="footer">
				<fieldset id="custom">
					<legend>Customization:</legend>
					<div className="box-custom">
						<button type="submit" id="save" onClick={handleSaveData}>
							Save
						</button>
					</div>
					<div className="box-custom">
						<input type="color" id="preset" defaultValue="#fd0000" />
						<button id="default" onClick={handleRestoreColor}>
							Default color
						</button>
						<button id="reset" onClick={handleResetAll}>
							Reset all
						</button>
					</div>
					<div className="box-custom">
						<button id="hide-create" onClick={handleShowCreateMenu}>
							Hide/show create menu
						</button>
						<button id="down-btn" onClick={handleDownloadTable}>
							Save as png
						</button>
					</div>
				</fieldset>
				<button id="undo" onClick={handleUndo}>
					Undo
				</button>
				<button id="redo" onClick={handleRedo}>
					Redo
				</button>
			</div>
		</>
	);
}

export default Footer;
