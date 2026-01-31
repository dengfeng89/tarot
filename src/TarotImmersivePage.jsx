// src/TarotImmersivePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Search as SearchIcon, X, RotateCcw, Sparkles } from 'lucide-react';

// --- 常量定义 ---
const BASE_URL = "https://www.trustedtarot.com/img/cards/";
const MAJOR_NAMES = ["The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"];
const MAJOR_CN = ["愚者", "魔术师", "女祭司", "皇后", "皇帝", "教皇", "恋人", "战车", "力量", "隐士", "命运之轮", "正义", "倒吊人", "死神", "节制", "恶魔", "高塔", "星星", "月亮", "太阳", "审判", "世界"];
const SUITS = [{ en: "wands", cn: "权杖" }, { en: "cups", cn: "圣杯" }, { en: "swords", cn: "宝剑" }, { en: "pentacles", cn: "星币" }];

// --- 完整的含义数据库 ---
const fullMeanings = {
    // --- 大阿尔卡那 (Major Arcana) ---
    "The Fool": { k: "开始,自由,纯真,冒险", d: "愚者代表无限的可能性和新的开始。他站在悬崖边，象征着盲目的信仰和对未知的信任。这张牌鼓励你跟随内心，像孩子一样拥抱世界，哪怕前路未卜。" },
    "The Magician": { k: "创造力,意志,技能,显化", d: "魔术师象征着将梦想变为现实的能力。桌上的四要素（权杖、圣杯、宝剑、星币）代表你拥有所有需要的资源。现在是采取行动、利用你的技能去达成目标的时刻。" },
    "The High Priestess": { k: "直觉,潜意识,神秘,智慧", d: "女祭司守护着神秘的帷幕，代表内在的智慧和直觉。她建议你暂停行动，倾听内心的声音。有些答案不在外部世界，而在你的梦境和直觉之中。" },
    "The Empress": { k: "丰饶,母性,自然,感官", d: "皇后是自然之母，象征着生命力、创造力和感官享受。这张牌预示着富足和成长。它鼓励你通过艺术、自然或关爱他人来表达你的创造力。" },
    "The Emperor": { k: "权威,结构,稳固,父亲", d: "皇帝代表秩序、规则和世俗的权力。他建立结构以确保稳定。这张牌建议你运用逻辑和纪律来处理问题，或者在生活中扮演一个负责任的领导角色。" },
    "The Hierophant": { k: "传统,信仰,教导,从众", d: "教皇象征着既定的社会规范、传统和精神信仰。他通常代表老师或导师。这张牌建议你遵循经过验证的方法，寻求团体的智慧，而不是特立独行。" },
    "The Lovers": { k: "爱,和谐,选择,价值观", d: "恋人牌不仅代表浪漫关系，更象征着重要的抉择。你需要听从内心的真实渴望，在道德或人生道路上做出符合你价值观的选择。它也预示着人际关系的和谐。" },
    "The Chariot": { k: "胜利,意志力,自控,决心", d: "战车代表通过意志力克服障碍。驾驭黑白两只斯芬克斯象征着整合对立的力量。只要你保持专注和自律，无论困难多大，你都将取得胜利。" },
    "Strength": { k: "力量,勇气,耐心,同情", d: "真正的力量不是蛮力，而是内心的坚韧。如同女子温柔地抚摸狮子，你需要用耐心和爱去驯服内心的恐惧或外界的挑战。相信你内在的勇气。" },
    "The Hermit": { k: "内省,孤独,指引,探索", d: "隐士建议你暂时从喧嚣中撤退，向内寻找答案。这不仅是孤独，而是一段自我发现的旅程。点亮你心中的明灯，智慧往往在静默中显现。" },
    "Wheel of Fortune": { k: "命运,转折,周期,变化", d: "命运之轮提醒我们，生命是不断流转的循环。好运与挑战都是暂时的。这是一个转折点，预示着不可预见的变化。保持乐观，顺应宇宙的流动。" },
    "Justice": { k: "正义,公平,因果,真相", d: "正义牌代表真理和因果法则。你的行为决定了你的结果。如果你面临决策或法律事务，请保持客观和诚实。所有的行动最终都会得到公正的裁决。" },
    "The Hanged Man": { k: "牺牲,新视角,暂停,等待", d: "倒吊人代表一种自愿的停顿。有时为了获得更高的智慧，你需要做出某种牺牲或改变看待世界的角度。放下控制，换个角度，你会看到不同的风景。" },
    "Death": { k: "结束,转变,重生,放手", d: "死神很少代表肉体死亡，它象征着旧事物的终结和新事物的开始。彻底的改变是不可避免的。放手那些不再服务于你的东西，为重生腾出空间。" },
    "Temperance": { k: "平衡,节制,耐心,融合", d: "节制牌关于寻找中庸之道。天使将水在两个杯子间倒流，象征着情感与理智的调和。你需要保持耐心，避免极端，通过融合不同的力量来创造和谐。" },
    "The Devil": { k: "束缚,诱惑,物质,执念", d: "恶魔代表我们对物质世界的执着和内心的阴影。你可能感到被某种习惯或关系束缚，但链条往往是松的。正视你的欲望和恐惧，你有能力选择自由。" },
    "The Tower": { k: "突变,觉醒,毁灭,启示", d: "高塔象征着突然且剧烈的改变。建立在虚假基础上的结构将会崩塌。虽然过程痛苦，但这打破了幻象，让你看清真相，为建立更真实的生活扫清障碍。" },
    "The Star": { k: "希望,灵感,宁静,治愈", d: "在高塔的毁灭之后，星星带来了希望和治愈。这是一张充满灵性的牌，预示着平静和更新。相信宇宙，保持乐观，你的愿望正在被倾听。" },
    "The Moon": { k: "幻觉,恐惧,潜意识,不安", d: "月亮代表模糊不清和潜意识的恐惧。事情可能不像表面看起来那样。你需要依靠直觉穿透迷雾，面对内心的不安，小心欺骗或自我欺骗。" },
    "The Sun": { k: "快乐,成功,活力,真相", d: "太阳是塔罗中最积极的牌之一。它象征着纯粹的喜悦、成功和清晰。阴霾散去，万物生长。展现你的真实自我，享受当下的幸福与活力。" },
    "Judgement": { k: "审判,觉醒,重生,召唤", d: "审判牌代表一个重要的转折或召唤。你正在评估过去的经历，准备迈向生命的新阶段。这是一个宽恕自己、响应内心召唤、彻底重生的时刻。" },
    "The World": { k: "完成,圆满,整合,成就", d: "世界牌象征着旅程的圆满结束。你已经达成了目标，获得了智慧和整合。这是一个庆祝的时刻，也是新循环开始前的完美句点。" },
    
    // --- 权杖 (Wands) ---
    "Ace of Wands": { k: "灵感,新机会,热情,行动", d: "权杖首领象征着纯粹的火能量。一个新的创意、项目或机会正在萌芽。抓住这股热情，大胆开始你的行动。这是创造力的源头。" },
    "Two of Wands": { k: "规划,决定,展望,发现", d: "你正站在城堡上俯瞰世界，权杖二代表着制定长远计划和做出决定的时刻。你已经有了初步的成功，现在需要决定下一步的方向。" },
    "Three of Wands": { k: "扩张,远见,合作,旅行", d: "你的船只即将起航或归来。权杖三预示着扩展和探索。你的努力开始显现成果，是时候展望更广阔的未来了。" },
    "Four of Wands": { k: "庆祝,和谐,归家,稳定", d: "权杖四是一张关于庆祝和安定的牌。它通常代表婚礼、家庭聚会或阶段性的成功。享受当下的和谐与快乐，为下一阶段充电。" },
    "Five of Wands": { k: "竞争,冲突,挑战,分歧", d: "这不仅仅是冲突，更像是一场混战或激烈的竞争。虽然混乱，但这也能激发你的斗志。不要回避挑战，在良性竞争中证明自己。" },
    "Six of Wands": { k: "胜利,认可,自信,荣耀", d: "凯旋而归！权杖六预示着公众的认可和成功。你的努力被看见了，享受这份荣耀，但也别忘了保持谦逊，继续前行。" },
    "Seven of Wands": { k: "防御,坚持,勇气,立场", d: "你处于优势地位，但面临挑战。权杖七鼓励你坚守立场，即使面对众多的反对意见，也要勇敢捍卫自己的信念。" },
    "Eight of Wands": { k: "速度,行动,消息,旅行", d: "事情正在飞速发展。权杖八代表着快速的行动和即将到来的消息。不要犹豫，顺势而为，抓住稍纵即逝的机会。" },
    "Nine of Wands": { k: "韧性,防御,坚持,警惕", d: "你已经伤痕累累，但仍未倒下。权杖九提醒你，虽然疲惫，但你拥有足够的韧性去守住最后的防线。坚持住，黎明将至。" },
    "Ten of Wands": { k: "负担,责任,压力,完成", d: "你背负了太多的责任。权杖十表明你正处于压力的极限。虽然目标在望，但也许是时候学会放手或寻求帮助了。" },
    "Page of Wands": { k: "探索,兴奋,新消息,好奇", d: "像个充满好奇的孩子，权杖侍从带来了令人兴奋的消息或创意。保持开放的心态，去探索那些点燃你热情的新事物。" },
    "Knight of Wands": { k: "冲动,热情,行动,冒险", d: "权杖骑士充满了行动力，但也可能鲁莽。他建议你大胆追求目标，但也要注意不要因为冲动而烧毁了桥梁。" },
    "Queen of Wands": { k: "自信,独立,魅力,活力", d: "权杖王后是社交场上的明星。她自信、温暖且充满活力。像她一样，相信自己的魅力，用你的热情去感染周围的人。" },
    "King of Wands": { k: "领导力,远见,荣耀,创业", d: "权杖国王是天生的领袖。他不仅有远见，还有实现目标的行动力。这是一个发挥领导才能，带领团队走向成功的时刻。" },

    // --- 圣杯 (Cups) ---
    "Ace of Cups": { k: "爱,新情感,直觉,同情", d: "圣杯首领是情感的源泉。它预示着一段新关系的开始，或是情感上的满溢。敞开心扉，接受爱的流动，信任你的直觉。" },
    "Two of Cups": { k: "结合,伙伴,吸引,和谐", d: "两个人举杯共饮，象征着平等的伙伴关系或恋情。这是一张关于互相吸引、理解和和谐结合的牌。情感的连接正在加深。" },
    "Three of Cups": { k: "友谊,聚会,快乐,团体", d: "三个女子举杯庆祝。圣杯三代表着友谊、团体聚会和分享快乐。与朋友共度美好时光，庆祝生活中的小确幸。" },
    "Four of Cups": { k: "冷漠,沉思,错失,厌倦", d: "你专注于眼前的失落，却忽视了递给你的第四个杯子。圣杯四提醒你不要因为消极情绪或自我封闭而错过了身边的新机会。" },
    "Five of Cups": { k: "悲伤,失落,遗憾,哀悼", d: "看着倒翻的杯子悲伤，却忘了身后还有两个立着的。圣杯五关于哀悼失去的，但也提醒你关注那些仍然留存的美好。" },
    "Six of Cups": { k: "回忆,怀旧,纯真,过去", d: "圣杯六带你回到过去。它象征着童年的回忆、旧友的重逢或纯真的快乐。从过去中汲取温暖，但不要沉溺其中而忘记当下。" },
    "Seven of Cups": { k: "幻想,选择,迷茫,诱惑", d: "面对云中的七个杯子，每个都充满诱惑。圣杯七关于白日梦和选择。小心不要被幻象迷惑，脚踏实地，分清现实与幻想。" },
    "Eight of Cups": { k: "寻找,放弃,离开,追寻", d: "为了寻找更高的追求，你选择离开现有的情感满足。圣杯八代表着一种精神上的追寻，即使这意味着放弃安逸，走向未知。" },
    "Nine of Cups": { k: "愿望成真,满足,快乐,享受", d: "这是一张“许愿牌”。圣杯九预示着情感上的极大满足和愿望的实现。享受这当下的幸福、舒适和成就感。" },
    "Ten of Cups": { k: "幸福,家庭,圆满,和谐", d: "彩虹下的幸福家庭。圣杯十代表着情感关系的终极圆满。家庭和谐，内心平静，这就是你一直在寻找的幸福归宿。" },
    "Page of Cups": { k: "消息,直觉,创意,敏感", d: "圣杯侍从是一个敏感的梦想家。他带来情感方面的消息或直觉的启示。保持一颗温柔的心，倾听你内心的声音。" },
    "Knight of Cups": { k: "浪漫,追求,理想,诱惑", d: "圣杯骑士是浪漫的追求者。他听从内心的召唤，追求理想中的爱情或美。让情感引领你的行动，但也要保持一点现实感。" },
    "Queen of Cups": { k: "同情,关怀,直觉,疗愈", d: "圣杯王后是情感的疗愈者。她富有同情心，直觉敏锐。像她一样，用爱和包容去关怀他人，同时也照顾好自己的情绪。" },
    "King of Cups": { k: "情绪平衡,宽容,外交,成熟", d: "圣杯国王掌控着情绪的海洋。他象征着情感上的成熟和平衡。在处理人际关系时，保持宽容和理智，成为他人的依靠。" },

    // --- 宝剑 (Swords) ---
    "Ace of Swords": { k: "清晰,真相,新思想,突破", d: "宝剑首领象征着思想的突破。你将获得清晰的洞察力或一个新的想法。用理性的利剑斩断迷雾，看清真相，抓住重点。" },
    "Two of Swords": { k: "僵局,逃避,抉择,平衡", d: "蒙着眼睛，手持双剑。宝剑二代表着一种僵局或对真相的逃避。你需要摘下眼罩，勇敢地做出那个艰难的决定，打破平衡。" },
    "Three of Swords": { k: "心碎,悲伤,痛苦,分离", d: "三把剑刺穿心脏。这是一张关于情感痛苦和悲伤的牌。接受这份痛苦，它是疗愈过程的一部分。风雨过后，总会天晴。" },
    "Four of Swords": { k: "休息,恢复,沉思,撤退", d: "在激烈的战斗后，你需要休息。宝剑四建议你暂时撤退，进行冥想和恢复。这不是放弃，而是为了走更远的路而充电。" },
    "Five of Swords": { k: "失败,争吵,空虚,背叛", d: "你可能赢得了一场争吵，但输掉了关系。宝剑五提醒你，有些胜利是不值得的。放下骄傲，从无谓的冲突中抽身。" },
    "Six of Swords": { k: "过渡,离开,平静,恢复", d: "乘船离开汹涌的水域。宝剑六代表着从困难中慢慢恢复，或者是一次物理/心理上的移动。虽然带着淡淡的忧伤，但你在向更好的地方前进。" },
    "Seven of Swords": { k: "欺骗,策略,隐藏,逃避", d: "偷偷带走宝剑。这张牌可能暗示着欺骗或不诚实的行为。或者，它建议你需要运用策略和智慧，而不是正面硬刚来解决问题。" },
    "Eight of Swords": { k: "受困,自我设限,无助,焦虑", d: "被束缚和蒙蔽。宝剑八通常代表着心理上的自我设限。你觉得无路可走，但其实束缚是松的。改变你的思维，你就能重获自由。" },
    "Nine of Swords": { k: "焦虑,噩梦,绝望,压力", d: "深夜的惊醒。宝剑九关于内心的恐惧和焦虑。很多时候，事情并没有你想象的那么糟。面对你的恐惧，寻求帮助，不要独自承受。" },
    "Ten of Swords": { k: "痛苦结束,背叛,谷底,重生", d: "被十把剑刺中，看似绝望，但这代表着最黑暗时刻的结束。最坏的已经过去了，接下来只能是向上。这是一种彻底的解脱和重生的前奏。" },
    "Page of Swords": { k: "好奇,警惕,新想法,观察", d: "宝剑侍从像个机敏的侦探。他充满好奇，思维敏捷。这是一个学习新事物、收集信息或警惕周围环境的时刻。" },
    "Knight of Swords": { k: "急躁,直接,野心,冲动", d: "宝剑骑士行动迅速，直言不讳。他充满野心，但也容易冲动。利用你的敏捷思维，但也要注意言辞不要伤人。" },
    "Queen of Swords": { k: "独立,理智,洞察,清晰", d: "宝剑王后是智慧的化身。她经历了痛苦，因此变得独立且理智。用清晰的逻辑去分析问题，不要被情绪左右。" },
    "King of Swords": { k: "权威,真理,公正,逻辑", d: "宝剑国王是公正的裁判。他依靠逻辑和原则行事。在做决定时，保持客观、公正，用智慧和真理来领导。" },

    // --- 星币 (Pentacles) ---
    "Ace of Pentacles": { k: "新机会,繁荣,稳定,现实", d: "星币首领是物质显化的种子。一个新的工作机会、财务收益或健康的开始正在向你走来。抓住这个机会，种下希望的种子。" },
    "Two of Pentacles": { k: "平衡,适应,多重任务,流动", d: "在波涛中杂耍两个星币。星币二提醒你在繁忙的生活中保持平衡。你需要灵活适应变化，管理好你的时间和资源。" },
    "Three of Pentacles": { k: "团队,技能,合作,学习", d: "工匠在教堂里工作。星币三是关于专业技能和团队合作的牌。你的才能正在被认可，与他人合作将带来更大的成就。" },
    "Four of Pentacles": { k: "守财,控制,安全感,固执", d: "紧紧抱住星币。你可能过于执着于物质安全感，或者不愿意放手。虽然储蓄是好的，但也要学会慷慨和流动，不要让占有欲束缚了你。" },
    "Five of Pentacles": { k: "贫穷,孤立,困难,求助", d: "在雪地里艰难前行。星币五代表着财务或情感上的困难时刻。但请注意，教堂的窗户透着光，帮助其实就在附近，只要你愿意寻求。" },
    "Six of Pentacles": { k: "给予,接受,慷慨,慈善", d: "手持天平分发钱币。星币六关于给予和接受的平衡。如果你有能力，请慷慨解囊；如果你需要帮助，也请坦然接受。" },
    "Seven of Pentacles": { k: "耐心,评估,收获,等待", d: "看着作物生长。星币七是关于耐心和评估的时刻。你已经付出了努力，现在是停下来看看成果，思考下一步方向的时候了。" },
    "Eight of Pentacles": { k: "勤奋,专注,工艺,细节", d: "专心致志地雕刻星币。这张牌代表着通过勤奋工作和学习技能来获得成功。享受工作的过程，精益求精。" },
    "Nine of Pentacles": { k: "富足,独立,享受,自信", d: "独自在花园中享受富足。星币九代表着通过努力获得的独立和舒适生活。享受你的劳动成果，宠爱自己，你值得拥有。" },
    "Ten of Pentacles": { k: "财富,传承,家庭,稳固", d: "富足的家庭场景。星币十不仅仅是金钱，更代表着长久的繁荣、家族的传承和稳固的基础。这是一张物质和情感双重圆满的牌。" },
    "Page of Pentacles": { k: "勤学,务实,新计划,机会", d: "星币侍从是一个踏实的学生。他专注于现实的目标，渴望学习新技能。这是一个开始新计划或投资自我的好时机。" },
    "Knight of Pentacles": { k: "勤奋,可靠,坚持,常规", d: "星币骑士也许不快，但他绝对可靠。他代表着通过坚持不懈的努力和常规的工作来实现目标。稳扎稳打，你终将到达终点。" },
    "Queen of Pentacles": { k: "滋养,富足,实际,照顾", d: "星币王后是家庭和事业的完美管理者。她务实、温暖且慷慨。像她一样，照顾好自己和他人，创造一个舒适安全的环境。" },
    "King of Pentacles": { k: "成功,丰富,可靠,企业", d: "星币国王是物质世界的统治者。他通过努力获得了巨大的财富和地位。这张牌象征着商业上的成功和财务的稳定。" }
};

