 export interface AddAddressResponse {
  status: string;
  message: string;
  data?: {
    name: string;
    details: string;
    phone: string;
    city: string;
    _id: string;
  };
}