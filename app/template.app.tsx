"use client";
import ReduxProvider from "@/store/ReduxProvider";
import {useEffect} from "react";

export default function Template({children}: {children: React.ReactNode}) {
	useEffect(() => {
		console.log("template");
	}, []);

	// return <ReduxProvider>{children}</ReduxProvider>;
	return <>{children}</>;
}
