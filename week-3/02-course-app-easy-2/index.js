const express = require('express');
const webtoken=require("jsonwebtoken");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let purchasedCourses=[]

const key ="~CSITO36w{N3pw"

const generatetoken = (user) => {
  const token = {username:user.username};
  return webtoken.sign(token, key,{expiresIn:"1hrs"})
}

const verifytoken = (req,res,next) => {
const gettoken = req.headers.autorizaton

if(gettoken){
const auth = gettoken.split(" ")[1]
webtoken.verify(generatetoken, key, (err,user) => {
if(err){
  res.status(404);
}
else{
  req.user = user;
  next();
}
})
}else{
  res.status(404);
}
}
// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const name = req.body.username;
  const find_admin = ADMINS.find(a => a.username==name)
  if(find_admin){
    res.status(400).json({message: "admin already exists"})
  }else{
    ADMINS.push({username:name})
    const token = generatetoken(name)
    res.status(200).json({message: "admin created"}, token)
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
const name =req.body;
const find_admin = ADMIN.find(a => a.username==name)
if(!find_admin){
res.status(404).json({message:"admin does not exist"})
}else{
  const token = generatetoken(name)
  res.status(200).json({message: "admin logged in"}, token)
}
});

app.post('/admin/courses', verifytoken, (req, res) => {
  // logic to create a course
  const course = req.body;
  COURSES.push(course)
  res.status(200).json({message: "course created"})
});

app.put('/admin/courses/:courseId', verifytoken, (req, res) => {
  // logic to edit a course
const editcouse=req.body;
  const courseId = req.params.courseId;
  const coursefind = COURSES.find(a => a.id == courseId)
if(coursefind){
  const updatedCourse = { ...COURSES[courseIndex], ...req.body };
  COURSES[course_id]=updatedCourse  
  res.status(200).json({message: "course edited"})
}else{
  res.status(404).json({message: "course not found"})
}
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
res.json({course : COURSES});
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const name = req.body.username;
  const find_user = USERS.find(a => a.username==name)
  if(find_user){
    res.status(400).json({message: "user already exists"})
  }else{
    USERS.push({username:name})
    const token = generatetoken(name)
    res.status(200).json({message: "user created"}, token)
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const name =req.body;
  const find_user = USERS.find(a => a.username==name)
  if(!find_user){
    res.status(404).json({message:"user does not exist"})
  }else{
    const token = generatetoken(name)
    res.status(200).json({message: "user logged in"}, token)
  }
});

app.get('/users/courses', verifytoken,(req, res) => {
  // logic to list all courses
res.json({course:COURSES})
});

app.post('/users/courses/:courseId',verifytoken, (req, res) => {
  // logic to purchase a course
  const courseName = req.body;
const id = req.params.courseId
const name = req.body;
const find_id = COURSES.find(a => a.id==id);
const find_name = USERS.find(a=>a.username==name.username)
if(find_id && find_name){
  user.purchasedCourses.push(courseName);
res.status(200).json({message:"you have brought the course"})
}else{
  res.status(404).json({message:"course not found"})
}
});

app.get('/users/purchasedCourses',verifytoken, (req, res) => {
  // logic to view purchased courses
  const name = req.body;
  const find_name = USERS.find(a=>a.username==name.username)
  if(find_name){
    res.json({course:purchasedCourses})
  }else{
    res.status(404).json({message:"user not found"})
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
