export class Urls {
    static Home() {
      return "/";
    }
    static Login() {
      return "users/login";
    }
    static Signup() {
      return "users/register";
    }
  
    static Mcqs = class {
      static Mcqs() {
        return "/mcqs";
      }
      static Mcq(id) {
        return `/mcqs/${id}`;
      }
      static NewMcq() {
        return "/mcqs/new";
      }
      static EditMcq(id) {
        return `/mcqs/${id}/edit`;
      }
    };
  }
  