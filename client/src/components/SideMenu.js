import React from "react";

const SideMenu = ({ clearChat, handleHeroChange, selectedHero, heroList }) => (
  <aside className="sidemenu">
    <h3>Chat with your favorite Superhero!</h3>
    <div className="sidemenu-select">
      <label htmlFor="hero-select"></label>
      <select value={selectedHero} onChange={handleHeroChange} id="hero-select">
        {heroList.map((hero) => (
          <option key={hero.name} value={hero.name}>
            {hero.name} ({hero.universe})
          </option>
        ))}
      </select>
    </div>
    <button className="sidemenu-button" onClick={clearChat}>
      <span className="box">Clear</span>
    </button>
  </aside>
);

export default SideMenu;
