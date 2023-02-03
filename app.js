const express = require('express');
const students = require('./students')
const app = express()


app.use(express.json()) //middleware

//GET Method
app.get('/students', (req, res) => {
    res.json(students)
})

//POST method
app.post('/api/students', (req, res) => {
    if (!req.body.email) {
        res.status(400)
        return res.json({ err: "Email is required...." })
    }
    const user = {
        id: students.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    students.push(user)
    res.json(user)
})

// PUT Method 
app.put('/api/students/:id', (req, res) => {
    let id = req.params.id
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email

    let index = students.findIndex((students) => {
        return (students.id == Number.parseInt(id))
    })
    if (index >= 0) {
        let std = students[index]
        std.last_name = last_name
        std.first_name = first_name
        std.email = email
        res.send('updated')
    } else {
        res.status(404)
        res.end()
    }
})

// Delete Method
app.delete('/api/students/:id', (req,res)=>{
    let id = req.params.id;
    let index = students.findIndex((students)=>{
        return (students.id ==req.params.id)
    })

    if(index>=0){
        let std = students[index]
        students.splice(index,1)
        res.send({'message':'Deleted'})
    }else{
        res.status(404)
    }
})


//server
app.listen(3100, () => {
    console.log('listening in port number 3100');
})
