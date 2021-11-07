/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { GroupContext, UndoRedoContext } from "./context";
import TaskTable from "./TaskTable";
import Footer from "./Footer";
import RightMenu from "./RightMenu";

function Group({ appContext, datum }) {
	const [data, setData] = useState([]);
	const groupContext = useContext(GroupContext);
	const undoRedoContext = useContext(UndoRedoContext);
	useEffect(() => {
		undoRedoContext.setDataState(data);
	}, [data]);
	useEffect(() => {
		setData(undoRedoContext.dataState.present);
		groupContext.setTasks([
			...new Set(
				undoRedoContext.dataState.present
					.filter((data) => data.task !== "")
					.map((data) => data.task)
			),
		]);
	}, [undoRedoContext.undoRedoSignal]);
	useEffect(() => {
		window.addEventListener("resize", () =>
			groupContext.setWindowWidth(window.innerWidth)
		);
		return () =>
			window.removeEventListener("resize", () =>
				groupContext.setWindowWidth(window.innerWidth)
			);
	}, [appContext.currentGroup]);
	useEffect(() => {
		groupContext.setWindowWidth(window.innerWidth);
		console.log(groupContext.windowWidth);
		handleTaskContainerHeight();
	}, [groupContext.windowWidth]);
	useEffect(() => {
		handleTotalTasksHeight();
	}, [groupContext.tasks]);
	useEffect(() => {
		handleData();
	}, [datum]);
	const handleData = () => {
		groupContext.setTasks([
			...new Set(
				datum
					.filter((check) => check.task !== "")
					.map((data) => {
						return data.task;
					})
			),
		]);
		setData(datum.sort(sortDataById));
		undoRedoContext.setDataState(datum.sort(sortDataById));
	};
	const replaceItem = (arr, item, id) => {
		return [...arr.slice(0, id), item, ...arr.slice(id + 1)];
	};
	const handleTotalTasksHeight = () => {
		let totalHeight =
			groupContext.refFooter.current.offsetHeight +
			groupContext.refCreateTask.current.offsetHeight;
		for (let i = 0; i < groupContext.refTasks.current.length; ++i) {
			totalHeight += groupContext.refTasks.current[i].offsetHeight;
		}
		groupContext.setTotalTasksHeight(totalHeight);
	};
	const handleTaskContainerHeight = () => {
		if (groupContext.refFooter.current && groupContext.refCreateTask.current) {
			groupContext.setTaskContainerHeight(
				window.innerHeight -
					groupContext.refFooter.current.offsetHeight -
					groupContext.refCreateTask.current.offsetHeight +
					40 +
					"px"
			);
		}
	};
	const sortDataById = (a, b) => {
		if (a.index < b.index) return -1;
		if (a.index > b.index) return 1;
		return 0;
	};
	return (
		<>
			<TaskTable
				groupContext={groupContext}
				currentGroup={appContext.currentGroup}
				datum={datum}
				replaceItem={replaceItem}
				data={data}
				setData={setData}
				handleData={handleData}
			/>
			<RightMenu
				groupContext={groupContext}
				replaceItem={replaceItem}
				setData={setData}
			/>
			<Footer
				groupContext={groupContext}
				undoRedoContext={undoRedoContext}
				setStateSaveData={appContext.setStateSaveData}
				stateSaveData={appContext.stateSaveData}
				currentGroup={appContext.currentGroup}
				replaceItem={replaceItem}
				data={data}
				setData={setData}
			/>
		</>
	);
}

export default Group;
