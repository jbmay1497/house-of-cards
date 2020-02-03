import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, a as space, e as element, t as text, q as query_selector_all, b as detach_dev, c as claim_space, f as claim_element, g as children, h as claim_text, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, n as listen_dev, o as noop, r as run_all } from './client.eac2c067.js';

/* src/routes/index.svelte generated by Svelte v3.18.1 */

const file = "src/routes/index.svelte";

function create_fragment(ctx) {
	let t0;
	let h1;
	let t1;
	let t2;
	let button0;
	let t3;
	let t4;
	let button1;
	let t5;
	let dispose;

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text("Great success!");
			t2 = space();
			button0 = element("button");
			t3 = text("Create Room");
			t4 = space();
			button1 = element("button");
			t5 = text("Join Game");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-oh6yg0\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Great success!");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			button0 = claim_element(nodes, "BUTTON", { id: true, class: true });
			var button0_nodes = children(button0);
			t3 = claim_text(button0_nodes, "Create Room");
			button0_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			button1 = claim_element(nodes, "BUTTON", { id: true, class: true });
			var button1_nodes = children(button1);
			t5 = claim_text(button1_nodes, "Join Game");
			button1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Sapper project template";
			attr_dev(h1, "class", "svelte-96bxhk");
			add_location(h1, file, 46, 0, 565);
			attr_dev(button0, "id", "createButton");
			attr_dev(button0, "class", "svelte-96bxhk");
			add_location(button0, file, 48, 0, 590);
			attr_dev(button1, "id", "joinButton");
			attr_dev(button1, "class", "svelte-96bxhk");
			add_location(button1, file, 52, 0, 670);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, button0, anchor);
			append_dev(button0, t3);
			insert_dev(target, t4, anchor);
			insert_dev(target, button1, anchor);
			append_dev(button1, t5);

			dispose = [
				listen_dev(button0, "click", handleCreateClick, false, false, false),
				listen_dev(button1, "click", handleJoinClick, false, false, false)
			];
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(button0);
			if (detaching) detach_dev(t4);
			if (detaching) detach_dev(button1);
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function handleCreateClick() {
	href = "about";
}

function handleJoinClick() {
	alert("no more alerts");
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, null, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguNTQ3YzZiNWYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzdHlsZT5cblx0aDEsIGZpZ3VyZSwgcCB7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdG1hcmdpbjogMCBhdXRvO1xuXHR9XG5cblx0aDEge1xuXHRcdGZvbnQtc2l6ZTogMi44ZW07XG5cdFx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcblx0XHRmb250LXdlaWdodDogNzAwO1xuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XG5cdH1cblxuXHRidXR0b24ge1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHR0b3A6IDUwJTtcblx0XHRsZWZ0OiAyNSU7XG5cdFx0d2lkdGg6IDUwJTtcblx0XHRjb2xvcjogZGFya3JlZDtcblx0fVxuXG5cdHAge1xuXHRcdG1hcmdpbjogMWVtIGF1dG87XG5cdH1cblxuXHRAbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0XHRoMSB7XG5cdFx0XHRmb250LXNpemU6IDRlbTtcblx0XHR9XG5cdH1cbjwvc3R5bGU+XG5cbjxzY3JpcHQ+XG5cdGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUNsaWNrKCkge1xuXHRcdGhyZWY9J2Fib3V0J1xuXHR9XG5cblx0ZnVuY3Rpb24gaGFuZGxlSm9pbkNsaWNrKCkge1xuXHRcdGFsZXJ0KCdubyBtb3JlIGFsZXJ0cycpXG5cdH1cbjwvc2NyaXB0PlxuXG48c3ZlbHRlOmhlYWQ+XG5cdDx0aXRsZT5TYXBwZXIgcHJvamVjdCB0ZW1wbGF0ZTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+R3JlYXQgc3VjY2VzcyE8L2gxPlxuXG48YnV0dG9uIGlkPVwiY3JlYXRlQnV0dG9uXCIgb246Y2xpY2s9e2hhbmRsZUNyZWF0ZUNsaWNrfT5cblx0Q3JlYXRlIFJvb21cbjwvYnV0dG9uPlxuXG48YnV0dG9uIGlkPVwiam9pbkJ1dHRvblwiIG9uOmNsaWNrPXtoYW5kbGVKb2luQ2xpY2t9PlxuXHRKb2luIEdhbWVcbjwvYnV0dG9uPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQWdEb0MsaUJBQWlCO2lDQUluQixlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBbkR2QyxpQkFBaUI7Q0FDekIsSUFBSSxHQUFDLE9BQU87OztTQUdKLGVBQWU7Q0FDdkIsS0FBSyxDQUFDLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
