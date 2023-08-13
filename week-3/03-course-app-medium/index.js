const express = require('express');
const jwt =require('jsonwebtoken');
const fs = require('fs');
const app = express();
app.use(express.json());

const key ="SiOZpUpJFd"
try{
ADMINS = fs.readFileSync(admin.json, 'utf8');
USERS = fs.readFileSync(users.json, 'utf8');
COURSES = fs.readFileSync(courses.json, 'utf8');

}catch{
let ADMINS = [];
let USERS = [];
let COURSES = [];
}

const generatetoken = (user) => {
  const token = {username:user.username};
  return jwt.sign(token, key,{expiresIn:"1hrs"})
}

const authenticate = (req,res,next)=>{

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1]; 

  jwt.verify(token, key, (err, decoded) => {
    if(err){  
      res.status(401).json({message: 'Unauthorized'}); 
    }
    else{
      req.user = user;
      next();
    }
  })
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const name = req.body;
  const verify_name = ADMINS.find(a=>a.username === name.username)
  if(verify_name){
    res.status(400).json({message: 'User already exists'});
  }else{
    ADMINS.push(req.body);
    const token = generatetoken(name.username)
    fs.writeFileSync(admin.json, JSON.STRINGIFY(ADMINS));
    res.status(201).json({message: 'User created', token});

  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const name = req.body;
  const verify_name = ADMINS.find(a=>a.username=== name.username)
  if(verify_name){
    res.status(200).json({message:"user logged in successfully"})
    fs.writeFileSync(admin.json, JSON.STRINGFY(ADMINS));
    const token = generatetoken(name.username)
  }else{
    res.status(400).json({message: 'User does not exist'})
  }
});

app.post('/admin/courses',authenticate, (req, res) => {
  // logic to create a course
  const newCourse={
    title:req.body.title,
    description:req.body.description,
    price:req.body.price
  }
  const name = req.body.username
  const verify_name = USERS.find(a=>a.username=== name)
  if(verify_name){
    fs.writeFileSync(courses.json, JSON.stringify(COURSES));
    res.json({message:"course created successfully"})
    COURSES.push(newCourse)
  }else{
    res.status(400).json({message: 'ADMIN does not exist'})
  }
});

app.put('/admin/courses/:courseId',authenticate, (req, res) => {
  // logic to edit a course
  const courseId = req.params.courseId;
  //const name = req.body.username
  const verify_id = ADMINS.find(a=>a.id=== PARSEINT(courseId))
  if(verify_id){
    fs.writeFileSync(courses.json, JSON.stringify(COURSES));
    res.json({message:"course updated successfully"})
    const updatedCourse = {...COURSES[courseId], ...COURSES}
    COURSES[courseId] = updatedCourse
  }else{
    res.status(400).json({message: 'ADMIN does not exist'})
  }
});

app.get('/admin/courses', authenticate, (req, res) => {
  // logic to get all courses
  res.status(200).json({courses:COURSES});
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const name = req.body;
  const verify_name = USERS.find(a=>a.username === name.username)
  if(verify_name){
    res.status(400).json({message: 'User already exists'});
  }else{
    USERS.push(req.body);
    const token = generatetoken(name.username)
    fs.writeFileSync(users.json, JSON.STRINGIFY(USERS));
    res.status(201).json({message: 'User created', token});

  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const name = req.body;
  const verify_name = USERS.find(a=>a.username=== name.username)
  if(verify_name){
    res.status(200).json({message:"user logged in successfully"})
    fs.writeFileSync(users.json, JSON.STRINGFY(USERS));
    const token = generatetoken(name.username)
  }else{
    res.status(400).json({message: 'User does not exist'})
  }
});

app.get('/users/courses',authenticate, (req, res) => {
  // logic to list all courses
  res.status(200).json({courses:COURSES});
});

app.post('/users/courses/:courseId',authenticate, (req, res) => {
  // logic to purchase a course
  const newcoursepurchased = req.body.courseName;
  const courseId = req.params.courseId;
  const verify_name = USERS.find(a=>a.id=== PARSEINT(courseId))
  if(verify_name){
    users.purchasedCourses.push(newcoursepurchased);
    fs.writeFileSync(users.json, JSON.stringify(USERS));
    res.json({message:"course purchased successfully"})
  }else{
    res.status(400).json({message: 'USER does not exist'})
  }
});

app.get('/users/purchasedCourses',authenticate, (req, res) => {
  // logic to view purchased courses
  const name = req.body.username;
  const verify_name = USERS.find(a=>a.username=== name)
  if(verify_name){
    fs.writeFileSync(users.json, JSON.stringify(USERS));
    res.status(200).json({messge:"your purchased courses", purchasedCourses:USER.purchasedCourses});
  }else{
    res.status(400).json({message: 'USER does not exist'})
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
