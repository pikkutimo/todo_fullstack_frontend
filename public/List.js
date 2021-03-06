import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { ListGroup, Row, Col, Button, Form } from "react-bootstrap"
import { MdDeleteOutline, MdModeEdit } from 'react-icons/md' 


const ListComponent = ( props ) => {
  
  const DeleteTodo = ( id ) => {
    fetch(`https://rocky-harbor-47876.herokuapp.com/api/todos/${id}`, {
            method: 'DELETE'
        })
        .then(id => {
            console.log('Deleted:', id)
        })
        .catch((error) => {
            console.log(`Error deleting ${id}: `, error)
        })

        const newTodos = props.todos.filter((todo) => todo.id !== id)
        props.setTodos(newTodos)
  }

  const toDone = (index, todo) => {
    
    console.log(JSON.stringify(todo))
    const newTodos = [...props.todos]
    const editedTodo = {
      content: todo.content,
      importance: todo.importance,
      date: todo.date,
      done: !todo.done
    }

    fetch(`https://rocky-harbor-47876.herokuapp.com/api/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type' : 'application/json',
          },
          body: JSON.stringify(editedTodo),
      })
      .then(response => response.json())
      .then(editedTodo => {
          console.log('Edit success:', editedTodo)
      })
      .catch((error) => {
          console.log('Error: ', error)
      })

    newTodos[index] = editedTodo
    props.setTodos(newTodos) 
  }

  return (
    <>
      <ListGroup>
          {props.todos.map((todo, index) => (
            <ListGroup.Item key={index} data-value={todo}>
              <Row>
                <Col xs={1}>
                  <Form.Check 
                    type={'checkbox'}
                    id={todo.id}
                    checked={todo.done}
                    onChange={() => toDone(index, todo)}
                  />
                </Col>
                <Col xs={7}>
                    <Form.Text className={todo.done ? "done" : "notDone"}>
                      {todo.content}
                    </Form.Text>
                </Col>
                <Col xs={2}>
                    {todo.important ? 'important' : '-'}
                </Col>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => {
                        props.setIndex(index)
                        props.setModalShow(true)
                        props.setId(todo.id)
                        props.setContent(todo.content)
                        props.setImportance(todo.important)}
                      }>
                      <MdModeEdit />
                    </Button>
                </Col>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => DeleteTodo(todo.id)}>
                      <MdDeleteOutline />
                    </Button>
                </Col>
            </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  )
}

export default ListComponent