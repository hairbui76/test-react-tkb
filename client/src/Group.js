/* eslint-disable */
import { useLayoutEffect, useEffect, useContext } from "react";
import { GroupContext, UndoRedoContext } from "./context";
import TaskTable from "./TaskTable";
import Footer from "./Footer";
import RightMenu from "./RightMenu";

function Group({ appContext, datum }) {
	const groupContext = useContext(GroupContext);
	const undoRedoContext = useContext(UndoRedoContext);
	useEffect(() => {
		undoRedoContext.setDataState(groupContext.data);
	}, [groupContext.data]);
	useEffect(() => {
		groupContext.setData(undoRedoContext.dataState.present);
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
	}, [appContext.stateShowGroup]);
	useEffect(() => {
		groupContext.setWindowWidth(window.innerWidth);
		handleTaskContainerHeight();
	}, [groupContext.windowWidth]);
	useLayoutEffect(() => {
		groupContext.setTasks([
			...new Set(
				datum
					.filter((check) => check.task !== "")
					.map((data) => {
						return data.task;
					})
			),
		]);
		groupContext.setData(datum.sort(sortDataById));
		undoRedoContext.setDataState(datum.sort(sortDataById));
	}, [appContext.stateShowGroup, datum]);
	useEffect(() => {
		handleTotalTasksHeight();
	}, [groupContext.tasks]);
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
				state={appContext.stateShowGroup}
				datum={datum}
				replaceItem={replaceItem}
			/>
			<RightMenu groupContext={groupContext} replaceItem={replaceItem} />
			<Footer
				groupContext={groupContext}
				undoRedoContext={undoRedoContext}
				setStateSaveData={appContext.setStateSaveData}
				stateSaveData={appContext.stateSaveData}
				currentGroup={appContext.currentGroup}
			/>
		</>
	);
}

export default Group;
