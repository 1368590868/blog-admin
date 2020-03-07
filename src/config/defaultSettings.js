/**
 * 项目默认配置项
 *
 */
const NODEENV = process.env.NODE_ENV
export default {
  // github登录必须的clientId和clientSecret 如果本地运行不用动,
  // 如果需要部署到github pages需要分别替换clientId和client Secret的前一个配置为自己相应的clientId和clientSecret
  clientId: NODEENV === 'production' ? '0039c40dc0c57752e357' : 'd7b3acf20efed15aaf3e',
  clientSecret: NODEENV === 'production' ? '977a7625aa95a351bb00d0aab465c0128cd91b78' : '3218bbf0edd44432d0b9605237c694d1662a74f0',
  // 仓库所属用户名
  username: '木木',
  // 存放数据仓库地址
  articleRepo: 'gsbx',
  // 存放文章的标签名
  articleLabel: 'article',
  // 存放文章时的markdown内容标签名
  articleMarkdownLabel: 'article-md',
  userInfoLabel: 'userinfo',
  deleteArticleLabel: 'article-delete',
  deletearticleMarkdownLabel: 'article-md-delete',
  // 菜单导航
  adminMenu: [
    {
      title: 'dashboard',
      key: 'dashboard',
      icon: 'pie-chart',
      children: [
        {
          title: '工作台',
          key: 'workbench',
          icon: 'reconciliation'
        },
        {
          title: '个人信息',
          key: 'personal',
          icon: 'user'
        }
      ]
    },
    {
      title: '文章管理',
      key: 'article',
      icon: 'book',
      children: [
        {
          title: '写文章',
          key: 'writeArticle',
          icon: 'plus-square'
        },
        {
          title: '文章管理',
          key: 'articleUpdate',
          icon: 'file-text'
        }
      ]
    }
  ],
  // 文章类别 可新增
  articleType: [
    {
      value: 'life',
      label: '生活小调'
    },
    {
      value: 'jishu',
      label: '技术文章'
    }
  ]

}
