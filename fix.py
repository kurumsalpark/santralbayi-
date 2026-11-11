
with open("src/App.tsx", "r", encoding="utf-8") as f:
    c = f.read()

bad = "className={}"
good = "className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm ${setupUnreachableFallbackEnabled ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-emerald-950" : "bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-rose-950"}`}"

if bad in c:
    c = c.replace(bad, good)
    with open("src/App.tsx", "w", encoding="utf-8") as f:
        f.write(c)
    print("REPLACED OK")
else:
    print("BAD NOT FOUND")
