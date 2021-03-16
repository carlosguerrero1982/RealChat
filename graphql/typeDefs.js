const { gql } = require('apollo-server')


module.exports=gql`

type Query{

    getUsers:[User]!
    login(username: String!, password: String!): User!}

type User{
    username:String! 
    email:String!
    token:String
    createdAt: String!

}

type Message{
    uuid:String!
    content:String! 
    to:String!
    from:String!

}

type Mutation{
    register(username:String!,email:String!,password:String!,confirmPassword:String!):User!
    sendMessage(to:String!,content:String!):Message!
}

`;
