import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.svg";

const Login = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Wrapper>
			<div className="container">
				<img src={loginImg} alt="github user" />
				<h1>Github User</h1>
				<button className="btn" onClick={loginWithRedirect}>
					Login / Sign-up
				</button>
			</div>
		</Wrapper>
	);
};

// loginWithRedirect Issue :
// It wont work if isLoading and/or error isn't handled properly.
// Basically, once we try to login, we are again redirected to login page.
// Why? It's because the isAuthenticated = false and user = undefined.
// Why is that? It's because were still in the loading (isLoading = true) state.
// And when isLoading = false. isAuthenticated becomes true and user will not be undefined. So we will be redirected to the dashboard by then.

// Please watch Video #037 for further explanation.

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
	.container {
		width: 90vw;
		max-width: 600px;
		text-align: center;
	}
	img {
		margin-bottom: 2rem;
	}
	h1 {
		margin-bottom: 1.5rem;
	}
`;
export default Login;
