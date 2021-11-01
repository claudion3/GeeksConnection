import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import Menubar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './util/AuthRoute';

import './App.module.scss';
import SinglePost from './pages/SinglePost';
import Footer from './components/Footer';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Menubar />
				<Route exact path='/' component={Home} />
				<AuthRoute exact path='/login' component={Login} />
				<AuthRoute exact path='/register' component={Register} />
				<Route exact path='/posts/:postId' component={SinglePost} />
				<Footer />
			</Router>
		</AuthProvider>
	);
};

export default App;
