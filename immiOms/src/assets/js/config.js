const  HttpUrl={
    //管理员登录
    ROOT_LOGIN:'public/rootLogin',

    //获取用户列表
    USER_LIST:'UserController/userList',

    //获取用户简单列表 (这个无)
    //AAUSER_LIST:'UserController/getAAUserList',

    //高校列表接口
    UNIVERSITY_LIST:'public/universityList',

    //上传图片
    UPLOAD_IMAGE : 'ImageController/uploadImage',

    //新增高校接口
    ADD_UNIVERSITY:'public/saveUniversityInfo',

    //删除高校
    DELETE_UNIVERSITY:'public/deleteUniversity',
    
    //获取单个高校信息
    UNIVERSITY_ITEM:'public/universityInfo',

    //订单列表接口
    ORDER_LIST:'OrderController/getAllOrders',

    //更改订单状态
    CHANGE_ORDER_STATUS:'OrderController/adminChangeOrderStatus',



    

    //编辑高校接口
    EDIT_UNIVERSITY:'UniversityController/editUniversity',


    //订单服务状态接口
    SERVE_ORDER:'SalesController/serveOrder',
    //删除已完成订单
    DELETE_ORDER:'SalesController/deleteOrder',
    //获取用户数量
    USER_NUM:'UserController/userNum',
    //获取高校数量
    UNIVERSITY_NUM:'UniversityController/universityNum',
    //获取订单数量
    ORDER_NUM:'SalesController/listOrder',

}

export default HttpUrl
