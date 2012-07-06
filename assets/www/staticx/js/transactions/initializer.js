/**
 * Created with JetBrains PhpStorm.
 * User: shiruigang
 * Date: 12-6-14
 * Time: 下午5:14
 * To change this template use File | Settings | File Templates.
 */


var dbo;
var rsOrder = {};
var rsCustomer = {};
var rsBrand = {};
var rsCommodity = {};
var tunnel = 'order';  //   [order | commodity | customer]
var createDate = new Date();

rsOrder.customer = {};
rsOrder.brand = {};
rsOrder.commodity = {};
rsOrder.inventory = {};
rsOrder.state = 'edit';
rsOrder.codingtag = 216;

rsBrand.commodity = {};
rsBrand.clone = {};


rsCommodity.brand = {};
rsCommodity.clone = {}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    dbo = window.openDatabase("orderDirectoryDB", "1.0", "Order Demo", 200000);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    //dbo.transaction(populateDB, errorCB, successCB);
    // dbo.transaction(getOrders, errorCB);
    // dbo.transaction(populateDB, errorCB, populateDB_success);
}

function onMenuKeyDown() {
    $(document).find('div[id=operationMenu]').toggle();
}


function onFileSystemSuccess(fileSystem) {
    console.log("hello,shrek");
    console.log(fileSystem.name);
    console.log(fileSystem.root.name);
}

function fail(evt) {
    alert(evt.target.error.code);
}


function successCB() {
    alert("Connect Database successfully!");
}

function errorCB(tx, error) {
    alert("Database Error: " + error);
}


function populateDB(tx) {
    var ordcreateDate = new Date();
    var sql;
    //sql="INSERT INTO customerArchive (name,location,address,contact,picture) VALUES ('华联吉买盛大兴街店','上海市','大兴街18号','400-118-288','customer/amy_jones100x100.jpg')";
    //sql="INSERT INTO orderArchive (customerid,state,quantity,gross,createdate,updatedate,owner) VALUES ('3','0',10,'2660.80','" + ordcreateDate.format('yyyy-MM-dd hh:mm:ss').toString() + "','" + ordcreateDate.format('yyyy-MM-dd hh:mm:ss') + "','安捷力')";

    //sql = "UPDATE customerArchive SET picture='james_king100x100.jpg' WHERE id=2";
    //  sql = "UPDATE customerArchive SET picture='james_king100x100.jpg'";
    // sql1 = "UPDATE customerArchive SET directory='customer/'";
    //sql =" alter table commodityArchive add brandid integer ";
    // tx.executeSql(sql);
    // tx.executeSql(sql1);
    // tx.executeSql("select * from orderArchive", [], printOrders);
    //sql = "UPDATE orderArchive SET state='2' where id in(3)";
    // sql="insert into commodityArchive (name,price,unit,specification,directory,picture) values ('芝华士饼干','12','盒','500g','pictures/','ray_moore100x100.jpg')";
    // sql="insert into orderInventory (orderid,commodityid,price,count,gross,updatedate,deleted) values (1,2,'10.00',100,'950.00',date(),0)";
    // sql = "update commodityArchive set directory=directory||'commodity/'";

    // sql = "insert into brandArchive (name,enterprise,directory,picture) values ('康师傅','台湾康师傅食品有限责任公司','pictures/brand/','john_williams100x100.jpg')";
    sql = "update commodityArchive set brandid=2 where id=1";
    tx.executeSql(sql);


}

/**
 * 初始化数据表
 * @param tx
 */

