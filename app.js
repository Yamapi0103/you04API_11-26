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

var checkMemberRouter = require('./routes/checkmember');
var updateRouter = require('./routes/updateInfo');
var BSAddFavorRouter = require('./routes/BSAddFavor');
var IC_hireRouter = require('./routes/IC_hire');
var ICAddFavor = require('./routes/ICAddFavor');
var registerRouter = require('./routes/members_register');
var membersInfoRouter = require('./routes/members_info');
var caseRouter = require('./routes/case');
var BSBillingRouter = require('./routes/bsmember_billing_card');
var BSAddFavorRouter = require('./routes/BSAddFavor');
var checkoutRouter = require('./routes/checkout');
var filterRouter = require('./routes/filter_api');
var uploadRouter = require('./routes/uploadfile');
var chatRouter = require('./routes/chat');
var sseRouter = require('./routes/navbarAPI');
var contact_usRouter = require('./routes/contact_us');
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
app.use('/api', publishRouter, express.static("public/uploads/member_photo"));
app.use('/case_list', listCaseCardRouter)
//收藏網紅//
app.use('/api', BSAddFavorRouter);

//篩選器
app.use('/api', filterRouter);
app.use('/case_list', listCaseCardRouter);
//upload
// app.use('/imgupload', uploadRouter, express.static("public/uploads"))


//網紅+廠商登入
app.use('/you04',checkMemberRouter);

//更新bsmember資訊(bs_point)
app.use('/you04',updateRouter);
//網紅+廠商註冊
app.use('/register', registerRouter);
//填寫網紅個資+廠商個資
app.use('/info', membersInfoRouter,  express.static("public/uploads/member_photo"));
//網紅應徵
app.use('/hire', IC_hireRouter);
//網紅收藏
app.use('/api', ICAddFavor);

//網紅+廠商的接案管理頁
app.use('/case',caseRouter);

//廠商+網紅對話紀錄
app.use('/chat',chatRouter);

// 廠商購買過的方案列表(訂單管理)
app.use('/bsbilling_api', BSBillingRouter);

//購買方案
app.use('/plan_buy', checkoutRouter);

//訊息通知
app.use('/sse', sseRouter);


app.use('/api', contact_usRouter);

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
