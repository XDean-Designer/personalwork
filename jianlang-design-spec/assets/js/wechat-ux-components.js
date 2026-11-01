/**
 * WeChat UX Kit 组件映射 → 剑琅联盟规范组件（视觉遵循 ★ 全局强制 UI）
 * 源文件：https://www.figma.com/design/UqA4U4cmf68pkXynOIhPHU/
 */
const WECHAT_UX_COMPONENTS = [
  { wechat: '默认导航栏', id: 'PageTitleBar', name: '页面标题栏', note: '内页必用 · 44px · 无描边 · 标题/右侧底对齐' },
  { wechat: '搜索导航栏 / 搜索栏', id: 'SearchBar', name: '搜索栏', note: '高 36–44px · 圆角 8px · 灰底 #F7F7F7 或白底' },
  { wechat: '默认标签栏 / 四标签栏', id: 'TabBar', name: '底栏 Tab', note: '56px · 图标 24 · 文案 11px · 选中面性+品牌色' },
  { wechat: '三/双选项横向分页栏', id: 'PageTabs', name: '顶部 Tab', note: '宽 390 居中 · 指示条 16×3' },
  { wechat: '列表右侧开关', id: 'Switch', name: '开关', note: '44×24 · 开 brand-6' },
  { wechat: '列表勾选', id: 'Checkbox', name: '多选框', note: '20px · 与列表行左对齐' },
  { wechat: '单选框', id: 'Radio', name: '单选框', note: '24px 圆形' },
  { wechat: '双/三按钮弹出式菜单', id: 'ActionSheet', name: '动作面板', note: '底出 · 白底 · 无阴影 · 1px 分割' },
  { wechat: '对话框信息 / 双选 / 多选', id: 'Dialog', name: '对话框', note: '按钮红底/描边同全局' },
  { wechat: '成功 / 失败 / 加载中提示', id: 'Toast', name: '轻提示', note: '130×130 方形容器 · 无投影' },
  { wechat: '徽章/数字气泡', id: 'Badge', name: '角标', note: 'Tab、列表未读数' },
  { wechat: '基本输入框', id: 'Input', name: '输入框', note: '高 56px 行 · 错误态 error 色' },
  { wechat: '日期选择轮盘', id: 'Picker', name: '滚轮选择器', note: '底部弹出 · 与 ActionSheet 组合' },
  { wechat: '聊天气泡', id: 'ChatBubble', name: '聊天气泡', note: '客服/IM 场景 · 白/灰底 8px 圆角' },
  { wechat: '内容/产品/社交卡片', id: 'ProductCard', name: '卡片', note: '圆角 12 · overflow hidden' },
  { wechat: '支付凭证 / 推送提醒', id: 'MessageCard', name: '消息卡片', note: '模板消息、订阅通知' },
  { wechat: '正常态大按钮', id: 'Button', name: '按钮', note: '高 48px · 主色/描边见全局' },
  { wechat: '开关选择器', id: 'Switch', name: '开关（表单）', note: '设置项 · 51×31 或小型 58×35' }
];
