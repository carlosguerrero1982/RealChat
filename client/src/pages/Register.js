import '../App.scss';
import React,{useState} from 'react'
import {Container,Row,Col,Form,Button} from 'react-bootstrap'

function Register() {

            function registerForm(e){

        e.preventDefault()

        console.log(variables);

        }

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

              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value= {variables.email} onChange={(e)=>setVariables({...variables,email:e.target.value})} />

          </Form.Group>

          <Form.Group>

            <Form.Label>Username</Form.Label>
            <Form.Control type="text"  value= {variables.username} onChange={(e)=>setVariables({...variables,username:e.target.value})} />

            </Form.Group>

          <Form.Group>

            <Form.Label>Password</Form.Label>
            <Form.Control type="password"  value= {variables.password} onChange={(e)=>setVariables({...variables,password:e.target.value})} />

          </Form.Group>


          <Form.Group>

            <Form.Label>confirm password</Form.Label>
            <Form.Control type="password"  value= {variables.confirmPassword} onChange={(e)=>setVariables({...variables,confirmPassword:e.target.value})} />

          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>

          </Form>
        </Col>
      </Row>
        </div>
    )
}

export default Register
