<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
// import {addRoomType,editRoomType} from '../../api/room'
import {addGuest,editShop_room_type} from '../../api/work'
import { ElMessage } from 'element-plus'
// 抽屉状态
const dialog=ref(false)
// 定义一个ref对象绑定表单
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref({
  id:null,
  workshop:'',
  materialName:'',
  specification:'',
    measurement:'',
    quantity:'',
    monthly:'',
    status:null
})
const workshop = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('车间名称不能为空'))
  } else {
    callback()
  }
}
const materialName = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('物资名称不能为空'))
  } else {
    callback()
  }
}
const specification = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('不能为空'))
  } else {
    callback()
  }
}
const validRoomTypePrice = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('不能为空'))
  }else if(!/^\d+(\.\d+)?$/.test(value)){
    callback(new Error('不能为空'))
  } else {
    callback()
  }
}
// const validRoomTypeBedNum = (_: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('床位数量不能为空'))
//   }else if(!/^\d+(\.\d+)?$/.test(value)){
//     callback(new Error('只能输入数字且不能是负数'))
//   } else {
//     callback()
//   }
// }
//验证对象
const rules = ref<FormRules<typeof ruleForm>>({
  workshop: [{ validator: workshop, trigger: 'blur' }],
  materialName: [{ validator: materialName, trigger: 'blur' }],
  specification: [{ validator: specification, trigger: 'blur' }],
  measurement: [{ validator: specification, trigger: 'blur' }],
  quantity: [{ validator: specification, trigger: 'blur' }],
  monthly: [{ validator: specification, trigger: 'blur' }],
  status: [{ validator: validRoomTypePrice, trigger: 'blur' }]
})
const eimt=defineEmits(['success'])
//提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if(ruleForm.value.id){
        await editShop_room_type(ruleForm.value).then(()=>{
            dialog.value=false
            ElMessage.success('编辑成功')
            eimt('success','edit')
        })
      }else{
        //新增
        await addGuest(ruleForm.value).then(()=>{
            dialog.value=false
            ElMessage.success('新增成功')
            eimt('success','add')
        })
      }
    } else {
      return false
    }
  })
}
//  取消
const resetForm = () => {
  dialog.value=false
}
//  抽屉关闭时的回调
const closeDr=() =>{
  dialog.value=false
  ruleForm.value={
    id:null,
  workshop:'',
  materialName:'',
  specification:'',
    measurement:'',
    quantity:'',
    monthly:'',
    status:null
  }
}

// 抽屉打开时的回调
const open=(obj:any)=>{
    dialog.value=true
    if(obj.id){
        ruleForm.value=obj
        
    }
}
//将状态暴露出去
defineExpose({
    open
})
const value  = ref()  // 默认状态为 1，在用
const options = [
  {
    value:  1,
    label: '在用',
  },
  {
    value:  2,
    label: '闲置',
  },
  {
    value: 3,
    label: '已报废',
  },

]
</script>
<template>
    <el-drawer
    v-model="dialog"
    :title="ruleForm.id ? '编辑房型' : '新增车型'"
    direction="rtl"
    size="30%"
    @close="closeDr()"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="车间" prop="workshop">
        <el-input v-model="ruleForm.workshop" autocomplete="off" />
      </el-form-item>
      <el-form-item label="物资名称" prop="materialName">
        <el-input v-model="ruleForm.materialName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="规格型号" prop="specification">
        <el-input v-model="ruleForm.specification" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="计量单位" prop="measurement">
        <el-input v-model="ruleForm.measurement" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="库存数量" prop="quantity">
        <el-input v-model="ruleForm.quantity" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="月消耗" prop="monthly">
        <el-input v-model="ruleForm.monthly" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="物资状态" prop="status">
        <el-select style="width: 100%;" v-model="ruleForm.status" clearable placeholder="请选择物资状态" >
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
     />
  </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >{{ruleForm.id ? '编辑' : '添加'}}</el-button
        >
        <el-button @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
</style>