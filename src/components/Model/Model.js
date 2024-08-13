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
      message:
        "Invalid project name. It must contain only alphabetic characters",
    },
  },
};
