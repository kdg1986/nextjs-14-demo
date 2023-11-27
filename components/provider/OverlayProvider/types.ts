export interface Overlay {
	show?: boolean;
	close?: () => void;
	exit?: () => void;
	animate?: "basic" | "slideIn";
}

export type CreateOverlayElement = (props: Partial<Overlay>) => JSX.Element;
