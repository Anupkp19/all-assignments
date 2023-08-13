const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let purchasedCourses=[]
const AdminAuth = (req,res,next) => {
const {usename, password} = req.headers

const admin = ADMINS.find(a=>a.username==usename && a.password==password);
if(admin){
  next()
}else{
  res.status(403).json({message : 'Unauthorized Access!'})
}
};

const UserAuth = (req,res,next) => {
  const {usename, password} = req.headers
    const user = USERS.find(u=>u.username==usename && u.password==password);
    if(user){
      next()
    }else{
      res.status(403).json({message : 'Unauthorized Access!'})
    }
}


// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const newadmin = req.body;
  const adminexists = ADMINS.find(a=>a.username ==admin.usename)
  if(adminexists){
    res.status(403).json({message : 'Admin already exists!'})
  }else{
    ADMINS.push(req.body)
  res.status(201).json({message : 'Admin created successfully!'})
  }
});

app.post('/admin/login', AdminAuth, (req, res) => {
  // logic to log in admin
  const {usename, password} = req.body
  const admin = ADMINS.find(a=>a.username==usename && a.password==password);
  if(admin){
    res.status(200).json({message : 'Admin logged in successfully!'})
  }else{
    res.status(403).json({message : 'Unauthorized Access!'})
  }
});

app.post('/admin/courses', AdminAuth,(req, res) => {
  // logic to create a course
  const data =  req.body;
  const courseExists = COURSES.find(c=>c.title == data.title);
  if (exists){
  res.status(403).json({message : 'Course already exists!'});
  }else{
    course.id = Dates.now();
    COURSES.push(data);
    res.status.json({message : 'Course created successfully!'});
  }
});

app.put('/admin/courses/:courseId',AdminAuth, (req, res) => {
  // logic to edit a course
  const courses = parseINT(req.params.courseId);
  const course = COURSES.find(c=>c.id == courseId);
  if(course){
  res.status.json({message : 'Course updated successfully!'});
  }else{
    res.status.json({message : 'course not found!'});
  }
});

app.get('/admin/courses',AdminAuth, (req, res) => {
  // logic to get all courses
  res.json({course:COURSES})
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const newuser = req.body;
  const userexists = USERS.find(u=>u.username ==user.usename)
  if(userexists){
    res.status(403).json({message : 'User already exists!'})
  }else{
    USERS.push(req.body)
  res.status(201).json({message : 'User created successfully!'})
  }
});

app.post('/users/login', UserAuth,(req, res) => {
  // logic to log in user
  const {usename, password} = req.body
  const user = USERS.find(u=>u.username==usename && u.password==password);
  if(user){
  res.status.json({message : 'User logged in successfully!'});   
  }else{
    res.status(403).json({message : 'Unauthorized Access!'})
  }
});

app.get('/users/courses', UserAuth, (req, res) => {
  // logic to list all courses
  COURSES.map(usercourses=> {
    res.json({course:usercourses})
  })
  
});

app.post('/users/courses/:courseId', UserAuth, (req, res) => {
  // logic to purchase a course
  const coursID = parseINT(req.params.courseId);
  const course = COURSES.find(c=>c.id == courseId);
  if(course){
  res.status.json({message : 'Course purchased successfully!'});
  }else{
    res.status.json({message : 'course not found!'});
  }
});

app.get('/users/purchasedCourses', UserAuth, (req, res) => {
  // logic to view purchased courses
    var purchasedCourses = req.user.purchasedCourses;
    var purchased = []
    for(let i=0; i<purchasedCourses.length; i++) {
    if(purchasedCourses[i].userId === req.user.id) {
      purchasedCourses.push(  COURSES[i] );
    }
  }
    res.json({purchased})
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
