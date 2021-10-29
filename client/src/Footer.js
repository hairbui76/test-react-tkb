import "./css/Footer.css";
import { useEffect } from "react";
import { $, $$ } from "./index";

function Footer(props) {
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
						<button id="default">Default color</button>
						<button id="reset">Reset all</button>
					</div>
					<div className="box-custom">
						<button id="hide-create" onClick={handleShowCreateMenu}>
							Hide/show create menu
						</button>
						<button id="down-btn">Save as png</button>
					</div>
				</fieldset>
				<button id="undo">Undo</button>
				<button id="redo">Redo</button>
			</div>
		</>
	);
}

export default Footer;
