const express = require("express");
const fs = require("fs");
const opn = require("opn");
const bodyParser = require("body-parser");
const path = require("path");
const chokidar = require("chokidar");
// const cfg = require("./config");
const userService = require('./service/userService');
const prizePlanDao = require("./dao/prizePlanDao")
const prizeDao = require("./dao/prizeDao")
const upload = require('./config/upload.js');
const prizeRouter = require('./router/prize')

const {
  loadXML,
  loadTempData,
  writeXML,
  saveDataFile,
  shuffle,
  saveErrorDataFile
} = require("./help");

let app = express(),
  router = express.Router(),
  cwd = process.cwd(),
  dataBath = __dirname,
  port = 8090,
  curData = {},
  luckyData = {},
  errorData = [],
  cfgData = {},
  defaultType = 0,
  defaultPage = `default data`;

//这里指定参数使用 json 格式
app.use(
  bodyParser.json({
    limit: "1mb"
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

if (process.argv.length > 2) {
  port = process.argv[2];
}

app.use(express.static(cwd));
app.use(prizeRouter)

// 公开静态文件夹，匹配`虚拟路径img` 到 `真实路径public` 注意这里  /img/ 前后必须都要有斜杠！！！
app.use('/img/', express.static('../product/dist/img/'))
// app.use('/data/', express.static('./data/'))

//请求地址为空，默认重定向到index.html文件
app.get("/", (req, res) => {
  res.redirect(301, "index.html");
});
app.get("/prizePlan.html", (req, res) => {
  res.redirect(301, "prizePlan.html");
});
// app.get("/index.html", (req, res) => {
//   res.redirect(301, "index.html");
// });
// app.use('/prize', prizeRouter);

//设置跨域访问
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.post("*", (req, res, next) => {
  log(`请求内容：${JSON.stringify(req.path, 2)}`);
  next();
});

// 获取之前设置的数据
router.post("/getTempData", async (req, res, next) => {
  if (!curData.leftUsers || !luckyData) {
    await loadData();
    log('getTempData,loadData');
  }
  await getLeftUsers();
  await getPrize();
  res.json({
    cfgData: cfgData,
    leftUsers: curData.leftUsers,
    luckyData: luckyData
  });
});

// 获取所有用户
router.post("/reset", (req, res, next) => {
  luckyData = {};
  errorData = [];
  loadData();
  log(`重置数据成功`);
  saveErrorDataFile(errorData);
  return saveDataFile(luckyData).then(data => {
    res.json({
      type: "success"
    });
  });
});

router.get('/userList', async (req, res) => {
  let userList = await userService.getUserListService();
  res.json({'list': userList});
  log('查询所有用户信息');
});

router.get('/delUser', async (req, res) => {
  let user = await userService.delUserService(req.query.id);
  res.json({'user': user});
  log('删除用户');
});

router.get('/restoreUser', async (req, res) => {
  let user = await userService.restore(req.query.id);
  res.json({'user': user});
  log('恢复用户');
});

router.post('/addUser', async (req, res) => {
  debugger
  // 创建一条清单
  const user = {
    id: req.body.id,
    userName: req.body.userName,
    sex: req.body.sex,
    age: req.body.age,
    city: req.body.city,
    job: req.body.job
  };
  let result = await userService.create(user);
  res.json(result);
});

// 获取所有用户
router.post("/getUsers", async (req, res, next) => {
  if (!curData.users || curData.users.length <= 0) {
    await loadData();
    log('getUsers,loadData');
  }
  res.json(curData.users);
  log(`成功返回抽奖用户数据`);
});

// 获取奖品信息
router.post("/getPrizes", (req, res, next) => {
  // res.json(curData.prize);
  log(`成功返回奖品数据`);
});

// 保存抽奖数据
router.post("/saveData", (req, res, next) => {
  let data = req.body;
  setLucky(data.type, data.data)
    .then(t => {
      res.json({
        type: "设置成功！"
      });
      log(`保存奖品数据成功`);
    })
    .catch(data => {
      res.json({
        type: "设置失败！"
      });
      log(`保存奖品数据失败`);
    });
});

// 保存抽奖数据
router.post("/errorData", (req, res, next) => {
  let data = req.body;
  setErrorData(data.data)
    .then(t => {
      res.json({
        type: "设置成功！"
      });
      log(`保存没来人员数据成功`);
    })
    .catch(data => {
      res.json({
        type: "设置失败！"
      });
      log(`保存没来人员数据失败`);
    });
});

// 保存数据到excel中去
router.post("/export", (req, res, next) => {
  let type = [1, 2, 3, 4, 5, defaultType],
    outData = [["工号", "姓名", "部门"]];
    cfgData.prizes.forEach(item => {
      outData.push([item.text]);
      outData = outData.concat(luckyData[item.type] || []);
    });

  writeXML(outData, "/抽奖结果.xlsx")
    .then(dt => {
      // res.download('/抽奖结果.xlsx');
      res.status(200).json({
        type: "success",
        url: "抽奖结果.xlsx"
      });
      log(`导出数据成功！`);
    })
    .catch(err => {
      res.json({
        type: "error",
        error: err.error
      });
      log(`导出数据失败！`);
    });
});

// 上传图片接口
router.post('/uploadImage', (req, res) => {
  upload(req, res)
      .then(imgSrc => {
        if (req.query.id) {
          // 上传成功 存储文件路径 到数据库中
          prizeDao.update(req.query.id, imgSrc)
              .then(
                  res.send({
                    "id": id,
                    "code": "ok",
                    "message": "上传成功",
                    'data': {
                      url: imgSrc
                    }
                  })
              )
              .catch(err => {
                formatErrorMessage(res, err.error)
              });
        } else {
          res.send({
            "code": "ok",
            "message": "上传成功",
            'data': {
              url: imgSrc
            }
          })
        }

      }).catch(err =>{
        res.status(500).send({message: err.message || "发生错误。"});
  });
})

app.use('/download', (req, res) => {
  let fileName = req.query.file;
  if (!fileName) {
    res.status(500).send({message:'文件不允许为空'})
  } else {
    res.set({
      "Content-Type":"application/octet-stream", //告诉浏览器这是一个二进制文件
      "Content-Disposition":"attachment; filename="+ fileName//告诉浏览器这是一个需要下载的文件
    });
    fs.createReadStream('./data/' + fileName).pipe(res);
  }
});


// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    "code": "error",
    "message": message || '',
  });
}

