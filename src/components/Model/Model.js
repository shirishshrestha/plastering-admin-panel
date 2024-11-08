export const Model = {
  projectName: {
    type: "text",
    required: "Please enter the project name",
    name: "project_name",
    placeholder: "eg. Albert Street House / Wayne Road Duplex",
    minLength: {
      value: 2,
      message: "Project Name must be at least 2 characters long",
    },
    pattern: {
      value: "^[a-zA-Z0-9 ]+$",
      message: "Invalid project name. Only letters and numbers are allowed.",
    },
  },
  address: {
    type: "text",
    required: "Please enter the project address",
    name: "address",
    placeholder: "Enter project address",
    minLength: {
      value: 3,
      message: "Address must be at least 3 characters long",
    },
    pattern: {
      value: "^[a-zA-Z0-9 ,.-]+$",
      message:
        "Invalid address. Only letters, numbers, spaces, commas, periods, and hyphens are allowed.",
    },
  },
  cloudLink: {
    type: "text",
    required: "Please enter the cloud link",
    name: "cloud_link",
    placeholder: "Enter the cloud link",
  },

  username: {
    type: "text",
    required: "Please enter your username",
    name: "username",
    placeholder: "Enter username",
    minLength: {
      value: 3,
      message: "Should be at least 3 characters long",
    },
    maxLength: {
      value: 20,
      message: "Should be no more than 20 characters long",
    },
    pattern: {
      value: "^[a-zA-Z0-9_]+$",
      message:
        "Invalid username. Only letters, numbers, and underscores are allowed.",
    },
  },

  password: {
    type: "password",
    required: "Please enter your password",
    name: "password",
    placeholder: "Enter password",
    minLength: {
      value: 8,
      message: "Should be at least 8 characters long",
    },
    maxLength: {
      value: 32,
      message: "Should be no more than 32 characters long",
    },
    pattern: {
      value:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&~#^+])[A-Za-z\\d@$!%*?&~#^+]+$",
      message:
        "Must include uppercase, lowercase, number, and special character",
    },
  },

  phoneNumber: {
    type: "tel",
    required: "Please enter your phone number",
    name: "phone_number",
    placeholder: "Enter phone number",
    minLength: {
      value: 10,
      message: "Phone number should be at least 10 digits",
    },
    maxLength: {
      value: 15,
      message: "Phone number should be no more than 15 digits",
    },
    pattern: {
      value: "^[0-9 +]+$",
      message: "Invalid phone number. Please enter a valid format.",
    },
  },

  email: {
    type: "email",
    required: "Please enter your email",
    name: "email",
    placeholder: "Enter email",
    minLength: {
      value: 5,
      message: "Email should be at least 5 characters long",
    },
    maxLength: {
      value: 320,
      message: "Email should be no more than 320 characters long",
    },
    pattern: {
      value: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
      message: "Please enter a valid email address",
    },
  },

  Name: {
    type: "text",
    required: "Please enter your name",
    placeholder: "Enter your name",
    name: "fullname",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters long",
    },
    maxLength: {
      value: 64,
      message: "Name should be less than 64 characters",
    },
    pattern: {
      value: "^[a-zA-Z ]+$",
      message: "Invalid name. Name must contain only alphabetic characters",
    },
  },

  BusinessName: {
    type: "text",
    required: "Please enter business name",
    placeholder: "Enter business name",
    name: "business_name",
    minLength: {
      value: 2,
      message: "Business Name must be at least 2 characters long",
    },
    maxLength: {
      value: 128,
      message: "Business Name should be less than 128 characters",
    },
    pattern: {
      value: "^[a-zA-Z ]+$",
      message:
        "Invalid business name. Business Name must contain only alphabetic characters",
    },
  },

  ACN: {
    type: "text",
    required: "Please enter ABN / ACN",
    placeholder: "Enter ABN / ACN",
    name: "abn",
    minLength: {
      value: 9,
      message: "ACN must be 9 numbers long",
    },
    maxLength: {
      value: 11,
      message: "ABN must be 11 numbers long",
    },
    pattern: {
      value: "^[0-9 ]+$",
      message: "Invalid. ACN / ABN must contain only numeric characters",
    },
  },

  TradeType: {
    type: "text",
    required: "Please enter trade type",
    placeholder: "Eg. Builder, Plasterer, etc",
    name: "trade_type",
    minLength: {
      value: 2,
      message: "Trade type must be at least 2 characters long",
    },
    maxLength: {
      value: 64,
      message: "Trade type should be less than 64 characters",
    },
    pattern: {
      value: "^[a-zA-Z ]+$",
      message:
        "Invalid trade type. Trade type must contain only alphabetic characters",
    },
  },

  BusinessStructure: {
    type: "text",
    required: "Please enter business structure",
    placeholder: "Enter business structure",
    name: "business_structure",
    minLength: {
      value: 2,
      message: "Business Structure must be at least 2 characters long",
    },
    maxLength: {
      value: 64,
      message: "Business Structure should be less than 64 characters",
    },
    pattern: {
      value: "^[a-zA-Z ]+$",
      message:
        "Invalid business Structure. Business Structure must contain only alphabetic characters",
    },
  },
};
