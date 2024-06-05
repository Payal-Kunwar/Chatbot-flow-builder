import SettingsPanel from './SettingsPanel';
import './settingsStyle.css'
import NodesPanel from './NodesPanel';

function Aside({editting, removeEditting, handleChange}) {
  
 if(editting) {
  return (
    <SettingsPanel removeEditting = {removeEditting} handleChange = {handleChange} />
  )
 }
 else { 
  //Nodes Panel
    return (
      <NodesPanel />
    )
 }
}

//This is the SideBar default component that is exported
//here editting, removeEditting, handleChange, saveFlow are passed as props
//It renders two subcomponents -> SettingsPanel and NodesPanel whose functionality can be extended further
export default ({editting, removeEditting, handleChange, saveFlow}) => {
    return (
      <aside>
        <div className='btn-container'><div className='save-btn' onClick={saveFlow}>Save Changes</div></div>
        <hr />
        <Aside editting = {editting} removeEditting = {removeEditting} handleChange = {handleChange} />
      </aside>
    )
     
};    
