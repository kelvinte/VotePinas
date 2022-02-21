import MainPane from "../components/MainPane";
import {useState} from "react";
import SelectionHeroBanner from "../components/SelectionHeroBanner";
import {NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

const Vote = () =>{
    const [heroes, setHeroes] = useState({
        heroes: [
            {id:1,name:'Ernesto Abella', description:'former presidential spokesman',image:'/president/president_1_sq.png'},
            {id:2,name:'Leody de Guzman', description:'Manggagawa naman!',image:'/president/president_2_sq.png'},
            {id:3,name:'Isko Moreno Domagoso', description:'Tunay Na Solusyon, Mabilis Umaksyon',image:'/president/president_3_sq.png'},
            {id:4,name:'Norberto Gonzales,', description:'Puso, Giting at Dangal ng Pilipino',image:'/president/president_4_sq.png'},
            {id:5,name:'Ping Lacson', description:'Katapangan, Kakayahan at Katapatan',image:'/president/president_5_sq.png'},
            {id:6,name:'Faisal Mangondato', description:'Isang Bansa Kamalayang Pinoy',image:'/president/president_6_sq.png'},
            {id:7,name:'Ferdinand "Bongbong" Marcos Jr.', description:'Babangon Muli',image:'/president/president_7_sq.png'},
            {id:8,name:'Jose Montemayor Jr.', description:'Heal the soul, heal the country',image:'/president/president_8_sq.png'},
            {id:9,name:'Manny Pacquiao', description:'The senator, The peoples champ',image:'/president/president_9_sq.png'},
            {id:10,name:'Leni Robredo', description:'Angat Buhay para sa lahat',image:'/president/president_10_sq.png'},

        ]
    })
    return (
        <MainPane>
            <h2>Who is your president this coming election?</h2>
            <p>This page is only a proof of concept for a decentralized voting system using blockchain</p>
            <p>Before you are able to vote, you must <Link to={`/purchase`}>purchase</Link> voting tokens</p>
            <SelectionHeroBanner heroes={heroes.heroes} />

        </MainPane>
    )
}
export default Vote;