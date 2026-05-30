const GAME_WORKS = [
  { path: "游戏原画/场景类/写实-国风沙盘1.jpg", category: "场景类", style: "写实", title: "写实-国风沙盘1" },
  { path: "游戏原画/场景类/写实-国风沙盘2.jpg", category: "场景类", style: "写实", title: "写实-国风沙盘2" },
  { path: "游戏原画/场景类/写实-母舰降临.jpg", category: "场景类", style: "写实", title: "写实-母舰降临" },
  { path: "游戏原画/场景类/写实-海上神庙.jpg", category: "场景类", style: "写实", title: "写实-海上神庙" },
  { path: "游戏原画/场景类/写实-科幻建筑.jpg", category: "场景类", style: "写实", title: "写实-科幻建筑" },
  { path: "游戏原画/场景类/写实-科幻沙盘.jpg", category: "场景类", style: "写实", title: "写实-科幻沙盘" },
  { path: "游戏原画/场景类/写实-空中基地.jpg", category: "场景类", style: "写实", title: "写实-空中基地" },
  { path: "游戏原画/场景类/写实-落日西部.jpg", category: "场景类", style: "写实", title: "写实-落日西部" },
  { path: "游戏原画/场景类/写实-道具图标.jpg", category: "场景类", style: "写实", title: "写实-道具图标" },
  { path: "游戏原画/场景类/写实-锦标赛背景.jpg", category: "场景类", style: "写实", title: "写实-锦标赛背景" },
  { path: "游戏原画/场景类/卡通-休闲合集1.jpg", category: "场景类", style: "卡通", title: "卡通-休闲合集1" },
  { path: "游戏原画/场景类/卡通-休闲合集2.jpg", category: "场景类", style: "卡通", title: "卡通-休闲合集2" },
  { path: "游戏原画/场景类/卡通-传送门场景.jpg", category: "场景类", style: "卡通", title: "卡通-传送门场景" },
  { path: "游戏原画/场景类/卡通-单体建筑.jpg", category: "场景类", style: "卡通", title: "卡通-单体建筑" },
  { path: "游戏原画/场景类/卡通-圣诞小岛.jpg", category: "场景类", style: "卡通", title: "卡通-圣诞小岛" },
  { path: "游戏原画/场景类/卡通-城堡教堂单体.jpg", category: "场景类", style: "卡通", title: "卡通-城堡教堂单体" },
  { path: "游戏原画/场景类/卡通-小沙盘场景.jpg", category: "场景类", style: "卡通", title: "卡通-小沙盘场景" },
  { path: "游戏原画/场景类/卡通-彩虹小镇.jpg", category: "场景类", style: "卡通", title: "卡通-彩虹小镇" },
  { path: "游戏原画/场景类/卡通-插花小游戏场景.jpg", category: "场景类", style: "卡通", title: "卡通-插花小游戏场景" },
  { path: "游戏原画/场景类/卡通-空中城堡.jpg", category: "场景类", style: "卡通", title: "卡通-空中城堡" },
  { path: "游戏原画/场景类/卡通-蘑菇密林.jpg", category: "场景类", style: "卡通", title: "卡通-蘑菇密林" },
  { path: "游戏原画/场景类/卡通-赛事主题场景.jpg", category: "场景类", style: "卡通", title: "卡通-赛事主题场景" },
  { path: "游戏原画/场景类/卡通-道具图标.jpg", category: "场景类", style: "卡通", title: "卡通-道具图标" },
  { path: "游戏原画/场景类/卡通-风格化单体.jpg", category: "场景类", style: "卡通", title: "卡通-风格化单体" },
  { path: "游戏原画/场景类/卡通-魔幻沙盘场景.jpg", category: "场景类", style: "卡通", title: "卡通-魔幻沙盘场景" },
  { path: "游戏原画/角色类/写实-DOTA2 鱼人火海哨卫.JPG", category: "角色类", style: "写实", title: "写实-DOTA2 鱼人火海哨卫" },
  { path: "游戏原画/角色类/写实-刀妹.jpg", category: "角色类", style: "写实", title: "写实-刀妹" },
  { path: "游戏原画/角色类/写实-厚涂国风武将.jpg", category: "角色类", style: "写实", title: "写实-厚涂国风武将" },
  { path: "游戏原画/角色类/写实-恶灵刺客.jpg", category: "角色类", style: "写实", title: "写实-恶灵刺客" },
  { path: "游戏原画/角色类/写实-科幻 修理机器人.jpg", category: "角色类", style: "写实", title: "写实-科幻 修理机器人" },
  { path: "游戏原画/角色类/写实-科幻士兵设定.jpg", category: "角色类", style: "写实", title: "写实-科幻士兵设定" },
  { path: "游戏原画/角色类/写实-科幻角色1对.jpg", category: "角色类", style: "写实", title: "写实-科幻角色1对" },
  { path: "游戏原画/角色类/写实-精灵王美宣.jpg", category: "角色类", style: "写实", title: "写实-精灵王美宣" },
  { path: "游戏原画/角色类/写实-贞德.jpg", category: "角色类", style: "写实", title: "写实-贞德" },
  { path: "游戏原画/角色类/写实-赛博黑天使.jpg", category: "角色类", style: "写实", title: "写实-赛博黑天使" },
  { path: "游戏原画/角色类/写实-食人花女王.jpg", category: "角色类", style: "写实", title: "写实-食人花女王" },
  { path: "游戏原画/角色类/半写实-DOTA2 鱼人火海哨卫.JPG", category: "角色类", style: "半写实", title: "半写实-DOTA2 鱼人火海哨卫" },
  { path: "游戏原画/角色类/半写实-MOBA人设1.jpg", category: "角色类", style: "半写实", title: "半写实-MOBA人设1" },
  { path: "游戏原画/角色类/半写实-MOBA人设2.jpg", category: "角色类", style: "半写实", title: "半写实-MOBA人设2" },
  { path: "游戏原画/角色类/半写实-拿破仑.jpg", category: "角色类", style: "半写实", title: "半写实-拿破仑" },
  { path: "游戏原画/角色类/半写实-新年卡牌.jpg", category: "角色类", style: "半写实", title: "半写实-新年卡牌" },
  { path: "游戏原画/角色类/半写实-活动宣传图.jpg", category: "角色类", style: "半写实", title: "半写实-活动宣传图" },
  { path: "游戏原画/角色类/卡通-lowpoly角色.jpg", category: "角色类", style: "卡通", title: "卡通-lowpoly角色" },
  { path: "游戏原画/角色类/卡通-SLG人物1.jpg", category: "角色类", style: "卡通", title: "卡通-SLG人物1" },
  { path: "游戏原画/角色类/卡通-SLG人物2.jpg", category: "角色类", style: "卡通", title: "卡通-SLG人物2" },
  { path: "游戏原画/角色类/卡通-人物设定.jpg", category: "角色类", style: "卡通", title: "卡通-人物设定" },
  { path: "游戏原画/角色类/卡通-小鸡角色设定.jpg", category: "角色类", style: "卡通", title: "卡通-小鸡角色设定" },
  { path: "游戏原画/角色类/卡通-科幻角色.jpg", category: "角色类", style: "卡通", title: "卡通-科幻角色" },
  { path: "游戏原画/角色类/卡通-维京战士.jpg", category: "角色类", style: "卡通", title: "卡通-维京战士" },
  { path: "游戏原画/角色类/卡通-角色合集.jpg", category: "角色类", style: "卡通", title: "卡通-角色合集" },
  { path: "游戏原画/角色类/卡通-角色方仔.jpg", category: "角色类", style: "卡通", title: "卡通-角色方仔" },
  { path: "游戏原画/角色类/卡通-魔幻2角色.jpg", category: "角色类", style: "卡通", title: "卡通-魔幻2角色" },
  { path: "游戏原画/角色类/卡通-鱼类合集.jpg", category: "角色类", style: "卡通", title: "卡通-鱼类合集" }
];

