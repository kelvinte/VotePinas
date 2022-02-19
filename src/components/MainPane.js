import NavigationPane from "../components/NavigationPane";

const Main = (props) =>{
    return (
        <div>
            <NavigationPane></NavigationPane>
            {props.children}
        </div>
    )
}
export default Main;