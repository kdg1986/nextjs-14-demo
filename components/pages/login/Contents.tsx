"use client";
import {useAppDispatch, useAppSelector} from "@/store";
import {setData} from "@/store/store-local";
import "@style/contents.css";
import {useEffect} from "react";

const Page = () => {
	const local = useAppSelector(state => state.localDataStore);
	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log(local);
	}, [local]);

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
					<div className="row">
						<a className="btns kakao">카카오 계정으로 로그인</a>
					</div>
					<div className="row">
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
							onClick={() => {
								dispatch(setData(true));
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
