import React from 'react';
import { Route } from 'react-router-dom';
import Cook from './components/cook/cook.jsx';

function App() {
	return (
		<div>
			<Route path="/path" component={Cook} />
			{/* ... other components */}
		</div>
	);
}

export default App;
