// src/App.jsx
import React, { useState } from 'react';
import { 
  Star, Moon, Sun, Search, Layers, Lock, Unlock, 
  Sparkles, ArrowRight, Flame, Droplets, Mountain, Wind, 
  User, Anchor, Heart, Compass
} from 'lucide-react';
import { RUNES, SECTIONS, getAllCards } from './data';


// --- 【新增】在这里加上这两个新组件 ---
import StarfieldTransition from './StarfieldTransition';
import TarotImmersivePage from './TarotImmersivePage';


// 初始化所有卡牌数据
const ALL_CARDS = getAllCards();

// -----------------------------------------------------------------------------
// 组件：通用内容卡片
// -----------------------------------------------------------------------------
const ContentCard = ({ title, children, className = "" }) => (
  <div className={`bg-slate-900/60 border border-amber-500/20 p-6 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/40 transition-colors ${className}`}>
    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
      <Star size={40} />
    </div>
    <h3 className="text-xl text-amber-200 font-serif mb-4 border-b border-amber-500/20 pb-2 inline-block">{title}</h3>
    <div className="text-amber-100/80 leading-relaxed font-light">
      {children}
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// 组件：开场密码锁 (FateLock)
// -----------------------------------------------------------------------------
const FateLock = ({ onUnlock }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const startSpin = () => {
    if (isSpinning || isLocked) return;
    setIsSpinning(true);
    const randomSpins = 3 + Math.random() * 2; 
    setRotation(rotation + (360 * randomSpins));
    setTimeout(() => {
      setIsSpinning(false);
      setIsLocked(true);
      setTimeout(() => setShowButton(true), 500);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-amber-100 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0"></div>
      <div className={`z-10 mb-12 text-center transition-opacity duration-1000 ${isLocked ? 'opacity-50' : 'opacity-100'}`}>
        <h1 className="text-4xl md:text-6xl font-serif tracking-[0.2em] text-amber-200 mb-2">TAROT</h1>
        <p className="text-xs md:text-sm text-amber-500/80 tracking-widest uppercase">The Gateway to Wisdom</p>
      </div>
      <div className="relative z-10 w-80 h-80 md:w-96 md:h-96">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-20 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-amber-400"></div>
        </div>
        <div className="absolute inset-0 rounded-full border border-amber-500/20 scale-110"></div>
        <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/10 scale-125 animate-spin-slow"></div>
        <div className="absolute inset-0 rounded-full border-2 border-amber-600/40 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_50px_rgba(217,119,6,0.2)]"
          style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 2.5s cubic-bezier(0.15, 0.85, 0.35, 1.0)' }}>
          {RUNES.map((rune, i) => {
            const angle = (i / RUNES.length) * 360;
            return <div key={i} className="absolute text-amber-200/60 font-serif text-sm md:text-base select-none" style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-140px) rotate(90deg)` }}>{rune}</div>;
          })}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          {!isLocked ? (
             <button onClick={startSpin} disabled={isSpinning} className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-900 to-slate-900 border border-amber-500/50 text-amber-100 flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.1)] group">
               <Lock size={24} className={`mb-1 ${isSpinning ? 'animate-pulse' : ''}`} /><span className="text-[10px] tracking-widest uppercase">{isSpinning ? 'CALIBRATING' : 'START'}</span>
             </button>
          ) : (
            <div className={`transition-all duration-700 transform ${showButton ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
               <button onClick={onUnlock} className="w-24 h-24 rounded-full bg-amber-500 text-slate-950 flex flex-col items-center justify-center hover:bg-amber-400 hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all duration-300 animate-pulse-slow">
                <Unlock size={24} className="mb-1" /><span className="text-[10px] font-bold tracking-widest uppercase">ENTER</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 子页面组件
// -----------------------------------------------------------------------------

// 概论
const SectionIntro = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
    <div className="space-y-6">
      <div className="text-3xl md:text-5xl font-serif text-amber-100 mb-4 leading-tight">
        三位一体的<br/><span className="text-amber-500">玄学架构</span>
      </div>
      <p className="text-lg text-amber-100/70 leading-relaxed">
        西方的玄学底层架构源于<strong className="text-amber-200">卡巴拉 (生命之树理论)</strong>，这类似于东方的<em className="text-amber-200">皇极经世</em>与<em className="text-amber-200">太乙神术</em>，融合了丹道概念解释世界架构。
      </p>
      
      <div className="space-y-4">
        <div className="bg-slate-800/50 p-4 border-l-2 border-amber-500">
          <h4 className="text-amber-300 font-bold mb-1">生命之树 (Kabbalah)</h4>
          <p className="text-sm text-slate-400">对应世界的底层架构。是万物生成的蓝图。</p>
        </div>
        <div className="bg-slate-800/50 p-4 border-l-2 border-amber-500">
          <h4 className="text-amber-300 font-bold mb-1">星象学 (Astrology)</h4>
          <p className="text-sm text-slate-400">类似于紫微斗数。因生命之树诞生的星体世界，注重能量解说与感应。</p>
        </div>
        <div className="bg-slate-800/50 p-4 border-l-2 border-amber-500">
          <h4 className="text-amber-300 font-bold mb-1">塔罗牌 (Tarot)</h4>
          <p className="text-sm text-slate-400">西方的“卜”类，类似于梅花六爻。注重能量学说，用于算人的课题和当下事件的发生状态。</p>
        </div>
      </div>
    </div>

    <div className="relative h-full min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
         <div className="w-64 h-64 border border-amber-500 rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-48 h-48 border border-amber-500 rounded-full rotate-45"></div>
            <div className="w-32 h-32 border border-amber-500 rounded-full rotate-90"></div>
         </div>
      </div>
      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4">🌳</div>
        <div className="font-serif text-2xl text-amber-200">The Tree of Life</div>
        <div className="text-xs text-amber-500 tracking-[0.3em] mt-2">KABBALAH</div>
      </div>
    </div>
  </div>
);

// 基础概念
const SectionBasics = () => (
  <div className="space-y-8 animate-fadeIn">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-serif text-amber-100">塔罗符号能量学</h2>
      <p className="text-slate-400 mt-2">理解符号的意义和能量，是掌握技术的关键</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ContentCard title="1. 牌组结构 (Structure)">
        <ul className="space-y-4">
          <li>
            <strong className="text-amber-400 block mb-1">大阿尔卡纳 (Major Arcana)</strong>
            <span className="text-sm text-slate-300">
              <span className="text-amber-500">“天垂象”</span>。象征柏拉图的“理型”与宏观宿命。探讨“我是谁”、“我为何而来”。是灵魂的原型与天命。
            </span>
          </li>
          <li>
            <strong className="text-slate-300 block mb-1">小阿尔卡纳 (Minor Arcana)</strong>
            <span className="text-sm text-slate-400">
              <span className="text-slate-200">“人间戏”</span>。负责将宏大能量具象化，编织现实的悲欢离合。侧重“感应”与流变。
            </span>
          </li>
        </ul>
      </ContentCard>

      <ContentCard title="2. 四元素 (The Four Elements)">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-slate-800/50 rounded border border-amber-500/10">
            <div className="flex items-center gap-2 mb-2 text-red-400"><Flame size={16}/> <span>火 (权杖)</span></div>
            <p className="text-xs opacity-70">意志的燃烧。生命最原始的冲动。</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded border border-amber-500/10">
            <div className="flex items-center gap-2 mb-2 text-blue-400"><Droplets size={16}/> <span>水 (圣杯)</span></div>
            <p className="text-xs opacity-70">灵魂的流动。潜意识、情感、爱与慈悲。</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded border border-amber-500/10">
            <div className="flex items-center gap-2 mb-2 text-yellow-200"><Wind size={16}/> <span>风 (宝剑)</span></div>
            <p className="text-xs opacity-70">理性的切割。思想、真理、沟通。</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded border border-amber-500/10">
            <div className="flex items-center gap-2 mb-2 text-green-400"><Mountain size={16}/> <span>土 (星币)</span></div>
            <p className="text-xs opacity-70">物质的凝结。现实成果、财富、安全感。</p>
          </div>
        </div>
      </ContentCard>

      <ContentCard title="3. 数字能量 (Numbers)">
        <p className="mb-3">数字不是线性计数，而是<span className="text-amber-400">意识的螺旋进化</span>。</p>
        <div className="flex justify-between items-end text-sm h-16 relative">
           <div className="flex flex-col items-center"><span className="text-xl font-bold text-amber-200">1</span><span className="text-[10px]">太一</span></div>
           <ArrowRight size={16} className="mb-2 text-slate-600"/>
           <div className="flex flex-col items-center"><span className="text-lg text-amber-500/80">5</span><span className="text-[10px]">冲突</span></div>
           <ArrowRight size={16} className="mb-2 text-slate-600"/>
           <div className="flex flex-col items-center"><span className="text-lg text-amber-500/80">9</span><span className="text-[10px]">极盛</span></div>
           <ArrowRight size={16} className="mb-2 text-slate-600"/>
           <div className="flex flex-col items-center"><span className="text-xl font-bold text-amber-200">10</span><span className="text-[10px]">圆满</span></div>
        </div>
      </ContentCard>

      <ContentCard title="4. 正位与逆位 (Flow)">
        <p className="mb-2">摒弃“吉凶”二元论。这是能量流体力学。</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
             <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
             <div><span className="text-green-400">正位 (顺流)</span>: 能量顺畅、积极展现。顺水行舟。</div>
          </div>
          <div className="flex items-start gap-2">
             <div className="mt-1 w-2 h-2 rounded-full bg-red-500"></div>
             <div><span className="text-red-400">逆位 (阻滞)</span>: 能量受阻、过度(泛滥)或不足(干涸)。</div>
          </div>
        </div>
      </ContentCard>
      
      <ContentCard title="核心哲学" className="md:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
           <div>
             <h4 className="text-amber-400 font-bold mb-1">二元统一</h4>
             <p className="text-slate-400">阴阳中庸。任何事都有一体两面。解牌在于寻找矛盾中的“动态平衡”。</p>
           </div>
           <div>
             <h4 className="text-amber-400 font-bold mb-1">叙事感</h4>
             <p className="text-slate-400">抽到的牌就是连起来的剧本。每一张牌是前一张的果，后一张的因。</p>
           </div>
           <div>
             <h4 className="text-amber-400 font-bold mb-1">潜意识投影</h4>
             <p className="text-slate-400">符号是集体潜意识的语言。理解符号，便是读懂灵魂的暗语。</p>
           </div>
        </div>
      </ContentCard>
    </div>
  </div>
);

// 牌阵速查
const SectionSpreads = () => (
  <div className="space-y-8 animate-fadeIn pb-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* 1. 圣三角 */}
      <div className="bg-slate-900/40 p-6 border border-amber-500/10 rounded-xl relative hover:border-amber-500/30 transition-colors">
        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2"><Layers size={16}/> 圣三角 (Time Flow)</h3>
        <div className="flex items-center justify-between px-4 my-6">
          <div className="text-center group">
            <div className="w-16 h-24 border border-slate-600 bg-slate-800 mb-2 mx-auto flex items-center justify-center text-xs">1.因</div>
            <span className="text-xs text-amber-200">过去</span>
          </div>
          <ArrowRight size={16} className="text-slate-600"/>
          <div className="text-center group">
            <div className="w-16 h-24 border border-amber-500 bg-slate-800 mb-2 mx-auto flex items-center justify-center text-xs shadow-[0_0_15px_rgba(245,158,11,0.2)]">2.缘</div>
            <span className="text-xs text-amber-200">现在</span>
          </div>
          <ArrowRight size={16} className="text-slate-600"/>
          <div className="text-center group">
            <div className="w-16 h-24 border border-slate-600 bg-slate-800 mb-2 mx-auto flex items-center justify-center text-xs">3.果</div>
            <span className="text-xs text-amber-200">未来</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 bg-slate-950/50 p-2 rounded">看清命运河流走向。最基础、最体现“宿命感”的线性因果牌阵。</p>
      </div>

      {/* 2. 二选一 */}
      <div className="bg-slate-900/40 p-6 border border-amber-500/10 rounded-xl relative hover:border-amber-500/30 transition-colors">
        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2"><Compass size={16}/> 二选一 (Parallel Paths)</h3>
        <div className="relative h-40 w-full flex justify-center mt-4">
          <div className="absolute bottom-0 text-center">
            <div className="w-14 h-20 border border-slate-500 bg-slate-800 mx-auto mb-1 flex items-center justify-center text-xs">1</div>
            <span className="text-[10px] text-slate-400">现状</span>
          </div>
          {/* Path A */}
          <div className="absolute top-0 left-[20%] text-center transform -translate-x-1/2">
             <div className="w-14 h-20 border border-amber-500/50 bg-slate-800/50 mx-auto mb-1 rotate-[-15deg] flex items-center justify-center text-xs">2</div>
             <div className="w-14 h-20 border border-amber-500/50 bg-slate-800/50 mx-auto mt-2 rotate-[-15deg] flex items-center justify-center text-xs">4</div>
             <span className="text-[10px] text-amber-500 block mt-1">选择A</span>
          </div>
          {/* Path B */}
          <div className="absolute top-0 right-[20%] text-center transform translate-x-1/2">
             <div className="w-14 h-20 border border-amber-500/50 bg-slate-800/50 mx-auto mb-1 rotate-[15deg] flex items-center justify-center text-xs">3</div>
             <div className="w-14 h-20 border border-amber-500/50 bg-slate-800/50 mx-auto mt-2 rotate-[15deg] flex items-center justify-center text-xs">5</div>
             <span className="text-[10px] text-amber-500 block mt-1">选择B</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 bg-slate-950/50 p-2 rounded mt-4">预演平行时空，看见不同选择后的“代价”与“收益”。</p>
      </div>

      {/* 3. 维纳斯之爱 */}
      <div className="bg-slate-900/40 p-6 border border-amber-500/10 rounded-xl relative hover:border-amber-500/30 transition-colors">
        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2"><Heart size={16}/> 维纳斯 (Venus Love)</h3>
        <div className="flex justify-center gap-4 my-6 scale-90">
           <div className="flex flex-col gap-2">
             <div className="w-12 h-16 border border-slate-600 bg-slate-800 flex items-center justify-center text-[10px]">1.己</div>
             <div className="w-12 h-16 border border-slate-600 bg-slate-800 flex items-center justify-center text-[10px]">3.影响</div>
             <div className="w-12 h-16 border border-slate-600 bg-slate-800 flex items-center justify-center text-[10px]">5.结果</div>
           </div>
           <div className="flex flex-col justify-center">
             <div className="w-12 h-16 border border-amber-500 bg-slate-800 flex items-center justify-center text-[10px] mb-2 shadow-glow">7.未来</div>
           </div>
           <div className="flex flex-col gap-2">
             <div className="w-12 h-16 border border-slate-600 bg-slate-800 flex items-center justify-center text-[10px]">2.彼</div>
             <div className="w-12 h-16 border border-slate-600 bg-slate-800 flex items-center justify-center text-[10px]">4.影响</div>
             <div className="w-12 h-16 border border-slate-600 bg-slate-800 flex items-center justify-center text-[10px]">6.结果</div>
           </div>
        </div>
        <p className="text-xs text-slate-400 bg-slate-950/50 p-2 rounded">镜像投射。揭示两人之间看不见的能量连线，破除“我执”。</p>
      </div>

      {/* 4. 凯尔特十字 */}
      <div className="bg-slate-900/40 p-6 border border-amber-500/10 rounded-xl relative hover:border-amber-500/30 transition-colors row-span-2">
        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2"><Anchor size={16}/> 凯尔特十字 (Celtic Cross)</h3>
        <div className="flex gap-6 justify-center items-center h-64 scale-90">
           {/* Cross Section */}
           <div className="relative w-32 h-48">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-20 bg-amber-500/20 border border-amber-500 z-10 flex items-center justify-center text-xs font-bold shadow-glow">1/2</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-20 bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px]">3.意识</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-20 bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px]">4.潜意识</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-20 bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px]">5.过去</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-20 bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px]">6.未来</div>
           </div>
           {/* Staff Section */}
           <div className="flex flex-col gap-1">
             <div className="w-10 h-14 bg-slate-800 border border-slate-600 flex items-center justify-center text-[8px]">10.结果</div>
             <div className="w-10 h-14 bg-slate-800 border border-slate-600 flex items-center justify-center text-[8px]">9.愿望</div>
             <div className="w-10 h-14 bg-slate-800 border border-slate-600 flex items-center justify-center text-[8px]">8.环境</div>
             <div className="w-10 h-14 bg-slate-800 border border-slate-600 flex items-center justify-center text-[8px]">7.自我</div>
           </div>
        </div>
        <p className="text-xs text-slate-400 bg-slate-950/50 p-2 rounded mt-4">全息扫描。横轴贯穿时间，纵轴贯穿意识，右轴解析内外环境。深度复盘人生。</p>
      </div>

      {/* 5. 身心灵 */}
      <div className="bg-slate-900/40 p-6 border border-amber-500/10 rounded-xl relative hover:border-amber-500/30 transition-colors">
        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2"><User size={16}/> 身心灵 (Body Mind Spirit)</h3>
        <div className="flex flex-col items-center gap-4 my-4">
          <div className="flex items-center gap-4 w-full max-w-[200px]">
             <div className="w-12 h-16 border border-purple-400/50 bg-purple-900/20 flex items-center justify-center text-xs text-purple-200">灵</div>
             <span className="text-xs text-slate-400">指引/直觉</span>
          </div>
          <div className="flex items-center gap-4 w-full max-w-[200px]">
             <div className="w-12 h-16 border border-blue-400/50 bg-blue-900/20 flex items-center justify-center text-xs text-blue-200">心</div>
             <span className="text-xs text-slate-400">情绪/人际</span>
          </div>
          <div className="flex items-center gap-4 w-full max-w-[200px]">
             <div className="w-12 h-16 border border-red-400/50 bg-red-900/20 flex items-center justify-center text-xs text-red-200">身</div>
             <span className="text-xs text-slate-400">根基/行动</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 bg-slate-950/50 p-2 rounded">垂直校准。不预测吉凶，只诊断生命支柱的垂直度与堵塞点。</p>
      </div>

       {/* 6. 每日一抽 */}
       <div className="bg-slate-900/40 p-6 border border-amber-500/10 rounded-xl relative hover:border-amber-500/30 transition-colors">
        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2"><Sparkles size={16}/> 每日一抽 (Daily Oracle)</h3>
        <div className="flex justify-center my-6">
           <div className="w-24 h-40 border-2 border-amber-500 bg-gradient-to-br from-amber-500/20 to-slate-900 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-pulse-slow">
              <Sun size={32} className="text-amber-200 mb-2"/>
              <span className="text-[10px] tracking-widest text-amber-200">THE ONE</span>
           </div>
        </div>
        <p className="text-xs text-slate-400 bg-slate-950/50 p-2 rounded">此时此地。“一沙一世界”，这一张牌包含解决当下问题的所有智慧。</p>
      </div>
    </div>
  </div>
);

// 意象速查
const SectionSymbols = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCards = ALL_CARDS.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    card.archetype.includes(searchTerm) ||
    card.symbols.includes(searchTerm)
  );

  const majors = filteredCards.filter(card => typeof card.id === 'number');
  const minors = filteredCards.filter(card => typeof card.id !== 'number');

  const CardItem = ({ card }) => {
    const isMajor = typeof card.id === 'number';
    const badgeText = isMajor ? card.id : (card.id.split('_')[1] || card.id);
    
    return (
      <div className="group border border-amber-500/10 bg-slate-900/40 hover:bg-slate-800 rounded-lg transition-all cursor-pointer overflow-hidden p-4">
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center font-serif text-[10px] bg-slate-950 text-amber-500 shrink-0`}>
            {badgeText}
          </div>
          <div className="flex-grow">
            <h4 className="text-amber-100 font-serif">{card.name}</h4>
            <p className="text-xs text-slate-400">{card.archetype}</p>
          </div>
        </div>
        <div className="mt-3 pl-12 text-sm text-slate-300 border-t border-amber-500/5 pt-2">
           <p className="leading-relaxed">{card.symbols}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="sticky top-0 z-10 bg-slate-950/90 py-4 backdrop-blur-sm">
        <input 
          type="text" 
          placeholder="搜索78张牌 (如: 权杖四, 宝剑三, 愚人...)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-amber-500/30 text-amber-100 px-4 py-3 pl-12 rounded focus:outline-none focus:border-amber-500 focus:shadow-[0_0_15px_rgba(245,158,11,0.2)] placeholder-amber-500/30 transition-all"
        />
        <Search className="absolute left-4 top-7 text-amber-500/50" size={18} />
      </div>

      {/* 万能公式置顶 */}
      {!searchTerm && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 p-6 rounded-lg mb-8">
           <h3 className="text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
             <Sparkles size={18} className="text-amber-500"/> 
             小阿尔卡纳万能公式
           </h3>
           <p className="text-sm text-slate-400 mb-4">无需死记硬背，使用 <span className="text-amber-400 font-mono">[元素] + [数字]</span> 进行炼金计算。</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
             <div>
               <h4 className="text-amber-500/80 text-xs uppercase tracking-widest mb-2 border-b border-amber-500/10 pb-1">元素 (Suit)</h4>
               <ul className="space-y-1 text-slate-300">
                 <li><span className="text-red-400">权杖(火)</span>: 动作、热情</li>
                 <li><span className="text-blue-400">圣杯(水)</span>: 感情、人际</li>
                 <li><span className="text-yellow-200">宝剑(风)</span>: 思想、伤害</li>
                 <li><span className="text-green-400">星币(土)</span>: 钱、健康</li>
               </ul>
             </div>
             <div>
               <h4 className="text-amber-500/80 text-xs uppercase tracking-widest mb-2 border-b border-amber-500/10 pb-1">数字 (Number)</h4>
               <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-300 text-xs">
                 <span>1: 新能量</span><span>6: 和谐</span>
                 <span>2: 选择</span><span>7: 探索</span>
                 <span>3: 合作</span><span>8: 加速</span>
                 <span>4: 稳定</span><span>9: 极盛</span>
                 <span>5: 冲突</span><span>10: 转化</span>
               </div>
             </div>
           </div>
        </div>
      )}

      {majors.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-amber-500/70 text-sm font-serif uppercase tracking-widest border-b border-amber-500/20 pb-2 mb-4">
            Major Arcana · 大阿尔卡纳
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {majors.map(card => <CardItem key={card.id} card={card} />)}
          </div>
        </div>
      )}

      {minors.length > 0 && (
        <div className="space-y-3 mt-8">
          <h3 className="text-slate-500 text-sm font-serif uppercase tracking-widest border-b border-slate-700 pb-2 mb-4">
            Minor Arcana · 小阿尔卡纳
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {minors.map(card => <CardItem key={card.id} card={card} />)}
          </div>
        </div>
      )}
      
      {majors.length === 0 && minors.length === 0 && (
        <div className="text-center text-slate-500 py-10">
          未找到相关卡片
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------------------------
// 组件：主界面 (MainDashboard)
// -----------------------------------------------------------------------------
// 找到 const MainDashboard... 开始的地方，直到这个组件结束，替换为：

const MainDashboard = ({ onLaunchImmersive }) => {
  const [activeSection, setActiveSection] = useState('intro');

  const handleNavClick = (section) => {
    if (section.special) {
      // 【关键逻辑】如果点击的是“塔罗牌”，触发外部传入的穿越函数
      onLaunchImmersive();
    } else {
      setActiveSection(section.id);
    }
  };

  // ... 这里原本的 renderContent 函数保持不变 ...
  // 为了安全，你可以检查一下你原本的 switch case 逻辑还在不在
  const renderContent = () => {
    switch (activeSection) {
      case 'intro': return <SectionIntro />;
      case 'basics': return <SectionBasics />;
      case 'spreads': return <SectionSpreads />;
      case 'symbols': return <SectionSymbols />;
      default: return <SectionIntro />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-amber-100 flex flex-col font-sans">
      <header className="border-b border-amber-500/20 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-amber-500 flex items-center justify-center">
              <Star size={16} className="text-amber-500 fill-amber-500" />
            </div>
            <span className="font-serif text-xl tracking-widest font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">ARCANA</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section)}
                className={`px-4 py-2 rounded-t-lg transition-all relative ${
                  activeSection === section.id 
                    ? 'text-amber-200 bg-gradient-to-t from-amber-900/20 to-transparent' 
                    : section.special ? 'text-amber-400 hover:text-amber-100' : 'text-amber-500/60 hover:text-amber-200'
                }`}
              >
                <span className={`relative z-10 font-medium ${section.special ? 'flex items-center gap-1' : ''}`}>
                    {section.special && <Sparkles size={14} className="animate-pulse" />}
                    {section.title}
                </span>
                {activeSection === section.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,1)]"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden flex overflow-x-auto px-4 gap-4 py-3 bg-slate-950 border-t border-amber-500/10 hide-scrollbar">
          {SECTIONS.map((section) => (
             <button
             key={section.id}
             onClick={() => handleNavClick(section)}
             className={`whitespace-nowrap text-sm px-3 py-1 rounded-full border transition-all ${
               section.special ? 'border-amber-400 bg-amber-500/20 text-amber-200' :
               activeSection === section.id 
                 ? 'border-amber-500 bg-amber-500/10 text-amber-200' 
                 : 'border-transparent text-amber-500/50'
             }`}
           >
             {section.title}
           </button>
          ))}
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full relative">
        <div className="fixed top-20 left-4 w-px h-full bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none hidden xl:block"></div>
        <div className="fixed top-20 right-4 w-px h-full bg-gradient-to-b from-amber-500/20 to-transparent pointer-events-none hidden xl:block"></div>

        <div className="mb-8 pl-4 border-l-4 border-amber-600">
          <h2 className="text-3xl font-serif text-amber-100">{SECTIONS.find(s => s.id === activeSection)?.title || '塔罗牌'}</h2>
          <p className="text-amber-500/60 font-serif italic text-sm mt-1">{SECTIONS.find(s => s.id === activeSection)?.subtitle || 'The Gateway'}</p>
        </div>

        <div className="transition-all duration-300">
          {renderContent()}
        </div>
      </main>

      <footer className="border-t border-amber-500/10 py-8 text-center text-amber-500/30 text-xs">
        <div className="flex justify-center gap-4 mb-2">
          <Moon size={12} />
          <Star size={12} />
          <Sun size={12} />
        </div>
        <p>&copy; {new Date().getFullYear()} ARCANA UI. WISDOM OF THE AGES.</p>
      </footer>
    </div>
  );
};
// -----------------------------------------------------------------------------
// 主应用入口
// -----------------------------------------------------------------------------
// src/App.jsx 最底部

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  // 新增状态：控制视图模式 ('dashboard' | 'transition' | 'immersive')
  const [viewMode, setViewMode] = useState('dashboard'); 

  // 1. 如果还没解锁，显示命运之锁
  if (!unlocked) {
    return <FateLock onUnlock={() => setUnlocked(true)} />;
  }

  // 2. 如果处于【穿越模式】，显示粒子动画
  // 当动画结束时 (onWarpComplete)，切换到沉浸模式
  if (viewMode === 'transition') {
    return <StarfieldTransition onWarpComplete={() => setViewMode('immersive')} />;
  }

  // 3. 如果处于【沉浸模式】，显示3D塔罗牌页面
  // 当用户点击退出 (onExit)，切回 Dashboard
  if (viewMode === 'immersive') {
    return <TarotImmersivePage onExit={() => setViewMode('dashboard')} />;
  }

  // 4. 默认显示主界面 (Dashboard)
  // 这里的 onLaunchImmersive 就是传给 MainDashboard 的遥控器
  return <MainDashboard onLaunchImmersive={() => setViewMode('transition')} />;
}