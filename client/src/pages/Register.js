import '../App.scss';
import React,{useState} from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom'

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`


function Register(props) {

        
  function registerForm(e){

        e.preventDefault()

        register({ variables });

        

       }

      const [errors,setError]=useState({})

    
       const [register, { loading,data }] = useMutation(REGISTER_USER,{
        
        update:(_,__)=>{

          props.history.push('/login')
          console.log(data);


        },
        onError:({graphQLErrors, networkError})=>{

          if (graphQLErrors) {
            graphQLErrors.forEach(({message,...details}) =>
            setError(details.extensions)
           // console.log(`GraphQL Error: Message: ${message}`, details.extensions),
            );
            
          }
        
          if (networkError) {
           setError(networkError);
          }
        },

  
      });




        const [variables, setVariables] = useState({
        email:'',
        username:'',
        password:'',
        confirmPassword:'',

        })  

    return (
        <div>
        

        <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}> 
          <h1>Register</h1>

          <Form onSubmit={registerForm}>

          <Form.Group>    

              <Form.Label className={errors.email && 'text-danger'}>{errors.email ?? 'Email address'}</Form.Label>
              <Form.Control   type="email" value= {variables.email} onChange={(e)=>setVariables({...variables,email:e.target.value})} />

          </Form.Group>

          <Form.Group>

            <Form.Label className={errors.username && 'text-danger'} > {errors.username ?? 'Username'} </Form.Label>
            <Form.Control  type="text"  value= {variables.username} onChange={(e)=>setVariables({...variables,username:e.target.value})} />

            </Form.Group>

          <Form.Group>

            <Form.Label className={errors.password && 'text-danger'} >{errors.password ?? 'Password'}</Form.Label>
            <Form.Control  type="password"  value= {variables.password} onChange={(e)=>setVariables({...variables,password:e.target.value})} />

          </Form.Group>


          <Form.Group>

            <Form.Label className={errors.confirmPassword && 'text-danger'}>{errors.confirmPassword ?? 'Confirm Password'}</Form.Label>
            <Form.Control  type="password"  value= {variables.confirmPassword} onChange={(e)=>setVariables({...variables,confirmPassword:e.target.value})} />

          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'loading':'register'}
            </Button>

            <br />
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>

          </div>

          </Form>
        </Col>
      </Row>
        </div>
    )
}

export default Register
