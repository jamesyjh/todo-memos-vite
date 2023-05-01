import React, { useEffect, useRef, useState } from "react";
import Draft, { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentBlock, Modifier } from "draft-js";
import Toolbar from "./toolbar";
import "./editor.css";

interface DraftEditorProps {
	currContentState: Draft.RawDraftContentState;
	captureEditorState: (editorState: Draft.EditorState) => void;
}

const DraftEditor = ({ currContentState, captureEditorState }: DraftEditorProps) => {
	const [editorState, setEditorState] = useState(() => {
		if (currContentState) return EditorState.createWithContent(convertFromRaw(currContentState));
		return EditorState.createEmpty();
	});
	const editorRef = useRef<Editor>(null);

	useEffect(() => {
		focusEditor();
	}, []);

	useEffect(() => {
		captureEditorState(editorState);
	}, [editorState]);

	const focusEditor = () => {
		editorRef.current?.focus();
	};

	const handleKeyCommand = (command: string) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			setEditorState(newState);
			return true;
		} else if (command === "tab") {
			const newContentState = Modifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), "\t");
			setEditorState(EditorState.push(editorState, newContentState, "insert-characters"));
			return true;
		}
		return false;
	};

	// FOR INLINE STYLES
	const styleMap = {
		CODE: {
			backgroundColor: "rgba(0, 0, 0, 0.05)",
			fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
			fontSize: 16,
			padding: 2,
		},
		HIGHLIGHT: {
			backgroundColor: "#fffd75",
		},
		UPPERCASE: {
			textTransform: "uppercase",
		},
		LOWERCASE: {
			textTransform: "lowercase",
		},
		CODEBLOCK: {
			fontFamily: "monospace",
			fontSize: "inherit",
			background: "#27386f",
			color: "#fff",
			lineHeight: 0.75,
			padding: "0.3rem 0.5rem",
			width: "50%",
			display: "block",
			whiteSpace: "pre-wrap",
			textIndent: "10px",
		},
		SUPERSCRIPT: {
			verticalAlign: "super",
			fontSize: "80%",
		},
		SUBSCRIPT: {
			verticalAlign: "sub",
			fontSize: "80%",
		},
	};

	// FOR BLOCK LEVEL STYLES(Returns CSS Class From editor.css)
	const myBlockStyleFn = (contentBlock: ContentBlock): string => {
		const type = contentBlock.getType();
		switch (type) {
			case "blockQuote":
				return "superFancyBlockquote";
			case "leftAlign":
				return "leftAlign";
			case "rightAlign":
				return "rightAlign";
			case "centerAlign":
				return "centerAlign";
			case "justifyAlign":
				return "justifyAlign";
			default:
				break;
		}
		return "unhandled-type";
	};

	return (
		<div className="editor-wrapper" onClick={focusEditor}>
			<Toolbar editorState={editorState} setEditorState={setEditorState} />
			<div className="editor-container">
				<Editor
					ref={editorRef}
					placeholder="Write your memo here..."
					handleKeyCommand={(command) => {
						handleKeyCommand(command);
						return "not-handled";
					}}
					editorState={editorState}
					customStyleMap={styleMap as any}
					blockStyleFn={myBlockStyleFn}
					onChange={setEditorState}
				/>
			</div>
		</div>
	);
};

export default DraftEditor;
