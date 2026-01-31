// src/data.js

export const RUNES = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚻ", "ᛁ", "ᛃ", "ᛄ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛋ", "ᛏ", "ᛐ", "ᛒ", "ᛖ", "ᛗ", "ᛚ"];

export const SECTIONS = [
  { id: 'intro', title: '塔罗概论', subtitle: 'Structure of Mysticism' },
  { id: 'basics', title: '基础概念', subtitle: 'Principles of Energy' },
  { id: 'spreads', title: '牌阵速查', subtitle: 'The Spreads of Fate' },
  { id: 'symbols', title: '意象速查', subtitle: 'Visual Vocabulary' },
  { id: 'deck', title: '塔罗牌', subtitle: 'The Immersive Deck', special: true }
];

// 大阿尔卡纳 (22张)
export const MAJOR_ARCANA_DATA = [
  { id: 0, name: "0 愚人 (The Fool)", archetype: "自由的灵魂", symbols: "悬崖(无畏)、白狗(本能)、行囊(放下过往)、白玫瑰(纯洁)" },
  { id: 1, name: "I 魔术师 (The Magician)", archetype: "意识的显化者", symbols: "手指天地(连接)、四元素(工具)、无限符号(精神无穷)" },
  { id: 2, name: "II 女祭司 (The High Priestess)", archetype: "潜意识的守护者", symbols: "黑白柱(二元平衡)、帷幕(遮挡潜意识)、卷轴(真理)" },
  { id: 3, name: "III 皇后 (The Empress)", archetype: "大地之母", symbols: "麦田(富饶)、瀑布(流动)、金星(爱与美)" },
  { id: 4, name: "IV 皇帝 (The Emperor)", archetype: "世俗的统治者", symbols: "石座(冷峻)、羊头(开创)、安卡十字(生命/权力)" },
  { id: 5, name: "V 教皇 (The Hierophant)", archetype: "精神导师", symbols: "三重冠(身心灵)、钥匙(开启真理)、信徒(传承)" },
  { id: 6, name: "VI 恋人 (The Lovers)", archetype: "结合与抉择", symbols: "天使(祝福)、亚当夏娃(意识/潜意识)、蛇(智慧/欲望)" },
  { id: 7, name: "VII 战车 (The Chariot)", archetype: "意志的凯旋", symbols: "黑白斯芬克斯(对立力量)、无缰绳(意志控制)、战车(物质成功)" },
  { id: 8, name: "VIII 力量 (Strength)", archetype: "温柔的驯服", symbols: "抚摸狮子(以柔克刚)、无限符号(无穷力量)" },
  { id: 9, name: "IX 隐士 (The Hermit)", archetype: "孤独的求道者", symbols: "灯笼(内在之光)、雪山(精神高度)、低头(内观)" },
  { id: 10, name: "X 命运之轮 (Wheel of Fortune)", archetype: "业力循环", symbols: "轮子(无常)、四活物(寻找真理)、斯芬克斯(平衡)" },
  { id: 11, name: "XI 正义 (Justice)", archetype: "因果法则", symbols: "天平(平衡)、宝剑(决断)、紫色帷幕(冷峻)" },
  { id: 12, name: "XII 倒吊人 (The Hanged Man)", archetype: "视角的转换", symbols: "倒挂(颠倒世界)、光环(觉悟)、T型树(生长)" },
  { id: 13, name: "XIII 死神 (Death)", archetype: "转化与重生", symbols: "白骨(平等)、日出(新生)、白花(纯真)" },
  { id: 14, name: "XIV 节制 (Temperance)", archetype: "灵魂炼金", symbols: "倒水(能量对流)、单脚入水(连接精神现实)" },
  { id: 15, name: "XV 恶魔 (The Devil)", archetype: "物质囚徒", symbols: "倒五芒星(欲望)、松垮锁链(自愿束缚)" },
  { id: 16, name: "XVI 高塔 (The Tower)", archetype: "虚妄粉碎", symbols: "闪电(神启)、坠落(傲慢破碎)、火花(启示)" },
  { id: 17, name: "XVII 星星 (The Star)", archetype: "宁静指引", symbols: "裸体(本我)、倒水(滋养)、八角星(宇宙指引)" },
  { id: 18, name: "XVIII 月亮 (The Moon)", archetype: "潜意识恐惧", symbols: "龙虾(深层恐惧)、狼狗(野性驯化)、双塔(未知)" },
  { id: 19, name: "XIX 太阳 (The Sun)", archetype: "成功喜悦", symbols: "孩童(重生)、白马(生命力)、向日葵(丰盛)" },
  { id: 20, name: "XX 审判 (Judgment)", archetype: "最终感召", symbols: "号角(召唤)、复活(觉醒)、棺材(旧自我)" },
  { id: 21, name: "XXI 世界 (The World)", archetype: "圆满终章", symbols: "花环(结界)、舞者(整合)、四活物(完成)" },
];

