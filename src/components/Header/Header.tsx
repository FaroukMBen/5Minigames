import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
    const location = useLocation();

    return (
        <header id={location.pathname !== "/" ? "headerInGame" : undefined}>
            {location.pathname !== "/" && (
                <Link to="/">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            )}
            <h1>Farouk's Minigames</h1>
        </header>
    );
}
export default Header;
