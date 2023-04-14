import { FunctionComponent, useState, useEffect } from 'react';

import Header from './components/Header';
import Body from './components/Body';
import Footer from '../../common/components/Footer';

import './index.css';

const Home: FunctionComponent = () => {
    const [products, setProducts] = useState([]);

    const handleDeleteClick = () => {
        const checkboxes = document.querySelectorAll('.delete-checkbox');
        let items: string[] = [];

        checkboxes.forEach((checkbox) => {
            if ((checkbox as HTMLInputElement).checked){
                items.push((checkbox as HTMLInputElement).id);
            }
        });

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
            <Body products={products} />
            <Footer />
        </div>
    );
}

export default Home;