import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuth0();

	const isUser = isAuthenticated && user;

	if (!isUser) {
		return <Navigate to="/login" />;
	}

	return children;

	return <h2>Private Route</h2>;
};
export default PrivateRoute;

// This one is using react-router-dom version 5.x.x
// import { Route, Redirect } from "react-router-dom";
// const PrivateRoute = ({ children, ...rest }) => {
// 	const { isAuthenticated, user } = useAuth0();

// 	const isUser = isAuthenticated && user;

// 	return (
// 		<Route
// 			{...rest}
// 			render={() => {
// 				return isUser ? children : <Redirect to="/login" />;
// 			}}
// 		/>
// 	);
// };
// export default PrivateRoute;
