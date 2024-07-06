interface ModalOpen {
    open: boolean;
    setOpen: (open: boolean) => void;
    setUserLoggedIn: (userLoggedIn: boolean) => void;
  }

  interface UserProfile {
    userName: string;
    identificationNumber: string;
    email: string;
    phoneNumber: string;
  }
  
  interface Order {
    id:number;
    buyingCurrency:number;
    sellingCurrency:number;
    buyingAmount:number;
    sellingAmount:number;
    taxCurrency:number;
    taxAmount:number;
    iBanId:number | undefined;
    status:string;
  }

