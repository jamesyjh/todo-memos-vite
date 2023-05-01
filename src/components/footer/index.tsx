import React from "react";
import styled from "styled-components";

const Footer = () => {
	return (
		<StyledFooter>
			<pre>
				Created by: jamesyjh | 2023 |{" "}
				<a target="_blank" href="https://github.com/jamesyjh">
					https://github.com/jamesyjh
				</a>
			</pre>
		</StyledFooter>
	);
};

export default Footer;

const StyledFooter = styled.footer`
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;

	> pre {
		color: #a9a9a9;

		> a:visited {
			color: #707293;
		}
	}
`;
