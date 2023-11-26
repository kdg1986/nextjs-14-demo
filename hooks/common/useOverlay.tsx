import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {OverlayContext} from "../provider/OverlayProvider";
/** @tossdocs-ignore */
import {OverlayController, OverlayControlRef} from "../provider/OverlayController";
// import {CreateOverlayElement} from "./types";

/** @tossdocs-ignore */
export type CreateOverlayElement = (props: {isOpen: boolean; close: () => void; exit: () => void}) => JSX.Element;

let elementId = 1;
// console.log("start,", elementId);
interface Options {
	exitOnUnmount?: boolean;
}

export function useOverlay({exitOnUnmount = true}: Options = {}) {
	const context = useContext(OverlayContext);

	if (context == null) {
		throw new Error("useOverlay is only available within OverlayProvider.");
	}

	const {mount, unmount} = context;
	const [id] = useState(() => String(elementId++));

	const overlayRef = useRef<OverlayControlRef | null>(null);

	useEffect(() => {
		return () => {
			if (exitOnUnmount) {
				// console.log("unmount");
				unmount(id);
			}
		};
	}, [exitOnUnmount, id, unmount]);

	return useMemo(
		() => ({
			open: (overlayElement: CreateOverlayElement) => {
				mount(
					id,
					<OverlayController
						// NOTE: state should be reset every time we open an overlay
						key={Date.now()}
						ref={overlayRef}
						overlayElement={overlayElement}
						onExit={() => {
							unmount(id);
						}}
					/>,
				);
			},
			close: () => {
				overlayRef.current?.close();
			},
			exit: () => {
				unmount(id);
			},
		}),
		[id, mount, unmount],
	);
}
