import MainPane from "../components/MainPane";
import {useLocation} from "react-router-dom";
import {useParams} from "react-router";

const Know = () =>{
    const {id} = useParams();
    return (
        <MainPane>
            {id}
        </MainPane>
    )
}
export default Know;