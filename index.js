const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + './register.html')
  res.sendFile(__dirname + './index.html')
});

let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://User1:dan982008@freecodecamp.zadontl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
let bodyParser = require('body-parser');

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

let actionShema = new mongoose.Schema({
  action: {type: String, required: true},
  description: {type: String},
  date: {type: String, required: true}
})

let UserSchema = new mongoose.Schema({
  username : {type: String, required: true},
  password : {type: Number, required: true},
  amount : {type: Number}
})

let Actions = mongoose.model('Exercises', actionShema)
let User = mongoose.model('User', UserSchema)

app.post('/api/users', bodyParser.urlencoded({ extended: false }), (req, res) => {
  let newUser = new User({
    username : req.body.username,
    password : req.body.password,
    amount : 20000
  })
  newUser.save((err, savedUser) => {
    if(!err){
      let text = 'Your username is '+savedUser.username+' and ID is'+savedUser.id+' and you have N'+savedUser.amount;
      alert(text);
    }
  })
})

app.post('/api/purchase', bodyParser.urlencoded({ extended: false }), (req, res) => {
  let updates = new Actions({
    action: 'Purchase',
    description: req.body.desc,
    date: req.body.date
  })
  if(updates.date){
    updates.date = new Date().toDateString()
  }
  User.findByIdAndUpdate(
    req.params._id,
    {$push : {transactions : updates}},
    {new: true},
    (error, updatedUser)=> {
      if(!error){
        let rec = document.getElementById('receipt');
        let purchase = document.getElementById('purchase');
        document.getElementById('actioned').innerHTML = 'PURCHASE';
        document.getElementById('name').innerHTML = updatedUser.username;
        document.getElementById('date').innerHTML = updates.date;
        document.getElementById('amount').innerHTML = req.body.amount;
        document.getElementById('description').innerHTML = updates.description;
        document.getElementById('result').innerHTML = 'APPROVED';
        purchase.style.display = 'none';
        rec.style.display = 'flex';
      }else {
        let rec = document.getElementById('receipt');
        let purchase = document.getElementById('purchase');
        document.getElementById('actioned').innerHTML = 'PURCHASE';
        document.getElementById('name').innerHTML = updatedUser.username;
        document.getElementById('date').innerHTML = updates.date;
        document.getElementById('amount').innerHTML = req.body.amount;
        document.getElementById('description').innerHTML = updates.description;
        document.getElementById('result').innerHTML = 'DECLINED';
        purchase.style.display = 'none';
        rec.style.display = 'flex';
      }
    }
  )
})

app.post('/api/withdraw', bodyParser.urlencoded({ extended: false }), (req, res) => {
  let updates = new Actions({
    action: 'Withdraw',
    description: '',
    date: req.body.date
  })
  if(updates.date){
    updates.date = new Date().toDateString()
  }
  User.findByIdAndUpdate(
    req.params._id1,
    {$push : {transactions : updates}},
    {new: true},
    (error, updatedUser)=> {
      if(!error){
        let rec = document.getElementById('receipt');
        let withdraw = document.getElementById('withdraw');
        document.getElementById('actioned').innerHTML = 'WITHDRAWAL';
        document.getElementById('name').innerHTML = updatedUser.username;
        document.getElementById('date').innerHTML = updates.date;
        document.getElementById('amount').innerHTML = req.body.amount;
        document.getElementById('description').innerHTML = '';
        document.getElementById('result').innerHTML = 'APPROVED';
        withdraw.style.display = 'none';
        rec.style.display = 'flex';
      }else {
        let rec = document.getElementById('receipt');
        let withdraw = document.getElementById('withdraw');
        document.getElementById('actioned').innerHTML = 'WITHDRAWAL';
        document.getElementById('name').innerHTML = updatedUser.username;
        document.getElementById('date').innerHTML = updates.date;
        document.getElementById('amount').innerHTML = req.body.amount;
        document.getElementById('description').innerHTML = '';
        document.getElementById('result').innerHTML = 'DECLINED';
        withdraw.style.display = 'none';
        rec.style.display = 'flex';
      }
    }
  )
})
