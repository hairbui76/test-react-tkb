function HoverTableScript() {
	const $ = document.querySelector.bind(document);
	const $$ = document.querySelectorAll.bind(document);

	const allCells = [...$$("td")];
	const cellsCanHover = [
		...$$("tr:not(tr:first-child):not(tr:nth-child(2)) td"),
	];

	const handleMouseOverCell = (e) => {
		let cellsChangeBgColorByColumn = allCells.filter(
			(cell) =>
				cell.classList.contains(
					e.target.className.replace(/.*(column-[1-9])/, "$1")
				) && cell !== e.target
		);
		cellsChangeBgColorByColumn.forEach((cell) => {
			cell.classList.add("checked-cell");
		});
		e.target.parentElement.classList.add("checked-row");
	};

	const handleMouseOutCell = (e) => {
		allCells.forEach((cell) => {
			if (cell.classList.contains("checked-cell")) {
				cell.classList.remove("checked-cell");
			}
		});
		e.target.parentElement.classList.remove("checked-row");
	};

	cellsCanHover.forEach((cell) => {
		cell.addEventListener("mouseover", handleMouseOverCell);
		cell.addEventListener("mouseout", handleMouseOutCell);
	});
	return <></>;
}

export default HoverTableScript;
