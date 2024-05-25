import { useEffect } from "react"

export default function outSiteClick(optionRef, id, cb){
    
    useEffect(()=>{
        function handleOutsideClick(e){
            if(optionRef.current && !optionRef.current.contains(e.target) && e.target.id !== id){
                cb();
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
          };
    },[optionRef, cb])
}