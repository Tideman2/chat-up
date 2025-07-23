interface User {
  name: string;
  age: number;
  sex: "Male" | "Female";
}

interface Teacher extends User {}