//对于匹配不到的路径或者请求，返回默认页面
//区分不同的请求返回不同的页面内容
router.all("*", (req, res) => {
  if (req.method.toLowerCase() === "get") {
    if (/\.(html|htm)/.test(req.originalUrl)) {
      res.set("Content-Type", "text/html");
      res.send(defaultPage);
    } else {
      res.status(404).end();
    }
  } else if (req.method.toLowerCase() === "post") {
    let postBackData = {
      error: "empty"
    };
    res.send(JSON.stringify(postBackData));
  }
});

function log(text) {
  global.console.log(text);
  global.console.log("-----------------------------------------------");
}

function setLucky(type, data) {
  if (luckyData[type]) {
    luckyData[type] = luckyData[type].concat(data);
  } else {
    luckyData[type] = Array.isArray(data) ? data : [data];
  }

  return saveDataFile(luckyData);
}

function setErrorData(data) {
  errorData = errorData.concat(data);

  return saveErrorDataFile(errorData);
}

app.use(router);

/*function loadData() {
  console.log("加载EXCEL数据文件");
  let cfgData = {};

  // curData.users = loadXML(path.join(cwd, "data/users.xlsx"));
  curData.users = loadXML(path.join(dataBath, "data/users.xlsx"));
  // 重新洗牌
  shuffle(curData.users);

  // 读取已经抽取的结果
  loadTempData()
    .then(data => {
      luckyData = data[0];
      errorData = data[1];
    })
    .catch(data => {
      curData.leftUsers = Object.assign([], curData.users);
    });
}*/

async function loadData() {
  console.log("async 加载EXCEL数据文件");
  let prizePlan = await prizePlanDao.findAll(1);
  curData.users = loadXML(path.join(dataBath, prizePlan[0].userFilePath));
  // 重新洗牌
  await shuffle(curData.users);

  // 读取已经抽取的结果
  await loadTempData()
      .then(data => {
        luckyData = data[0];
        errorData = data[1];
      })
      .catch(data => {
        curData.leftUsers = Object.assign([], curData.users);
      });
}

async function getLeftUsers() {
  //  记录当前已抽取的用户
  let lotteredUser = {};
  for (let key in luckyData) {
    let luckys = luckyData[key];
    luckys.forEach(item => {
      lotteredUser[item[0]] = true;
    });
  }
  // 记录当前已抽取但是不在线人员
  errorData.forEach(item => {
    lotteredUser[item[0]] = true;
  });

  let leftUsers = Object.assign([], curData.users);
  leftUsers = leftUsers.filter(user => {
    return !lotteredUser[user[0]];
  });
  curData.leftUsers = leftUsers;
}

async function getPrize() {
  let prizePlan = await prizePlanDao.findAll(1);
  // log('查询到数据prizePlan：'+ JSON.stringify(prizePlan));
  cfgData.COMPANY = prizePlan[0].mark;
  let prizes = await prizeDao.findAll(prizePlan[0].id);
  // log('查询到数据prize：'+ JSON.stringify(prizes));
  cfgData.prizes = prizes;
  // log('查询到数据：'+ JSON.stringify(cfgData));
  cfgData.EACH_COUNT = prizes.map(x => {return x.eachCount})
}
// loadData();

module.exports = {
  run: function(devPort, noOpen) {
    let openBrowser = true;
    if (process.argv.length > 3) {
      if (process.argv[3] && (process.argv[3] + "").toLowerCase() === "n") {
        openBrowser = false;
      }
    }

    if (noOpen) {
      openBrowser = noOpen !== "n";
    }

    if (devPort) {
      port = devPort;
    }

    let server = app.listen(port, () => {
      let host = server.address().address;
      let port = server.address().port;
      global.console.log(`lottery server listenig at http://${host}:${port}`);
      openBrowser && opn(`http://127.0.0.1:${port}`);
    });
  }
};