// 小阿尔卡纳详细数据
const minorData = {
  'Wands_Ace': { archetype: "行动的火种", symbols: "发芽的权杖(生命力)、云中手(神赐机会)、远方城堡(野心)" },
  'Wands_2': { archetype: "高瞻远瞩", symbols: "地球仪(宏观规划)、城墙(安全区)、双杖(二选一的权衡)" },
  'Wands_3': { archetype: "探索与扩张", symbols: "眺望海面(等待时机)、背影(出发)、金红天空(黎明)" },
  'Wands_4': { archetype: "稳固的庆典", symbols: "花环(丰收)、欢庆人群(和谐)、城堡(家园)" },
  'Wands_5': { archetype: "良性竞争", symbols: "混乱打斗(冲突)、不同衣服(立场不同)、无伤亡(切磋)" },
  'Wands_6': { archetype: "凯旋归来", symbols: "桂冠(胜利)、骑马(荣耀)、随从(支持者)" },
  'Wands_7': { archetype: "以一敌百", symbols: "高地优势(防守)、不同的鞋(匆忙)、奋战(坚持)" },
  'Wands_8': { archetype: "极速变化", symbols: "飞行权杖(无阻碍)、无人物(纯粹能量)、旷野(自由)" },
  'Wands_9': { archetype: "备战状态", symbols: "绷带(旧伤)、栅栏(防御)、眼神警惕(守护)" },
  'Wands_10': { archetype: "重压与责任", symbols: "抱杖前行(负担)、看不见路(盲目)、远处房屋(终点)" },
  'Wands_Page': { archetype: "热情的信使", symbols: "仰视权杖(崇拜)、沙漠(火元素)、羽毛(风中之火)" },
  'Wands_Knight': { archetype: "冲动的冒险家", symbols: "奔马(行动力)、铠甲(战斗)、火蜥蜴(元素之灵)" },
  'Wands_Queen': { archetype: "魅力领袖", symbols: "黑猫(直觉)、向日葵(阳光)、狮子座图腾(自信)" },
  'Wands_King': { archetype: "开创性统帅", symbols: "火蜥蜴披风(成熟的火)、狮子座(权威)、权杖触地(落地执行)" },

  'Cups_Ace': { archetype: "情感的源头", symbols: "倒M(神恩)、鸽子(灵性)、溢出的水(情感充沛)" },
  'Cups_2': { archetype: "灵魂伴侣", symbols: "交换杯子(平等)、双蛇杖(治愈)、狮头(激情)" },
  'Cups_3': { archetype: "欢聚时刻", symbols: "举杯(庆祝)、丰收瓜果(成果)、不同衣色(多样性)" },
  'Cups_4': { archetype: "冷淡与内观", symbols: "云中杯(新机会)、盘腿(封闭)、忽视(倦怠)" },
  'Cups_5': { archetype: "悲伤与失落", symbols: "倒下的三个杯(失去)、站立的两个杯(希望)、黑桥(穿越悲伤)" },
  'Cups_6': { archetype: "怀旧与童真", symbols: "送花(单纯)、庭院(保护)、五角星花(过去的回忆)" },
  'Cups_7': { archetype: "迷幻的抉择", symbols: "云中七杯(幻象)、不同的礼物(欲望/恐惧)、黑影(迷惑)" },
  'Cups_8': { archetype: "寻找真理", symbols: "红衣(行动)、缺月(未圆满)、抛弃杯子(放下物质)" },
  'Cups_9': { archetype: "美梦成真", symbols: "整齐排列(展示)、双手抱臂(满意)、财主(富足)" },
  'Cups_10': { archetype: "家庭圆满", symbols: "彩虹(神圣祝福)、欢快家庭(和谐)、河流(情感长流)" },
  'Cups_Page': { archetype: "情感的学徒", symbols: "杯中鱼(灵感)、波浪衣(情绪化)、海边(潜意识)" },
  'Cups_Knight': { archetype: "浪漫的追求者", symbols: "白马(纯洁)、翅膀头盔(想象力)、渡河(深入情感)" },
  'Cups_Queen': { archetype: "敏锐的共情者", symbols: "封闭的杯(内敛)、贝壳王座(深海)、注视杯子(专注)" },
  'Cups_King': { archetype: "宽厚的情绪主宰", symbols: "海中王座(掌控潜意识)、海豚(灵性)、船只(商业与情感)" },

  'Swords_Ace': { archetype: "思想的利刃", symbols: "王冠(真理)、棕榈枝(胜利)、云中手(清晰思维)" },
  'Swords_2': { archetype: "僵局与防御", symbols: "蒙眼(逃避真相)、交叉剑(防卫)、静水(压抑情绪)" },
  'Swords_3': { archetype: "心碎与悲痛", symbols: "三剑穿心(背叛/痛苦)、雨云(悲伤)、孤立的心(受创)" },
  'Swords_4': { archetype: "休战与冥想", symbols: "教堂(庇护所)、躺平(休息)、悬挂之剑(危机暂缓)" },
  'Swords_5': { archetype: "空虚的胜利", symbols: "捡剑(不仅得利)、远去的背影(失败者)、冷笑(残酷)" },
  'Swords_6': { archetype: "疗愈之旅", symbols: "渡船(过渡)、插在船上的剑(带着包袱)、平静水面(逐渐好转)" },
  'Swords_7': { archetype: "策略与欺瞒", symbols: "偷剑(取巧)、留下的两把剑(非全胜)、回头看(心虚)" },
  'Swords_8': { archetype: "作茧自缚", symbols: "蒙眼绑手(自我限制)、泥泞(困境)、城堡(疏离)" },
  'Swords_9': { archetype: "梦魇与焦虑", symbols: "捂脸(崩溃)、挂在墙上的剑(精神压力)、黑夜(潜意识恐惧)" },
  'Swords_10': { archetype: "黎明前的黑暗", symbols: "十剑穿背(彻底失败)、远方曙光(新生)、红袍(痛苦)" },
  'Swords_Page': { archetype: "机警的侦查员", symbols: "举剑姿态(防备)、风吹发(敏捷)、崎岖地(挑战)" },
  'Swords_Knight': { archetype: "急躁的先锋", symbols: "冲锋(激进)、暴风(混乱)、无鞘之剑(直接)" },
  'Swords_Queen': { archetype: "冷若冰霜的智者", symbols: "侧脸(严厉)、举剑(裁决)、云中鸟(高维思想)" },
  'Swords_King': { archetype: "严肃的审判者", symbols: "直视前方(客观)、蝴蝶王座(蜕变)、手中的剑(权威)" },

  'Pentacles_Ace': { archetype: "物质的种子", symbols: "花园(繁荣)、云中手(机会)、金币(现实成果)" },
  'Pentacles_2': { archetype: "灵活的平衡", symbols: "无限符号(循环)、两币轮转(资金流)、波浪(起伏)" },
  'Pentacles_3': { archetype: "专业与合作", symbols: "教堂拱门(宏伟工程)、雕刻师(工匠精神)、设计图(规划)" },
  'Pentacles_4': { archetype: "守财与固执", symbols: "脚踩头顶手抱(占有欲)、背后城市(物质基础)、僵硬姿态(停滞)" },
  'Pentacles_5': { archetype: "贫穷与互助", symbols: "雪地(艰难)、拐杖(伤痛)、教堂亮窗(忽视的援助)" },
  'Pentacles_6': { archetype: "施舍与接受", symbols: "天平(公平)、施舍者(支配权)、跪求者(依赖)" },
  'Pentacles_7': { archetype: "耕耘与评估", symbols: "倚仗思考(复盘)、果实(半成品)、农田(耐心)" },
  'Pentacles_8': { archetype: "精益求精", symbols: "雕刻金币(重复劳动)、长椅(专注)、远处城镇(远离喧嚣)" },
  'Pentacles_9': { archetype: "优雅的富足", symbols: "猎鹰(可控的本能)、葡萄园(丰收)、蜗牛(安逸)" },
  'Pentacles_10': { archetype: "家族传承", symbols: "三代人(传承)、拱门(家业)、生命之树阵型(完美物质)" },
  'Pentacles_Page': { archetype: "踏实的学生", symbols: "举起金币(专注)、绿地(潜力)、静止(稳重)" },
  'Pentacles_Knight': { archetype: "稳健的耕耘者", symbols: "黑马(耐力)、停驻(审慎)、耕地(务实)" },
  'Pentacles_Queen': { archetype: "慷慨的滋养者", symbols: "兔子(多产)、抱币(关怀)、繁花(自然)" },
  'Pentacles_King': { archetype: "富有的实业家", symbols: "葡萄藤衣(丰盛)、城堡(成就)、脚踩公牛(掌控物质)" }
};

// 工具函数：生成完整的78张牌
export const getAllCards = () => {
    let deck = [...MAJOR_ARCANA_DATA];

    const suits = [
      { key: 'Wands', name: '权杖' },
      { key: 'Cups', name: '圣杯' },
      { key: 'Swords', name: '宝剑' },
      { key: 'Pentacles', name: '星币' }
    ];
    
    const order = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King'];
    const cnNums = ['Ace', '二', '三', '四', '五', '六', '七', '八', '九', '十', '侍从', '骑士', '王后', '国王'];

    suits.forEach(suit => {
      order.forEach((num, index) => {
        const id = `${suit.key}_${num}`;
        const data = minorData[id] || { archetype: "未知能量", symbols: "待补充" };
        deck.push({
          id: id,
          name: `${suit.name}${cnNums[index]}`,
          archetype: data.archetype,
          symbols: data.symbols
        });
      });
    });
    
    return deck;
};