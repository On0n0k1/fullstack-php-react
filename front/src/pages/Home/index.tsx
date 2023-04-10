import { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';

import Header from './components/Header';
import Body from './components/Body';
import Footer from '../../common/components/Footer';

import './index.css';

const Home: FunctionComponent = () => {
    const [products, setProducts] = useState([]);
    const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({});

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, productSKU: string) => {
        setCheckedItems({...checkedItems, [productSKU]: event.target.checked })
    }

    const handleDeleteClick = () => {
        let items = [];

        for (let key in checkedItems){
            if (checkedItems[key]){
                items.push(key);
            }
        }
        
        // console.log('Checked items: ', items);

        let message = {
            products: items
        };

        // console.log('Built Message: ', message);

        fetch('/api/v1/products', {
            method: 'DELETE',
            body: JSON.stringify(message),
        })
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(data => {
                // console.log(data);
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
                // console.log(data);
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
                handleCheckboxChange={handleCheckboxChange}
            />
            <Footer />
        </div>
    );
}

export default Home;