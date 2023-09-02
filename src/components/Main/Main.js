import "./Main.css";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import Student from "./Student/Student";
import Portfolio from "./Portfolio/Portfolio"

function Main() {
    return (
        <>
        <NavTab />
        <AboutProject />
        <Techs />
        <Student />
        <Portfolio />
        </>
    )
}
export default Main;