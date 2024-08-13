export const Model = {
  projectName: {
    type: "string",
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
    type: "string",
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
    type: "string",
    required: "Please enter the cloud link",
    name: "cloud-link",
    placeholder: "Enter the cloud link",
  },
};
