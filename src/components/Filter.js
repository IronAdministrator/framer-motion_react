import { useEffect, useRef } from "react";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

const Filter = ({ popular, setFiltered, activeGenre, setActiveGenre }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    if (activeGenre === 0) {
      setFiltered(popular);
      return;
    }
    const filtered = popular.filter((movie) =>
      movie.genre_ids.includes(activeGenre)
    );
    setFiltered(filtered);
  }, [activeGenre]);

  return (
    <div className="filter-container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>Genre: {activeGenre}</span>
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <button
                className={activeGenre === 0 ? "active" : ""}
                onClick={() => {
                  setActiveGenre(0);
                }}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={activeGenre === 35 ? "active" : ""}
                onClick={() => {
                  setActiveGenre(35);
                }}
              >
                Comedy
              </button>
            </li>
            <li>
              <button
                className={activeGenre === 28 ? "active" : ""}
                onClick={() => {
                  setActiveGenre(28);
                }}
              >
                Action
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* <button
        className={activeGenre === 0 ? "active" : ""}
        onClick={() => {
          setActiveGenre(0);
        }}
      >
        All
      </button>
      <button
        className={activeGenre === 35 ? "active" : ""}
        onClick={() => {
          setActiveGenre(35);
        }}
      >
        Comedy
      </button>
      <button
        className={activeGenre === 28 ? "active" : ""}
        onClick={() => {
          setActiveGenre(28);
        }}
      >
        Action
      </button> */}
    </div>
  );
};

export default Filter;
