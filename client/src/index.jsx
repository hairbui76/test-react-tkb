import { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AppContextProvider } from "./context";

const loader = document.getElementById("loader");

const showLoader = () => {
	loader.classList.remove("loader-hide");
};

const hideLoader = () => {
	loader.classList.add("loader-hide");
};

ReactDOM.render(
	<StrictMode>
		<AppContextProvider>
			<App hideLoader={hideLoader} showLoader={showLoader} />
		</AppContextProvider>
	</StrictMode>,
	document.getElementById("root")
);
