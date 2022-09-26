import service from '../service';
import qs from 'qs';

// 封装表格获取数据的通用方法
export function getData(root, url, params) {
  return service({
    url,
    method: 'get',
    params,
  }).then((res) => {
    if (res.data.status === 200) {
      root.data = res.data.data;
      root.total = res.data.total;
      return root.data;
    }
  });
}

// 封装表格的新增和编辑方法
export function changeInfo(root, method, url, formData, callback) {
  const data = qs.stringify(formData);
  return service({
    method,
    url,
    data,
  }).then((res) => {
    if (res.data.status === 200) {
      callback();
      root.dialogFormVisible = false;
      root.$refs['formData'].resetFields();
      root.$message({
        message: res.data.message,
        type: 'success',
      });
    }
  });
}

export function deleteInfo(root, url, id, callback) {
  root
    .$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
      service({
        url: `${url}/${id}`,
        method: 'delete',
      }).then((res) => {
        if (res.data.status === 200) {
          callback();
          root.$message({
            message: res.data.message,
            type: 'success',
          });
        }
      });
    })
    .catch(() => {
      root.$message({
        type: 'info',
        message: '已取消删除',
      });
    });
}
