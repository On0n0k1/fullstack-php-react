import './Header.css';
import Product from '../../../model/product';
import { FunctionComponent, MutableRefObject } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps{
    addRef: MutableRefObject<Product>,
}

const Header: FunctionComponent<HeaderProps> = (props: HeaderProps) => {
    const addRef = props.addRef;
    const navigate = useNavigate();

    const saveClick = () => {
        if (addRef.current) {
            addRef.current.addProduct().then(
                async (successful) => {
                    if (successful === true) {
                        navigate('/');
                    }
                }
            );
        }
    }

    function cancelClick() {
        navigate('/');
    }

    return (
        <div className='header'>
            <div className='title'>
                <h1>Product List</h1>
            </div>
            <nav>
                <div className='items'>
                    <button id="save-btn" onClick={saveClick}>Save</button>
                    <button id="cancel-btn" onClick={cancelClick}>Cancel</button>
                </div>
            </nav>
        </div>
    );
}

export default Header;