import { 
    useState, 
    useEffect,
    FunctionComponent, 
    ChangeEvent, 
    MutableRefObject, 
} from 'react';

import Product from '../../../model/product';

import './Body.css';

interface DescriptionProps {
    text: string,
}

const Description: FunctionComponent<DescriptionProps> = (props: DescriptionProps) => {
    return (
        <div className='description'>
            <p className='description'>{props.text}</p>
        </div>
    );
}

interface DVDDescriptionProps{
    addRef: MutableRefObject<Product>,
}

const DVDDescription: FunctionComponent<DVDDescriptionProps> = (props: DVDDescriptionProps) => {
    const [size, setSize] = useState(props.addRef.current.size);
    
    useEffect(() => {
        props.addRef.current.size = size;
    }, [size]);

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.select();
    }

    return (
        <>
            <label>
                <span>Size (MB):</span>
                <input 
                    id="size" 
                    type="number" 
                    value={size} 
                    onFocus={handleFocus}
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => {
                            let size = Number(e.target.value);
                            setSize(size);
                        }
                    } 
                />
            </label>
            <Description text="Please, provide size"/>
        </>
    )
}

interface FurnitureDescriptionProps {
    addRef: MutableRefObject<Product>,
}

const FurnitureDescription: FunctionComponent<FurnitureDescriptionProps> = (props: FurnitureDescriptionProps) => {
    const [height, setHeight] = useState(props.addRef.current.height);
    const [width, setWidth] =   useState(props.addRef.current.width);
    const [length, setLength] = useState(props.addRef.current.length);

    useEffect(() => {
        props.addRef.current.height = height;
    }, [height]);
    
    useEffect(() => {
        props.addRef.current.width = width;
    }, [width]);

    useEffect(() => {
        props.addRef.current.length = length;
    }, [length]);

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.select();
    }
    
    return (<>
        <label>
            <span>Height (CM):</span>
            <input 
                id="height" 
                type="number" 
                value={height} 
                onFocus={handleFocus}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    let height = Number(e.target.value);
                    setHeight(height);
                }
            } />
        </label>
        <label>
            <span>Width (CM):</span>
            <input 
                id="width" 
                type="number" 
                value={width} 
                onFocus={handleFocus}
                onChange={
                    (e: ChangeEvent<HTMLInputElement>) => { 
                        let width: number = Number(e.target.value);
                        setWidth(width);
                    }
                } 
            />
        </label>
        <label>
            <span>Length (CM):</span>
            <input 
                id="length" 
                type="number" 
                value={length} 
                onFocus={handleFocus}
                onChange={
                    (e: ChangeEvent<HTMLInputElement>) => {
                        let length = Number(e.target.value)
                        setLength(length);
                    }
                }
            />
        </label>
        <Description text="Please, provide dimensions" />
    </>);
}

interface BookDescriptionProps {
    addRef: MutableRefObject<Product>,
}

const BookDescription: FunctionComponent<BookDescriptionProps> = (props: BookDescriptionProps) => {
    const [weight, setWeight] = useState(props.addRef.current.weight);

    useEffect(() => {
        props.addRef.current.weight = weight;
    }, [weight]);

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.select();
    }

    return (
        <>
            <label>
                <span>Weight (KG):</span>
                <input 
                    id="weight" 
                    type="number" 
                    value={ weight }
                    onFocus={handleFocus}
                    onChange={(e) => {
                        let weight = Number(e.target.value);
                        setWeight(weight);
                    }} 
                />
            </label>
            <Description text="Please, provide weight" />
        </>
    )
}

interface BodyProps {
    addRef: MutableRefObject<Product>,
}

const Body: FunctionComponent<BodyProps> = (props: BodyProps) => {
    const addRef = props.addRef;
    const [sku, setSku] = useState(addRef.current.sku);
    const [name, setName] = useState(addRef.current.name);
    const [price, setPrice] = useState(addRef.current.price);
    const [type, setType] = useState(addRef.current.type);
    const [validSKU, setValidSKU] = useState(true);

    useEffect(() => {
        addRef.current.sku = sku;
    }, [sku]);

    useEffect(() => {
        addRef.current.name = name;
    }, [name]);

    useEffect(() => {
        addRef.current.price = price;
    }, [price]);

    useEffect(() => {
        addRef.current.type = type;
    }, [type]);

    function Selector(){
        if (type === 'DVD'){
            return (
                <DVDDescription 
                    addRef  = { addRef  }
                />
            );
        }
    
        if (type === 'Furniture') {
            return (
                <FurnitureDescription 
                    addRef    = { addRef }
                />);
        }

    
        if (type === 'Book'){
            return (
                <BookDescription 
                    addRef    = { addRef }
                />
            );
        }
    
        return (
            <>
                !Error!
            </>
        );
    }

    const checkSKU = () => {
        fetch(`/api/v1/products?sku=${sku}`, {
            method: 'GET',
        })
        .then(response => {
            if (response.ok) {
                // sku is valid
                setValidSKU(true);
                return;
            }
            if (response.status === 409) {
                // sku is already in use, will display warning
                setValidSKU(false);
                return;
            }
        }).catch((error) => {
            // Unexpected error
            console.warn(error);
        });
      };

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.select();
    }

    return (
        <div className='body'>
            <form id="product_form" className='body-form'>
                <label>
                    <span>SKU:</span>
                    <input 
                        id="sku"
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)} 
                        onFocus={handleFocus}
                        onBlur={checkSKU}
                    />
                    { validSKU ? null : (<span className='invalid'>SKU already exists</span>) }
                </label>
                <label>
                    <span>Name:</span>
                    <input 
                        id="name" 
                        type="text" 
                        value={name} 
                        onFocus={handleFocus}
                        onChange={(e) => setName(e.target.value)} 
                    />
                </label>
                <label>
                    <span>Price:</span>
                    <input 
                        id="price" 
                        type="number" 
                        value={price} 
                        onFocus={handleFocus}
                        onChange={(e) => setPrice(Number(e.target.value))} 
                    />
                </label>
                <label>
                    <span>Type:</span>
                    <select id="productType" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="DVD">DVD</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Book">Book</option>
                    </select>
                </label>
                <Selector />
            </form>
        </div>
    );
}

export default Body;