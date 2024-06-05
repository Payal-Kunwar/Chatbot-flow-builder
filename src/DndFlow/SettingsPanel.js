
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
//Seetings Panel shows back button and edittable area to edit message for a node
//it has a back arrow button which when clicked goes back to Nodes Panel
//handleChange dynamically updates the message in node as well
export default function SettingsPanel({removeEditting, handleChange}) {

    return (
        <div className='settings-panel'>
            <div className='back-btn'>
              <div onClick={removeEditting}><Icon className='arrow-btn' path={mdiArrowLeft} size={1} /></div>
                <div style={{width:'70%' }}>Message</div>
            </div>
            <div style={{color: 'grey'}}>text</div>
            <textarea type='textNode' className='text-area' onChange={(e)=> handleChange(e)}></textarea>
        </div>
    )
}