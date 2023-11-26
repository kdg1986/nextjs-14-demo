/** @tossdocs-ignore */
import React, {createContext, PropsWithChildren, ReactNode, useCallback, useMemo, useState} from "react";

export const OverlayContext = createContext<{
	mount(id: string, element: ReactNode): void;
	unmount(id: string): void;
} | null>(null);
// if (process.env.NODE_ENV !== "production") {
// 	OverlayContext.displayName = "OverlayContext";
// }

// OverlayContext.

export function OverlayProvider({children}: PropsWithChildren) {
	const [overlayById, setOverlayById] = useState<Map<string, ReactNode>>(new Map());

	const mount = useCallback((id: string, element: ReactNode) => {
		console.log("init mount");
		setOverlayById(overlayById => {
			const cloned = new Map(overlayById);
			cloned.set(id, element);
			return cloned;
		});
	}, []);

	const unmount = useCallback((id: string) => {
		console.log("init unmount");
		setOverlayById(overlayById => {
			const cloned = new Map(overlayById);
			cloned.delete(id);
			return cloned;
		});
	}, []);
	// console.log("provider");

	const context = useMemo(() => ({mount, unmount}), [mount, unmount]);

	return (
		<OverlayContext.Provider value={context}>
			<body>
				{children}
				{[...overlayById.entries()].map(([id, element]) => (
					<React.Fragment key={id}>{element}</React.Fragment>
				))}
			</body>
		</OverlayContext.Provider>
	);
}
