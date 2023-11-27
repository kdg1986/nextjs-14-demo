import {forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useState} from "react";

import {CreateOverlayElement, Overlay} from "./types";

interface Props {
	overlayElement: CreateOverlayElement;
	onExit: () => void;
	animate: Overlay["animate"];
}

export interface OverlayControlRef {
	close: () => void;
}

export const OverlayController = forwardRef((props: Props, ref: Ref<OverlayControlRef>) => {
	const [isOpenOverlay, setIsOpenOverlay] = useState(false);
	const {overlayElement: OverlayElement, ...overlayProps} = props;
	const handleOverlayClose = useCallback(() => {
		setIsOpenOverlay(false);
	}, []);
	useImperativeHandle(
		ref,
		() => {
			return {close: handleOverlayClose};
		},
		[handleOverlayClose],
	);

	useEffect(() => {
		requestAnimationFrame(() => {
			setIsOpenOverlay(true);
		});
	}, []);

	return <OverlayElement show={isOpenOverlay} close={handleOverlayClose} {...overlayProps} />;
});