function populateDB_init(tx) {

    var sql;
    var ordcreateDate = new Date();

    /**
     * 初始化订单文档表
     */

    tx.executeSql('DROP TABLE IF EXISTS orderArchive');
    sql =
        "CREATE TABLE IF NOT EXISTS [orderArchive] ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "owner NVARCHAR(20) default '安捷力' , " +
            "customerid INTEGER, " +
            "codingtag NVARCHAR(100)  NULL," +
            "state INTEGER default 0, " +
            "gross NUMERIC default 0.00, " +
            "quantity NUMERIC default 0, " +
            "deleted INTEGER default 0, " +
            "createdate DATE, " +
            "updatedate DATE )";
    tx.executeSql(sql);


    // tx.executeSql("INSERT INTO orderArchive (customerid,state,quantity,gross,createdate,updatedate,owner) VALUES ('1','0',0,'0.00','" + ordcreateDate.format('yyyy-MM-dd hh:mm:ss').toString() + "','" + ordcreateDate.format('yyyy-MM-dd hh:mm:ss') + "','安捷力')");
    // tx.executeSql("INSERT INTO orderArchive (customerid,state,quantity,gross,createdate,updatedate,owner) VALUES ('1','0',0,'0.00','" + ordcreateDate.format('yyyy-MM-dd hh:mm:ss').toString() + "','" + ordcreateDate.format('yyyy-MM-dd hh:mm:ss') + "','安捷力')");


    /**
     * 初始化客户文档表
     */

    tx.executeSql('DROP TABLE IF EXISTS [customerArchive]');
    sql =
        "CREATE TABLE IF NOT EXISTS [customerArchive] ( " +
            "[id] INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL, " +
            "[markid] NUMERIC  NULL, " +
            "[name] NVARCHAR(20)  NULL, " +
            "[location] NVARCHAR(100)  NULL, " +
            "[address] NVARCHAR(200)  NULL, " +
            "[contact] NVARCHAR(50)  NULL, " +
            "[directory] NVARCHAR(200)  NULL, " +
            "[picture] VARCHAR(200)  NULL)";
    tx.executeSql(sql);
    tx.executeSql(" INSERT INTO customerArchive (name,location,address,contact,directory,picture) VALUES ('华联吉买盛大兴街店','上海市','大兴街18号','400-118-288','customer/','amy_jones100x100.jpg') ");
    tx.executeSql(" INSERT INTO customerArchive (name,location,address,contact,directory,picture) VALUES ('易初莲花新镇路店','上海市','七宝宝铭路8号','400-118-288','customer/','amy_jones100x100.jpg') ");
    tx.executeSql(" INSERT INTO customerArchive (name,location,address,contact,directory,picture) VALUES ('农工商金平路店','上海市','金平路90号','400-118-288','customer/','amy_jones100x100.jpg') ");
    tx.executeSql(" INSERT INTO customerArchive (name,location,address,contact,directory,picture) VALUES ('好又多量贩凌云店','上海市','老沪闵路809号','400-118-288','customer/','amy_jones100x100.jpg') ");
    tx.executeSql(" INSERT INTO customerArchive (name,location,address,contact,directory,picture) VALUES ('家乐福大拇指广场店','上海市','芳甸路199弄2号大拇指广场','400-118-288','customer/','amy_jones100x100.jpg')");


    /**
     * 初始化商品文档表
     */



    tx.executeSql('DROP TABLE IF EXISTS [commodityArchive]');
    sql =
        "CREATE TABLE [commodityArchive] ( " +
            "[id] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT, " +
            "[brandid] INTEGER, " +
            "[name] NVARCHAR(100)  NULL," +
            "[codingtag] NVARCHAR(100)  NULL," +
            "[price] NUMERIC DEFAULT '0.00' NOT NULL," +
            "[unit] NVARCHAR(50)  NULL," +
            "[specification] NVARCHAR(100)  NULL," +
            "[comment] TEXT  NULL," +
            "[directory] NVARCHAR(200)  NULL, " +
            "[picture] VARCHAR(100)  NULL )";
    tx.executeSql(sql);
    tx.executeSql(" insert into commodityArchive (brandid,name,price,unit,specification,directory,picture) values (4,'芝华士饼干','8.00','盒','500g','pictures/commodity/','ray_moore100x100.jpg')");
    tx.executeSql(" insert into commodityArchive (brandid,name,price,unit,specification,directory,picture) values (1,'康师傅矿泉水','0.8','瓶','750ml','pictures/commodity/','ray_moore100x100.jpg')");
    tx.executeSql(" insert into commodityArchive (brandid,name,price,unit,specification,directory,picture) values (3,'海狮大豆油','56.5','桶','5L','pictures/commodity/','ray_moore100x100.jpg')");
    tx.executeSql(" insert into commodityArchive (brandid,name,price,unit,specification,directory,picture) values (2,'达能酸酸乳','12.00','盒','150ml','pictures/commodity/','ray_moore100x100.jpg')");


    /**
     * 初始化订单存货表
     */

    tx.executeSql('DROP TABLE IF EXISTS [orderInventory]');
    sql =
        "CREATE TABLE [orderInventory] (" +
            "[id] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "[orderid] INTEGER  NOT NULL, " +
            "[commodityid] INTEGER  NULL, " +
            "[price] NUMERIC DEFAULT '0.00' NULL, " +
            "[count] INTEGER DEFAULT '0' NULL, " +
            "[gross] NUMERIC DEFAULT '0' NULL, " +
            "[updatedate] DATE  NULL, " +
            "[deleted] INTEGER DEFAULT '0' NULL)";
    tx.executeSql(sql);


    /**
     * 初始化商品品牌表
     */

    tx.executeSql('DROP TABLE IF EXISTS [brandArchive]');
    sql =
        "CREATE TABLE [brandArchive] (" +
            "[id] INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT," +
            "[name] NVARCHAR(100) NULL," +
            "[enterprise] NVARCHAR(100) NULL," +
            "[summary] TEXT NULL," +
            "[directory] VARCHAR(100)  NULL," +
            "[picture] VARCHAR(100)  NULL," +
            "[deleted] INTEGER DEFAULT '0' NULL)";
    tx.executeSql(sql);
    tx.executeSql("insert into brandArchive (name,enterprise,directory,picture) values ('康师傅','台湾康师傅食品有限责任公司','pictures/brand/','john_williams100x100.jpg')");
    tx.executeSql("insert into brandArchive (name,enterprise,directory,picture) values ('达能','上海达能有限公司','pictures/brand/','john_williams100x100.jpg')");
    tx.executeSql("insert into brandArchive (name,enterprise,directory,picture) values ('海狮','浙江海狮食品','pictures/brand/','john_williams100x100.jpg')");
    tx.executeSql("insert into brandArchive (name,enterprise,directory,picture) values ('芝华士','美国芝华士实业','pictures/brand/','john_williams100x100.jpg')");

    //  return false;

}


