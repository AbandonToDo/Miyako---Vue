import service from '../service';

// 登陆API
export function login(data) {
  return service({
    url: '/login',
    method: 'post',
    data,
  });
}
// 学生列表查询API
export function getStudentList(params) {
  return service({
    url: `/students?name=${params}`,
    method: 'get',
    params,
  });
}
// 学生信息删除
export function deleteStudent(id) {
  return service({
    url: `/students/${id}`,
    method: 'delete',
  });
}
// 学生详细信息列表
export function getStudentInfo(params) {
  return service({
    url: '/info',
    method: 'get',
    params,
  });
}

// 增加学生信息
export function addStudentInfo(data) {
  return service({
    url: '/info',
    method: 'post',
    data,
  });
}
