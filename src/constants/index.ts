
const publicProjectFiles = import.meta.glob('../../public/project/*/*.html'); // 自定义规则
const pArr = []
for (let i in publicProjectFiles) {
  // console.log(123, i, files[i]);
  const pathArr = i.split('/')
  const projectName = pathArr[pathArr.length - 2]

  const name = projectName.replace(/_/g, ' ').replace(/-/g, ' ')
  const upperName = name.charAt(0).toUpperCase() + name.slice(1)
  pArr.push({
    id: projectName,
    dirName: projectName,
    path: `/project/${projectName}/${pathArr[pathArr.length - 1]}`,
    name: upperName,
  })
}
export const PUBLIC_PROJECT_LIST = pArr
