"use client";
import {OverlayProvider} from "@/hooks/provider/OverlayProvider";
// import "@style/contents.css";
import ReduxProvider from "@/store/ReduxProvider";
import {useEffect} from "react";

export default function Template({children}: {children: React.ReactNode}) {
	return (
		<ReduxProvider>
			<OverlayProvider>
				{/* <body id="tttt"> */}
				<div className="wrap">{children}</div>
				{/* </body> */}
			</OverlayProvider>
		</ReduxProvider>
	);
}
