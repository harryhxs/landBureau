const fileHost = 'https://front-resources.oss-cn-chengdu.aliyuncs.com'
const config = {
  uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
  AccessKeySecret: 'xxx', // AccessKeySecret 去你的阿里云上控制台上找
  OSSAccessKeyId: 'xxx', // AccessKeyId 去你的阿里云上控制台上找
  timeout: 80000 // 这个是上传文件时Policy的失效时间
}

export default config
