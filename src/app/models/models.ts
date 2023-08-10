interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
  __v: number;
}

interface Admin {
  _id: string;
  username: string;
  password: string;
  __v: number;
}

interface User extends Admin {
  purchasedCourses: Course[];
}
