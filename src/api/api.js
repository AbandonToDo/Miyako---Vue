import service from '../service'

// 登陆API
export function login(data) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}
// 学生列表查询API
export function getStudentList(params) {
  return service({
    url: `/students?name=${params}`,
    method: 'get',
    params
  })
}
// 学生信息删除
export function deleteStudent(id) {
  return service({
    url: `/students/${id}`,
    method: 'delete'
  })
}