function populateDB_success() {
    dbCreated = true;
    dbo.transaction(getOrders, errorCB);
}


/**
 * 获取并打印订单列表数据
 * @param tx
 */

function getOrders(tx) {
    var sql = "SELECT OA.id,CA.name,CA.id as cuid,CA.directory,CA.picture,OA.codingtag,OA.quantity,OA.gross,OA.state,OA.createdate FROM orderArchive OA inner join customerArchive CA on OA.customerid=CA.id WHERE OA.deleted=0 ORDER BY OA.createdate DESC";

    tx.executeSql(sql, [], printOrders);
}

function printOrders(tx, results) {
    var len = results.rows.length;
    var serid;
    var stateicon;

    if (len == 0) {
        rsOrder.state = 'new';
        $('.sk-primarycontent').append('<a href="customer_list.html" data-role="button" data-icon="plus" style="padding: 8px; width:30%; margin: 0 auto" >增加订单</a>').trigger("create");
        return false;
    }

    for (var i = 0; i < len; i++) {
        serid = i + 1;
        var order = results.rows.item(i);
        if (i < 9) {
            serid = '0' + serid.toString();
        }

        if (order.state == 0) {
            stateicon = 'icon_orderstate_edit';
        }
        else if (order.state == 1) {
            stateicon = 'icon_orderstate_signed';
        } else {
            stateicon = 'icon_orderstate_cancel';
        }

        $('#myorderList').append('<li><a data-order-id=' + order.id + ' data-customer-id=' + order.cuid + ' class="sk-ui-link-inherit" href="#">' +
            '<span class="sk-order-thumbs"> <img src="' + order.directory + order.picture + '"/></span>' +
            '<h2 class="sk-orderid">' + serid + '</h2>' +
            '<h3>' + order.codingtag + ' - ' + order.name + '</h3>' +
            '<P class="ui-li-desc sk-orderprice"> ￥' + order.gross + '</P>' +
            '<p class="ui-li-desc">' + order.createdate + '</p>' +
            '</a><span> <a  data-order-state=' + order.state + ' href="#" class="ui-li-link-alt sk-ui-li-link-alt ui-btn ui-btn-up-c ' + stateicon + '" data-theme="c"></a> </span></li>');


    }
    $('#myorderList').listview('refresh');
    $('#myorderList').find('span[class^="ui-icon"]').remove();
    // dbo = null;
}

