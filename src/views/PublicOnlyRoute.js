import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import "./PublicOnlyRoute.css";

export default function PublicOnlyRoute({ component, ...props }) {
	const Component = component;
	return (
		<div className='PublicOnlyRoute'>
			<div className='PublicOnlyRoute__div form'>
				<Route
					{...props}
					render={componentProps => (
						<UserContext.Consumer>
							{userContext =>
								!!userContext.user.id ? (
									<Redirect to={"/"} />
								) : (
									<Component {...componentProps} />
								)
							}
						</UserContext.Consumer>
					)}
				/>
			</div>

			<div className='PublicOnlyRoute__div imagesContainer'>
				<img
					className='PublicOnlyRoute__img questionView'
					src={require("./mobile-QuestionView.png")}
					alt="mobile view of iranta's question page"
				></img>
				<img
					className='PublicOnlyRoute__img tableView'
					src={require("./mobile-TableView.png")}
					alt="mobile view of iranta's table page"
				></img>
			</div>
		</div>
	);
}
