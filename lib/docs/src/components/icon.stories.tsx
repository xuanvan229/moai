import { Meta } from "@storybook/react";
import { SVGAttributes } from "react";
import { FaHome } from "react-icons/fa";
import { Icon, text } from "../../../core/src";
import { GalleryIcon } from "../../../gallery/src/icon/icon";
import { Utils } from "../utils/utils";

const meta: Meta = {
	title: "Components/Icon",
	component: Icon,
	argTypes: {
		display: Utils.arg(["block", "inline"]),
		component: Utils.arg(null),
		size: Utils.arg("number"),
	},
};

Utils.page.component(meta, {
	primary: "sticky",
	shots: [<GalleryIcon key="1" />],
});

export default meta;

interface Props {
	display?: "block" | "inline";
	size?: number;
}

export const Primary = (props: Props): JSX.Element => (
	<div>
		<span>Some text </span>
		<Icon
			display={props.display ?? "block"}
			component={FaHome}
			size={props.size}
		/>
		<span> another text</span>
	</div>
);

export const Basic = (): JSX.Element => <Icon component={FaHome} />;

Utils.story(Basic, {
	desc: `
The recommended way to use the Icon component is to import an icon from the
[react-icons][1] package and pass it to the \`icon\` prop. All icons in the
package can be used with Moai out of the box.

~~~ts

import { FaHome } from "react-icons/fa";
~~~

[1]: https://react-icons.github.io/react-icons/
`,
});

export const Display = (): JSX.Element => (
	<p>
		<span>Some text </span>
		<Icon display="inline" component={FaHome} />
		<span> another text</span>
	</p>
);

Utils.story(Display, {
	desc: `
To make layout more predictable, icons are rendered as [block elements][1] by
default. However, for icons that are parts of texts, they should be rendered as
[inline elements][2]. This is done by setting the \`display\` prop to
\`inline\`.

[1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
`,
});

export const Color = (): JSX.Element => (
	<div className={text.highlightWeak}>
		<Icon component={FaHome} />
	</div>
);

Utils.story(Color, {
	desc: `
SVG icons usually use the [\`currentcolor\`][1] keyword for their colors. This
means to set the color of an icon, you should set the [text color][2] of its
container. Moai has a [\`text\`][3] utility that provides predefined,
accessible colors for icons.

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/color
[3]: /docs/patterns-color-text--page
`,
});

export const Advanced = (): JSX.Element => {
	// In practice, this should be defined outside of your component, or even
	// better, automatically generated by a tool like react-svgr.
	const Line = (props: SVGAttributes<SVGElement>) => (
		<svg width="1em" height="1em" viewBox="0 0 48 1" {...props}>
			{/* This is just a horizontal line */}
			<path d="M0 0h48v1H0z" fill="currentColor" fillRule="evenodd" />
		</svg>
	);
	return <Icon component={Line} />;
};

Utils.story(Advanced, {
	desc: `
Technically, the \`component\` prop expects a [function component][1] that
returns an SVG element. You can use it to display your own custom icons (e.g.
logos, product icons). With tools like [React SVGR][3], you can even create
your own icon sets to use with Moai. See the [Advanced section][2] in the Icon
Pattern guide for detail.

[1]: https://reactjs.org/docs/components-and-props.html#function-and-class-components
[2]: /docs/patterns-icon--advanced
[3]: https://react-svgr.com
`,
});
