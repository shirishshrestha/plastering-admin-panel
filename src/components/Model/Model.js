export const Model = {
  projectName: {
    type: "text",
    required: "Please enter the project name",
    name: "project-name",
    placeholder: "Enter project name",
    minLength: {
      value: 2,
      message: "Project Name must be at least 2 characters long",
    },
    pattern: {
      value: "^[a-zA-Z ]+$",
      message: "Invalid project name. Only letters are allowed.",
    },
  },
  address: {
    type: "text",
    required: "Please enter the address",
    name: "address",
    placeholder: "Enter your address",
    minLength: {
      value: 4,
      message: "Address must be at least 4 characters long",
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
    name: "cloud-link",
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
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
      message:
        "Must include uppercase, lowercase, number, and special character",
    },
  },
};
