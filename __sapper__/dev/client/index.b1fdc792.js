import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, a as space, e as element, t as text, q as query_selector_all, b as detach_dev, c as claim_space, f as claim_element, g as children, h as claim_text, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, n as listen_dev, o as noop, r as run_all } from './client.a5eda786.js';

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
			button0 = claim_element(nodes, "BUTTON", { id: true, class: true });
			var button0_nodes = children(button0);
			t3 = claim_text(button0_nodes, "Create Room");
			button0_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			button1 = claim_element(nodes, "BUTTON", { id: true, class: true });
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
			attr_dev(h1, "class", "svelte-g69knu");
			add_location(h1, file, 46, 0, 545);
			attr_dev(button0, "id", "createButton");
			attr_dev(button0, "class", "svelte-g69knu");
			add_location(button0, file, 48, 0, 570);
			attr_dev(button1, "id", "joinButton");
			attr_dev(button1, "class", "svelte-g69knu");
			add_location(button1, file, 52, 0, 644);
			add_location(strong0, file, 56, 3, 717);
			attr_dev(p0, "class", "svelte-g69knu");
			add_location(p0, file, 56, 0, 714);
			add_location(strong1, file, 57, 3, 813);
			attr_dev(p1, "class", "svelte-g69knu");
			add_location(p1, file, 57, 0, 810);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYjFmZGM3OTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzdHlsZT5cblx0aDEsIGZpZ3VyZSwgcCB7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdG1hcmdpbjogMCBhdXRvO1xuXHR9XG5cblx0aDEge1xuXHRcdGZvbnQtc2l6ZTogMi44ZW07XG5cdFx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcblx0XHRmb250LXdlaWdodDogNzAwO1xuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XG5cdH1cblxuXHRmaWd1cmUge1xuXHRcdG1hcmdpbjogMCAwIDFlbSAwO1xuXHR9XG5cblx0YnV0dG9uIHtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0dG9wOiA1MCU7XG5cdFx0bGVmdDogMzAlO1xuXHRcdHdpZHRoOiA1MCU7XG5cdFx0Y29sb3I6IGRhcmtyZWQ7XG5cdH1cblxuXHRwIHtcblx0XHRtYXJnaW46IDFlbSBhdXRvO1xuXHR9XG5cblx0QG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSB7XG5cdFx0aDEge1xuXHRcdFx0Zm9udC1zaXplOiA0ZW07XG5cdFx0fVxuXHR9XG48L3N0eWxlPlxuXG48c2NyaXB0PlxuXHRmdW5jdGlvbiBoYW5kbGVDbGljaygpIHtcblx0XHRhbGVydCgnbm8gbW9yZSBhbGVydHMnKVxuXHR9XG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+U2FwcGVyIHByb2plY3QgdGVtcGxhdGU8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGgxPkdyZWF0IHN1Y2Nlc3MhPC9oMT5cblxuPGJ1dHRvbiBpZD1cImNyZWF0ZUJ1dHRvblwiIG9uOmNsaWNrPXtoYW5kbGVDbGlja30+XG5cdENyZWF0ZSBSb29tXG48L2J1dHRvbj5cblxuPGJ1dHRvbiBpZD1cImpvaW5CdXR0b25cIiBvbjpjbGljaz17aGFuZGxlQ2xpY2t9PlxuXHRKb2luIEdhbWVcbjwvYnV0dG9uPlxuXG48cD48c3Ryb25nPlRyeSBlZGl0aW5nIHRoaXMgZmlsZSAoc3JjL3JvdXRlcy9pbmRleC5zdmVsdGUpIHRvIHRlc3QgbGl2ZSByZWxvYWRpbmcuPC9zdHJvbmc+PC9wPlxuPHA+PHN0cm9uZz5IZWxsb29vb29vPC9zdHJvbmc+PC9wPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FnRG9DLFdBQVc7aUNBSWIsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FuRG5DLFdBQVc7Q0FDbkIsS0FBSyxDQUFDLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
