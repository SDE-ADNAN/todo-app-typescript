export type User = {
  username: string;
  password: string;
  jwtToken: string
};
const userCredentialsArray: User[] = [
    {
      username: "AdnanKhan",
      password: "AdnanKhan@4069",
      jwtToken: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NjUwODUwOSwiaWF0IjoxNjg2NTA4NTA5fQ.e1yRdG1rHJD6-eYFrzKlYXC1vi6oVF0lTu_cyz7UB2k"
    },
    {
      username: "TalhaKhan",
      password: "TalhaKhan@4069",
      jwtToken: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6InVzZXIyIiwiZXhwIjoxNjg2NTA4NTA5LCJpYXQiOjE2ODY1MDg1MDl9.x7WEmQc6I2n7vToABOwAuMS3tFIJ-AUWp-qqLNXd7UA"
    },
    {
      username: "MobinKhan",
      password: "MobinKhan@4069",
      jwtToken: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoicGFzc3dvcmQgMyIsIklzc3VlciI6Iklzc3VlciIsIlVzZXJuYW1lIjoidXNlcjMiLCJleHAiOjE2ODY1MDg1MDksImlhdCI6MTY4NjUwODUwOX0.sdDQVec3ZVxR61XPYh8m_g-5W4-PzzRf3BEmKOO0jgw"
    }
  ];

  export default  userCredentialsArray