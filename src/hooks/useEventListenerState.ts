import { useRef, useState } from 'react';

export const useEventListenerState = <Type>(defaultValue: Type): [Type, Function] => {
  const [ refState, setRefState ] = useState(defaultValue);
  const ref = useRef(refState);
  
  const setState = (data: any) => {
    ref.current = data;
    setRefState(data);
  }

  return [ ref.current, setState ];
}