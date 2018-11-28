var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var publishRouter = require('./routes/publish')
var listCaseCardRouter = require('./routes/ListCaseCard')
var ICmembersRegisterRouter = require('./routes/icmembers_register');
var BSmembersRegisterRouter = require('./routes/bsmembers_register');
var ICmembersInfoRouter = require('./routes/icmembers_info');
var BSmembersInfoRouter = require('./routes/bsmembers_info');
var checkMemberRouter = require('./routes/checkmember');
var updateRouter = require('./routes/updateInfo');
var BSAddFavorRouter = require('./routes/BSAddFavor');
var IC_hireRouter = require('./routes/IC_hire');
var BSCaseRouter = require('./routes/bsMyCase_Open');
var BSCaseShowHireRouter = require('./routes/bsMyCase_Open_showHire');
var BSAddFavorRouter = require('./routes/BSAddFavor');
var checkoutRouter = require('./routes/checkout');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', publishRouter);
app.use('/case_list', listCaseCardRouter)
//收藏網紅//
app.use('/api', BSAddFavorRouter);
//http://localhost:3000/api
app.use('/api', ICmembersRegisterRouter);
//http://localhost:3000/api
app.use('/api', BSmembersRegisterRouter);

//註冊網紅個資
//http://localhost:3000/api2
app.use('/api2', ICmembersInfoRouter);
//註冊廠商個資
//http://localhost:3000/api3
app.use('/api3', BSmembersInfoRouter);

//網紅+廠商登入
app.use('/you04',checkMemberRouter);

//更新bsmember資訊(bs_point)
app.use('/you04',updateRouter);
//網紅應徵
app.use('/hire',IC_hireRouter);

//廠商發佈的案子列表
app.use('/case',BSCaseRouter);
app.use('/case',BSCaseShowHireRouter);

//購買方案
app.use('/plan_buy', checkoutRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
