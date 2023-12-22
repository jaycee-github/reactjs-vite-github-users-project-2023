import React, { useState, useEffect, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

// Provider, Consumer > GithubContext.Provider

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);

	// request loading
	const [requests, setRequests] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	// error
	const [error, setError] = useState({
		show: false,
		msg: "",
	});

	const searchGithubUser = async (user) => {
		// toggle error
		// set to default
		toggleError();

		// setLoading(true)
		setIsLoading(true);

		const response = await axios(`${rootUrl}/users/${user}`).catch(
			(error) => {
				console.log(error);
			}
		);

		console.log(response);

		if (response) {
			setGithubUser(response.data);
			const { login, followers_url } = response.data;

			await Promise.allSettled([
				axios(`${rootUrl}/users/${login}/repos?per_page=100`),
				axios(`${followers_url}?per_page=100`),
			])
				.then((results) => {
					const [repos, followers] = results;
					const status = "fulfilled";

					if (repos.status === status) {
						setRepos(repos.value.data);
					}

					if (followers.status === status) {
						setFollowers(followers.value.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			toggleError(true, "There is no user with that username....");
		}

		checkRequests();
		setIsLoading(false);
	};

	// toggleError function
	// add default : setting back its default values
	// by invoking the function without passing anything
	// then its default values will be used as parameters
	const toggleError = (show = false, msg = "") => {
		setError({ show, msg });
	};

	// check rate
	const checkRequests = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(({ data }) => {
				let {
					rate: { remaining },
				} = data;

				// set remaining to zero for error testing
				// remaining = 0;

				setRequests(remaining);

				if (remaining === 0) {
					// throw an error
					toggleError(
						true,
						"sorry, you have exceeded your hourly rate limit!"
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// run checkRequests function on initial app render.
	useEffect(checkRequests, []);

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				error,
				searchGithubUser,
				isLoading,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export { GithubContext, GithubProvider };
