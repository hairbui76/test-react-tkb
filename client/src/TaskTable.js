import "./css/TaskTable.css";
import { useEffect, useState, useLayoutEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import logoDelete from "./svg/times-solid.svg";
import { $, $$ } from "./index";

function TaskTable(props) {
	const [checkedCell, setCheckedCell] = useState(-1);
	const [windowWidth, setWindowWidth] = useState(0);
	const [updateAt, setUpdateAt] = useState("");
	const [optionLists, setOptionLists] = useState([]);
	useEffect(() => {
		setUpdateAt(props.datum[0] ? props.datum[0].updateAt : "");
	}, [props.state, props.datum]);
	// create options of cell
	useEffect(() => {
		[...$$(".task-each")].forEach((cell) => {
			props.tasks.forEach((optionContent) => {
				if (!optionLists.includes(optionContent)) {
					let newOption = document.createElement("li");
					newOption.innerText = optionContent;
					cell.firstElementChild.appendChild(newOption);
					setOptionLists((prev) => [...prev, optionContent]);
				}
			});
		});
		// eslint-disable-next-line
	}, [props.state, props.tasks]);
	useEffect(() => {
		setWindowWidth(window.innerWidth);
		[...$$(".delete-data")].forEach((deleteTaskButton) => {
			deleteTaskButton.onclick = deleteTask;
		});
		[...$$(".task-each")].forEach((cell) => {
			cell.onclick = handleClickCell;
		});
		[...$$("li")].forEach((option) => {
			option.onclick = handleChooseOption;
		});
		window.onresize = handleTableResize;
		window.onclick = handleClickEverywhere;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.state, checkedCell]);
	useEffect(() => {
		[...$$("ul")].forEach((taskList) => {
			taskList.style.height = taskList.parentElement.offsetHeight + "px";
			taskList.style.width = taskList.parentElement.offsetWidth + "px";
			taskList.style.top = taskList.parentElement.offsetHeight + "px";
		});
	}, [props.state, windowWidth, props.tasks]);
	useLayoutEffect(() => {
		[...$$("ul")].forEach((taskList) => {
			taskList.style.display =
				taskList.parentElement.id === checkedCell ? "block" : "none";
		});
	}, [props.state, checkedCell]);
	useLayoutEffect(() => {
		const day = [...$$(".day")];
		for (let i = 0; i < day.length; ++i) {
			day[i].style.width =
				($("table").offsetWidth -
					$("#lesson").offsetWidth -
					$("#time").offsetWidth) /
					7 +
				"px";
		}
	}, [windowWidth]);
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
	const changeColor = (e) => {
		// undoRedoHandler.insert(boxList);
		let rgb, brightness;
		let arr = [...$$(".ctrl-mode")];
		for (let i = 0; i < arr.length; ++i) {
			arr[i].style.backgroundColor = e.target.value;
			rgb = e.target.value.convertToRGB();
			brightness = Math.round(
				(parseInt(rgb[0]) * 299 +
					parseInt(rgb[1]) * 587 +
					parseInt(rgb[2]) * 114) /
					1000
			);
			arr[i].style.color = brightness > 125 ? "black" : "white";
			arr[i].classList.add("custom");
		}
		// undoRedoHandler.insert(boxList);
	};
	const removeCtrlMode = () => {
		$("#preset").removeEventListener("input", changeColor);
		[...$$(".ctrl-mode")].forEach((item) => {
			item.classList.remove("ctrl-mode");
		});
	};
	const handleClickEverywhere = (e) => {
		if (checkedCell !== -1) {
			if (e.target.className !== "task-each") {
				e.preventDefault();
				setCheckedCell(-1);
			}
		}
		if (!e.ctrlKey) {
			if (e.target.id !== "preset") {
				[...$$(".ctrl-mode")].forEach((item) => {
					item.classList.remove("ctrl-mode");
				});
			}
		}
	};
	const handleChooseOption = (e) => {
		let changeText = e.target.parentElement.parentElement.outerHTML.replace(
			/(.*>).*[\n\t]*(<ul.*)/,
			`$1${e.target.innerText}$2`
		);
		e.target.parentElement.parentElement.outerHTML = changeText;
		$(`img[alt='${e.target.parentElement.id}']`).style.display = "block";
		setCheckedCell(-1);
	};
	const handleTableResize = () => {
		setWindowWidth(window.innerWidth);
	};
	const handleClickCell = (e) => {
		if (e.ctrlKey) {
			e.target.classList.toggle("ctrl-mode");
			$("#preset").addEventListener("input", changeColor);
			$("#preset").addEventListener("change", removeCtrlMode);
		} else {
			setCheckedCell(e.target.id);
		}
	};
	const deleteTask = (e) => {
		e.target.parentElement.firstChild.data = "";
		e.target.parentElement.style.backgroundColor = "";
		e.target.style.display = "none";
	};
	const renderData = (from) => {
		let html = "";
		for (let i = from; i < from + 7; ++i) {
			let check = props.datum.find((data) => {
				return data.index === i;
			});
			if (check)
				html += `<td class="task-each" id=${i} style="background-color: ${
					check.background
				}">${check.task}
							<ul style=${{
								display: i === checkedCell ? "block" : "none",
							}} id=${i}>
							</ul>
							<img
								src=${logoDelete}
								class="delete-data"
								style="display: block"
								alt=${i}
							/>
						</td>`;
			else
				html += `<td class="task-each" id=${i}>
							<ul style="display: none" id=${i}></ul>
							<img
								src=${logoDelete}
								class="delete-data"
								style="display: none"
								alt=${i}
							/>
						</td>`;
		}
		return html;
	};
	return (
		<div id="task-table">
			<table>
				<tbody>
					<tr>
						<td colSpan="2">UpdateAt</td>
						<td id="update" colSpan="7">
							{updateAt}
						</td>
					</tr>
					<tr>
						<th id="lesson">Tiết</th>
						<th id="time" className="day">
							Thời gian
						</th>
						<th id="monday" className="day">
							Thứ 2
						</th>
						<th id="tuesday" className="day">
							Thứ 3
						</th>
						<th id="wednesday" className="day">
							Thứ 4
						</th>
						<th id="thursday" className="day">
							Thứ 5
						</th>
						<th id="friday" className="day">
							Thứ 6
						</th>
						<th id="saturday" className="day">
							Thứ 7
						</th>
						<th id="sunday" className="day">
							Chủ nhật
						</th>
					</tr>
					<tr>
						<td>1</td>
						<td>07h00' + 07h50'</td>
						<>{ReactHtmlParser(renderData(0))}</>
					</tr>
					<tr>
						<td>2</td>
						<td>08h00' + 08h50'</td>
						<>{ReactHtmlParser(renderData(7))}</>
					</tr>
					<tr>
						<td>3</td>
						<td>09h00' + 09h50'</td>
						<>{ReactHtmlParser(renderData(14))}</>
					</tr>
					<tr>
						<td>4</td>
						<td>10h00' + 10h50'</td>
						<>{ReactHtmlParser(renderData(21))}</>
					</tr>
					<tr>
						<td>5</td>
						<td>11h00' + 11h50'</td>
						<>{ReactHtmlParser(renderData(28))}</>
					</tr>
					<tr>
						<td>6</td>
						<td>12h00' + 12h50'</td>
						<>{ReactHtmlParser(renderData(35))}</>
					</tr>
					<tr>
						<td>7</td>
						<td>13h00' + 13h50'</td>
						<>{ReactHtmlParser(renderData(42))}</>
					</tr>
					<tr>
						<td>8</td>
						<td>14h00' + 14h50'</td>
						<>{ReactHtmlParser(renderData(49))}</>
					</tr>
					<tr>
						<td>9</td>
						<td>15h00' + 15h50'</td>
						<>{ReactHtmlParser(renderData(56))}</>
					</tr>
					<tr>
						<td>10</td>
						<td>16h00' + 16h50'</td>
						<>{ReactHtmlParser(renderData(63))}</>
					</tr>
					<tr>
						<td>11</td>
						<td>17h00' + 17h50'</td>
						<>{ReactHtmlParser(renderData(70))}</>
					</tr>
					<tr>
						<td>12</td>
						<td>18h00' + 18h50'</td>
						<>{ReactHtmlParser(renderData(77))}</>
					</tr>
					<tr>
						<td>13</td>
						<td>19h00' + 19h50'</td>
						<>{ReactHtmlParser(renderData(84))}</>
					</tr>
					<tr>
						<td>14</td>
						<td>20h00' + 20h50'</td>
						<>{ReactHtmlParser(renderData(93))}</>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default TaskTable;
