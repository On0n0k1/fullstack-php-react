import { FunctionComponent } from 'react';
import './Body.css';

import ProductType from '../../../model/product';

interface ProductContentProps {
    data: ProductType,
}

const ProductContent: FunctionComponent<ProductContentProps> = (props: ProductContentProps) => {
    function BookDescription(){
        let weight = props.data.weight;
        return (<>
            <p>Weight: {weight}KG</p>
        </>)
    }

    function DVDDescription() {
        let size = props.data.size;
        return (<>
            <p>Size: {size} MB</p>
        </>)
    }

    function FurnitureDescription() {
        let height = props.data.height;
        let width = props.data.width;
        let length = props.data.length;

        return (<>
            <p>Dimension: {height}x{width}x{length}</p>
        </>)
    }

    let data = props.data;
    let sku = data.sku;
    let name = data.name;
    let price = data.price;

    let description = <p></p>;

    switch (data.type) {
        case 'DVD':
            description = DVDDescription();
            break;
        case 'Book':
            description = BookDescription();
            break;
        case 'Furniture':
            description = FurnitureDescription();
            break;
        default:
            console.warn("Invalid Type found");
            description = (<p>Invalid Type Detected</p>);
    }

    return (
        <div className='content'>
            <p>{sku}</p>
            <p>{name}</p>
            <p>{price}</p>
            {description}
        </div>
    );
}

interface ProductProps {
    data: ProductType
}

const Product: FunctionComponent<ProductProps> = (props: ProductProps) => {
    let sku = props.data.sku;
    
    let id_checkmark = `delete-checkmark-${sku}`;
    let id_label = `delete-label-${sku}`;

    return (
        <div className='product'>
            <label className='delete-checkbox-label' htmlFor={sku} id={id_label}>
                <input 
                    className='delete-checkbox' 
                    id={sku} 
                    type="checkbox" 
                />
                <span className='delete-checkmark' id={id_checkmark}></span>
            </label>
            
            <ProductContent data={ props.data }/>
        </div>
    )
}

interface ProductsProps {
    products: ProductType[],
}

const Products: FunctionComponent<ProductsProps> = (props: ProductsProps) => {
    return (
        <div className='products'>
            { props.products.map((element: ProductType, index: number)=> {
                return (<Product 
                    key={element.sku}
                    data={element}
                />);
            }) }
        </div>
    );
}

interface BodyProps {
    products: ProductType[],
}

const Body: FunctionComponent<BodyProps> = (props: BodyProps) => {
    return (
        <div className='body'>
            <Products 
                products={props.products} 
            />
        </div>
    );
}

export default Body;