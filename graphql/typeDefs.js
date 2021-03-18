const { gql } = require('apollo-server')


module.exports=gql`

type Query{

    getUsers:[User]!
    login(username: String!, password: String!): User!
    getMessages(from:String!):[Message]!

}


type User{
    username:String! 
    email:String
    imageUrl:String
    token:String
    createdAt: String!
    latestMessage:Message
}

type Message{
    uuid:String!
    content:String! 
    to:String!
    from:String!
    createdAt:String!

}

type Mutation{
    register(username:String!,email:String!,password:String!,confirmPassword:String!):User!
    sendMessage(to:String!,content:String!):Message!

}

`;
