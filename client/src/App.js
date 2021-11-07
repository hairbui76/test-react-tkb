import { useState, useEffect, useContext } from "react";
import "./css/App.css";
import Group from "./Group";
import GroupButton from "./GroupButton";
import {
	GroupContextProvider,
	AppContext,
	UndoRedoContextProvider,
} from "./context";

function App() {
	const appContext = useContext(AppContext);
	const [data, setData] = useState({
		group1: [],
		group2: [],
	});
	useEffect(() => {
		const fetchData = async () => {
			const response1 = await fetch("/group1");
			const response2 = await fetch("/group2");
			const data1 = await response1.json();
			const data2 = await response2.json();
			setData({ group1: data1, group2: data2 });
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div id="container">
			<UndoRedoContextProvider>
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
				/>
			</UndoRedoContextProvider>
		</div>
	);
}
export default App;
