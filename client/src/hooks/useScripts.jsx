import { useEffect } from "react";

function useScripts(url) {
	useEffect(() => {
		const newScript = document.createElement("script");
		newScript.src = url;
		document.body.appendChild(newScript);
		return () => {
			document.body.removeChild(newScript);
		};
	}, [url]);
}

export default useScripts;
