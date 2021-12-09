
export interface PrefillMessage {
  id?: number;
  name?: string;
  subject?: string;
  message?: string;
  is_default?:number;
  created_at?: string;
  default_text?:string;
}
