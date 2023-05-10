import * as React from 'react';

import { ITcrformProps } from './ITcrformProps';
import { ListItemAttachments } from '@pnp/spfx-controls-react/lib/ListItemAttachments';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import { ListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
//import { saveitems } from '../../../services/service';
//import { IListForm } from '../../../IListInterface';
import { useState } from 'react';

import { TextField} from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';

import { PrimaryButton } from '@fluentui/react';
import { getSP } from '../../../pnpjsConfig';
import { SPFI } from '@pnp/sp';



const Tcrform = (props:ITcrformProps):JSX.Element =>{

 const [form,setform ] = useState({
Title:"123",FreightPayment:"",ContractFrom: new Date(),  
endDate: new Date()
 })
 
  const _getPeoplePickerItems = (items: any[]) => {
    console.log('Items:', items);
}
const onSelectedItem = (data: { key: string; name: string }[]) => {
  for (const item of data) {
    console.log(`Item value: ${item.key}`);
    console.log(`Item text: ${item.name}`);
  }
}
const options: IDropdownOption[] = [
  
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
 
  { key: 'grape', text: 'Grape' },
 
];
function onsubmit(){
  console.log("Data submitted",JSON.stringify(form));
  
    const _sp :SPFI = getSP(props.context) ;
  
    const iar = _sp.web.lists.getByTitle('Transport Contract Request').items.add(
      form);
    console.log('Item added',iar);
  
}
 let curruser:any = props.userDisplayName

  return(
    <section>
      <div>
     <h2>Transport Request Form</h2> 
<PeoplePicker
    context={props.context as any}

    titleText="Applicant"
    placeholder='Select Applicant'
    defaultSelectedUsers = {[curruser]}
    personSelectionLimit={1}
    groupName={""} // Leave this blank in case you want to filter from all users
    ensureUser={true}
    showtooltip={false}
    suggestionsLimit={5}
    required={true}
    disabled={false}
    onChange={_getPeoplePickerItems}
    showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    />

<Dropdown
        placeholder="Select"
        label="Requesting Officer"
        options={options}
       
      />
<ListItemPicker listId='e530e316-4ff9-428c-ab1e-5c1b38154ddd'
                columnInternalName='Title'
                keyColumnInternalName='Id'
                placeholder="Select your customer(s)"
                substringSearch={true}
                label = "Customer"
                orderBy={"Id desc"}
                itemLimit={10}
                enableDefaultSuggestions={true} 
                onSelectedItem={onSelectedItem}
                context={props.context as any} />

<DateTimePicker label="From"
                dateConvention={DateConvention.Date}
               
                />
                
                
<DateTimePicker label="To"
                dateConvention={DateConvention.Date}/>
                
<TextField label="Contract Duration"/>               

<RichText label="Cargo Description"/>
<TextField label="Contract Volume Per Year"/> 
<RichText label="Port Pairs, Estimate Volume & Freight Rate"/>
<TextField label="BAF"/> 

<TextField label="Freight Payment" onChange={(e)=>setform({...form,FreightPayment:(e.target as HTMLInputElement).value})}/>
<TextField label="Other Conditions"/> 
<TextField label="Applicable Law"/> 
<RichText label="Background"/>
<ListItemAttachments listId='eff8bd33-0005-47f4-a438-7579491074d2'
                     itemId={1}
                     label = "Background"
                     context={props.context as any}
                     disabled={false} />
<RichText label="Voyage P/L Contribution"/> 
<ListItemAttachments listId='eff8bd33-0005-47f4-a438-7579491074d2'
                     itemId={1}
                     label = "Voyage P/L Contribution"
                     context={props.context as any}
                     disabled={false} />  
<RichText label="Others"/>  
<ListItemAttachments listId='eff8bd33-0005-47f4-a438-7579491074d2'
                     itemId={1}
                     label = "Others"
                     context={props.context as any}
                     disabled={false} />
<PeoplePicker
    context={props.context as any}
    titleText="Interested Parties"
    personSelectionLimit={10}
    //groupName={""} // Leave this blank in case you want to filter from all users
    showtooltip={true}
    required={true}
    disabled={false}
    onChange={_getPeoplePickerItems}
    showHiddenInUI={false}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} />                  
<br/>
<PrimaryButton onClick={() => onsubmit()} text="Save" />
 
   </div>
</section>

  )
} 

export default Tcrform

 







