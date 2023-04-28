import { useDrag, useDrop } from 'react-dnd'

const Item = ({ item, onDelete, onDrop }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "item",
        item: item,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }), [item])
    
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "item",
        drop: (drag_item) => {
            onDrop(drag_item, item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }), [item])

    const attachRef = (el) => {
        drag(el);
        drop(el);
    }

    return (
        <p key={ item.id } className="cart-item" ref={ attachRef }>
            { item.item_name }
            <i className="fa-solid fa-circle-xmark delete-icon" onClick={ () => onDelete(item.id) }></i>
        </p>
    )
}

export default Item;