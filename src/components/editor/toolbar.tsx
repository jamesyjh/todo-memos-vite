import Draft, { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentBlock, Modifier } from "draft-js";

import {
	FaAlignCenter,
	FaAlignLeft,
	FaAlignRight,
	FaBold,
	FaChevronDown,
	FaChevronUp,
	FaCode,
	FaHighlighter,
	FaItalic,
	FaListOl,
	FaListUl,
	FaQuoteRight,
	FaStrikethrough,
	FaSubscript,
	FaSuperscript,
	FaTextWidth,
	FaUnderline,
} from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";

interface EditorToolBarProps {
	editorState: EditorState;
	setEditorState: Dispatch<SetStateAction<EditorState>>;
}

const Toolbar = ({ editorState, setEditorState }: EditorToolBarProps) => {
	const tools = [
		{
			label: "bold",
			style: "BOLD",
			icon: <FaBold />,
			method: "inline",
		},
		{
			label: "italic",
			style: "ITALIC",
			icon: <FaItalic />,
			method: "inline",
		},
		{
			label: "underline",
			style: "UNDERLINE",
			icon: <FaUnderline />,
			method: "inline",
		},
		{
			label: "highlight",
			style: "HIGHLIGHT",
			icon: <FaHighlighter />,
			method: "inline",
		},
		{
			label: "strike-through",
			style: "STRIKETHROUGH",
			icon: <FaStrikethrough />,
			method: "inline",
		},
		{
			label: "Superscript",
			style: "SUPERSCRIPT",
			icon: <FaSuperscript />,
			method: "inline",
		},
		{
			label: "Subscript",
			style: "SUBSCRIPT",
			icon: <FaSubscript />,
			method: "inline",
		},
		{
			label: "Monospace",
			style: "CODE",
			icon: <FaTextWidth />,
			method: "inline",
		},
		{
			label: "Blockquote",
			style: "blockQuote",
			icon: <FaQuoteRight />,
			method: "block",
		},
		{
			label: "Unordered-List",
			style: "unordered-list-item",
			method: "block",
			icon: <FaListUl />,
		},
		{
			label: "Ordered-List",
			style: "ordered-list-item",
			method: "block",
			icon: <FaListOl />,
		},
		{
			label: "Code Block",
			style: "CODEBLOCK",
			icon: <FaCode />,
			method: "inline",
		},
		{
			label: "Uppercase",
			style: "UPPERCASE",
			icon: <FaChevronUp />,
			method: "inline",
		},
		{
			label: "lowercase",
			style: "LOWERCASE",
			icon: <FaChevronDown />,
			method: "inline",
		},
		{
			label: "Left",
			style: "leftAlign",
			icon: <FaAlignLeft />,
			method: "block",
		},
		{
			label: "Center",
			style: "centerAlign",
			icon: <FaAlignCenter />,
			method: "block",
		},
		{
			label: "Right",
			style: "rightAlign",
			icon: <FaAlignRight />,
			method: "block",
		},
		{ label: "H1", style: "header-one", method: "block" },
		{ label: "H2", style: "header-two", method: "block" },
		{ label: "H3", style: "header-three", method: "block" },
		{ label: "H4", style: "header-four", method: "block" },
		{ label: "H5", style: "header-five", method: "block" },
		{ label: "H6", style: "header-six", method: "block" },
	];

	const applyStyle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: string, method: string) => {
		e.preventDefault();
		method === "block"
			? setEditorState(RichUtils.toggleBlockType(editorState, style))
			: setEditorState(RichUtils.toggleInlineStyle(editorState, style));
	};

	const isActive = (style: string, method: string) => {
		if (method === "block") {
			const selection = editorState.getSelection();
			const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
			return blockType === style;
		} else {
			const currentStyle = editorState.getCurrentInlineStyle();
			return currentStyle.has(style);
		}
	};

	return (
		<div className="toolbar-grid">
			{tools.map((item, idx) => (
				<button
					style={{
						color: isActive(item.style, item.method) ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.3)",
					}}
					key={`${item.label}-${idx}`}
					title={item.label}
					onClick={(e) => applyStyle(e, item.style, item.method)}
					onMouseDown={(e) => e.preventDefault()}
				>
					{item.icon || item.label}
				</button>
			))}
		</div>
	);
};

export default Toolbar;
