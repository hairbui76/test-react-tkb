/* eslint-disable react-hooks/exhaustive-deps */
import "./css/TaskTable.css";
import {
	useEffect,
	useState,
	useRef,
	forwardRef,
	useLayoutEffect,
} from "react";
import logoDelete from "./svg/times-solid.svg";

function TaskTable({ groupContext, replaceItem, ...props }, ref) {
	const [checkedCell, setCheckedCell] = useState(-1);
	const [cellCtrlMode, setCellCtrlMode] = useState([]);
	const refTime = useRef(null);
	const refLesson = useRef(null);
	const refMonday = useRef(null);
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
	useEffect(() => {
		const changeColor = (e) => {
			let rgb, brightness;
			rgb = e.target.value.convertToRGB();
			brightness = Math.round(
				(parseInt(rgb[0]) * 299 +
					parseInt(rgb[1]) * 587 +
					parseInt(rgb[2]) * 114) /
					1000
			);
			cellCtrlMode.forEach((cell) => {
				cell.style.background = e.target.value;
				cell.style.color = brightness > 125 ? "black" : "white";
			});
		};
		const removeCtrlMode = () => {
			props.setData((prev) => {
				let newData = [...prev];
				cellCtrlMode.forEach((cell) => {
					let check = newData.find((data) => data.index === parseInt(cell.id));
					if (check) {
						let newCell = Object.assign({}, check, {
							background: cell.style.background,
							color: cell.style.color,
						});
						newData = replaceItem(newData, newCell, check.index);
					}
				});
				return newData;
			});
			setCellCtrlMode([]);
		};
		groupContext.refPreset.current.addEventListener("input", changeColor);
		groupContext.refPreset.current.addEventListener("change", removeCtrlMode);
		return () => {
			groupContext.refPreset.current.removeEventListener("input", changeColor);
			groupContext.refPreset.current.removeEventListener(
				"change",
				removeCtrlMode
			);
		};
	}, [cellCtrlMode]);
	const handleClickEverywhere = (e) => {
		if (checkedCell !== -1) {
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
		for (let i = from; i < from + 7; ++i) {
			arr.push(
				<td
					ref={(element) => refTaskEach.current.push(element)}
					className="task-each"
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
					{data[i] ? data[i].task : ""}
					<ul
						id={i}
						style={{
							display: i === parseInt(checkedCell) ? "block" : "none",
							width: handleCellWidth(),
							height: refMonday.current
								? refMonday.current.offsetHeight + "px"
								: "",
							top: refMonday.current
								? refMonday.current.offsetHeight + "px"
								: "",
						}}>
						{groupContext.tasks.map((data, index) => (
							<li
								key={index}
								onClick={(e) => handleChooseOption(e.target.innerText, i)}>
								{data}
							</li>
						))}
					</ul>
					<img
						src={logoDelete}
						className="delete-data"
						style={{
							display: data[i] && data[i].task ? "block" : "none",
						}}
						alt={i}
						onClick={() => deleteData(i)}
					/>
				</td>
			);
		}
		return arr;
	};
	return (
		<div id="task-table">
			<table ref={groupContext.refTable}>
				<tbody>
					<tr>
						<td colSpan="2">UpdateAt</td>
						<td id="update" colSpan="7">
							{props.data[0] ? props.data[0].updateAt : ""}
						</td>
					</tr>
					<tr>
						<th id="lesson" ref={refLesson}>
							Tiết
						</th>
						<th id="time" className="day" ref={refTime}>
							Thời gian
						</th>
						<th
							id="monday"
							className="day"
							style={{ width: handleCellWidth() }}
							ref={refMonday}>
							Thứ 2
						</th>
						<th
							id="tuesday"
							className="day"
							style={{ width: handleCellWidth() }}>
							Thứ 3
						</th>
						<th
							id="wednesday"
							className="day"
							style={{ width: handleCellWidth() }}>
							Thứ 4
						</th>
						<th
							id="thursday"
							className="day"
							style={{ width: handleCellWidth() }}>
							Thứ 5
						</th>
						<th
							id="friday"
							className="day"
							style={{ width: handleCellWidth() }}>
							Thứ 6
						</th>
						<th
							id="saturday"
							className="day"
							style={{ width: handleCellWidth() }}>
							Thứ 7
						</th>
						<th
							id="sunday"
							className="day"
							style={{ width: handleCellWidth() }}>
							Chủ nhật
						</th>
					</tr>
					<tr>
						<td>1</td>
						<td>07h00' + 07h50'</td>
						{renderData(0)}
					</tr>
					<tr>
						<td>2</td>
						<td>08h00' + 08h50'</td>
						{renderData(7)}
					</tr>
					<tr>
						<td>3</td>
						<td>09h00' + 09h50'</td>
						{renderData(14)}
					</tr>
					<tr>
						<td>4</td>
						<td>10h00' + 10h50'</td>
						{renderData(21)}
					</tr>
					<tr>
						<td>5</td>
						<td>11h00' + 11h50'</td>
						{renderData(28)}
					</tr>
					<tr>
						<td>6</td>
						<td>12h00' + 12h50'</td>
						{renderData(35)}
					</tr>
					<tr>
						<td>7</td>
						<td>13h00' + 13h50'</td>
						{renderData(42)}
					</tr>
					<tr>
						<td>8</td>
						<td>14h00' + 14h50'</td>
						{renderData(49)}
					</tr>
					<tr>
						<td>9</td>
						<td>15h00' + 15h50'</td>
						{renderData(56)}
					</tr>
					<tr>
						<td>10</td>
						<td>16h00' + 16h50'</td>
						{renderData(63)}
					</tr>
					<tr>
						<td>11</td>
						<td>17h00' + 17h50'</td>
						{renderData(70)}
					</tr>
					<tr>
						<td>12</td>
						<td>18h00' + 18h50'</td>
						{renderData(77)}
					</tr>
					<tr>
						<td>13</td>
						<td>19h00' + 19h50'</td>
						{renderData(84)}
					</tr>
					<tr>
						<td>14</td>
						<td>20h00' + 20h50'</td>
						{renderData(91)}
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default forwardRef(TaskTable);
