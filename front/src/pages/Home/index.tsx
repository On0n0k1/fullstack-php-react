import { FunctionComponent, useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
// import { useNavigate } from 'react-router-dom';


import Header from './components/Header';
import Body from './components/Body';
import Footer from '../../common/components/Footer';

import './index.css';

const Home: FunctionComponent = () => {
    const [products, setProducts] = useState([]);
    const checkedItems = useRef<{[key: string]: boolean}>({});

    const handleDeleteClick = () => {
        let items = [];

        for (let key in checkedItems.current){
            if (checkedItems.current[key]){
                items.push(key);
            }
        }

        checkedItems.current = {};
        
        let message = {
            products: items
        };

        fetch('/api/v1/products', {
            method: 'DELETE',
            body: JSON.stringify(message),
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                setProducts(data);
            })
            .catch(error => {
                console.warn(error);
            });
    }

    useEffect(()=> {
        fetch('/api/v1/products', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.warn(error);
            });
    }, []);

    return (
        <div className='product-list'>
            <Header handleDeleteClick={handleDeleteClick} />
            <Body 
                products={products} 
                checkedItems={checkedItems}
            />
            <Footer />
        </div>
    );
}

export default Home;