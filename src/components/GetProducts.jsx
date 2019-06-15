import React, { Component } from 'react';
import finalProductList from './ProductService';
import './GetProducts.css';

function alertStyle(alert){
  if(alert == "High Concern!") return {background:'red'};
  if(alert == "Plastics Alert!") return {background:'orange'};
  if(alert == "Safe") return {background:'green'};
  return {};
}

class GetProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            products : []          
        };
    }
    componentDidMount(){
        finalProductList(products => this.setState({products}));
    }
    render() {
        const {products} = this.state;
        return(
                <div className="container-fluid">
                  <div className="row">
                  {
                    products.map(product => (
                      <div className="col-sm-4">
                        <div className="thumbnail">
                            <img id="imgSize" className="img-responsive" src={product.image} alt={product.name}/>
                            <h3>{product.name}</h3>
                            <h4>{product.brand}</h4>
                            <button className="button" style={alertStyle(product.alert)}><b>{product.alert}</b></button>
                        </div>  
                      </div>
                    ))
                  }
                  </div>
                </div>
            );
    }
}
        
export default GetProducts;