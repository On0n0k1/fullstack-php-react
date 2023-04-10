export default class Product {
    public sku: string;
    public name: string;
    public price: number;
    public type: string;
    public size: number;
    public weight: number;
    public height: number;
    public width: number;
    public length: number;

    constructor(){
        this.sku = "";
        this.name = "";
        this.price = 0;
        this.type = "DVD";
        this.size = 0;
        this.weight = 0;
        this.height = 0;
        this.width = 0;
        this.length = 0;
    }

    validate(): boolean {
        return this.sku.length > 0 
            && this.name.length > 0 
            && this.price > 0 
            || this.type === "DVD" && this.size > 0 
            || this.type === "Book" && this.weight > 0 
            || this.type === "Furniture" && (this.height > 0 && this.width > 0 && this.length > 0);
    }

    setType(type: string): void {
        switch (this.type){
            case "Book":
                this.type="Book";
                break;
            case "DVD":
                this.type="DVD";
                break;
            case "Furniture":
                this.type="Furniture"
                break;
        }
    }

    async addProduct() {
        let message = {};

        if(!this.validate()) {
            // console.log("Invalid object");
            return async () => false;
        }

        switch (this.type) {
            case "DVD":
                message = {
                    sku: this.sku,
                    name: this.name,
                    price: this.price,
                    type: "DVD",
                    size: this.size,
                };
                break;
            case "Furniture":
                message = {
                    sku: this.sku,
                    name: this.name,
                    price: this.price,
                    type: "Furniture",
                    height: this.height,
                    width: this.width,
                    length: this.length,
                };
                break;
            case "Book":
                message = {
                    sku: this.sku,
                    name: this.name,
                    price: this.price,
                    type: "Book",
                    weight: this.weight,
                };
                break;
        }

        return fetch('/api/v1/products', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            })
            .then(response => {
                // console.log("Message: ");
                // console.log(message);
                if (response.status === 201) {
                    // console.log("Successful");
                    return true;
                }
                // console.log("Failure");
                return false;
            })
            .catch(error => {
                console.warn(error);
                return false;
            }
        );
    }
}