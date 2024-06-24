import React from 'react';
import '../styles/Cart.css';
import { NavLink } from 'react-router-dom';

const BillDiv = ({ cart }) => {

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (item.salePrice * item.quantity), 0);
      }
    
      const total = calculateTotal();

  return (
    <div className="bill-div">
      <h3 className='bill-heading'>Cart Total</h3>
      <div className="sub-bill">
        <p>Subtotal:</p><p>{`$${total.toFixed(2)}`}</p>
      </div>
      <div className="sub-bill">
        <p>Shipping:</p><p>Free</p>
      </div>
      <div className="sub-bill">
        <p>Total:</p><p>{`$${total.toFixed(2)}`}</p>
      </div>
      <NavLink className='bill-checkout' to='/checkout'>Proceed to Checkout</NavLink>
    </div>
  );
}

export default BillDiv;
