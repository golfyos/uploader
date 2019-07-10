import toaster from 'toasted-notes';
import { MessageOptionalOptions } from 'toasted-notes/lib/ToastManager';

const default_config:MessageOptionalOptions = {
  duration: 3000,
  position: "bottom-right"
}

export const alert = (title:any)=> {
  toaster.notify(title,default_config)
}