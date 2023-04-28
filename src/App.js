import './App.css';
import Header from './components/Header'
import Cart from './components/Cart'
import About from './components/About'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from 'react'

function App() {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const getCart = async () => {
			const items = await fetchCartFromServer();

			setCart(items);
		}

		getCart();
	}, []);

	const fetchCartFromServer = async () => {
		const res = await fetch("http://localhost:2175/cart");
      	const data = await res.json();

      	return data;
	}

	const removeItem = async (item_id) => {
		await fetch(`http://localhost:2175/cart/${item_id}`, {
			method: 'DELETE'
		});
		
		setCart(cart.filter((item) => item.id !== item_id));
	}

	const addItem = async (newItem) => {
		const res = await fetch('http://localhost:2175/cart', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(newItem)
		});

		const data = await fetchCartFromServer();

		setCart(data);
	}

	const dndItem = async (drag_item_id, drop_item_id) => {
		const drag_item = cart.find((item) => item.id == drag_item_id);
		const drop_item = cart.find((item) => item.id == drop_item_id);

		await fetch(`http://localhost:2175/cart/${drag_item_id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(drop_item)
		})

		await fetch(`http://localhost:2175/cart/${drop_item_id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(drag_item)
		})

		const items = await fetchCartFromServer();

		setCart(items);
	}

	return (
		<BrowserRouter>
			<div className="app">
				<div className="header">
					<Header />
				</div>
				<div className="cart">
					<Routes>
						<Route path='/' element={<Cart cart={cart} onDelete={ removeItem } onAdd={ addItem } dndItem={ dndItem } />} />
						<Route path='/about' element={<About />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
