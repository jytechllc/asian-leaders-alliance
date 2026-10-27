// 名录来源：dotku/overseas-chinese-kol-leaders（README.md / forbes-2022.md）
// wiki 为英文维基百科条目标题；中文条目通过语言链接自动获取。

export type Region = "美国" | "加拿大" | "日本" | "澳大利亚" | "马来西亚";

export type Leader = {
  name: string;
  position?: string;
  note?: string;
  link?: { label: string; href: string };
  region: Region;
  wiki?: string;
};

export const REGIONS: Region[] = ["美国", "加拿大", "日本", "澳大利亚", "马来西亚"];

export const leaders: Leader[] = [
  { region: "美国", name: "Big Joe", position: "谷歌资深产品经理", note: "帮助华人职场发展与个人发展" },
  { region: "美国", name: "Peter Wang", position: "Anaconda CEO" },
  { region: "美国", name: "Vincent Wu", position: "COO, News Break", note: "强化共同的价值观，互相尊重" },
  { region: "美国", name: "Q Zhao", position: "CEO, 2redbeans.com" },
  { region: "美国", name: "Cat Chen", position: "Investor", note: "曾就职于 Facebook，资深工程师" },
  { region: "美国", name: "宝二爷", note: "加密币早期参与者" },
  { region: "美国", name: "Diana Ding", position: "CEO, Dingding TV" },
  { region: "美国", name: "Tony Zhang", position: "CEO, BlueJay Mobile" },
  { region: "美国", name: "Shouzi Chew", position: "CEO, TikTok", wiki: "Shou Zi Chew" },
  { region: "美国", name: "Yao Zhao", position: "Council Member, Saratoga" },
  { region: "美国", name: "Eric Yuan", position: "CEO, Zoom", wiki: "Eric Yuan" },
  { region: "美国", name: "Jensen Huang", position: "CEO, Nvidia", wiki: "Jensen Huang" },
  { region: "美国", name: "Lisa Su", position: "CEO, AMD", wiki: "Lisa Su" },
  { region: "美国", name: "Priscilla Chan", position: "Co-founder, Chan Zuckerberg Initiative", wiki: "Priscilla Chan" },
  { region: "美国", name: "John Liu", position: "Founder, New York Young Elite Association" },
  { region: "美国", name: "Kaobo Huang", position: "Idea Campus" },
  { region: "美国", name: "Brain Ho", position: "Founder, News for Chinese" },
  { region: "美国", name: "James Chu", position: "Founder, CEO, ViewSonic", wiki: "James Chu" },
  { region: "美国", name: "Weili Dai", position: "Founder, Marvell Technology", wiki: "Weili Dai" },
  { region: "美国", name: "Yi Liu", position: "Founder, iHealth Lab" },
  { region: "美国", name: "Min Kao", position: "Co-founder, Garmin", wiki: "Min Kao" },
  { region: "美国", name: "David Sun", position: "Co-founder, Kingston Technology", wiki: "David Sun (businessman)" },
  { region: "美国", name: "John Tu", position: "Co-founder, Kingston Technology", wiki: "John Tu" },
  { region: "美国", name: "Victor Tsao", position: "Co-founder, Linksys", wiki: "Victor Tsao" },
  { region: "美国", name: "An Wang", position: "Wang Laboratories", wiki: "An Wang" },
  { region: "美国", name: "William Wang", position: "CEO, Vizio", wiki: "William Wang" },
  { region: "美国", name: "Jun-Yan Zhu", position: "Assistant Professor, Carnegie Mellon University" },
  { region: "美国", name: "Deb Liu", position: "CEO, Ancestry", wiki: "Deb Liu" },
  { region: "美国", name: "Tim Li", position: "HireIO", note: "人才招聘" },
  { region: "美国", name: "Tom Zhang", position: "Harmony", note: "硅谷猎头" },
  { region: "美国", name: "Stephen Tse", position: "Harmony", note: "加密币" },
  { region: "美国", name: "Changpeng Zhao", position: "CEO, Binance", note: "加密币", wiki: "Changpeng Zhao" },
  { region: "美国", name: "Michelle Yeoh", position: "Malaysian actress", note: "演员", wiki: "Michelle Yeoh" },
  { region: "美国", name: "Jackie Chan", note: "演员", wiki: "Jackie Chan" },
  { region: "美国", name: "Ingrid Chunyuan Wu & Pan Zhengmin", position: "Co-founders, AAC Technologies", wiki: "Ingrid Wu" },
  { region: "美国", name: "Chen Ning Yang", position: "Nobel laureate, Physics", wiki: "Yang Chen-Ning" },
  { region: "美国", name: "Fei-Fei Li", position: "Google Cloud", wiki: "Fei-Fei Li" },
  { region: "美国", name: "Andrew Ng", position: "AI Industry Leader", wiki: "Andrew Ng" },
  { region: "美国", name: "Eileen Gu", position: "Freestyle skier and Olympic gold medalist", wiki: "Eileen Gu" },
  { region: "美国", name: "Jeremy Lin", position: "Professional basketball player", wiki: "Jeremy Lin" },
  { region: "美国", name: "Qian", position: "跟我一起来谈钱", note: "业内人士，业余博主，CPA 和 CFA 持证人" },
  { region: "美国", name: "冯沁原", position: "CEO, BigTiger（关闭于 2019）" },
  { region: "美国", name: "Connie", position: "Real Estate" },
  { region: "美国", name: "Ariel Liu", position: "COO, 喜马拉雅" },
  { region: "美国", name: "Ali Wong", position: "Comedian", wiki: "Ali Wong" },
  { region: "美国", name: "蒋甲", position: "Entrepreneur", note: "TED 演讲者，播放量 800 万", wiki: "Jia Jiang" },
  { region: "美国", name: "Rocky", position: "YouTuber" },
  {
    region: "美国",
    name: "Linda",
    position: "YouTuber",
    link: { label: "YouTube", href: "https://www.youtube.com/channel/UC2Ir2sdKZ4fTr6xo5J9SuVw" },
  },
  { region: "美国", name: "Dewang Cao", position: "CEO, 福耀玻璃", wiki: "Cao Dewang" },
  {
    region: "美国",
    name: "Jessie",
    position: "YouTuber",
    link: { label: "@ChinesewithJessie", href: "https://www.youtube.com/@ChinesewithJessie" },
  },
  { region: "美国", name: "Athena Liu", position: "美中友好联盟执行主席" },
  {
    region: "美国",
    name: "Jeff Wang",
    position: "Candidate, Union City Council District 3",
    link: { label: "votejeffwang.com", href: "https://www.votejeffwang.com/" },
  },
  { region: "加拿大", name: "汤山老王", position: "YouTuber" },
  { region: "日本", name: "小船", position: "创业导师" },
  { region: "澳大利亚", name: "小乌", position: "脑洞乌托邦" },
  { region: "澳大利亚", name: "Henry", position: "澳洲 Henry" },
  { region: "澳大利亚", name: "Rony Naviando", position: "Robot PhD" },
  { region: "马来西亚", name: "Nomad", position: "FIRE", note: "从英国移居马来西亚，刚刚获得财富自由的博主" },
];

