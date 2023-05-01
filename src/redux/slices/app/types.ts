export interface Theme {
	name: string;
	type: string;
	background: {
		color?: string;
		url?: string;
	};
}

export type Themes = Record<string, Theme>;
