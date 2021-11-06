import "./css/Footer.css";
import { useEffect, forwardRef } from "react";
import html2canvas from "html2canvas";

function Footer({ groupContext, undoRedoContext, ...props }, ref) {
	useEffect(() => {
		document.addEventListener("keydown", handleUndoRedoUseKeyboard);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleShowCreateMenu = () => {
		groupContext.refRightMenu.current.style.display =
			groupContext.refRightMenu.current.style.display === "none"
				? "block"
				: "none";
	};
	const handleSaveData = () => {
		let check = prompt(
			"CAUTION: THIS WILL DETELE ALL YOU PREVIOUS DATA AND CANNOT BE UNDO!\nPlease insert your leader's password to continue"
		);
		if (check) {
			if (check.trim() === "chienthan") {
				sendData(groupContext.data);
			} else alert("Wrong password! Please contact your leader to continue");
		}
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
		alert("Saved!!!");
		props.setStateSaveData(!props.stateSaveData);
	};
	const handleDownloadTable = () => {
		html2canvas(groupContext.refTable.current).then((canvas) => {
			let a = document.createElement("a");
			document.body.appendChild(a);
			a.download = "TKB.png";
			a.href = canvas.toDataURL();
			a.target = "_blank";
			a.click();
		});
	};
	const handleRestoreColor = () => {
		groupContext.setData((prev) => {
			let newData = [...prev];
			newData.forEach((item) => {
				item.background = "";
				item.color = "";
			});
			return newData;
		});
	};
	const handleResetAll = () => {
		groupContext.setData((prev) => {
			let newData = [...prev];
			newData.forEach((item) => {
				item.background = "";
				item.color = "";
				item.task = "";
			});
			return newData;
		});
		groupContext.setTasks([]);
		groupContext.setTask("");
	};
	const handleUndoRedoUseKeyboard = (e) => {
		if (e.ctrlKey) {
			if (e.key === "z") props.undoDataState();
			if (e.key === "y") props.redoDataState();
		}
	};
	const handleUndo = () => {
		undoRedoContext.undoDataState();
		undoRedoContext.setUndoRedoSignal(!undoRedoContext.undoRedoSignal);
	};
	const handleRedo = () => {
		undoRedoContext.redoDataState();
		undoRedoContext.setUndoRedoSignal(!undoRedoContext.undoRedoSignal);
	};
	return (
		<>
			<div
				id="footer"
				ref={groupContext.refFooter}
				style={{
					width: groupContext.refCustom.current
						? groupContext.refCustom.current.offsetWidth + "px"
						: "",
					height: groupContext.refCustom.current
						? groupContext.refCustom.current.offsetHeight + "px"
						: "",
				}}>
				<fieldset id="custom" ref={groupContext.refCustom}>
					<legend>Customization:</legend>
					<div className="box-custom">
						<button type="submit" id="save" onClick={handleSaveData}>
							Save
						</button>
					</div>
					<div className="box-custom">
						<input
							type="color"
							id="preset"
							defaultValue="#fd0000"
							ref={groupContext.refPreset}
						/>
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
				<button
					id="undo"
					onClick={handleUndo}
					disabled={!undoRedoContext.canUndo}>
					Undo
				</button>
				<button
					id="redo"
					onClick={handleRedo}
					disabled={!undoRedoContext.canRedo}>
					Redo
				</button>
			</div>
		</>
	);
}

export default forwardRef(Footer);