const FEATURED_GAME = [
  "游戏原画/场景类/卡通-蘑菇密林.jpg",
  "游戏原画/角色类/写实-精灵王美宣.jpg",
  "游戏原画/角色类/卡通-SLG人物2.jpg",
  "游戏原画/角色类/卡通-小鸡角色设定.jpg",
  "游戏原画/场景类/卡通-休闲合集2.jpg",
  "游戏原画/角色类/写实-科幻 修理机器人.jpg"
];

const VISUAL_WORKS = [
  {
    path: "设计稿/最终确定版.png",
    title: "APP 首页视觉",
    tag: "界面设计"
  },
  {
    path: "设计稿/登录.png",
    title: "登录",
    tag: "功能模块界面"
  },
  {
    path: "设计稿/编辑商品.png",
    title: "编辑商品",
    tag: "功能模块界面"
  },
  {
    path: "设计稿/C+D.png",
    title: "邀同行入驻赢奖励",
    tag: "运营活动页"
  },
  {
    path: "设计稿/C+D2.png",
    title: "优惠券活动",
    tag: "运营活动页"
  },
  {
    path: "设计稿/iPhone 13 & 14 - 1.png",
    title: "剑琅联盟",
    tag: "品牌 IP 设计"
  }
];

const FEATURED_VISUAL = [
  "设计稿/最终确定版.png",
  "设计稿/登录.png",
  "设计稿/C+D.png",
  "设计稿/iPhone 13 & 14 - 1.png"
];

const FIGMA_URL = "https://www.figma.com/design/3wJ8PuZfs3uPjzxIvgBjDK/%F0%9F%8E%89Dean-work?node-id=2-6981&t=JciHF4xSI1y4MYgc-1";
