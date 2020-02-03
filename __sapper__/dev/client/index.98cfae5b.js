import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, a as space, e as element, t as text, q as query_selector_all, b as detach_dev, c as claim_space, f as claim_element, g as children, h as claim_text, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, n as listen_dev, o as noop, r as run_all } from './client.64a996d4.js';

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
	let t6;
	let p0;
	let strong0;
	let t7;
	let t8;
	let p1;
	let strong1;
	let t9;
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
			t6 = space();
			p0 = element("p");
			strong0 = element("strong");
			t7 = text("Try editing this file (src/routes/index.svelte) to test live reloading.");
			t8 = space();
			p1 = element("p");
			strong1 = element("strong");
			t9 = text("Helloooooo");
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
			button0 = claim_element(nodes, "BUTTON", { class: true });
			var button0_nodes = children(button0);
			t3 = claim_text(button0_nodes, "Create Room");
			button0_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			button1 = claim_element(nodes, "BUTTON", { class: true });
			var button1_nodes = children(button1);
			t5 = claim_text(button1_nodes, "Join Game");
			button1_nodes.forEach(detach_dev);
			t6 = claim_space(nodes);
			p0 = claim_element(nodes, "P", { class: true });
			var p0_nodes = children(p0);
			strong0 = claim_element(p0_nodes, "STRONG", {});
			var strong0_nodes = children(strong0);
			t7 = claim_text(strong0_nodes, "Try editing this file (src/routes/index.svelte) to test live reloading.");
			strong0_nodes.forEach(detach_dev);
			p0_nodes.forEach(detach_dev);
			t8 = claim_space(nodes);
			p1 = claim_element(nodes, "P", { class: true });
			var p1_nodes = children(p1);
			strong1 = claim_element(p1_nodes, "STRONG", {});
			var strong1_nodes = children(strong1);
			t9 = claim_text(strong1_nodes, "Helloooooo");
			strong1_nodes.forEach(detach_dev);
			p1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Sapper project template";
			attr_dev(h1, "class", "svelte-v1p67w");
			add_location(h1, file, 43, 0, 498);
			attr_dev(button0, "class", "svelte-v1p67w");
			add_location(button0, file, 45, 0, 523);
			attr_dev(button1, "class", "svelte-v1p67w");
			add_location(button1, file, 49, 0, 579);
			add_location(strong0, file, 53, 3, 636);
			attr_dev(p0, "class", "svelte-v1p67w");
			add_location(p0, file, 53, 0, 633);
			add_location(strong1, file, 54, 3, 732);
			attr_dev(p1, "class", "svelte-v1p67w");
			add_location(p1, file, 54, 0, 729);
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
			insert_dev(target, t6, anchor);
			insert_dev(target, p0, anchor);
			append_dev(p0, strong0);
			append_dev(strong0, t7);
			insert_dev(target, t8, anchor);
			insert_dev(target, p1, anchor);
			append_dev(p1, strong1);
			append_dev(strong1, t9);

			dispose = [
				listen_dev(button0, "click", handleClick, false, false, false),
				listen_dev(button1, "click", handleClick, false, false, false)
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
			if (detaching) detach_dev(t6);
			if (detaching) detach_dev(p0);
			if (detaching) detach_dev(t8);
			if (detaching) detach_dev(p1);
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

function handleClick() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguOThjZmFlNWIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzdHlsZT5cblx0aDEsIGZpZ3VyZSwgcCB7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdG1hcmdpbjogMCBhdXRvO1xuXHR9XG5cblx0aDEge1xuXHRcdGZvbnQtc2l6ZTogMi44ZW07XG5cdFx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcblx0XHRmb250LXdlaWdodDogNzAwO1xuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XG5cdH1cblxuXHRmaWd1cmUge1xuXHRcdG1hcmdpbjogMCAwIDFlbSAwO1xuXHR9XG5cblx0YnV0dG9uIHtcblx0XHR3aWR0aDogNTAlO1xuXHRcdGNvbG9yOiBkYXJrcmVkO1xuXHR9XG5cblx0cCB7XG5cdFx0bWFyZ2luOiAxZW0gYXV0bztcblx0fVxuXG5cdEBtZWRpYSAobWluLXdpZHRoOiA0ODBweCkge1xuXHRcdGgxIHtcblx0XHRcdGZvbnQtc2l6ZTogNGVtO1xuXHRcdH1cblx0fVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cblx0ZnVuY3Rpb24gaGFuZGxlQ2xpY2soKSB7XG5cdFx0YWxlcnQoJ25vIG1vcmUgYWxlcnRzJylcblx0fVxuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPlNhcHBlciBwcm9qZWN0IHRlbXBsYXRlPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT5HcmVhdCBzdWNjZXNzITwvaDE+XG5cbjxidXR0b24gb246Y2xpY2s9e2hhbmRsZUNsaWNrfT5cblx0Q3JlYXRlIFJvb21cbjwvYnV0dG9uPlxuXG48YnV0dG9uIG9uOmNsaWNrPXtoYW5kbGVDbGlja30+XG5cdEpvaW4gR2FtZVxuPC9idXR0b24+XG5cbjxwPjxzdHJvbmc+VHJ5IGVkaXRpbmcgdGhpcyBmaWxlIChzcmMvcm91dGVzL2luZGV4LnN2ZWx0ZSkgdG8gdGVzdCBsaXZlIHJlbG9hZGluZy48L3N0cm9uZz48L3A+XG48cD48c3Ryb25nPkhlbGxvb29vb288L3N0cm9uZz48L3A+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0E2Q2tCLFdBQVc7aUNBSVgsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FoRG5CLFdBQVc7Q0FDbkIsS0FBSyxDQUFDLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
