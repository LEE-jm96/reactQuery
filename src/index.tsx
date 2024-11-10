import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import Main from './Main';
import CashingTest from "./CashingTest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
    },
    {
        path: "/cashingtest",
        element: <CashingTest/>,
    },
]);

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement as HTMLElement);
    root.render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </React.StrictMode>
    );
} else {
    console.error("Failed to find the root element.");
}
