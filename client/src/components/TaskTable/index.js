/* eslint-disable react-hooks/exhaustive-deps */
import "./TaskTable.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
	useEffect,
	useState,
	useRef,
	forwardRef,
	useLayoutEffect,
} from "react";
import logoDelete from "../../svg/times-solid.svg";

function TaskTable({ groupContext, replaceItem, ...props }, ref) {
	const [checkedCell, setCheckedCell] = useState(-1);
	const [cellCtrlMode, setCellCtrlMode] = useState([]);
	const [hoverOption, setHoverOption] = useState({ id: -1, data: "" });
	const refTime = useRef(null);
	const refLesson = useRef(null);
	const refDays = useRef([]);
	const refTaskEach = useRef([]);
	useLayoutEffect(() => {
		props.handleData();
	}, [props.currentGroup]);
	useLayoutEffect(() => {
		handleCellWidth();
	}, [props.currentGroup, groupContext.windowWidth]);
	useEffect(() => {
		window.onclick = handleClickEverywhere;
	}, [props.currentGroup, checkedCell]);
	// eslint-disable-next-line no-extend-native
	String.prototype.convertToRGB = function () {
		let hex = this.match(/[^#]{1,2}/g);
		let rgb = [
			parseInt(hex[0], 16),
			parseInt(hex[1], 16),
			parseInt(hex[2], 16),
		];
		return rgb;
	};
	// useEffect(() => {
	// 	const changeColor = (e) => {
	// 		let rgb, brightness;
	// 		rgb = e.target.value.convertToRGB();
	// 		brightness = Math.round(
	// 			(parseInt(rgb[0]) * 299 +
	// 				parseInt(rgb[1]) * 587 +
	// 				parseInt(rgb[2]) * 114) /
	// 				1000
	// 		);
	// 		cellCtrlMode.forEach((cell) => {
	// 			cell.style.background = e.target.value;
	// 			cell.style.color = brightness > 125 ? "black" : "white";
	// 		});
	// 	};
	// 	const removeCtrlMode = () => {
	// 		props.setData((prev) => {
	// 			let newData = [...prev];
	// 			cellCtrlMode.forEach((cell) => {
	// 				let check = newData.find((data) => data.index === parseInt(cell.id));
	// 				if (check) {
	// 					let newCell = Object.assign({}, check, {
	// 						background: cell.style.background,
	// 						color: cell.style.color,
	// 					});
	// 					newData = replaceItem(newData, newCell, check.index);
	// 				}
	// 			});
	// 			return newData;
	// 		});
	// 		setCellCtrlMode([]);
	// 	};
	// 	groupContext.refPreset.current.addEventListener("input", changeColor);
	// 	groupContext.refPreset.current.addEventListener("change", removeCtrlMode);
	// 	return () => {
	// 		groupContext.refPreset.current.removeEventListener("input", changeColor);
	// 		groupContext.refPreset.current.removeEventListener(
	// 			"change",
	// 			removeCtrlMode
	// 		);
	// 	};
	// }, [cellCtrlMode]);
	const handleClickEverywhere = (e) => {
		if (checkedCell !== -1) {
			setHoverOption({ id: -1, data: "" });
			if (e.target.className !== "task-each") {
				e.preventDefault();
				setCheckedCell(-1);
			}
		}
		if (!e.ctrlKey) {
			if (e.target.id !== "preset") {
				setCellCtrlMode([]);
			}
		}
	};
	const handleChooseOption = (value, id) => {
		setCheckedCell(-1);
		props.setData((prev) => {
			let newData = [...prev];
			let replace = Object.assign({}, newData[id], { task: value });
			newData = [...newData.slice(0, id), replace, ...newData.slice(id + 1)];
			return newData;
		});
	};
	const handleCellWidth = () => {
		if (groupContext.refTable.current && refLesson.current && refTime.current) {
			return (
				(groupContext.refTable.current.offsetWidth -
					refTime.current.offsetWidth -
					refLesson.current.offsetWidth) /
					7 +
				"px"
			);
		}
	};
	const handleClickCell = (e) => {
		if (e.ctrlKey) {
			e.target.style.opacity = "1";
			setCheckedCell(-1);
			setCellCtrlMode((prev) => {
				let newList = [...prev];
				if (newList.includes(e.target)) {
					newList.splice(newList.indexOf(e.target), 1);
				} else {
					newList.push(e.target);
				}
				return newList;
			});
		} else {
			setCheckedCell(e.target.id);
		}
	};
	const deleteData = (id) => {
		props.setData((prev) => {
			let newData = [...prev];
			let replace = Object.assign({}, newData[id], { task: "" });
			newData = [...newData.slice(0, id), replace, ...newData.slice(id + 1)];
			return newData;
		});
	};
	const handleCellOpacity = (index) => {
		if (cellCtrlMode.length) {
			if (cellCtrlMode.includes(refTaskEach.current[index])) return 1;
			return 0.5;
		}
		return 1;
	};
	const handleCellBorderWidth = (index) => {
		if (cellCtrlMode.length) {
			if (cellCtrlMode.includes(refTaskEach.current[index])) return "2px";
			return "1px";
		}
		return "1px";
	};

	const renderData = (from, data = props.data) => {
		let arr = [];
		let daysIndex = 0;
		let columnsIndex = 3;
		for (let i = from; i < from + 7; ++i) {
			arr.push(
				<td
					ref={(e) => refTaskEach.current.push(e)}
					className={`task-each column-${columnsIndex}`}
					id={i}
					key={i}
					style={{
						backgroundColor:
							data[i] && data[i].background
								? data[i].background.replace(/(.*\)).*/, "$1")
								: "",
						color: data[i] ? data[i].color : "black",
						opacity: handleCellOpacity(i),
						borderWidth: handleCellBorderWidth(i),
					}}
					onClick={handleClickCell}>
					{hoverOption.id === i
						? hoverOption.data
						: data[i]
						? data[i].task
						: ""}
					<ul
						id={i}
						style={{
							display: i === parseInt(checkedCell) ? "block" : "none",
							height: refDays.current[daysIndex]
								? refDays.current[daysIndex].offsetHeight + "px"
								: "",
							width: refDays.current[daysIndex]
								? refDays.current[daysIndex].offsetWidth + "px"
								: "",
							top: refDays.current[daysIndex]
								? refDays.current[daysIndex].offsetHeight + "px"
								: "",
						}}>
						{groupContext.tasks.map((task, index) => (
							<li
								key={index}
								onClick={(e) => handleChooseOption(e.target.innerText, i)}
								onMouseOver={(e) =>
									setHoverOption({ id: i, data: e.target.innerText })
								}>
								{task}
							</li>
						))}
					</ul>
					<div
						src={logoDelete}
						className="delete-data"
						style={{
							display: data[i] && data[i].task ? "block" : "none",
						}}
						onClick={() => deleteData(i)}>
						<i className="fas fa-times"></i>
					</div>
				</td>
			);
			daysIndex++;
			columnsIndex++;
		}
		return arr;
	};
	return (
		<div id="task-table">
			<table ref={groupContext.refTable}>
				<tbody>
					<tr>
						<td
							colSpan="2"
							style={{
								fontWeight: "500",
								backgroundColor: "#484848",
								color: "white",
								borderRadius: "16px 0 0 0",
							}}>
							UpdateAt
						</td>
						<td id="update" colSpan="7">
							{props.data[0] ? props.data[0].updateAt : ""}
						</td>
					</tr>
					<tr
						style={{
							fontWeight: "500",
						}}>
						<th
							id="lesson"
							ref={refLesson}
							style={{ whiteSpace: "nowrap", fontWeight: "unset" }}
							className="column-1-head">
							Tiết
						</th>
						<th
							id="time"
							className="day column-2-head"
							ref={refTime}
							style={{ fontWeight: "unset" }}>
							Thời gian
						</th>
						<th
							id="monday"
							className="day column-3-head"
							style={{
								width: handleCellWidth(),
								whiteSpace: "nowrap",
								fontWeight: "unset",
							}}
							ref={(e) => (refDays.current[0] = e)}>
							Thứ 2
						</th>
						<th
							id="tuesday"
							className="day column-4-head"
							style={{
								width: handleCellWidth(),
								whiteSpace: "nowrap",
								fontWeight: "unset",
							}}
							ref={(e) => (refDays.current[1] = e)}>
							Thứ 3
						</th>
						<th
							id="wednesday"
							className="day column-5-head"
							style={{
								width: handleCellWidth(),
								whiteSpace: "nowrap",
								fontWeight: "unset",
							}}
							ref={(e) => (refDays.current[2] = e)}>
							Thứ 4
						</th>
						<th
							id="thursday"
							className="day column-6-head"
							style={{
								width: handleCellWidth(),
								whiteSpace: "nowrap",
								fontWeight: "unset",
							}}
							ref={(e) => (refDays.current[3] = e)}>
							Thứ 5
						</th>
						<th
							id="friday"
							className="day column-7-head"
							style={{
								width: handleCellWidth(),
								whiteSpace: "nowrap",
								fontWeight: "unset",
							}}
							ref={(e) => (refDays.current[4] = e)}>
							Thứ 6
						</th>
						<th
							id="saturday"
							className="day column-8-head"
							style={{
								width: handleCellWidth(),
								whiteSpace: "nowrap",
								fontWeight: "unset",
							}}
							ref={(e) => (refDays.current[5] = e)}>
							Thứ 7
						</th>
						<th
							id="sunday"
							className="day column-9-head"
							style={{
								width: handleCellWidth(),
								whiteSpace: "nowrap",
								fontWeight: "unset",
							}}
							ref={(e) => (refDays.current[6] = e)}>
							Chủ nhật
						</th>
					</tr>
					<tr>
						<td className="column-1">1</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							07h00' + 07h50'
						</td>
						{renderData(0)}
					</tr>
					<tr>
						<td className="column-1">2</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							08h00' + 08h50'
						</td>
						{renderData(7)}
					</tr>
					<tr>
						<td className="column-1">3</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							09h00' + 09h50'
						</td>
						{renderData(14)}
					</tr>
					<tr>
						<td className="column-1">4</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							10h00' + 10h50'
						</td>
						{renderData(21)}
					</tr>
					<tr>
						<td className="column-1">5</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							11h00' + 11h50'
						</td>
						{renderData(28)}
					</tr>
					<tr>
						<td className="column-1">6</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							12h00' + 12h50'
						</td>
						{renderData(35)}
					</tr>
					<tr>
						<td className="column-1">7</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							13h00' + 13h50'
						</td>
						{renderData(42)}
					</tr>
					<tr>
						<td className="column-1">8</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							14h00' + 14h50'
						</td>
						{renderData(49)}
					</tr>
					<tr>
						<td className="column-1">9</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							15h00' + 15h50'
						</td>
						{renderData(56)}
					</tr>
					<tr>
						<td className="column-1">10</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							16h00' + 16h50'
						</td>
						{renderData(63)}
					</tr>
					<tr>
						<td className="column-1">11</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							17h00' + 17h50'
						</td>
						{renderData(70)}
					</tr>
					<tr>
						<td className="column-1">12</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							18h00' + 18h50'
						</td>
						{renderData(77)}
					</tr>
					<tr>
						<td className="column-1">13</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							19h00' + 19h50'
						</td>
						{renderData(84)}
					</tr>
					<tr>
						<td className="column-1">14</td>
						<td style={{ whiteSpace: "nowrap" }} className="column-2">
							20h00' + 20h50'
						</td>
						{renderData(91)}
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default forwardRef(TaskTable);
