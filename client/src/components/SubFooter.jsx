import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { LuShieldCheck } from "react-icons/lu";

const SubFooter = () => {
  return (
    <div className='sub-footer-container'>
        <div className='sub-footer-section'>
            <div className='design'>
                <div>
                <TbTruckDelivery className='design-icon' />
                </div>
            </div>
            <h3>FREE AND FAST DELIVERY</h3>
            <p>Free delivery for all orders over $140</p>
        </div>
        <div className='sub-footer-section'>
            <div className='design'>
                <div>
                <BiSupport className='design-icon' />
                </div>
            </div>
            <h3>24/7 CUSTOMER SERVICE</h3>
            <p>Friendly 24/7 customer support</p>
        </div>
        <div className='sub-footer-section'>
            <div className='design'>
                <div>
                <LuShieldCheck className='design-icon' />
                </div>
            </div>
            <h3>MONEY BACK GUARANTEE</h3>
            <p>We reurn money within 30 days</p>
        </div>
    </div>
  )
}

export default SubFooter