/**
 * 获取订单存货清单
 * @param tx
 */
function getOrderInventory(tx) {
    var sql = "SELECT  CA.id as coid ,CA.name,CA.directory,CA.picture,OI.id,OI.price,OI.count,OI.gross,OI.updatedate FROM orderInventory AS OI INNER JOIN commodityArchive CA ON OI.commodityid=CA.id WHERE OI.deleted=0 and OI.orderid=" + rsOrder.id + " ORDER BY OI.updatedate DESC";
    console.log(sql);
    tx.executeSql(sql, [], printOrderInventory);
}

function printOrderInventory(tx, results) {
    var len = results.rows.length;
    rsOrder.commodityQuantity = len;  // 订单存货商品数
    rsOrder.gross = 0;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            var inventory = results.rows.item(i);
            rsOrder.gross += inventory.gross; // 订单存货商品总价
            $('#orderCommodityList').append('<li><a data-inventory-id=' + inventory.id + ' data-commodity-id=' + inventory.coid + ' href="#">' +
                '<img src="' + inventory.directory + inventory.picture + '"/>' +
                '<h3>' + inventory.name + '</h3>' +
                '<P>单价:' + inventory.price + ' &nbsp;&nbsp; 数量:' + inventory.count + ' &nbsp;&nbsp; 共计: ￥' + inventory.gross + '</P>' +
                '</a></li>');
        }
    }

    tx.executeSql("update orderArchive set gross=" + rsOrder.gross + " where id=" + rsOrder.id);
    $('#orderCommodityList').listview('refresh');
}


/**
 * 获取商品品牌
 * @param tx
 */

function getBrand(tx) {
    //var sql = "SELECT  CA.id ,CA.name,CA.directory,CA.picture,OI.price,OI.count,OI.gross,OI.updatedate FROM orderInventory AS OI INNER JOIN commodityArchive CA ON OI.commodityid=CA.id WHERE OI.deleted=0 and OI.orderid=" + rsOrder.id + " ORDER BY OI.updatedate DESC";
    var sql = "SELECT * FROM brandArchive";
    tx.executeSql(sql, [], printBrand);
}

function printBrand(tx, results) {
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var brand = results.rows.item(i);

        $('#brandLists').append('<li><a data-brand-id=' + brand.id + ' href="#">' +
            '<img src="' + brand.directory + brand.picture + '"/>' +
            '<h3>' + brand.name + '</h3>' +
            '</a></li>');
    }
    $('#brandLists').listview('refresh');

}


/**
 * 获取商品列表数据
 * @param tx
 */

function getCommodity(tx) {
    var sql = "SELECT * FROM commodityArchive WHERE brandid=" + rsOrder.brand.id;
    tx.executeSql(sql, [], printCommodity);
}

function printCommodity(tx, results) {
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var commodity = results.rows.item(i);

        $('#commodityLists').append('<li><a data-commodity-id=' + commodity.id + ' href="commodity_setting.html">' +
            '<img src="' + commodity.directory + commodity.picture + '"/>' +
            '<h3>' + commodity.name + '</h3>' +
            '<p>规格:<span> ' + commodity.specification + '</span> &nbsp;&nbsp; 单位:<span>' + commodity.unit + '</span>  &nbsp;&nbsp; 参考价:￥<span> ' + commodity.price + '</span></p>' +
            '</a></li>');


    }
    $('#commodityLists').listview('refresh');

    // dbo = null;
}


/**
 * 获取并打印客户列表数据
 * @param tx
 */

