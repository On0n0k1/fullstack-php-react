import './Header.css';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps { 
    handleDeleteClick: () => void,
}

const Header: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
    let handleDeleteClick = props.handleDeleteClick;
    const navigate = useNavigate();

    function handleClick() {
        navigate('/add-product');
    }

    return (
        <div className='header'>
            <div className='title'>
                <h1>Product List</h1>
            </div>
            <nav>
                <div className='items'>
                    <button onClick={handleClick}>Add</button>
                    <button 
                        id="delete-product-btn"
                        onClick={handleDeleteClick}
                    >Mass Delete</button>
                </div>
            </nav>
        </div>
    );
}

export default Header;