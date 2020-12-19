import React, { useEffect } from "react";
import { icons } from "../../../icon/src";
import outset from "../button/outset.module.css";
import { Icon } from "../icon/icon";
import { outline } from "../outline/outline";
import s from "./checkbox.module.css";

export interface CheckboxProps {
	// Controlled
	checked?: boolean;
	setChecked?: (checked: boolean) => void;
	indeterminate?: boolean;
	// Uncontrolled
	defaultChecked?: boolean;
	forwardedRef?: React.ForwardedRef<HTMLInputElement>;
	// Body
	children: React.ReactNode;
	disabled?: boolean;
}

export const Checkbox = (props: CheckboxProps): JSX.Element => {
	const ref = React.useRef<HTMLInputElement>(null);

	// Broadcast ref
	const fRef = props.forwardedRef;
	useEffect(() => {
		if (ref.current === null) throw Error("Ref is null");
		if (!fRef) return;
		if (typeof fRef === "function") fRef(ref.current);
		if (typeof fRef === "object") fRef.current = ref.current;
		throw Error(`Unknown props.forwardedRef type: ${typeof fRef}`);
	}, [fRef]);

	// Indeterminate can only be set by script
	useEffect(() => {
		if (ref.current === null) throw Error("Ref is null");
		if (props.indeterminate === undefined) return;
		ref.current.indeterminate = props.indeterminate;
	}, [props.indeterminate]);

	return (
		<label className={s.container}>
			<input
				type="checkbox"
				className={[s.input, outset.main, outline.normal].join(" ")}
				disabled={props.disabled}
				// Uncontrolled
				defaultChecked={props.defaultChecked}
				ref={ref}
				// Controlled
				checked={props.checked}
				onChange={(e) => props.setChecked?.(e.target.checked)}
			/>
			<span className={[s.icon, s.check].join(" ")}>
				<Icon display="block" path={icons.boldTick} />
			</span>
			<span className={[s.icon, s.indeterminate].join(" ")}>
				<Icon display="block" path={icons.smallMinus} />
			</span>
			<span className={s.label}>{props.children}</span>
		</label>
	);
};
