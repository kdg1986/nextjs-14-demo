import AgreeType from "@/components/popup/AgreeType";
import {useOverlay} from "@/hooks/common/useOverlay";
import {useAppDispatch, useAppSelector} from "@/store";
import {setAutoLogin} from "@/store/store-local";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const Page = () => {
	const local = useAppSelector(state => state.localDataStore);
	const router = useRouter();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (local.data.autoLogin) (document.querySelector("#autoSave") as HTMLInputElement).click();
	}, []);

	const overlay = useOverlay();
	// const open2 = useOverlay();

	return (
		<div className="wrap">
			<div className="head">
				<div className="h1Wrap">
					<h1>로그인</h1>
				</div>

				<a className="btnHome" href="main.html">
					홈
				</a>

				<a className="btnBack" href="main.html">
					뒤로가기
				</a>
			</div>
			<div className="container">
				<div className="loginWrap">
					<div className="row" onClick={() => overlay.open(() => <AgreeType />)}>
						<a className="btns kakao">카카오 계정으로 로그인</a>
					</div>
					<div className="row" onClick={() => router.push("/agree")}>
						<a className="btns naver">네이버 계정으로 로그인</a>
					</div>
					<div className="row">
						<a className="btns facebook">페이스북 계정으로 로그인</a>
					</div>
					<div className="row">
						<a className="btns google">구글 계정으로 로그인</a>
					</div>
					<div className="autoSave">
						<input
							type="checkbox"
							id="autoSave"
							defaultChecked={local.data.autoLogin}
							onChange={e => {
								const {checked} = e.target as HTMLInputElement;
								dispatch(setAutoLogin(Boolean(checked)));
							}}
						/>
						<label htmlFor="autoSave">자동 로그인</label>
					</div>
					<div className="bottomBtn">
						<a className="btns orange">회원가입</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
