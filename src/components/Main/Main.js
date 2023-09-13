import "./Main.css";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import Student from "./Student/Student";
import Portfolio from "./Portfolio/Portfolio"
import Cover from "./Cover/Cover";

function Main() {
    return (
        <main>
            <Cover />
            <NavTab />
            <AboutProject />
            <Techs />
            <Student />
            <Portfolio />
        </main>
    )
}
export default Main;