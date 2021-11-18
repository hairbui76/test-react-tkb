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
	const [data, setData] = useState({
		group1: [],
		group2: [],
	});
	// eslint-disable-next-line
	useEffect(hideLoader, []);
	useEffect(() => {
		const fetchData = async () => {
			const response1 = await fetch("/group1?type=fetch");
			const response2 = await fetch("/group2?type=fetch");
			const data1 = await response1.json();
			const data2 = await response2.json();
			setData({ group1: data1, group2: data2 });
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appContext.stateSaveData]);
	return (
		<div id="container">
			<UndoRedoContextProvider>
				<HoverTableScript />
				<GroupContextProvider>
					{appContext.showGroup1 && (
						<Group datum={data.group1} appContext={appContext} />
					)}
					{appContext.showGroup2 && (
						<Group datum={data.group2} appContext={appContext} />
					)}
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
