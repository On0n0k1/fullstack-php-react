import Body from "./components/Body";
import Footer from "../../common/components/Footer";
import Header from "./components/Header";

import Product from "../../model/product";
import './index.css';

import { useRef, MutableRefObject } from "react";

export default function AddProduct() {
    const addRef: MutableRefObject<Product> = useRef(new Product());

    return (
        <div className='add-product'>
            <Header addRef={addRef} />
            <Body addRef={addRef} />
            <Footer />
        </div>
    );
}