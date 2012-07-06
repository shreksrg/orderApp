/**
 * Created with Shrek.
 * Date: 12-6-14 9:19
 * 创建订单
 */


var dbo;
var rsOrder = {};
var rsCustomer = {};
var rsBrand = {};
var rsProduct = [];


document.addEventListener("deviceready", onDeviceReady, false);

/*function onDeviceReady() {
    dbo = window.openDatabase("OrdersDirectoryDB", "1.0", "Orders Demo", 200000);
    dbo.transaction(getCustomers, errorCB, successCB);
}

function errorCB(tx, error) {
    alert("Database Error: " + error);
}

function successCB() {
    return true;
}*/


/*
dbo.transaction(createOrder, errorCB, successCB);  // 执行创建订单
*/


/**
 * 创建新订单
 * @param tx
 *
 */


function createOrder(tx) {
    var sql = 'INSERT INTO orderArchive (cmid,owner,creatdate) VALUES ( ' + rsCustomer.id + ',' + rsOrder.owner + ',' + Date() + ')';
    tx.executeSql(sql);
    sql = 'SELECT * FROM orderArchive ORDER BY id DESC LIMIT 1';
    tx.executeSql(sql, [], createOrder_success);
}

function createOrder_success(tx, results) {
    var len = results.rows.length;
    var order = results.rows.item(0);
    rsOrder.id = order.id;  //获取订单ID
    dbo = null;
}


/**
 * 执行客户名单数据查询
 * @param tx
 *
 */

function getCustomers(tx) {
    var sql = "SELECT * FROM orderArchive";
    tx.executeSql(sql, [], getCustomers_success);
}

/**
 * 页面输出客户名单数据
 * @param tx
 * @param results   返回的数据结果集对象
 *
 */

function getCustomers_success(tx, results) {
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var customer = results.rows.item(i);
        $('#employeeList').append('<li><a href="employeedetails.html?id=' + customer.id + '">' +
            '<img src="pics/' + customer.picture + '" class="list-icon"/>' +
            '<p class="line1">' + customer.cmName + ' ' + customer.cmName + '</p>' +
            '<p class="line2">' + customer.title + '</p>' +
            '<span class="bubble">' + customer.cmContact + '</span></a></li>');
    }
    dbo = null;
}

/**
 * 创建客户表
 * @param tx
 */

function populateCustomer(tx) {
    var sql =
        "CREATE TABLE IF NOT EXISTS orderArchive ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "cmName VARCHAR(100), " +
            "cmArea VARCHAR(50), " +
            "cmAddress VARCHAR(200), " +
            "cmContact VARCHAR(50), " +
            "cmComment VARCHAR(200), " +
            "cmPicture VARCHAR(200))";

    tx.executeSql(sql);
}


/**
 * 选择订单所属客户
 * @return
 */

function ChoiceCustomer() {
    rsCustomer.id = $('p[data-custumer-id]').val();
    rsCustomer.name = $('p[data-custumer-name]').val();
    rsCustomer.address = $('p[data-custumer-address]').val();

    rsOrder.customer = rsCustomer;
    return rsCustomer;

}


/**
 * 执行产品品牌数据查询
 * @param tx
 *
 */

function getBrand(tx) {
    var sql = "SELECT * FROM brandArchive";
    tx.executeSql(sql, [], printBrandList);
}


/**
 * 页面输出产品品牌名单数据
 * @param tx
 * @param results   返回的数据结果集对象
 *
 */

function printBrandList(tx, results) {
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var brand = results.rows.item(i);
        $('#productList').append('<li><a href="employeedetails.html?id=' + brand.id + '">' +
            '<img src="pics/' + brand.picture + '" class="list-icon"/>' +
            '<p class="line1">' + brand.name + ' ' + brand.name + '</p>' +
            '<p class="line2">' + brand.brand + '</p>' +
            '<span class="bubble">' + brand.refprice + '</span></a></li>');
    }
    dbo = null;
}

/**
 * 选择产品品牌
 * @return
 */

function choiceBrand() {
    rsBrand.id = $('p[data-brand-id]').val();
    rsBrand.name = $('p[data-brand-name]').val();
    return rsBrand
}


/**
 * 执行产品名单数据查询
 * @param tx
 *
 */

function getProducts(tx) {
    var sql = "SELECT * FROM productArchive WHERE brandid=" + rsBrand.id;
    tx.executeSql(sql, [], printProductList);
}

/**
 * 页面输出产品名单数据
 * @param tx
 * @param results   返回的数据结果集对象
 *
 */

function printProductList(tx, results) {
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var product = results.rows.item(i);
        $('#productList').append('<li><a href="employeedetails.html?id=' + product.id + '">' +
            '<img src="pics/' + product.picture + '" class="list-icon"/>' +
            '<p class="line1">' + product.Name + ' ' + product.Name + '</p>' +
            '<p class="line2">' + product.brand + '</p>' +
            '<span class="bubble">' + product.refprice + '</span></a></li>');
    }
    dbo = null;
}


/**
 * 选择产品
 * @return
 */

function choiceProduct() {
    rsProduct.id = $('p[data-product-id]').val();
    rsProduct.name = $('p[data-product-name]').val();
    rsProduct.unit = $('p[data-product-unit]').val();
    rsProduct.size = $('p[data-product-size]').val();
    return rsProduct;
}


/**
 * 提交产品信息加入订单,更新
 * @return
 */


function addProductToOrder(tx) {
    rsProduct.number = $('#productNum').val();
    rsProduct.price = $('#productPrice').val();
    rsProduct.gross = $('#productGross').val();
    rsProduct.time = Date();
    var sql = 'insert into orderAddition (orderid,prodid,prodnum,prodprice,prodgross,creatdate) values (' +
        rsOrder.id + ',' + rsProduct.id + ',' + rsProduct.number + ',' + rsProduct.price + ',' + rsProduct.gross + ',' + rsProduct.time + ')';
    tx.executeSql(sql);
}



