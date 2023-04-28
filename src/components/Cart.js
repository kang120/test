import { useState } from 'react';
import Item from '../components/Item'
import { Link } from 'react-router-dom'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function Cart({ cart, onDelete, onAdd, dndItem }){
    const [item_name, setItemName] = useState('');

    const onSubmit = () => {
        const newItem = {
            item_name: item_name
        }

        onAdd(newItem);

        setItemName('');
    }

    const onDrop = (drag_item, drop_item) => {
        dndItem(drag_item.id, drop_item.id);
    }

    return (
        <DndProvider backend={ HTML5Backend }>
            {cart.map((item) => (
                <Item key={ item.id } item={ item } onDelete={ onDelete } onDrop={ onDrop } />
            ))}

            <div className="add-item-box">
                <input name="item_name" type="text" placeholder="Add new item" value={ item_name } onChange={(e) => setItemName(e.target.value) } />
                <button className="add-item-btn" onClick={ () => onSubmit() }>Add</button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Link to="/about">About us</Link>
            </div>
        </DndProvider>
    )
}

export default Cart;