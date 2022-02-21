import NavigationPane from "../components/NavigationPane";

const Main = (props) =>{
    return (
        <div>
            <NavigationPane></NavigationPane>
            <div className="container">
            {props.children}
            </div>
        </div>
    )
}
export default Main;