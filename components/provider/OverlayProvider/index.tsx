/* eslint-disable no-shadow */
import {createContext, PropsWithChildren, useState, Fragment, ReactNode, useCallback, useMemo} from "react";

type animateType = "basic" | "slideIn";
export interface Open {
	animate: animateType;
}

export const OverlayContext = createContext<{
	mount(id: string, element: ReactNode): void;
	unmount(id: string): void;
} | null>(null);

const OverlayProvider = ({children}: PropsWithChildren<ReactNode>) => {
	const [overlayById, setOverlayById] = useState<Map<string, ReactNode>>(new Map());

	const mount = useCallback((id: string, element: ReactNode) => {
		setOverlayById(overlayById => {
			const cloned = new Map(overlayById);
			cloned.set(id, element);
			return cloned;
		});
	}, []);

	const unmount = useCallback((id: string) => {
		setOverlayById(overlayById => {
			const cloned = new Map(overlayById);
			cloned.delete(id);
			console.log(cloned);
			return cloned;
		});
	}, []);

	const context = useMemo(() => ({mount, unmount}), [mount, unmount]);

	// const open = (id: string, Component: (props?: any) => JSX.Element, options?: Open) => {
	// 	setOverlays(state => ({
	// 		...state,
	// 		[id]: {
	// 			animate: options.animate,
	// 			isOpen: true,
	// 			Component,
	// 		},
	// 	}));
	// };
	// const push = (path: string) => {
	// 	setOverlays({});
	// 	router.push(path);
	// };

	// useEffect(() => {
	// 	if (!init) return;
	// 	setOverlays({});
	// }, [router]);

	// useEffect(() => {
	// 	!init && setInit(true);
	// }, []);

	// useEffect(() => {
	// 	const arr = [];
	// 	Object.keys(overlays).forEach(id => {
	// 		arr.push(overlays[id].isOpen);
	// 		return arr;
	// 	});

	// 	document.body.style.cssText = arr.includes(true) ? "overflow-y: hidden" : "";
	// }, [overlays]);

	return (
		<OverlayContext.Provider value={context}>
			{children}
			{[...overlayById.entries()].map(([id, element]) => (
				<Fragment key={id}>{element}</Fragment>
			))}
		</OverlayContext.Provider>
	);
};

export default OverlayProvider;
