import React,{useState,useEffect,Fragment} from 'react'
import {Row,Button,Col,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { UserAuthDispatch } from '../context/auth'
import {gql,useQuery,useLazyQuery} from '@apollo/client'


const GET_USERS = gql `

query getUsers {
    getUsers {
    username
    email
    imageUrl
    createdAt
    latestMessage{
      to
      from
      content
      createdAt
    }
  }
}

`;

const GET_MESSAGES = gql `

query getMessages($from:String!) {
    getMessages(from:$from) {
      uuid
      to
      from
      content
      createdAt
    }
  }

`;




function Home({history}) {

  const [selectedUser, setSelectedUser] = useState(null);

    const dispatch = UserAuthDispatch()

     function logout(){

        dispatch({type:'LOGOUT'})
        history.push('/login')

    }

    const[getMessages,{loading:messagesLoading,data:messagesData}] = useLazyQuery(GET_MESSAGES)


    useEffect(() => {
      
      if(selectedUser){
        getMessages({variables:{from:selectedUser}})
      }
    }, [selectedUser])

    if(messagesData) console.log(messagesData.getMessages);

    const {loading,data,error}= useQuery(GET_USERS)

  

    let usersMarkup
  if (!data || loading) {
    usersMarkup = <p>Loading..</p>
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div className="d-flex p-3" key={user.username} onClick={()=>setSelectedUser(user.username)}>

      <Image src={user.imageUrl} roundedCircle className="mr-2" style={{width:50,height:50,objectFit:'cover'}}/>

      <div>
      <p className="text-success">{user.username}</p>

      <p className="font-weight-light">
        {user.latestMessage ? user.latestMessage.content:'not connected'}
      </p>

      </div>

      </div>
    ))
  }

    return (
        <Fragment>
        <Row className="bg-white justify-content-around mb-1">
          <Link to="/login">
            <Button variant="link">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="link">Register</Button>
          </Link>
          <Button variant="link" onClick={logout}>
            Logout
          </Button>
        </Row>
        <Row className="bg-white">
          <Col xs={4} className="px-0">{usersMarkup}</Col>
          <Col xs={8}>
            {messagesData && messagesData.getMessages.length> 0 ?(
              messagesData.getMessages.map(message=>(
                <p key={message.uuid}>{message.content}</p>
              ))
            ):(<p>Messages</p>)
            }
          </Col>
        </Row>
      </Fragment>
    )
}

export default Home
