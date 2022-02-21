import {Figure, Image} from "react-bootstrap";
import {Component} from "react";
import {Link} from "react-router-dom";



class SelectionHeroBanner extends Component {

    state= {
        name: '',
        description: '',
    }

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.setState({'name':this.props.heroes[0].name});
        this.setState({'description':this.props.heroes[0].description});
    }

    selectHero(hero) {
        this.setState({'name':hero.name});
        this.setState({'description':hero.description});
    }

    render(){
        return (


                <div className="row">

                    {this.props.heroes.map((v, i)=>{
                        return(
                            // <div className="col-12">
                            //     <Image
                            //         onClick={()=>this.selectHero(v)} fluid src={v.image}/>
                            // </div>
                            <Figure className="col-3">
                                <Figure.Image src={v.image}/>
                                <Figure.Caption>
                                    <h3 className="text-center">{v.name}</h3>
                                    <p className="text-center">{v.description}</p>
                                    <div className="row">
                                        <div className="col-6 text-end">
                                        <button type="submit" className="btn btn-primary btn-sm">Vote</button>
                                        </div>
                                        <div className="col-6 text-start">

                                            <Link to={`/know/${v.id}`}className="btn btn-sm btn-dark">Know</Link>
                                        </div>
                                    </div>
                                </Figure.Caption>
                            </Figure>
                        )
                    })}
                </div>

        )
    }

}
export default SelectionHeroBanner;