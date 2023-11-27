import {useContext, useEffect, useId, useMemo, useRef} from "react";
import {OverlayContext} from "./index";
import {OverlayController, OverlayControlRef} from "./OverlayController";
import {CreateOverlayElement, Overlay} from "./types";

type OverlayReturn = readonly [
	open: (overlayElement: CreateOverlayElement) => void,
	close: () => void,
	exit: () => void,
];

type OverlayState = Overlay;

const useOverlay = (animate: Overlay["animate"] = "basic"): OverlayReturn => {
	const context = useContext(OverlayContext);

	const {mount, unmount} = context;
	const id = useId();

	const overlayRef = useRef<OverlayControlRef | null>(null);
	// const [id] = useState(() => String(overlayId++));

	/** overlay remove */
	useEffect(() => {
		return () => {
			unmount(id);
		};
	}, [id, unmount]);

	const exports = useMemo(
		() => ({
			open: (overlayElement: any) => {
				mount(
					id,
					<OverlayController
						key={Date.now()}
						ref={overlayRef}
						animate={animate}
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

	return [exports.open, exports.close, exports.exit] as const;
};

export type {OverlayState};
export default useOverlay;
