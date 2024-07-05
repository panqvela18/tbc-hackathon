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