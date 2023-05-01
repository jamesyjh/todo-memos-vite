export interface Card {
	title: string;
	list: string;
	color: string;
}

export interface Cards {
	[key: string]: Card;
}

export interface CardsState {
	cards: Cards;
}
