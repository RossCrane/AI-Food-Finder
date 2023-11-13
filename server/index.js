// 'use strict';

// require('dotenv').config();
// const express = require('express');
// const router = require('./router');
// const cors = require('cors');
// const app = new express();

// app.use(cors());
// app.use(router);

// app.listen(process.env.SERVER_PORT, () => {
// 	console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
// });

'use strict';

require('dotenv').config();
//console.log(process.env.CLERK_SECRET_KEY);
const express = require('express');
const { Client } = require('@clerk/clerk-sdk-node');
const connectDB = require('./models/index');
const router = require('./router');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
	origin: 'http://localhost:5173', // Replace with your frontend's actual origin
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cookieParser());
connectDB();

app.use(cors(corsOptions));

// Clerk setup
//console.log('Clerk API Key:', process.env.CLERK_SECRET_KEY);
const clerk = new Client(process.env.CLERK_SECRET_KEY);
//console.log('Clerk Client:', clerk);

// Other middleware and routes
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});

// const authenticateUser = async (req, res, next) => {
// 	try {
// 		console.log('Cookies:', req.cookies);
// 		const sessionId = req.cookies['__session']; // Assuming the session ID is stored in cookies
// 		const token = req.headers['authorization'];
// 		console.log('Session ID:', sessionId);
// 		const session = await clerk.sessions.verifySession(sessionId, token);
// 		const userId = session.userId;
// 		const user = await clerk.users.getUser(userId);

// 		if (!user) {
// 			return res.status(401).json({ error: 'Unauthorized' });
// 		}

// 		// Store the necessary details in the request object
// 		req.user = {
// 			email: user.emailAddresses[0].emailAddress, // Assuming the first email is the primary one
// 			token: sessionId, // Using the session ID as the token
// 			clerkUserId: user.id,
// 		};

// 		next();
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// };

// Apply the middleware to routes that require authentication
//app.use('/api', authenticateUser);
