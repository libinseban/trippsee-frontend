import  '../style/searchBox.css';
// import { LuMapPin } from "react-icons/lu";
import image from '../public/icon.png';
import group from '../public/group.png';

export default function MyDatePicker() {
  return (
   <>
   <div className="search-box">
  <div className="search-fields">
   <div className="input-group">
    <img src={image} alt="Location Icon" className="input-icon"/>
    <input type="text" placeholder="     Location" />
  </div>
    <input type="date" />
    <input type="date" />
    <div className="input-group">
      <img src={group} alt="Guests Icon" className="input-icon"/>
      <input type="number" placeholder="      Guests" />
    </div>
  </div>

  <button className="search-btn">Search Properties</button>
</div></>
  )
}
