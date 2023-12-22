import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
// dev-obiog3egl8dnpja8.us.auth0.com
// tBPItL8Zxwx75tzt78yaipONFigTCMYn

// auth0-react version installed in this tutorial is 1.12.0
// Auth0Provider props config is for auth0-react version 1.12.0
// Please check future auth0-react's props config to avoid errors.
// Check documentations/guides.

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-obiog3egl8dnpja8.us.auth0.com"
			clientId="tBPItL8Zxwx75tzt78yaipONFigTCMYn"
			redirectUri={window.location.origin}
			cacheLocation="localstorage"
		>
			<GithubProvider>
				<App />
			</GithubProvider>
		</Auth0Provider>
	</React.StrictMode>
);
