import React, { Component } from 'react';

const barcodeURL = "http://42.cosmethics.com/p/"
const productBarcodes = "3605521556028"

class GetProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : false,
            products : []          
        };
    }
    componentDidMount(){
        // I will use fake api from jsonplaceholder website
        // this return 100 products 
        // src={`http://42.cosmethics.com/p/${barcode}`}
        fetch(barcodeURL+productBarcodes)
        .then( response => response.json())
        .then(
            // handle the result
            (result) => {
                this.setState({
                    isLoaded : true,
                    products : result
                });
            },
            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            },
        )
    }
    render() {
        const {error, isLoaded, products} = this.state;
        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{
            return(
                <div>
                        <div>
                            <p><img src={products.image} /></p>
                            <p>{products.brand}</p>
                            <p>{products.name}</p>
                        </div>
                </div>
            );
        }
        
    }
}
        
  export default GetProducts;