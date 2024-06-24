import React from "react";
import item1 from "../assets/item1.png";
import item2 from "../assets/item2.png";
import item3 from "../assets/item3.png";
import item4 from "../assets/item4.png";
import { NavLink } from "react-router-dom";

const Featured = () => {
  return (
    <>
      <div className="todays-div" style={{ marginTop: "10vh" }}>
        <div className="todays-border"></div>
        <h4 className="todays">Featured</h4>
      </div>
      <div className="sale-heading">
        <h2>New Arrivals</h2>
      </div>
      <div className="grid-container">
        <div className="item2">
          <img src={item2} alt="" />
          <div className="contentsofarrival">
            <h3>PlayStation 5</h3>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <NavLink to='typeofproduct/gaming' className="arrivalsbtns">Shop Now</NavLink>
          </div>
        </div>
        <div className="item1">
          <img src={item1} alt="" />
          <div className="contentsofarrival">
            <h3>Women's Collections</h3>
            <p>Featured woman collections that give you another vibe.</p>
            <NavLink to='category/womansfashion' className="arrivalsbtns">Shop Now</NavLink>
          </div>
        </div>
        <div className="item3">
          <img src={item3} alt="" />
          <div className="contentsofarrival">
            <h3>Speakers</h3>
            <p>Amazon wireless speakers</p>
            <NavLink to='typeofproduct/speakers' className="arrivalsbtns">Shop Now</NavLink>
          </div>
        </div>
        <div className="item4">
          <img src={item4} alt="" />
          <div className="contentsofarrival">
            <h3>Perfume</h3>
            <p>GUCCI INTENSE OUD EDP</p>
            <NavLink to='typeofproduct/perfumes' className="arrivalsbtns">Shop Now</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
