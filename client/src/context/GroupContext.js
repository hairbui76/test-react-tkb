import { createContext, useState, useRef } from "react";

const GroupContext = createContext();

function GroupContextProvider({ children }) {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [data, setData] = useState([]);
	const [windowWidth, setWindowWidth] = useState(0);
	const [totalTasksHeight, setTotalTasksHeight] = useState("");
	const [taskContainerHeight, setTaskContainerHeight] = useState("");
	const refCreateTask = useRef(null);
	const refTaskContainer = useRef(null);
	const refFooter = useRef(null);
	const refCustom = useRef(null);
	const refTable = useRef(null);
	const refRightMenu = useRef(null);
	const refPreset = useRef(null);
	const optionLists = useRef([]);
	const refTasks = useRef([]);
	const groupContext = {
		task,
		setTask,
		tasks,
		setTasks,
		data,
		setData,
		windowWidth,
		setWindowWidth,
		totalTasksHeight,
		setTotalTasksHeight,
		taskContainerHeight,
		setTaskContainerHeight,
		optionLists,
		refCreateTask,
		refTaskContainer,
		refFooter,
		refCustom,
		refTasks,
		refTable,
		refRightMenu,
		refPreset,
	};
	return (
		<GroupContext.Provider value={groupContext}>
			{children}
		</GroupContext.Provider>
	);
}

export default GroupContextProvider;
export { GroupContext };
