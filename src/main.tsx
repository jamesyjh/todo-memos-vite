import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./redux/store";
import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root") as HTMLElement;

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</ReduxProvider>
		</BrowserRouter>
	</React.StrictMode>
);