export type ForbesEntry = {
  rank: number;
  name: string;
  description: string;
  industry: string[];
  wiki?: string;
};

// 福布斯 2022 全球亿万富豪榜（共 2,578 人）中排名最前的 10 位海外华人
export const forbes2022: ForbesEntry[] = [
  { rank: 19, name: "Changpeng Zhao", description: "Who goes by CZ, is the founder and CEO of Binance", industry: ["Tech", "Finance"], wiki: "Changpeng Zhao" },
  { rank: 78, name: "Jensen Huang", description: "Cofounded graphics-chip maker Nvidia in 1993", industry: ["Tech"], wiki: "Jensen Huang" },
  { rank: 94, name: "Li Xiting", description: "Founder and chairman of Shenzhen Mindray（迈瑞）Bio-Medical Electronics", industry: ["Medical"], wiki: "Li Xiting" },
  { rank: 133, name: "Robert & Philip Ng", description: "Control Far East Organization, Singapore's largest private landlord and property developer", industry: ["Real Estate"], wiki: "Robert Ng" },
  { rank: 154, name: "Goh Cheng Liang", description: "Majority stake in Japan's Nippon Paint Holdings, the world's fourth-largest paint manufacturer", industry: ["Manufacture"], wiki: "Goh Cheng Liang" },
  { rank: 185, name: "Quek Leng Chan", description: "Executive chairman of Hong Leong Co. (Malaysia), with interests in finance, food and property", industry: ["Finance", "Manufacture", "Real Estate"], wiki: "Quek Leng Chan" },
  { rank: 246, name: "Paul Xiaoming Lee", description: "Chairman of Yunnan Energy New Material, a supplier of packaging products", industry: ["Manufacture", "Tech"] },
  { rank: 330, name: "Wee Cho Yaw", description: "Chairman emeritus of United Overseas Bank, Singapore's third-largest bank by assets", industry: ["Finance"], wiki: "Wee Cho Yaw" },
  { rank: 424, name: "Leo Koguan", description: "Cofounder and chairman of IT provider SHI International ($11.1B sales)", industry: ["Tech"], wiki: "Leo Koguan" },
  { rank: 431, name: "Gary Wang", description: "Cofounded and served as CTO of cryptocurrency exchange FTX", industry: ["Tech", "Finance"], wiki: "Gary Wang (American businessman)" },
];
