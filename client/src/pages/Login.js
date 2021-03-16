import '../App.scss';
import React,{useState} from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import { useLazyQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom'

const LOGIN_USER = gql`
  query login(
    $username: String!
    $password: String!
    
  ) {
    login(
      username: $username
      password: $password
     
    ) {
      username
      email
      createdAt
      token
    }
  }
`


function Login(props) {

        
  function loginForm(e){

        e.preventDefault()

        login({ variables });

       }

      const [errors,setError]=useState({})

    
       const [login, { loading }] = useLazyQuery(LOGIN_USER,{
        
        
        onError:({graphQLErrors, networkError})=>{

          if (graphQLErrors) {
            graphQLErrors.forEach(({message,...details}) =>
          //  console.log(`GraphQL Error: Message: ${message}`, details.extensions),
          setError(details.extensions)
            );
            
          }
        
          if (networkError) {
           setError(networkError);
          }
        },
        onCompleted:(data)=>{
                localStorage.setItem('token',data.login.token)
                props.history.push('/home')

        }
            
      });




        const [variables, setVariables] = useState({
    
        username:'',
        password:'',

        })  

    return (
        <div>
        

        <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}> 
          <h1>Login</h1>

          <Form onSubmit={loginForm}>

          
          <Form.Group>

            <Form.Label className={errors.username && 'text-danger'} > {errors.username ?? 'Username'} </Form.Label>
            <Form.Control  type="text"  value= {variables.username} onChange={(e)=>setVariables({...variables,username:e.target.value})} />

            </Form.Group>

          <Form.Group>

            <Form.Label className={errors.password && 'text-danger'} >{errors.password ?? 'Password'}</Form.Label>
            <Form.Control  type="password"  value= {variables.password} onChange={(e)=>setVariables({...variables,password:e.target.value})} />

          </Form.Group>


        

          <div className="text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'loading':'Login'}
            </Button>

            <br />
            <small>
              Not have an account? <Link to="/register">Register</Link>
            </small>

          </div>

          </Form>
        </Col>
      </Row>
        </div>
    )
}

export default Login
