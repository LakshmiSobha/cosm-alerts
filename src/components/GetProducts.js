import React, { Component } from 'react';
import finalProductList from './ProductService';

class GetProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            products : []          
        };
    }
    componentDidMount(){
        finalProductList(products => this.setState({products}));
      //  console.log("productlist  ==== ", products)

    }
    render() {
        const {products} = this.state;
        return(
                <div>
                  {
                    products.map(product => (
                    <div>
                        <p><img src={product.image} alt="product"/></p>
                        <p>{product.brand}</p>
                        <p>{product.name}</p>
                    </div>
                    ))
                  }      
                </div>
            );
    }
}
        
export default GetProducts;