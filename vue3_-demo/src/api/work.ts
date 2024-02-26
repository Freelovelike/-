import {get,post} from '../utils/request.ts'


export const shop_room_type = (page:number=1,pageSize:number=5)=>{
    return get(`/shop/shop_room_type?page=${page}&pageSize=${pageSize}`)
}


export const addGuest=(data:any)=>
 post('/shop/addShop_room_type',data)


export const delGuest=(id:any)=>
get(`/shop/delShop?id=${id}`)


// 编辑用户信息
export const editShop_room_type=(data:object)=>{
    return post('/shop/editShop_room_type',data)
}