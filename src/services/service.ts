import { SPFI } from "@pnp/sp";
import { ITcrformProps } from "../webparts/tcrform/components/ITcrformProps";
import { getSP } from "../pnpjsConfig";



export const saveitems =async (props:ITcrformProps):Promise<void>=>{
    const _sp :SPFI = getSP(props.context) ;
  
    const iar = _sp.web.lists.getByTitle('Transport Contract Request').items.add({
      Title: props.userDisplayName,
  
  
    });
    console.log('Item added',iar);
  }