// --- 新增：智能获取含义函数 ---
const getMeaning = (name, enName) => {
    // 1. 尝试直接匹配 (如 "The Fool")
    if (fullMeanings[enName]) return fullMeanings[enName];

    // 2. 尝试处理大小写 (如 "Ace of wands" -> "Ace of Wands")
    // 分割单词
    const parts = enName.split(' ');
    if (parts.length >= 3) {
        // 将最后一个词 (suit) 首字母大写
        const lastIndex = parts.length - 1;
        parts[lastIndex] = parts[lastIndex].charAt(0).toUpperCase() + parts[lastIndex].slice(1);
        const titleCaseName = parts.join(' ');
        if (fullMeanings[titleCaseName]) return fullMeanings[titleCaseName];
    }
    
    // 3. 兜底
    return {
        k: "能量 · 指引 · 命运", 
        d: `这是塔罗牌中的 "${name}" (${enName})。它代表了独特的能量流动。在实际的占卜中，请结合此时此刻的直觉进行解读。`
    };
};

const TarotImmersivePage = ({ onExit }) => {
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailCard, setDetailCard] = useState(null); 
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 记录当前已经“揭开”（翻到正面）的卡牌ID
  const [revealedId, setRevealedId] = useState(null); 

  const carouselRef = useRef(null);
  const searchInputRef = useRef(null);

  // --- 初始化牌组 ---
  useEffect(() => {
    let newDeck = [];
    const overrides = { "The Hierophant": "the-heirophant" };

    MAJOR_NAMES.forEach((name, i) => {
      const fileName = overrides[name] || name.toLowerCase().replace(/ /g, "-");
      newDeck.push({
        id: `major-${i}`,
        name: MAJOR_CN[i],
        enName: name,
        img: `${BASE_URL}${fileName}.png`,
        desc: getMeaning(MAJOR_CN[i], name)
      });
    });

// --- 找到 useEffect 里的这段代码进行替换 ---

    // 小阿卡纳
    const numWords = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    
    // 辅助函数：首字母大写 (four -> Four)
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    SUITS.forEach(suit => {
      for(let i = 1; i <= 10; i++) {
        const valWord = numWords[i - 1]; // 获取单词 (例如 "four")
        const cardName = `${suit.cn}${i === 1 ? '首领' : i}`;
        
        // 【关键修改】：这里不再用数字 i，而是用单词 rankWord
        // 这样生成的 enName 就是 "Four of Wands" 而不是 "4 of Wands"
        const rankWord = capitalize(valWord); // "four" -> "Four"
        const suitWord = capitalize(suit.en); // "wands" -> "Wands"
        const enNameForLookup = `${rankWord} of ${suitWord}`;

        newDeck.push({
          id: `${suit.en}-${i}`,
          name: cardName,
          enName: enNameForLookup, // 存入正确的英文名
          img: `${BASE_URL}${valWord}-of-${suit.en}.png`,
          desc: getMeaning(cardName, enNameForLookup) // 这样就能匹配到 fullMeanings 了！
        });
      }
      
      // ... 宫廷牌部分保持不变 ...
      ['Page', 'Knight', 'Queen', 'King'].forEach(role => {
        const roleCN = role === 'Page' ? '侍从' : (role === 'Knight' ? '骑士' : (role === 'Queen' ? '王后' : '国王'));
        const cardName = `${suit.cn}${roleCN}`;
        newDeck.push({
          id: `${suit.en}-${role}`,
          name: cardName,
          enName: `${role} of ${suit.en}`,
          img: `${BASE_URL}${role.toLowerCase()}-of-${suit.en}.png`,
          desc: getMeaning(cardName, `${role} of ${suit.en}`)
        });
      });
    });
    setDeck(newDeck);
  }, []);

  // --- 自动揭牌逻辑 (Auto Reveal) ---
  useEffect(() => {
    if (deck.length === 0) return;

    // 1. 刚滑过来时，先重置为“未揭开”状态 (即显示背面)
    setRevealedId(null);

    // 2. 延迟 800ms 后，自动翻转到正面
    const timer = setTimeout(() => {
      const currentCard = deck[currentIndex];
      if (currentCard) {
        setRevealedId(currentCard.id);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentIndex, deck]);

  // --- 键盘事件 ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (detailCard) setDetailCard(null);
        else if (searchActive) setSearchActive(false);
        else onExit(); 
      }
      if (!detailCard && !searchActive) {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [detailCard, searchActive, currentIndex, deck]);

  const goNext = () => setCurrentIndex(prev => (prev + 1) % deck.length);
  const goPrev = () => setCurrentIndex(prev => (prev - 1 + deck.length) % deck.length);

  // --- 核心样式计算 ---
  const getCardStyle = (index) => {
    const total = deck.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    if (absDiff > 4) return { display: 'none' };

    const isMobile = window.innerWidth < 768;
    const x = diff * (isMobile ? 120 : 260);
    const z = absDiff * -480;
    const rotY = diff * -45;
    const scale = 1 - absDiff * 0.15;
    
    // 计算变换字符串
    const transformStr = `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`;

    return {
      '--current-transform': transformStr,
      transform: transformStr,             
      opacity: absDiff === 0 ? 1 : Math.pow(0.5, absDiff),
      zIndex: 100 - Math.round(absDiff * 10),
      pointerEvents: absDiff > 0 ? 'none' : 'auto',
    };
  };

  // 搜索过滤
  const searchResults = deck
    .map((card, idx) => ({ ...card, originalIndex: idx }))
    .filter(card => card.name.includes(searchQuery) || card.enName.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 8);

  return (
    
    <div className="fixed inset-0 bg-[#020408] text-white overflow-y-auto overflow-x-hidden font-serif select-none z-50">
      
      {/* 样式注入 */}
      <style>{`
        @keyframes activeFloat {
            0%, 100% { transform: var(--current-transform) translateY(0px); }
            50% { transform: var(--current-transform) translateY(-12px); }
        }
        @keyframes overlayFadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
        }
        
        /* 容器样式 */
        .card-wrapper {
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        
        /* 激活状态的呼吸动画 */
        .card-active {
            animation: activeFloat 5s ease-in-out infinite;
            z-index: 100 !important;
        }

        /* 内部翻转容器 */
        .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
        }

        /* 正面和背面公共样式 */
        .card-front, .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 0.75rem; 
            overflow: hidden;
            box-shadow: 0 0 15px rgba(0,0,0,0.5);
        }

        /* 正面样式 */
        .card-front {
            background-color: #0a0a0a;
            transform: rotateY(0deg); 
        }
        
        /* 选中时的光晕 (Front) */
        .card-active .card-front {
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.6), 0 0 50px rgba(139, 92, 246, 0.5);
            border: 2px solid #f9e2af;
        }

        /* 背面样式 (关键修复：确保有底色！) */
        .card-back {
            /* 1. 先设置一个实心底色 */
            background-color: #1a103c; 
            
            /* 2. 再叠加纹理，这样就不会透明了 */
            background-image: 
                radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 60%),
                repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 10px);
                
            transform: rotateY(180deg);
            border: 2px solid #d4af37;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .fade-in-overlay {
            background-color: #020408;
            animation: overlayFadeOut 1.5s ease-out forwards;
        }
      `}</style>

      {/* 进场遮罩层 */}
      <div className="absolute inset-0 z-[200] pointer-events-none fade-in-overlay"></div>

      {/* 动态背景 */}
      <div className={`absolute inset-0 transition-all duration-1000 ${detailCard ? 'blur-xl scale-95 opacity-50' : ''}`}
           style={{ background: 'radial-gradient(circle at center, #1a1635 0%, #020408 100%)' }}>
        
        {/* 顶部信息 */}
        <div className="absolute top-8 w-full text-center z-10 pointer-events-none opacity-80">
           <h1 className="text-xl md:text-2xl text-amber-500 tracking-[0.3em] uppercase mb-1 drop-shadow-lg font-bold">The Rider-Waite</h1>
           <p className="text-xs text-slate-400 tracking-[0.2em]">{currentIndex + 1} / {deck.length}</p>
        </div>

        {/* 搜索栏 */}
        <div className="absolute top-6 right-6 z-20 flex flex-col items-end">
          <div className={`flex items-center bg-white/5 backdrop-blur-md border border-amber-500/30 rounded-full transition-all duration-500 
                          ${searchActive ? 'w-64 md:w-80 px-4 justify-start' : 'w-10 h-10 md:w-12 md:h-12 justify-center'}`}>
            
            <button onClick={() => { setSearchActive(!searchActive); setTimeout(()=>searchInputRef.current?.focus(), 100); }} 
                    // 【关键修改1】按钮动态宽度：
                    // 展开时：w-6 h-6 (固定大小) + mr-2 (用右边距把输入框顶开)
                    // 收起时：w-full h-full (占满圆圈) -> 这样 flex items-center 才能让它完美居中
                    className={`flex items-center justify-center text-amber-500 hover:scale-110 transition-transform
                                ${searchActive ? 'w-6 h-6 mr-2' : 'w-full h-full'}`}>
               {searchActive ? <X size={20}/> : <SearchIcon size={20}/>}
            </button>
            
            <input 
              ref={searchInputRef}
              type="text" 
              // 【关键修改2】删除了这里的 ml-2 (原本在 text-white 后面)
              // 删掉它之后，收起状态下输入框就彻底不占位了，放大镜就能回到正中间
              className={`bg-transparent border-none outline-none text-white text-sm w-full transition-all duration-300
                          ${searchActive ? 'opacity-100 scale-100' : 'opacity-0 w-0 scale-0 pointer-events-none'}`}
              placeholder="搜索牌名..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* 下拉结果 (保持不变) */}
          {searchActive && searchQuery && (
             <div className="mt-2 w-64 bg-slate-900/90 backdrop-blur-xl border border-amber-500/20 rounded-lg overflow-hidden shadow-2xl animate-fadeIn">
                {searchResults.length > 0 ? searchResults.map(res => (
                  <div key={res.id} onClick={() => { setCurrentIndex(res.originalIndex); setSearchActive(false); }}
                       className="px-4 py-3 hover:bg-amber-500/20 cursor-pointer text-sm border-b border-white/5 last:border-0 flex justify-between items-center group">
                     <span>{res.name}</span><span className="text-xs text-slate-500 group-hover:text-amber-300">{res.enName}</span>
                  </div>
                )) : <div className="p-4 text-slate-500 text-sm text-center">未找到相关卡片</div>}
             </div>
          )}
        </div>
        {/* 3D 轮播核心 */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[2500px]" ref={carouselRef}>
          <div className="relative w-[300px] h-[520px] md:w-[320px] md:h-[560px] flex items-center justify-center" 
               style={{ transformStyle: 'preserve-3d' }}>
            {deck.map((card, index) => {
               const style = getCardStyle(index);
               if (style.display === 'none') return null;
               
               const isActive = index === currentIndex;
               const isRevealed = revealedId === card.id;
               
               return (
                 <div key={card.id}
                      className={`absolute w-full h-full rounded-xl transition-all duration-[1400ms] ease-out-cubic cursor-pointer card-wrapper
                                  ${isActive ? 'card-active' : 'brightness-[0.25] grayscale-[0.4]'}`}
                      style={style}
                      onClick={() => {
                          if (!isActive) {
                              setCurrentIndex(index);
                          } else if (isRevealed) {
                              setDetailCard(card);
                          }
                      }}
                  >
                    {/* 3D 翻转控制：isActive 且 isRevealed 时显示正面(0deg)，否则显示背面(180deg) */}
                    <div className="card-inner" 
                         style={{ transform: isActive && isRevealed ? 'rotateY(0deg)' : 'rotateY(180deg)' }}>
                        
                        {/* === 正面 (图片) === */}
                        <div className="card-front">
                            {/* Loading 占位 */}
                            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-amber-500/30 rounded-full border-t-amber-500 animate-spin"></div>
                            </div>
                            {/* 图片 */}
                            <img 
                              src={card.img} 
                              alt={card.name}
                              className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'grayscale-0 brightness-110 contrast-105' : 'grayscale'}`}
                              onError={(e) => { e.target.src = `https://picsum.photos/seed/${card.id}/300/520?grayscale&blur=2`; }}
                              draggable={false}
                            />
                            {/* 标题遮罩 */}
                            <div className={`absolute bottom-0 inset-x-0 p-6 pt-12 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-center transition-all duration-1000 delay-500 ease-out
                           ${isActive && isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                          <h2 className="text-2xl font-black tracking-widest bg-gradient-to-b from-white to-amber-500 bg-clip-text text-transparent drop-shadow-sm">{card.name}</h2>
                        </div>
                        </div>

                        {/* === 背面 (必须不透明) === */}
                        <div className="card-back">
                            {/* 装饰图标 */}
                            <div className="border border-amber-500/30 rounded w-[80%] h-[80%] flex items-center justify-center">
                                <div className="w-24 h-24 border-2 border-amber-500/50 rotate-45 flex items-center justify-center">
                                    <Sparkles className="text-amber-500 animate-pulse" size={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
               );
            })}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="absolute bottom-10 inset-x-0 flex justify-center gap-8 pointer-events-auto z-20">
          <button onClick={goPrev} className="w-16 h-16 rounded-full border border-amber-500/20 bg-white/5 hover:bg-amber-500 hover:text-black hover:scale-110 flex items-center justify-center backdrop-blur-md transition-all text-amber-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
             <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <button onClick={goNext} className="w-16 h-16 rounded-full border border-amber-500/20 bg-white/5 hover:bg-amber-500 hover:text-black hover:scale-110 flex items-center justify-center backdrop-blur-md transition-all text-amber-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
             <ArrowRight size={24} strokeWidth={2} />
          </button>
        </div>
      </div>

{/* 详情页 */}
      <div className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-500 ${detailCard ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         
         {/* 1. 背景遮罩：保留了单击关闭 (onClick)，符合大部分用户直觉。
            如果你想【禁止】点背景关闭，就把 onClick 那句删掉。
         */}
         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDetailCard(null)}></div>
         
         {detailCard && (
           <div 
                // ▼▼▼ 修改重点在这里 ▼▼▼
                // 1. onDoubleClick: 添加双击事件，双击整个内容区都能关闭
                // 2. touch-manipulation: 关键！禁用双击缩放，让双击响应更快
                // 3. cursor-pointer: 给个手势提示
                onDoubleClick={() => setDetailCard(null)}
                className="relative w-full h-full md:max-w-6xl md:h-[80vh] flex flex-col md:flex-row items-center justify-center p-6 gap-8 md:gap-16 touch-manipulation cursor-pointer"
            >
              
              {/* 图片区域：阻止单击冒泡，防止误触，但允许双击穿透给父级 */}
              <div className="relative w-[280px] h-[480px] md:w-[400px] md:h-[680px] flex-shrink-0 animate-fadeInUp" style={{animationDuration: '0.6s'}}>
                 <img src={detailCard.img} className="w-full h-full object-cover rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.3)] border-2 border-amber-500/50" />
              </div>

              {/* 文字区域 */}
              <div className="flex-1 max-w-xl text-left animate-fadeInUp select-none" style={{animationDuration: '0.8s', animationDelay: '0.1s'}}>
                 <h2 className="text-4xl md:text-6xl font-black text-amber-500 mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                   {detailCard.name}
                 </h2>
                 <p className="text-xl md:text-2xl text-slate-400 mb-8 font-light italic border-l-4 border-amber-500 pl-4">
                   {detailCard.enName}
                 </p>
                 <div className="space-y-6 text-slate-200 leading-relaxed text-lg">
                   <div>
                     <h4 className="text-amber-200 text-sm uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Archetype</h4>
                     <p>{detailCard.desc.k}</p>
                   </div>
                   <div>
                     <h4 className="text-amber-200 text-sm uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Interpretation</h4>
                     {/* 允许文字区域内部滚动，防止长文无法查看 */}
                     <p className="opacity-80 max-h-[200px] overflow-y-auto pr-2">{detailCard.desc.d}</p>
                   </div>
                 </div>
                 
                 {/* 底部提示：双击关闭 */}
                 <div className="mt-10 flex items-center gap-4">
                    <button onClick={(e) => { e.stopPropagation(); setDetailCard(null); }} 
                            className="px-8 py-3 rounded-full border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black transition-all flex items-center gap-2 group bg-black/50">
                        <RotateCcw size={18} className="group-hover:-rotate-90 transition-transform"/>
                        返回牌组
                    </button>
                    <p className="text-xs text-slate-500 animate-pulse hidden md:block">
                        (双击任意处关闭)
                    </p>
                 </div>
              </div>
           </div>
         )}
      </div>

      {!detailCard && !searchActive && (
        <button onClick={onExit} 
                className="absolute top-6 left-6 z-40 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors text-xs tracking-widest uppercase flex items-center gap-2">
           <ArrowLeft size={14}/> Exit Deck
        </button>
      )}
    </div>
  );
};

export default TarotImmersivePage;