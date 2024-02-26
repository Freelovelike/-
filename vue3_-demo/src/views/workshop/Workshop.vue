<template>
  <div style="padding: 20px">
    <div style="display: flex; justify-content: space-between">
      <el-button
        type="primary"
        plain
        style="margin-bottom: 20px"
        @click="addwork"
        >添加</el-button
      >
      <AddorEditDrawer
        ref="AddorEditRef"
        @success="onSuccess"
      ></AddorEditDrawer>
      <div>
        <el-input
          placeholder="请输入车间"
          type="text"
          v-model="workshop"
          style="margin-bottom: 20px; width: 200px; margin-right: 20px"
        ></el-input>
        <el-button
          type="primary"
          plain
          style="margin-bottom: 20px"
          @click="exportExcel"
          >导出Excel</el-button
        >
        <el-button type="success" plain style="margin-bottom: 20px"
          @click="queryUser">查询</el-button
        >
        <el-button type="warning" plain style="margin-bottom: 20px"
          >重置</el-button
        >
      </div>
    </div>
    <PublicTables :tableData="tableData">
      <template #tableColumns>
        <el-table-column prop="id" align="center" label="编号" width="180" />
        <el-table-column
          prop="workshop"
          align="center"
          label="车间"
          width="180"
        />
        <el-table-column
          prop="materialName"
          align="center"
          width="180"
          label="物资名称"
        />
        <el-table-column
          prop="specification"
          align="center"
          width="180"
          label="规格型号"
        />
        <el-table-column
          prop="measurement"
          align="center"
          width="180"
          label="计量单位"
        />
        <el-table-column
          prop="quantity"
          align="center"
          width="180"
          label="库存数量"
        />
        <el-table-column
          prop="monthly"
          align="center"
          width="180"
          label="月消耗"
        />
        <el-table-column
          prop="status"
          align="center"
          width="180"
          label="物资状态"
        >
          <template v-slot:default="scope">
            <span style="color: green" v-if="scope.row.status === 1">在用</span>
            <span style="color: yellow" v-else-if="scope.row.status === 2"
              >闲置</span
            >
            <span style="color: red" v-else-if="scope.row.status === 3"
              >已报废</span
            >
          </template>
        </el-table-column>
      </template>
      <!-- 操作区域 -->
      <template #operate>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </template>
    </PublicTables>

    <PublicPagination
      ref="pageRef"
      :total="total"
      @paginAtion="fetchDatas"
    ></PublicPagination>
  </div>
</template>

<script setup lang="ts">
import PublicTables from "../../components/PublicTables.vue";
import { shop_room_type, delGuest } from "../../api/work";
import { ref, onMounted } from "vue";
import AddorEditDrawer from "../../components/work/AddorEditDrawer.vue";
import PublicPagination from "../../components/PublicPagination.vue";
// onMounted(fetchData); // 调用函数开始获取数据
import { ElMessage, ElMessageBox } from "element-plus";
import * as ExcelJS from "exceljs";
onMounted(() => {
  fetchData();
});
const tableData = ref([]);
// async function fetchData() {
//   try {
//     const result = await shop_room_type();
//     tableData.value = result.data;
//     console.log(tableData.value, "ASD");
//     total.value= result.total
//   } catch (error) {
//     console.error(error);
//   }
// }
const fetchData = async (page?: any, pageSize?: any) => {
  const res = await shop_room_type(page, pageSize);
  tableData.value = res.data;
  console.log(tableData.value, "roomTypeList.value ");
  total.value = res.total;
};

// 编辑
const handleEdit = (row: any) => {
  // 打开编辑抽屉时，使用深拷贝克隆表格数据到编辑表单中
  const editForm = JSON.parse(JSON.stringify(row));
  // editForm.id=666
  // 通过ref调用子组件暴露出来的方法
  AddorEditRef.value.open(editForm);
};
const total = ref(0);
const fetchDatas = (obj: any) => {
  fetchData(obj.page, obj.pageSize);
};
let AddorEditRef = ref();
const addwork = () => {
  AddorEditRef.value.open({});
  // AddorEditRef.value.open({})
};
// 触发分页的ref
const pageRef = ref();
// 接收子组件传过来的数据--触发添加编辑成功后的回调
const onSuccess = (type: string) => {
  if (type === "add") {
    // 触发分页的方法
    pageRef.value.handleChange();
  } else {
    pageRef.value.handleEdit();
  }
  
};
const workshop = ref(""); 

const queryUser=()=>{
  fetchData(workshop.value)
}
const handleDelete = (id: any) => {
  ElMessageBox.confirm("确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await delGuest(id).then(() => {
        ElMessage.success("删除成功");
      });
      await fetchData();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功",
      });
    });
};

// 导出Excel
const exportExcel = () => {
  ElMessageBox.confirm("是否确定导出当前页数据?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 获取当前页面表格的数据
      const dataToExport = tableData.value;
      // 使用exceljs生成Excel文件
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet1");
      //添加表头
      worksheet.addRow([
        "编号",
        "车间",
        "物资名称",
        "规格型号",
        "计量单位",
        "库存数量",
        "月消耗",
        "物资状态",
      ]);
      // 添加数据
      dataToExport.forEach((item: any) => {
        let statusText = "";
        if (item.status === 1) {
          statusText = "在用";
        } else if (item.status === 2) {
          statusText = "闲置";
        } else if (item.status === 3) {
          statusText = "已报废";
        }

        worksheet.addRow([
          item.id,
          item.workshop,
          item.materialName,
          item.specification,
          item.measurement,
          item.quantity,
          item.monthly,
          statusText,
        ]);
      });
      // 生成文件
      workbook.xlsx.writeBuffer().then((buffer: any) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "车间信息.xlsx";
        link.click();
        URL.revokeObjectURL(link.href);
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功",
      });
    });
};
</script>


<style scoped>
</style>