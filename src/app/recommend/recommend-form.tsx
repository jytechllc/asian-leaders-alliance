"use client";

import { useState } from "react";
import { REGIONS } from "@/data/leaders";

const input =
  "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent";

export function RecommendForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    setError("");
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    }).catch(() => null);
    const data = await res?.json().catch(() => ({}));
    if (res?.ok) {
      form.reset();
      setState("done");
    } else {
      setError(data?.error ?? "网络异常，请稍后再试");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-xl border border-line bg-card p-6">
        <h2 className="font-serif text-xl font-bold">感谢推荐</h2>
        <p className="mt-2 text-sm text-muted">我们已收到，核实后会将符合标准的人物加入名人录。</p>
        <button type="button" onClick={() => setState("idle")} className="mt-4 text-sm text-accent hover:underline">
          再推荐一位
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-line bg-card p-6">
      <label className="block">
        <span className="text-sm font-medium">
          姓名 <span className="text-accent">*</span>
        </span>
        <input name="name" required maxLength={80} placeholder="中文名或英文名" className={`${input} mt-1.5`} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">国家/地区</span>
          <select name="region" defaultValue="" className={`${input} mt-1.5`}>
            <option value="">请选择</option>
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
            <option>其他</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium">职位/领域</span>
          <input name="position" maxLength={120} placeholder="如：CEO, Zoom" className={`${input} mt-1.5`} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium">维基百科链接</span>
        <input
          name="wikiUrl"
          type="url"
          maxLength={300}
          placeholder="https://zh.wikipedia.org/wiki/…"
          className={`${input} mt-1.5`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">
          推荐理由 <span className="text-accent">*</span>
        </span>
        <textarea
          name="reason"
          required
          rows={5}
          maxLength={1000}
          placeholder="代表成就、影响力、相关报道链接等"
          className={`${input} mt-1.5 resize-y`}
        />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {error && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
      >
        {state === "sending" ? "提交中…" : "提交推荐"}
      </button>
    </form>
  );
}
