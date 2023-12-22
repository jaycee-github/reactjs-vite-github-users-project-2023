import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</Router>
		</AuthWrapper>
	);
}

// This one is using react-router-dom version 5.x.x with <Switch>
// function App() {
// 	return (
// 		<AuthWrapper>
// 			<Router>
// 				<Switch>
// 					<PrivateRoute path="/" exact={true}>
// 						<Dashboard />
// 					</PrivateRoute>
// 					<Route path="/login">
// 						<Login />
// 					</Route>
// 					<Route path="*">
// 						<Error />
// 					</Route>
// 				</Switch>
// 			</Router>
// 		</AuthWrapper>
// 	);
// }

export default App;
