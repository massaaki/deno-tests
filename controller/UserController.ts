import { IUser } from '../model/User.ts';


let users: IUser[] = [
  {id: "01", name: "User 01", email: "user01@email.com", created_at: new Date(), updated_at: new Date() },
  {id: "02", name: "User 02", email: "user02@email.com", created_at: new Date(), updated_at: new Date() },
  {id: "03", name: "User 03", email: "user03@email.com", created_at: new Date(), updated_at: new Date() },
  {id: "04", name: "User 04", email: "user04@email.com", created_at: new Date(), updated_at: new Date() },
  {id: "05", name: "User 05", email: "user05@email.com", created_at: new Date(), updated_at: new Date() },
  {id: "06", name: "User 06", email: "user06@email.com", created_at: new Date(), updated_at: new Date() }
];


const getUsers = ({response}: {response:any}) => {
  response.body = users;
};


const getUser = (
  {params, response} : { params: {id:string}; response:any; }) => {
    const user:IUser | undefined = users.find(user => user.id === params.id);
    // const user = {id: params.id};

    if(user) {
      response.status = 200;
      response.body = user;
    } else {
      response.status = 404;
      response.body = {message: 'User not found. '};
    }
  };

const addUser = async ({request, response}: {request: any; response: any}) => {
  const body = await request.body();

  const user: IUser = body.value;

  user.created_at = new Date();
  user.updated_at = new Date();

  users.push(user);

  response.body = {message: "ok"};
  response.status = 200;


}


const updateUser = async ({params, request, response}: {params: {id: string}; request: any; response: any }) => {
  let user:IUser | undefined = users.find(user => user.id === params.id);


  if(user) {
    const body =  await request.body;
    const updatedUser: {name?: string; email?: string} = body.value;

    user = {...user, ...updatedUser, updated_at: new Date()};
    users = [...users.filter((user) => user.id !== params.id), user];

    response.status = 200;
    response.body = {message: "ok"};
  } else {
    response.status= 404;
    response.body = {message: "user not found"};
  }
 

}

export {getUsers, getUser, addUser, updateUser};