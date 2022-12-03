import { createContext, useRef, useState } from "react";
import useUndo from "use-undo";

const UndoRedoContext = createContext();

const UndoRedoContextProvider = ({ children }) => {
	const [
		dataState,
		{
			set: setDataState,
			undo: undoDataState,
			redo: redoDataState,
			canUndo,
			canRedo,
		},
	] = useUndo([]);
	const [undoRedoSignal, setUndoRedoSignal] = useState(false);
	const isUndoRedo = useRef(false);
	const undoRedoContext = {
		setDataState,
		undoDataState,
		redoDataState,
		canUndo,
		canRedo,
		isUndoRedo,
		undoRedoSignal,
		setUndoRedoSignal,
		dataState,
	};
	return (
		<UndoRedoContext.Provider value={undoRedoContext}>
			{children}
		</UndoRedoContext.Provider>
	);
};

export default UndoRedoContextProvider;
export { UndoRedoContext };
