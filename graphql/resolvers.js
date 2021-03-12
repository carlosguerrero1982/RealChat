const {User} = require('../models')

const bcrypt = require('bcrypt');

const {UserInputError} = require('apollo-server')

 module.exports  = {


Query:{
        getUsers:async()=>{
  
            try {
                
                const users = await User.findAll()
                return users;

            } catch (error) {
                console.log(error);
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
        }
    }

}
