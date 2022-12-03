import { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
	const [showGroup1, setShowGroup1] = useState(true);
	const [showGroup2, setShowGroup2] = useState(false);
	const [stateSaveData, setStateSaveData] = useState(false);
	const [currentGroup, setCurrentGroup] = useState(1);
	const handleShowGroup1 = () => {
		if (!showGroup1) {
			setShowGroup1(true);
			setShowGroup2(false);
			setCurrentGroup(1);
		}
	};
	const handleShowGroup2 = () => {
		if (!showGroup2) {
			setShowGroup1(false);
			setShowGroup2(true);
			setCurrentGroup(2);
		}
	};
	const appContext = {
		showGroup1,
		setShowGroup1,
		showGroup2,
		setShowGroup2,
		stateSaveData,
		setStateSaveData,
		currentGroup,
		setCurrentGroup,
		handleShowGroup1,
		handleShowGroup2,
	};
	return (
		<AppContext.Provider value={appContext}>{children}</AppContext.Provider>
	);
}

export default AppContextProvider;
export { AppContext };
