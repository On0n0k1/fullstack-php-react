import { FunctionComponent, ChangeEvent } from 'react';
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
    index: number,
    isChecked: boolean,
    onCheckboxChange: (event: ChangeEvent<HTMLInputElement>, productSKU: string) => void,
    data: ProductType
}

const Product: FunctionComponent<ProductProps> = (props: ProductProps) => {
    let index = props.index;
    let id = `delete-checkbox-${index}`;
    let isChecked = props.isChecked;
    let onCheckboxChange = props.onCheckboxChange;
    let sku = props.data.sku;

    return (
        <div className='product'>
            <label className='delete-checkbox-label' htmlFor={id}>
                <input 
                    className='delete-checkbox' 
                    id={id} 
                    type="checkbox" 
                    checked={ isChecked } 
                    onChange={(event) => onCheckboxChange(event, sku)}
                />
                <span className='delete-checkmark'></span>
            </label>
            
            <ProductContent data={ props.data }/>
        </div>
    )
}

interface ProductsProps {
    products: ProductType[],
    checkedItems: { [key: string]: boolean },
    handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>, productSKU: string) => void,
}

const Products: FunctionComponent<ProductsProps> = (props: ProductsProps) => {
    return (
        <div className='products'>
            { props.products.map((element: ProductType, index: number)=> {
                return (<Product 
                    key={index} 
                    index={index} 
                    data={element}
                    isChecked={props.checkedItems[element.sku]? true : false }
                    onCheckboxChange={props.handleCheckboxChange}
                />);
            }) }
        </div>
    );
}

interface BodyProps {
    products: ProductType[],
    checkedItems: { [key: string]: boolean },
    handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>, productSKU: string) => void
}

const Body: FunctionComponent<BodyProps> = (props: BodyProps) => {
    return (
        <div className='body'>
            <Products 
                products={props.products} 
                checkedItems={props.checkedItems}
                handleCheckboxChange={props.handleCheckboxChange}
            />
        </div>
    );
}

export default Body;