# 亚裔领袖联盟 · 名人录

海外华人与亚裔领袖名录站，Next.js 16（Cache Components）+ Tailwind 4。

- `/` 名人录：地区筛选与搜索；有维基条目的人物显示中文简介、照片
- `/forbes-2022` 福布斯 2022 海外华人富豪前 10
- `/updates` 维基动态：按条目最近编辑时间排序，用于跟踪人物变化
- `/recommend` 推荐名人：提交后在本仓库生成 `recommendation` 标签的 Issue

## 数据

- 名单在 `src/data/leaders.ts`（来源 dotku/overseas-chinese-kol-leaders）。加人时填 `wiki` 为英文维基条目标题，中文条目自动通过语言链接获取。
- 维基数据由 `src/lib/wiki.ts` 批量拉取（每批 20 条），`cacheLife("days")` 每日刷新。

## 环境变量

| 变量 | 说明 |
| --- | --- |
| `GITHUB_TOKEN` | 推荐表单创建 Issue 用，需对本仓库有 Issues 写权限（fine-grained token）。未设置时表单返回「推荐通道暂未开通」 |
| `GITHUB_REPO` | 可选，默认 `jytechllc/asian-leaders-alliance` |

## 开发

```bash
npm install
npm run dev
```
