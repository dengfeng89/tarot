$root = "E:\桌面\前端\tarot-master"
$html = Get-Content -Raw -Encoding UTF8 "$root\_source.html"
$start = $html.IndexOf('<script type="text/babel">')
$end = $html.IndexOf('</script>', $start)
$script = $html.Substring($start + '<script type="text/babel">'.Length, $end - ($start + '<script type="text/babel">'.Length))

$major = [regex]::Match($script, 'const MAJOR_ARCANA_DATA\s*=\s*(\[[\s\S]*?\]);').Groups[1].Value
$minor = [regex]::Match($script, 'const minorData\s*=\s*({[\s\S]*?});').Groups[1].Value
$suits = [regex]::Match($script, 'const suits\s*=\s*(\[[\s\S]*?\]);').Groups[1].Value
$order = [regex]::Match($script, 'const order\s*=\s*(\[[\s\S]*?\]);').Groups[1].Value
$cnnums = [regex]::Match($script, 'const cnNums\s*=\s*(\[[\s\S]*?\]);').Groups[1].Value

$compMatch = [regex]::Match($script, '(const ContentCard[\s\S]*?)\n\s*const root')
$components = $compMatch.Groups[1].Value.Trim()
$components = $components -replace 'const \{ useState, useEffect \} = React;', ''
$components = $components -replace '<React.Fragment>', '<>'
$components = $components -replace '</React.Fragment>', '</>'

$app = @"
import { useState } from 'react';
import {
  Anchor,
  ArrowRight,
  BookOpen,
  Compass,
  Droplets,
  Eye,
  Flame,
  Heart,
  Layers,
  Lock,
  Moon,
  Mountain,
  Search,
  Sparkles,
  Star,
  Sun,
  Unlock,
  User,
  Wind,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// 1. 核心数据源
// -----------------------------------------------------------------------------

// 大阿尔卡纳 (22张)
const MAJOR_ARCANA_DATA = $major;

// 小阿尔卡纳详细数据
const MINOR_ARCANA_DATA = $minor;

const SUITS = $suits;
const ORDER = $order;
const CN_NUMS = $cnnums;

const generateFullDeck = () => {
  const deck = [...MAJOR_ARCANA_DATA];
  SUITS.forEach((suit) => {
    ORDER.forEach((num, index) => {
      const id = `${suit.key}_${num}`;
      const data = MINOR_ARCANA_DATA[id] || { archetype: '未知能量', symbols: '待补充' };
      deck.push({
        id,
        name: `${suit.name}${CN_NUMS[index]}`,
        archetype: data.archetype,
        symbols: data.symbols,
      });
    });
  });
  return deck;
};

const ALL_CARDS = generateFullDeck();

const SECTIONS = [
  { id: 'intro', title: '概论', subtitle: 'Origins', icon: <BookOpen size={20} /> },
  { id: 'basics', title: '基础', subtitle: 'Basics', icon: <Sun size={20} /> },
  { id: 'spreads', title: '牌阵', subtitle: 'Spreads', icon: <Layers size={20} /> },
  { id: 'symbols', title: '意象', subtitle: 'Symbols', icon: <Eye size={20} /> },
];

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];

$components

export default App;
"@

$app | Set-Content -Encoding UTF8 "$root\src\App.jsx"
Write-Host "Wrote App.jsx"
