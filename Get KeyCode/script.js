const container = document.querySelector(".container");

window.addEventListener("keydown", (e) => {
  container.innerHTML = `
		<div class="key">
			${e.key === " " ? "Space" : e.key}
			<p>key</p>
		</div>
		<div class="key">
			${e.keyCode}
			<p>keyCode</p>
		</div>
		<div class="key">
			${e.code}
			<p>code</p>
		</div>
	`;
});