function getCustomer(tx) {
    var sql = "select * from customerArchive";
    tx.executeSql(sql, [], printCustomers);
}

function printCustomers(tx, results) {
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var customer = results.rows.item(i);

        $('#customerLists').append('<li><a data-customer-id=' + customer.id + ' href="#">' +
            '<img src="' + customer.directory + customer.picture + '"/>' +
            '<h3>' + customer.name + '</h3>' +
            '<p>' + customer.address + '</p>' +
            '</a></li>');
    }
    $('#customerLists').listview('refresh');
}


/**
 * 退出应用程序
 */

function onConfirm_quit(button) {
    if (button === 1) {
        navigator.app.exitApp();
    }
}

function showConfirm_quit() {
    navigator.notification.confirm(
        '确定要退出！', // message
        onConfirm_quit, // callback to invoke with index of button pressed
        '退出', // title
        '确定,取消'          // buttonLabels
    );
}

$(document).delegate('#btnquit', 'vclick', function () {
    showConfirm_quit();
})


/**
 * 简单的布尔型确认弹出层
 * @param self  DOM对象
 * @param msg   提示信息文本
 * @param okFn   确定的回调函数
 * @param cancelFn   取消的回调函数
 * @param theme   样式主题
 * @param icon   图标样式
 */

function simpleDialog_boolean(self, msg, okFn, cancelFn, theme, icon) {
    if (!icon) icon = "delete";
    if (!theme) theme = "c";

    $(self).simpledialog({
        'mode':'bool',
        'prompt':msg,
        'useModal':true,
        'buttons':{
            'OK':{
                click:function () {
                    okFn();
                }
            },
            'Cancel':{
                click:function () {
                    cancelFn();
                },
                icon:icon,
                theme:theme
            }
        }
    });
}


/**
 * 时间格式化
 * eg:format="yyyy-MM-dd hh:mm:ss";
 */

Date.prototype.format = function (format) {
    if (!format) {
        format = "yyyy-MM-dd hh:mm:ss";
    }

    var o = {
        "M+":this.getMonth() + 1, // month
        "d+":this.getDate(), // day
        "h+":this.getHours(), // hour
        "m+":this.getMinutes(), // minute
        "s+":this.getSeconds(), // second
        "q+":Math.floor((this.getMonth() + 3) / 3), // quarter
        "S":this.getMilliseconds()
        // millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/**
 * 文本框输入即时变化;
 */

jQuery.fn.extend({
    jitchange:function (fn) {
        if (!+[1, ] != true) {
            $(this).get(0).addEventListener("input", fn, false)
        }
        $(this).bind("jitchange", fn);
        return this
    }
});


/**
 * 数字验证正则;
 * isDecimal  非负浮点小数1~3位；
 * isUnsignedNumeric 非负浮点数，不限位数
 */

function isDecimal(chars) {
    var re = /^[0-9]+(.[0-9]{1,3})?$/;
    return re.test(chars);
}


function isUnsignedNumeric(strNumber) {
    var newPar = /^\d+(\.\d+)?$/
    return   newPar.test(strNumber);
}


/**
 * 实现小数位的四舍五入;
 * @param v 字符值
 * @param r 保留的小数位数
 */

function roundDecimal(v, r) {
    var num = v.toString().indexOf('.') + 1;
    var str = v.toString().substring(num, v.length);
    if (str.length > r)
        return v.toFixed(r);
    else
        return v;
}


/**
 * noticify确认提示框
 * @param msg
 * @param callFn
 * @param title
 */


function showConfirm_Dialog(msg, callFn, title) {
    navigator.notification.confirm(
        msg, // message
        callFn, // callback to invoke with index of button pressed
        title, // title
        '确定,取消'     // buttonLabels
    );
}

function showAlert_Dialog(msg, callFn, title, txtButton) {
    if (!txtButton) txtButton = '确定';
    if (!title) txtButton = '提示';
    if (!callFn) callFn = function () {
        return false;
    }

    navigator.notification.alert(
        msg, // 显示信息
        callFn, // 警告被忽视的回调函数
        title, // 标题
        txtButton                  // 按钮名称
    );
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}