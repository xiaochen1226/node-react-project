const errorTypes = require('../constants/error-types')

const errorHandle = (error, ctx) => {
    let status, message
    
    switch (error.message) {
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400
            message = '用户名密码不能为空'
            break
        
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409
            message = '用户名已存在'
            break
            
        case errorTypes.USER_DOES_NOT_EXISTS:
                status = 400
                message = '用户名不存在'
                break
                
        case errorTypes.PASSWORD_IS_NOT_INCORRECT:
            status = 400
            message = '密码不正确'
            break
            
        case errorTypes.UNAUTHORIZATION:
            status = 401
            message = '无效token'
            break

        case errorTypes.PRODUCT_PICTURE_IS_REQUIRED:
            status = 400
            message = '商品图片至少上传一张'
            break

        case errorTypes.PRODUCT_PICTURE_IS_EXCEED:
            status = 400
            message = '商品图片不能超过九张'
            break

        case errorTypes.PRODUCT_ARGUMENTS_IS_REQUIRED:
            status = 400
            message = '所有参数不能为空'
            break
        
        case errorTypes.PRODUCT_ALREADY_EXISTS:
            status = 409
            message = '商品已存在'
            break

        case errorTypes.UNPRODUCTPERMISSION:
            status = 401
            message = '你不具备操作的权限'
            break
        
        default:
            status = 404
            message = 'NOT FOUND'
            break
    }
    
    ctx.status = status
    ctx.body = message
}

module.exports = errorHandle