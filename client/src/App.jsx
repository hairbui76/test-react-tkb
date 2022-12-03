import { useState, useEffect, useContext } from "react";

import "./App.css";
import { Group, GroupButton } from "./components";
import { HoverTableScript } from "./scripts";
import {
	GroupContextProvider,
	AppContext,
	UndoRedoContextProvider,
} from "./context";

function App({ hideLoader }) {
	const appContext = useContext(AppContext);
	const [stateFetchData, setStateFetchData] = useState(false);
	const [data, setData] = useState({
		group1: [],
		group2: [],
	});
	// if data.group1 or data.group2 is undefined after fetch data, create a new data
	useEffect(() => {
		// check if fetch data finished
		if (stateFetchData) {
			if (!data.group1 || data.group1.length === 0) {
				setData({ group2: data.group2, group1: createBlankData() });
			}
			if (!data.group2 || data.group2.length === 0) {
				setData({ group1: data.group1, group2: createBlankData() });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateFetchData]);
	// check if data has been fetched successfully, hide the loader animation
	useEffect(() => {
		if (data.group1.length > 0 || data.group2.length > 0) {
			hideLoader();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);
	useEffect(() => {
		// wait to fetch data successfully, then setData
		(async () => {
			const response1 = await fetch("/group1?type=fetch");
			const response2 = await fetch("/group2?type=fetch");
			const data1 = await response1.json();
			const data2 = await response2.json();
			setData({ group1: data1, group2: data2 });
			setStateFetchData(true);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appContext.stateSaveData]);
	const createBlankData = () => {
		let arr = [];
		for (let i = 0; i < 98; i++) {
			arr.push({
				task: "",
				index: i,
				background: "",
				color: "",
				updateAt: "",
			});
		}
		return arr;
	};
	return (
		<div id="container">
			<UndoRedoContextProvider>
				<HoverTableScript />
				<GroupContextProvider>
					{appContext.showGroup1 && <Group datum={data.group1} />}
					{appContext.showGroup2 && <Group datum={data.group2} />}
				</GroupContextProvider>
				<GroupButton
					selectGroup1={appContext.handleShowGroup1}
					selectGroup2={appContext.handleShowGroup2}
					currentGroup={appContext.currentGroup}
				/>
			</UndoRedoContextProvider>
		</div>
	);
}
export default App;
