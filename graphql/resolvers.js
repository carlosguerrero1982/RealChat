const {User,Message} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {JWT_SECRET} = require('../env.json')
const {Op}= require('sequelize')
const {UserInputError,AuthenticationError} = require('apollo-server')

 module.exports  = {


Query:{
        getUsers:async(_,__,{user})=>{
  
        
            try {
           
            if (!user) throw new AuthenticationError('Unauthenticated')

            const users = await User.findAll({where:{username:{[Op.ne]:user.username}}})


            return users;

            } catch (error) {
                console.log(error);
                throw new Error(error)
            }

        
        },

        login:async(_,{username,password})=>{

            let errors={}

            try {

                if(username.trim() === '')
                 errors.username = 'username must not be empty'
        
              if (password === '') errors.password = 'password must not be empty'

               
              if (Object.keys(errors).length > 0) {
                  throw new UserInputError('bad input', { errors })
              }
                 

                const user = await User.findOne({where:{username}})
                
                if(!user){

                    errors.username='user not exist'
                    throw new UserInputError('not exist',errors)
                }

                
                 
                     const match = await bcrypt.compare(password,user.password);

                    if(!match){
                    errors.general="Wrong credential";
                    throw new UserInputError('Wrong Password',{errors})
                    }

                    const token = jwt.sign({
                        username
                    },JWT_SECRET,{expiresIn:60*60})

                    user.token= token;

                return {
                    ...user.toJSON(),
                    createdAt: user.createdAt.toISOString(),
                    token
                }


            } catch (error) {
                console.log(error);
                throw new UserInputError('error',error)

            }
        }
    },

    Mutation:{

        register:async(_,{username,email,password,confirmPassword})=>{

            let errors={}

            try {
                
                if(email.trim()===''){
                    errors.email='empty email'
                }

                if(password.trim()===''){
                    errors.password='empty password'
                }

                if(username.trim()===''){
                    errors.username='username empty'
                }

                if(confirmPassword.trim()===''){
                    errors.confirmPassword='confirmPassword empty'
                }

                if(password!==confirmPassword){
                    errors.confirmPassword='password not match'
                }

              //  const userName = await User.findOne({where:{username}})

              //  const userEmail = await User.findOne({where:{email}})

              //  if(userName) errors.username="username taken"

              //  if(userEmail) errors.email="email taken"

                if(Object.keys(errors).length>0){
                    throw errors
                }


                password = await bcrypt.hash(password,6)

               const user= await User.create({
                    username,
                    email,
                    password
                })

                return user

            } catch (error) {

                if(error.name==='SequelizeUniqueConstraintError'){
                    error.errors.forEach((e)=>(errors[e.path]=`${username} is taken`))
                }else if(error.name==='SequelizeValidationError'){
                    error.errors.forEach((e)=>(errors[e.message]=e.message))

                }
                console.log(error);
                throw new UserInputError('error',errors)
            }
        },

        sendMessage:async(_,{to,content},{user})=>{

            try {
                if (!user) throw new AuthenticationError('Unauthenticated')

                const recipient = await User.findOne({where:{username:to}})
                if(!recipient){
                    throw new UserInputError('not recipient')
                }

                if(content.trim()===''){
                    throw new UserInputError('empty message')

                }

                const message = await Message.create({
                    from:user.username,
                    to,
                    content
                })

                return message
                
            } catch (error) {
                console.log(error);
                throw error
            }
        }
    }

}