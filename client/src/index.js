import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
