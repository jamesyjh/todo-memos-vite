export type ContentState = {
	blocks: any[];
	entityMap: Record<string, any>;
};

export interface Memo {
	color: string;
	title: string;
	slug?: string;
	contentState: ContentState;
}

export interface Memos {
	[key: string]: Memo;
}

export interface MemosState {
	memos: Memos;
	pinned: string[];
	lastSeen: number;
}
