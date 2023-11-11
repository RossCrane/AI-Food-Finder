import React, { createContext, useState, useContext } from 'react';

// Create Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
	const [apiResponse, setApiResponse] = useState(null);
	const [detailedResponse, setDetailedResponse] = useState(null);

	return (
		<AppContext.Provider
			value={{
				apiResponse,
				setApiResponse,
				detailedResponse,
				setDetailedResponse,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// Custom Hook
export const useAppContext = () => useContext(AppContext);
